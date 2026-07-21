# Publication Output Profiles

**Status:** Foundation Release v1.0

## Purpose

This document defines the minimum conceptual profiles by which one reviewed Markdown source set can produce multiple audience-specific outputs without creating independent semantic authorities.

The maintained source may be one Markdown file or an ordered set of Markdown files declared by a publication manifest. Each output profile selects, orders, compresses and renders that source explicitly.

## Common source contract

Every output must record:

- source repository or repositories
- source commit SHA or immutable release reference
- ordered source files
- publication profile and profile version
- intended audience and purpose
- editorial transformations, exclusions and generated additions
- renderer and relevant tool versions
- build time and responsible approver

A profile may change presentation and emphasis. It may not silently change normative meaning or present generated synthesis as original source text.

## Output matrix

| Output | Primary purpose | Typical transformation | Required checks |
|---|---|---|---|
| Book | Sustained body of knowledge | assemble, sequence, add front matter and references | completeness, navigation, citations, source map |
| Article | Bounded argument for a publication context | select, compress, reframe for audience | claim fidelity, citations, declared new synthesis |
| GitHub Pages | Navigable web publication | generate navigation, landing pages and web links | broken links, source links, accessibility |
| PDF | Stable distribution or archival representation | paginate and style an approved profile | pagination, figures, fonts, metadata, source revision |
| Slides | Presentation-led interpretation | compress, sequence and visualise | omission risk, speaker context, figure provenance |
| Executive summary | Decision-oriented overview | extract purpose, findings, implications, risks and actions | no unsupported certainty, traceability to sections and claims |

## Book profile

A book profile should define:

- title and edition
- chapter order
- included appendices
- citation and bibliography policy
- figure and table handling
- front matter, glossary and index policy
- PDF, print or e-book targets

Book-specific transitions and explanatory text are editorial additions and should be identifiable as such.

## Article profile

An article profile should define:

- target venue or audience
- central proposition
- word or length constraint
- selected source sections
- citation style
- treatment of limitations and competing interpretations
- whether any new analysis is introduced

The article must identify the source baseline and must not imply that omitted qualifications do not exist.

## GitHub Pages profile

A GitHub Pages profile should define:

- site entry point
- navigation hierarchy
- source-to-page mapping
- URL and redirect policy
- treatment of generated indexes and summaries
- links back to canonical repository files and revisions

The web site is a publication surface, not the canonical semantic repository.

## PDF profile

PDF may be generated from a book, article, executive-summary or other approved profile. The PDF profile should define:

- page size and layout
- typography and figure policy
- headers, footers and document metadata
- accessibility requirements
- version and provenance statement
- output validation

Corrections to claims or definitions must return to the maintained Markdown source. A PDF-only semantic correction creates an unacceptable fork.

## Slides profile

A slides profile should define:

- audience, setting and expected duration
- narrative sequence
- selected claims and evidence
- diagrams or generated visuals
- speaker-note requirements
- source references for material assertions
- known omissions caused by compression

Slides should not be treated as self-sufficient evidence merely because they are visually persuasive.

## Executive summary profile

An executive summary is an explicit first-class output, not merely the opening paragraphs of another publication.

It should normally contain:

1. purpose and scope
2. current status or decision context
3. principal findings
4. material evidence and confidence
5. unresolved uncertainty and limitations
6. implications, risks and opportunities
7. recommended actions or decisions
8. links to supporting source sections
9. source revision and publication provenance

The profile must prevent compression from turning qualified findings into categorical claims. Material disagreement and uncertainty must remain visible when they affect decisions.

## One source to multiple outputs

A conforming pipeline should support the following model:

```text
Reviewed Markdown source set
          ↓
Versioned publication manifest
          ├── book profile ─────────────→ Book / book PDF
          ├── article profile ──────────→ Article / article PDF
          ├── pages profile ────────────→ GitHub Pages
          ├── slides profile ───────────→ Slides / presentation PDF
          └── executive profile ────────→ Executive summary / summary PDF
```

Shared passages should be referenced or transformed from the maintained source rather than copied into independently edited branches.

## Profile validation

Before release, each output should be checked for:

- traceability to source commits
- broken references and missing assets
- fidelity of claims and definitions
- visible treatment of uncertainty
- accessibility appropriate to the format
- declared editorial or AI-assisted transformations
- absence of accidental confidential or restricted content
- reproducibility from the recorded manifest and tooling

## Implementation status

These profiles define the required conceptual behaviour. The repository does not yet contain a complete executable toolchain. The first implementation should use one small Mission Framework or Mission Solar Eclipse source set to generate at least GitHub Pages, PDF and an executive summary from a common manifest.
