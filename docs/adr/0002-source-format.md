# ADR-0002: Explicit Markdown manifest and YAML frontmatter

- Status: accepted
- Date: 2026-07-21

## Context

Publication Pipeline identifies reviewed Markdown as the authoritative editable form. A build needs deterministic source selection and basic document metadata.

## Decision

Use `publication.yml` for explicit source selection and YAML frontmatter for document identity, order, title, status, version, audience and language.

## Alternatives

Filesystem discovery alone, a database, or separate metadata files.

## Consequences

The source set is reviewable and portable. The Foundation limits metadata to a small required set and warns about unknown fields rather than freezing a broad ontology.
