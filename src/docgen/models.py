from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ProjectConfig:
    project_id: str
    title: str
    version: str
    language: str
    publication_type: str
    content: tuple[Path, ...]
    html: bool
    pdf: bool


@dataclass(frozen=True)
class SourceDocument:
    path: Path
    document_id: str
    title: str
    order: int
    status: str
    version: str
    audience: str
    language: str
    body: str


@dataclass(frozen=True)
class BuildResult:
    output_dir: Path
    html_path: Path | None
    manifest_path: Path
    warnings: tuple[str, ...]
