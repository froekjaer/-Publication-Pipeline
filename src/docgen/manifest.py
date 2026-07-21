import hashlib
import json
import os
import platform
import subprocess
from datetime import UTC, datetime
from pathlib import Path

from .models import ProjectConfig, SourceDocument


def _build_time() -> str:
    epoch = os.environ.get("SOURCE_DATE_EPOCH")
    if epoch:
        return datetime.fromtimestamp(int(epoch), UTC).isoformat().replace("+00:00", "Z")
    return datetime.now(UTC).isoformat().replace("+00:00", "Z")


def _git_value(project_root: Path, *args: str) -> str | None:
    try:
        result = subprocess.run(
            ["git", "-C", str(project_root), *args],
            check=True,
            capture_output=True,
            text=True,
            timeout=2,
        )
    except (FileNotFoundError, subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return None
    return result.stdout.strip() or None


def _git_provenance(project_root: Path) -> dict | None:
    if _git_value(project_root, "rev-parse", "--is-inside-work-tree") != "true":
        return None
    return {
        "repository": _git_value(project_root, "config", "--get", "remote.origin.url"),
        "branch": _git_value(project_root, "branch", "--show-current"),
        "commit": _git_value(project_root, "rev-parse", "HEAD"),
    }


def write_manifest(
    project_root: Path,
    destination: Path,
    config: ProjectConfig,
    documents: list[SourceDocument],
    output_files: list[Path],
    warnings: list[str],
) -> None:
    sources = []
    for document in documents:
        content = (project_root / document.path).read_bytes()
        sources.append(
            {
                "path": str(document.path),
                "sha256": hashlib.sha256(content).hexdigest(),
                "id": document.document_id,
            }
        )
    manifest = {
        "project": {"id": config.project_id, "title": config.title, "version": config.version},
        "build_time": _build_time(),
        "generator": {"name": "mission-docgen", "version": "0.1.0"},
        "git": _git_provenance(project_root),
        "environment": {
            "python": platform.python_version(),
            "platform": platform.platform(),
            "source_date_epoch": os.environ.get("SOURCE_DATE_EPOCH"),
        },
        "sources": sources,
        "outputs": [str(path.name) for path in output_files],
        "warnings": warnings,
    }
    destination.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
