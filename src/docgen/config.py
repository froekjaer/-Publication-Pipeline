from pathlib import Path

import yaml

from .errors import DocgenError
from .models import ProjectConfig


def _mapping(value: object, label: str) -> dict:
    if not isinstance(value, dict):
        raise DocgenError(f"{label} must be a mapping.")
    return value


def _string(mapping: dict, key: str) -> str:
    value = mapping.get(key)
    if not isinstance(value, str) or not value.strip():
        raise DocgenError(f"project.{key} must be a non-empty string.")
    return value.strip()


def _safe_relative(project_root: Path, value: str, label: str) -> Path:
    candidate = (project_root / value).resolve()
    try:
        return candidate.relative_to(project_root.resolve())
    except ValueError as error:
        raise DocgenError(f"{label} must stay inside the project root: {value}") from error


def load_config(project_root: Path) -> ProjectConfig:
    config_path = project_root / "publication.yml"
    if not config_path.is_file():
        raise DocgenError(f"Missing project configuration: {config_path}")
    try:
        raw = yaml.safe_load(config_path.read_text(encoding="utf-8"))
    except yaml.YAMLError as error:
        raise DocgenError(f"Invalid YAML in {config_path}: {error}") from error
    root = _mapping(raw, "publication.yml")
    project = _mapping(root.get("project"), "project")
    content = root.get("content")
    if (
        not isinstance(content, list)
        or not content
        or not all(isinstance(item, str) for item in content)
    ):
        raise DocgenError("content must be a non-empty list of Markdown file paths.")
    outputs = _mapping(root.get("outputs", {"html": True, "pdf": False}), "outputs")
    html = outputs.get("html", True)
    pdf = outputs.get("pdf", False)
    if not isinstance(html, bool) or not isinstance(pdf, bool):
        raise DocgenError("outputs.html and outputs.pdf must be true or false.")
    if not html and not pdf:
        raise DocgenError("At least one output must be enabled.")
    paths = tuple(_safe_relative(project_root, item, "content path") for item in content)
    return ProjectConfig(
        project_id=_string(project, "id"),
        title=_string(project, "title"),
        version=_string(project, "version"),
        language=_string(project, "language"),
        publication_type=_string(project, "type"),
        content=paths,
        html=html,
        pdf=pdf,
    )
