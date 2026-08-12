# Publication Output Profiles

**Status:** Foundation Release v1.1 — aligned with Mission Framework Foundation 0.2

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

For Mission Framework Foundation 0.2 material, compression must preserve Trust as the primary architectural quality and must not erase material Availability, Reliability, Safety, local-autonomy, edge-authority or evidence constraints.

## Output matrix

| Output | Primary purpose | Typical transformation | Required checks |
|---|---|---|---|
| Book | Sustained body of knowledge | assemble, sequence, add front matter and references | completeness, navigation, citations, source map |
| Article | Bounded argument for a publication context | select, compress, reframe for audience | claim fidelity, citations, declared new synthesis |
| GitHub Pages | Navigable web publication | generate navigation, landing pages and web links | broken links, source links, accessibility |
| PDF | Stable distribution or archival representation | paginate and style an approved profile | pagination, figures, fonts, metadata, source revision |
| Slides | Presentation-led interpretation | compress, sequence and visualise | omission risk, speaker context, figure provenance, architecture-semantic fidelity |
| Executive summary | Decision-oriented overview | extract purpose, findings, implications, risks and actions | no unsupported certainty, traceability to sections and claims, mission-consequence fidelity |

## Book profile

A book profile should define title and edition, chapter order, included appendices, citation/bibliography policy, figure/table handling, front matter/glossary/index policy, and PDF/print/e-book targets. Book-specific transitions and explanatory text are editorial additions and should be identifiable as such.

## Article profile

An article profile should define target venue/audience, central proposition, length constraint, selected source sections, citation style, treatment of limitations/competing interpretations, and whether new analysis is introduced. The article must identify the source baseline and must not imply that omitted qualifications do not exist.

## GitHub Pages profile

A GitHub Pages profile should define site entry point, navigation hierarchy, source-to-page mapping, URL/redirect policy, treatment of generated indexes/summaries, and links back to canonical repository files and revisions. The web site is a publication surface, not the canonical semantic repository.

## PDF profile

PDF may be generated from a book, article, executive-summary or other approved profile. The PDF profile should define page size/layout, typography/figure policy, headers/footers/metadata, accessibility requirements, version/provenance statement and output validation. Corrections to claims or definitions must return to maintained Markdown source.

## Slides profile

A slides profile should define:

- audience, setting and expected duration;
- narrative sequence;
- selected claims and evidence;
- diagrams or generated visuals;
- speaker-note requirements;
- source references for material assertions;
- known omissions caused by compression;
- semantic relationships that diagrams must preserve.

For Foundation 0.2 architecture, slides and diagrams must not accidentally turn Action Requests into direct remote commands or depict the headend as having a transparent control path to internal devices. Where relevant they should preserve the edge as Policy Enforcement Point and Execution Authority, local mission continuity, and the role of Availability/Reliability in Trust.

Slides should not be treated as self-sufficient evidence merely because they are visually persuasive.

## Executive summary profile

An executive summary is an explicit first-class output, not merely the opening paragraphs of another publication. It should normally contain purpose/scope, status/decision context, principal findings, material evidence/confidence, unresolved uncertainty/limitations, implications/risks/opportunities, recommended actions/decisions, links to supporting source sections, and source revision/provenance.

For critical-infrastructure material, mission consequence must survive compression. A valid security control must not be presented as automatically trustworthy if it can unnecessarily damage Availability, Reliability or Safety.

## One source to multiple outputs

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

- traceability to source commits;
- broken references and missing assets;
- fidelity of claims, definitions and material architecture relationships;
- visible treatment of uncertainty and evidence boundaries;
- accessibility appropriate to the format;
- declared editorial or AI-assisted transformations;
- absence of accidental confidential or restricted content;
- reproducibility from the recorded manifest and tooling;
- for Foundation 0.2: preservation of Trust, Availability/Reliability, local autonomy, edge execution authority and controlled Action Request semantics when material to the selected source.

## Foundation 0.2 guidance

See [Mission Framework Foundation 0.2 — Publication Guidance](docs/framework-foundation-0.2-publication-guidance.md).

## Implementation status

These profiles define required conceptual behaviour. The executable Documentation Generator currently implements a smaller HTML/provenance subset. Future builders for slides, PDF and executive summaries should enforce these profile requirements rather than treating them as visual-only transformations.
