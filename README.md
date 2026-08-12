# Publication Pipeline

**Foundation Release v1.1 · Mission Framework Foundation 0.2 alignment**

Publication Pipeline defines a reproducible, reviewable method for transforming canonical Markdown source material into books, articles, PDF documents, GitHub Pages and presentations.

It is part of the [Collaborative Intelligence](https://github.com/froekjaer/collaborative-intelligence) research programme and supports publication from [Mission Framework](https://github.com/froekjaer/mission-framework), [Mission Platform](https://github.com/froekjaer/Mission-Platform), [Mission Solar Eclipse](https://github.com/froekjaer/mission-solar-eclipse) and future programme repositories.

The current GitHub repository slug is `froekjaer/-Publication-Pipeline`; the project name is **Publication Pipeline**.

## Purpose

The pipeline addresses a recurring research and engineering problem: a body of knowledge should be maintained in a form that is easy to review and revise, while also being publishable in formats suited to different audiences.

Markdown is treated as the preferred editable source format. Publication formats are derived artefacts.

```text
Reviewed Markdown sources
          ↓
Selection and assembly
          ↓
Editorial transformation
          ↓
Validation and provenance
          ↓
Book · Article · PDF · GitHub Pages · Presentation
```

The pipeline must make transformations explicit enough that a reader can determine which source material produced a publication and which editorial choices altered its presentation.

## Foundation 0.2 alignment

Publication Pipeline v1.1 adds explicit guidance for publishing Mission Framework / Mission Platform Foundation 0.2 without weakening its architecture through editorial compression.

In particular, derived outputs must preserve material distinctions around:

- **Trust** as the primary architectural quality;
- **Availability and Reliability** as first-class critical-infrastructure concerns;
- **local mission continuity** when external dependencies fail;
- the edge as **Policy Enforcement Point and Execution Authority**;
- signed **Action Requests** rather than transparent remote commands;
- controlled two-way semantics across the edge boundary;
- modular **Device Adapters** for PLCs, cameras, PCs and other device families;
- the unified trusted-update pattern for edge and downstream devices;
- the distinction between cryptographically valid and safe-to-execute-now;
- explicit evidence/maturity limits for examples such as the REVIEW-001 waterworks simulation.

See [Foundation 0.2 Publication Guidance](docs/framework-foundation-0.2-publication-guidance.md) and [Output Profiles](OUTPUT_PROFILES.md).

## Relationship to the programme

### Collaborative Intelligence
Provides the research vision, programme architecture and shared principles.

### Mission Framework / Mission Platform
Provide canonical semantic and architectural source material. Publication may reorganise or explain framework content, but must not silently change normative meaning. Publication Pipeline is not semantic authority.

### Mission Solar Eclipse
Provides the first reference mission and practical source material for books, articles, operational documents, public pages and presentations.

## Architectural principles

1. **Source before output** — reviewed Markdown is the maintained source; generated files are reproducible outputs.
2. **Semantics before layout** — visual design must not alter canonical meaning.
3. **One source, multiple products** — shared content should be reused rather than copied into diverging publication branches.
4. **Explicit transformation** — selection, ordering, filtering and rendering rules should be recorded.
5. **Traceable provenance** — publications should identify source repository, revision and build context.
6. **Reproducibility** — equivalent inputs and configuration should produce materially equivalent outputs.
7. **Review before release** — source validity and publication quality are separate review concerns.
8. **Accessible outputs** — publication formats should support their intended audiences and reasonable accessibility requirements.
9. **Replaceable tooling** — the architecture should not depend conceptually on a single renderer or vendor.
10. **No silent semantic authority** — a generated publication does not supersede its canonical source.
11. **Architecture-semantic fidelity** — diagrams and compressed outputs must preserve material boundaries, directions, authorities and failure semantics.
12. **Mission-consequence fidelity** — Trust must not be reduced to security when Availability, Reliability, Safety or local autonomy are material to the source claim.

## Logical pipeline

```text
1. Discover
2. Select
3. Validate source
4. Assemble
5. Transform
6. Render
7. Validate output
8. Record provenance
9. Release
```

## Review model

The pipeline distinguishes three review layers:

- **semantic review** — whether source claims and definitions are justified;
- **editorial review** — whether selection, structure and explanation serve the intended audience without changing material meaning;
- **production review** — whether generated outputs are complete, readable and technically correct.

For architecture-heavy material, editorial and production review also verify that diagrams have not changed trust boundaries, execution authority, communication semantics or evidence limitations.

## Implementation status

Foundation v1.1 retains the tested Documentation Generator implementation from v1.0 and extends the publication contract/guidance for Foundation 0.2. The executable generator currently builds a local Markdown publication project into sanitised HTML and a provenance manifest. PDF, slides and richer executive-summary builders remain future implementation work and must conform to the output profiles when added.

## Quick start

Requires Python 3.11 or newer.

```bash
python -m venv .venv
. .venv/bin/activate
pip install -e '.[dev]'
docgen build examples/minimal-mission
pytest
ruff check .
```

Read [Getting started](docs/getting-started.md), [system context](docs/architecture/system-context.md), [Output Profiles](OUTPUT_PROFILES.md), and [Foundation 0.2 Publication Guidance](docs/framework-foundation-0.2-publication-guidance.md).

## License

Licensed under the Apache License, Version 2.0.
