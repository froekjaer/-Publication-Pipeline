# ADR-0003: Small builder boundary

- Status: accepted
- Date: 2026-07-21

## Context

The long-term product has multiple output profiles, but implementing them all would obscure whether the source-to-output contract works.

## Decision

Implement a single HTML builder behind an isolated builders package. PDF is not simulated; a request for it fails clearly.

## Alternatives

Build HTML and PDF immediately, adopt a plugin framework, or postpone all code until every profile is specified.

## Consequences

The vertical slice is real and testable while the PDF/toolchain decision remains evidence-led.
