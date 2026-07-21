import json
import shutil
from pathlib import Path

import pytest

from docgen.config import load_config
from docgen.errors import DocgenError
from docgen.pipeline import build

EXAMPLE = Path(__file__).parents[1] / "examples" / "minimal-mission"


def copy_example(tmp_path: Path) -> Path:
    target = tmp_path / "minimal-mission"
    shutil.copytree(EXAMPLE, target)
    return target


def test_loads_project_config() -> None:
    config = load_config(EXAMPLE)
    assert config.project_id == "minimal-mission"
    assert config.html is True
    assert config.pdf is False


def test_builds_complete_example(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    result = build(project)
    assert result.html_path and result.html_path.is_file()
    html = result.html_path.read_text(encoding="utf-8")
    assert "Introduction" in html
    assert "Objectives" in html
    assert "Risks" in html
    assert (result.output_dir / "docs" / "assets" / "mission-flow.svg").is_file()
    manifest = json.loads(result.manifest_path.read_text(encoding="utf-8"))
    assert [source["id"] for source in manifest["sources"]] == [
        "introduction",
        "objectives",
        "risks",
    ]


def test_missing_configuration_has_clear_error(tmp_path: Path) -> None:
    with pytest.raises(DocgenError, match="Missing project configuration"):
        build(tmp_path)


def test_invalid_yaml_has_clear_error(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    (project / "publication.yml").write_text("project: [", encoding="utf-8")
    with pytest.raises(DocgenError, match="Invalid YAML"):
        build(project)


def test_missing_source_file_fails(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    (project / "docs" / "risks.md").unlink()
    with pytest.raises(DocgenError, match="Source file not found"):
        build(project)


def test_duplicate_document_ids_fail(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    path = project / "docs" / "risks.md"
    path.write_text(
        path.read_text(encoding="utf-8").replace("id: risks", "id: objectives"), encoding="utf-8"
    )
    with pytest.raises(DocgenError, match="Duplicate document id"):
        build(project)


def test_invalid_output_type_fails(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    config = project / "publication.yml"
    config.write_text(
        config.read_text(encoding="utf-8").replace("html: true", "html: maybe"), encoding="utf-8"
    )
    with pytest.raises(DocgenError, match="outputs.html"):
        build(project)


def test_image_path_traversal_fails(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    path = project / "docs" / "introduction.md"
    path.write_text(
        path.read_text(encoding="utf-8").replace("assets/mission-flow.svg", "../../outside.svg"),
        encoding="utf-8",
    )
    with pytest.raises(DocgenError, match="Image path escapes project root"):
        build(project)


def test_raw_script_is_not_emitted(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    path = project / "docs" / "risks.md"
    path.write_text(
        path.read_text(encoding="utf-8") + "\n<script>alert('untrusted')</script>\n",
        encoding="utf-8",
    )
    result = build(project)
    assert result.html_path
    assert "<script>" not in result.html_path.read_text(encoding="utf-8")


def test_pdf_is_explicitly_unavailable(tmp_path: Path) -> None:
    project = copy_example(tmp_path)
    config = project / "publication.yml"
    config.write_text(
        config.read_text(encoding="utf-8").replace("pdf: false", "pdf: true"), encoding="utf-8"
    )
    with pytest.raises(DocgenError, match="PDF output is not available"):
        build(project)
