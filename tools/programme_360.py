#!/usr/bin/env python3
"""Generate a deterministic Markdown Programme 360 report from local manifests."""

from __future__ import annotations

import argparse
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

import yaml

SUPPORTED_SCHEMA_VERSIONS = {1}
REQUIRED_REPOSITORY_FIELDS = {"full_name", "role", "lifecycle", "status", "version"}


class Programme360Error(Exception):
    """Raised for invalid catalogue or manifest input."""


def load_yaml(path: Path) -> dict[str, Any]:
    try:
        raw = path.read_text(encoding="utf-8")
    except OSError as error:
        raise Programme360Error(f"cannot read {path}: {error}") from error
    try:
        value = yaml.safe_load(raw)
    except yaml.YAMLError as error:
        raise Programme360Error(f"invalid YAML in {path}: {error}") from error
    if not isinstance(value, dict):
        raise Programme360Error(f"expected a mapping in {path}")
    return value


def resolve_path(catalogue_path: Path, configured_path: str) -> Path:
    path = Path(configured_path)
    if not path.is_absolute():
        path = catalogue_path.parent / path
    return path.resolve()


def validate_manifest(path: Path, manifest: dict[str, Any]) -> list[str]:
    findings: list[str] = []
    schema_version = manifest.get("schema_version")
    if schema_version not in SUPPORTED_SCHEMA_VERSIONS:
        findings.append(
            f"{path}: unsupported schema_version {schema_version!r}; "
            f"supported: {sorted(SUPPORTED_SCHEMA_VERSIONS)}"
        )

    repository = manifest.get("repository")
    if not isinstance(repository, dict):
        findings.append(f"{path}: missing repository mapping")
        return findings

    missing = sorted(REQUIRED_REPOSITORY_FIELDS - repository.keys())
    if missing:
        findings.append(f"{path}: repository is missing {', '.join(missing)}")

    ownership = manifest.get("ownership", {})
    if not isinstance(ownership, dict):
        findings.append(f"{path}: ownership must be a mapping")
    elif not isinstance(ownership.get("owns", []), list):
        findings.append(f"{path}: ownership.owns must be a list")

    dependencies = manifest.get("dependencies", {})
    if not isinstance(dependencies, dict):
        findings.append(f"{path}: dependencies must be a mapping")

    role = repository.get("role")
    reference = manifest.get("reference")
    if role in {"reference-mission", "brownfield-source"}:
        if not isinstance(reference, dict) or reference.get("type") not in {
            "greenfield",
            "brownfield-source",
            "brownfield-target",
        }:
            findings.append(
                f"{path}: role {role!r} requires reference.type to declare "
                "greenfield or brownfield status"
            )

    current = manifest.get("current", {})
    if not isinstance(current, dict):
        findings.append(f"{path}: current must be a mapping")
    else:
        if not current.get("baseline"):
            findings.append(f"{path}: current.baseline is missing")
        if not current.get("initiative"):
            findings.append(f"{path}: current.initiative is missing")

    return findings


def dependency_entries(manifest: dict[str, Any]) -> list[dict[str, Any]]:
    dependencies = manifest.get("dependencies", {})
    if not isinstance(dependencies, dict):
        return []
    entries: list[dict[str, Any]] = []
    for direction in ("provides_to", "consumes_from"):
        values = dependencies.get(direction, [])
        if isinstance(values, list):
            for value in values:
                if isinstance(value, dict):
                    entries.append({"direction": direction, **value})
    return entries


def markdown_escape(value: Any) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ")


