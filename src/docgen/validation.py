import re
from pathlib import Path

from .errors import DocgenError
from .models import SourceDocument

LINK = re.compile(r"(?<!!)\[[^]]+\]\(([^)\s]+)(?:\s+[^)]*)?\)")
HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*#*\s*$", re.MULTILINE)


def _slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def _anchors(document: SourceDocument) -> set[str]:
    return {document.document_id, *(_slug(heading) for heading in HEADING.findall(document.body))}


def _relative_target(source: Path, target: str) -> Path:
    target_path = source if not target else source.parent / target
    return Path(*[part for part in target_path.parts if part not in (".", "")])


def validate_links(project_root: Path, documents: list[SourceDocument]) -> list[str]:
    by_path = {document.path: document for document in documents}
    anchors = {document.path: _anchors(document) for document in documents}
    all_anchors = set().union(*anchors.values())
    warnings: list[str] = []
    for document in documents:
        for target in LINK.findall(document.body):
            if target.startswith(("https://", "http://", "mailto:")):
                warnings.append(f"{document.path}: external link not fetched: {target}")
                continue
            raw_path, _, anchor = target.partition("#")
            target_path = _relative_target(document.path, raw_path)
            resolved = (project_root / target_path).resolve()
            try:
                resolved.relative_to(project_root.resolve())
            except ValueError as error:
                raise DocgenError(
                    f"Link path escapes project root in {document.path}: {target}"
                ) from error
            if raw_path and not resolved.is_file():
                raise DocgenError(f"Linked file not found in {document.path}: {target}")
            if anchor:
                linked_document = by_path.get(target_path) if raw_path else None
                if linked_document and _slug(anchor) not in anchors[linked_document.path]:
                    raise DocgenError(f"Anchor not found in {document.path}: {target}")
                if not linked_document and not raw_path and _slug(anchor) not in all_anchors:
                    raise DocgenError(f"Anchor not found in {document.path}: {target}")
    return warnings
