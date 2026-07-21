import re
from pathlib import Path

import yaml

from .errors import DocgenError
from .models import SourceDocument

FRONTMATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n?", re.DOTALL)
IMAGE = re.compile(r"!\[[^]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)")
REQUIRED_METADATA = ("id", "title", "order", "status", "version", "audience", "language")


def _inside(root: Path, candidate: Path) -> bool:
    try:
        candidate.resolve().relative_to(root.resolve())
    except ValueError:
        return False
    return True


def _parse_frontmatter(path: Path, text: str, override: dict | None = None) -> tuple[dict, str]:
    match = FRONTMATTER.match(text)
    if not match:
        if not override:
            raise DocgenError(f"Missing YAML frontmatter in {path}.")
        metadata, body = override, text
    else:
        try:
            metadata = yaml.safe_load(match.group(1))
        except yaml.YAMLError as error:
            raise DocgenError(f"Invalid frontmatter in {path}: {error}") from error
        if override:
            metadata = {**metadata, **override}
        body = text[match.end() :]
    if not isinstance(metadata, dict):
        raise DocgenError(f"Frontmatter in {path} must be a mapping.")
    missing = [key for key in REQUIRED_METADATA if key not in metadata]
    if missing:
        raise DocgenError(f"Missing metadata in {path}: {', '.join(missing)}")
    if not isinstance(metadata["order"], int):
        raise DocgenError(f"Metadata order in {path} must be an integer.")
    for key in REQUIRED_METADATA:
        if key != "order" and (not isinstance(metadata[key], str) or not metadata[key].strip()):
            raise DocgenError(f"Metadata {key} in {path} must be a non-empty string.")
    return metadata, body


def _validate_images(project_root: Path, path: Path, body: str) -> None:
    for raw_target in IMAGE.findall(body):
        if raw_target.startswith(("https://", "http://", "#", "data:")):
            continue
        target = (project_root / path.parent / raw_target).resolve()
        if not _inside(project_root, target):
            raise DocgenError(f"Image path escapes project root in {path}: {raw_target}")
        if not target.is_file():
            raise DocgenError(f"Image file not found in {path}: {raw_target}")


def discover_documents(
    project_root: Path, content_paths: tuple[Path, ...], metadata_overrides: dict[Path, dict]
) -> tuple[list[SourceDocument], list[str]]:
    documents: list[SourceDocument] = []
    warnings: list[str] = []
    ids: set[str] = set()
    for relative_path in content_paths:
        path = project_root / relative_path
        if path.suffix.lower() not in {".md", ".markdown"}:
            raise DocgenError(f"Source file is not Markdown: {relative_path}")
        if not path.is_file():
            raise DocgenError(f"Source file not found: {relative_path}")
        metadata, body = _parse_frontmatter(
            relative_path, path.read_text(encoding="utf-8"), metadata_overrides.get(relative_path)
        )
        _validate_images(project_root, relative_path, body)
        document_id = metadata["id"]
        if document_id in ids:
            raise DocgenError(f"Duplicate document id: {document_id}")
        ids.add(document_id)
        unknown = sorted(set(metadata) - set(REQUIRED_METADATA))
        if unknown:
            warnings.append(
                f"{relative_path}: ignored unknown metadata fields: {', '.join(unknown)}"
            )
        documents.append(
            SourceDocument(
                path=relative_path,
                document_id=document_id,
                title=metadata["title"],
                order=metadata["order"],
                status=metadata["status"],
                version=metadata["version"],
                audience=metadata["audience"],
                language=metadata["language"],
                body=body,
            )
        )
    return sorted(documents, key=lambda document: (document.order, str(document.path))), warnings
