from __future__ import annotations

import importlib.util
from pathlib import Path

import pytest


MODULE_PATH = Path(__file__).parents[1] / "tools" / "programme_360.py"
SPEC = importlib.util.spec_from_file_location("programme_360", MODULE_PATH)
assert SPEC is not None and SPEC.loader is not None
programme_360 = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(programme_360)


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def manifest(full_name: str, owns: list[str], dependency: str | None = None) -> str:
    dependency_block = ""
    if dependency:
        dependency_block = f"""
dependencies:
  consumes_from:
    - repository: {dependency}
      capability: test capability
"""
    owns_yaml = "\n".join(f"    - {item}" for item in owns) or "    []"
    return f"""schema_version: 1
programme:
  id: collaborative-intelligence
  name: Collaborative Intelligence
repository:
  full_name: {full_name}
  role: test-role
  lifecycle: test
  status: active
  version: 1
purpose:
  summary: Test manifest
ownership:
  owns:
{owns_yaml}
{dependency_block}current:
  baseline: test
  initiative: test
"""


def test_build_generates_catalogue_and_provenance(tmp_path: Path) -> None:
    write(tmp_path / "a.yml", manifest("example/a", ["alpha"]))
    write(tmp_path / "b.yml", manifest("example/b", ["beta"], dependency="example/a"))
    write(
        tmp_path / "sources.yml",
        "title: Test Programme 360\nsources:\n  - manifest: a.yml\n  - manifest: b.yml\n",
    )

    output = tmp_path / "out.md"
    findings = programme_360.build(tmp_path / "sources.yml", output)

    assert findings == []
    text = output.read_text(encoding="utf-8")
    assert "# Test Programme 360" in text
    assert "example/a" in text
    assert "example/b" in text
    assert "## Provenance" in text


def test_duplicate_ownership_is_reported(tmp_path: Path) -> None:
    write(tmp_path / "a.yml", manifest("example/a", ["shared"]))
    write(tmp_path / "b.yml", manifest("example/b", ["shared"]))
    write(
        tmp_path / "sources.yml",
        "sources:\n  - manifest: a.yml\n  - manifest: b.yml\n",
    )

    findings = programme_360.build(tmp_path / "sources.yml", tmp_path / "out.md")

    assert any("canonical ownership conflict" in finding for finding in findings)


def test_missing_dependency_repository_is_reported(tmp_path: Path) -> None:
    write(tmp_path / "a.yml", manifest("example/a", ["alpha"], dependency="example/missing"))
    write(tmp_path / "sources.yml", "sources:\n  - manifest: a.yml\n")

    findings = programme_360.build(tmp_path / "sources.yml", tmp_path / "out.md")

    assert any("absent from catalogue" in finding for finding in findings)


def test_empty_catalogue_fails(tmp_path: Path) -> None:
    write(tmp_path / "sources.yml", "sources: []\n")

    with pytest.raises(programme_360.Programme360Error):
        programme_360.build(tmp_path / "sources.yml", tmp_path / "out.md")
