import shutil
from pathlib import Path

from .builders.html import build_html
from .config import load_config
from .discovery import discover_documents
from .errors import DocgenError
from .manifest import write_manifest
from .models import BuildResult


def _copy_assets(project_root: Path, output_dir: Path, documents: list) -> None:
    for document in documents:
        source_assets = (project_root / document.path).parent / "assets"
        if source_assets.is_dir():
            target_assets = output_dir / document.path.parent / "assets"
            shutil.copytree(source_assets, target_assets, dirs_exist_ok=True)


def build(project_root: Path) -> BuildResult:
    project_root = project_root.resolve()
    if not project_root.is_dir():
        raise DocgenError(f"Project directory does not exist: {project_root}")
    config = load_config(project_root)
    documents, warnings = discover_documents(project_root, config.content)
    output_dir = project_root / "dist"
    output_dir.mkdir(exist_ok=True)
    _copy_assets(project_root, output_dir, documents)
    output_files: list[Path] = []
    html_path = None
    if config.html:
        html_path = output_dir / "index.html"
        build_html(config, documents, html_path)
        output_files.append(html_path)
    if config.pdf:
        raise DocgenError(
            "PDF output is not available in Foundation Sprint. "
            "Disable outputs.pdf or add a controlled PDF builder."
        )
    manifest_path = output_dir / "build-manifest.json"
    write_manifest(project_root, manifest_path, config, documents, output_files, warnings)
    return BuildResult(output_dir, html_path, manifest_path, tuple(warnings))