def generate_report(
    catalogue_path: Path,
    catalogue: dict[str, Any],
    manifests: list[tuple[Path, dict[str, Any]]],
    findings: list[str],
) -> str:
    repositories = [manifest["repository"] for _, manifest in manifests]
    declared_names = {repo.get("full_name") for repo in repositories}

    ownership: dict[str, list[str]] = defaultdict(list)
    for _, manifest in manifests:
        full_name = manifest["repository"].get("full_name", "unknown")
        owns = manifest.get("ownership", {}).get("owns", [])
        if isinstance(owns, list):
            for concern in owns:
                ownership[str(concern)].append(str(full_name))

    for concern, owners in sorted(ownership.items()):
        if len(owners) > 1:
            findings.append(
                f"canonical ownership conflict for {concern!r}: {', '.join(sorted(owners))}"
            )

    for _, manifest in manifests:
        source_name = manifest["repository"].get("full_name", "unknown")
        for dependency in dependency_entries(manifest):
            target = dependency.get("repository")
            if target and target not in declared_names:
                findings.append(
                    f"{source_name}: dependency references repository absent from catalogue: {target}"
                )

    title = catalogue.get("title", "Collaborative Intelligence Programme 360")
    lines = [
        f"# {title}",
        "",
        "> Generated from reviewed repository manifests. Generated output is derived and "
        "does not replace owning repositories.",
        "",
        "## Programme map",
        "",
        "```text",
        "Collaborative Intelligence",
        "├── Mission Framework — canonical semantics and governance",
        "├── Mission Platform — reusable implementation",
        "├── Mission Solar Eclipse — greenfield reference implementation",
        "├── TimeLapse Pro → Mission Timelapse — brownfield transformation",
        "└── Publication Pipeline — reproducible generation and publication",
        "```",
        "",
        "## Repository catalogue",
        "",
        "| Repository | Role | Lifecycle | Status | Version | Current initiative |",
        "|---|---|---|---|---|---|",
    ]

    for _, manifest in sorted(
        manifests, key=lambda item: str(item[1]["repository"].get("full_name", ""))
    ):
        repository = manifest["repository"]
        current = manifest.get("current", {})
        lines.append(
            "| {full_name} | {role} | {lifecycle} | {status} | {version} | {initiative} |".format(
                full_name=markdown_escape(repository.get("full_name", "")),
                role=markdown_escape(repository.get("role", "")),
                lifecycle=markdown_escape(repository.get("lifecycle", "")),
                status=markdown_escape(repository.get("status", "")),
                version=markdown_escape(repository.get("version", "")),
                initiative=markdown_escape(current.get("initiative", "")),
            )
        )

    lines.extend(
        [
            "",
            "## Validation strategy",
            "",
            "| Type | Repository or path | Purpose |",
            "|---|---|---|",
        ]
    )
    for _, manifest in manifests:
        reference = manifest.get("reference")
        if not isinstance(reference, dict):
            continue
        reference_type = reference.get("type")
        if reference_type:
            lines.append(
                "| {type} | {repo} | {purpose} |".format(
                    type=markdown_escape(reference_type),
                    repo=markdown_escape(manifest["repository"].get("full_name", "")),
                    purpose=markdown_escape(reference.get("purpose", "")),
                )
            )

    lines.extend(
        [
            "",
            "## Canonical ownership",
            "",
            "| Concern | Declared owner |",
            "|---|---|",
        ]
    )
    for concern, owners in sorted(ownership.items()):
        lines.append(
            f"| {markdown_escape(concern)} | {markdown_escape(', '.join(sorted(owners)))} |"
        )

    lines.extend(["", "## Dependencies", ""])
    dependency_count = 0
    for _, manifest in manifests:
        source = manifest["repository"].get("full_name", "unknown")
        for dependency in dependency_entries(manifest):
            dependency_count += 1
            arrow = "provides to" if dependency["direction"] == "provides_to" else "consumes from"
            lines.append(
                f"- `{source}` {arrow} `{dependency.get('repository', 'unknown')}`: "
                f"{dependency.get('capability', 'unspecified capability')}"
            )
    if dependency_count == 0:
        lines.append("- No dependencies declared.")

    lines.extend(["", "## Consistency findings", ""])
    if findings:
        for finding in sorted(set(findings)):
            lines.append(f"- {finding}")
    else:
        lines.append("- No manifest-level discrepancies detected.")

    lines.extend(
        [
            "",
            "## Provenance",
            "",
            f"- Catalogue: `{catalogue_path}`",
            "- Source manifests:",
        ]
    )
    for path, manifest in sorted(manifests, key=lambda item: str(item[0])):
        full_name = manifest.get("repository", {}).get("full_name", "unknown")
        lines.append(f"  - `{full_name}` from `{path}`")

    return "\n".join(lines) + "\n"


def build(catalogue_path: Path, output_path: Path) -> list[str]:
    catalogue = load_yaml(catalogue_path)
    sources = catalogue.get("sources")
    if not isinstance(sources, list) or not sources:
        raise Programme360Error("catalogue must contain a non-empty sources list")

    manifests: list[tuple[Path, dict[str, Any]]] = []
    findings: list[str] = []
    seen_repositories: set[str] = set()

    for source in sources:
        if not isinstance(source, dict) or not isinstance(source.get("manifest"), str):
            findings.append("catalogue source entry must contain a manifest path")
            continue
        path = resolve_path(catalogue_path, source["manifest"])
        manifest = load_yaml(path)
        findings.extend(validate_manifest(path, manifest))
        repository = manifest.get("repository")
        if not isinstance(repository, dict):
            continue
        full_name = repository.get("full_name")
        if full_name in seen_repositories:
            findings.append(f"duplicate repository in catalogue: {full_name}")
        elif isinstance(full_name, str):
            seen_repositories.add(full_name)
        manifests.append((path, manifest))

    if not manifests:
        raise Programme360Error("no valid manifests were loaded")

    report = generate_report(catalogue_path.resolve(), catalogue, manifests, findings)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(report, encoding="utf-8")
    return findings


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("catalogue", type=Path, help="YAML catalogue containing manifest paths")
    parser.add_argument("--output", type=Path, required=True, help="Markdown output path")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    try:
        findings = build(args.catalogue, args.output)
    except Programme360Error as error:
        print(f"programme-360: error: {error}", file=sys.stderr)
        return 2
    print(f"Generated {args.output}")
    if findings:
        print(f"Reported {len(set(findings))} manifest-level finding(s)", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
