# ADR-0001: Python 3.11 runtime

- Status: accepted
- Date: 2026-07-21

## Context

The repository had no implementation or established runtime. The Foundation needs a portable CLI, controlled dependencies and straightforward CI.

## Decision

Use Python 3.11 or newer with version-pinned dependencies in `pyproject.toml`.

## Alternatives

Node.js, a shell-only toolchain, or a larger static-site framework.

## Consequences

The CLI works on macOS, Linux and GitHub Actions with normal Python tooling. A future renderer may be added behind a builder boundary without changing the source contract.
