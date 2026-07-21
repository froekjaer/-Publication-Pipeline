# ADR-0004: Manifest-backed reproducible builds

- Status: accepted
- Date: 2026-07-21

## Context

Generated outputs must remain traceable to reviewed source material.

## Decision

Generate a JSON manifest with source hashes, selected source order, generator version, output files and warnings. Honour `SOURCE_DATE_EPOCH` when supplied.

## Alternatives

Rely on Git history alone, embed no provenance, or require a central build service.

## Consequences

Builds remain locally inspectable and do not require credentials or external services. Build time is deterministic when `SOURCE_DATE_EPOCH` is set.
