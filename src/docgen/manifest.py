import hashlib
import json
import os
from datetime import UTC, datetime
from pathlib import Path

from .models import ProjectConfig, SourceDocument


def _build_time() -> str:
    epoch = os.environ.get("SOURCE_DATE_EPOCH")
    if epoch:
        return datetime.fromtimestamp(int(epoch), UTC).isoformat().replace("+00:00", "Z")
    return datetime.now(UTC).isoformat().replace("+00:00", "Z")


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
        "sources": sources,
        "outputs": [str(path.name) for path in output_files],
        "warnings": warnings,
    }
    destination.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
