# Reproducible build procedure

## Build boundary

The stable Publication Pipeline at commit `fa07f26` does not implement a PowerPoint builder. This prototype therefore uses the Codex presentation runtime as an isolated publication adapter. It does not add Node.js or a new renderer to the stable Python generator and does not change ADR-0001 through ADR-0004.

## Maintained inputs

1. `presentation.yml` fixes the source repositories, refs, commits, audience and slide count.
2. `slides.md` contains all on-slide copy and speaker-note substance.
3. `references.yml` records bibliographic identity, URL, source type and verification state.
4. `evidence-register.csv` maps each material claim to an evidence grade, basis, sources, counterargument and status.

## Editorial transformation

- Canvas: 16:9, 1280 × 720.
- Typeface: Aptos.
- Minimum body size: 16 pt; normal body copy uses 17–22 pt.
- Palette: navy `#13263D`, cream `#F4F0E7`, paper `#FBF9F4`, orange `#D96C3D`, cyan `#55A7A8`, gold `#D8AE5E`, sage `#A9B7A4`.
- Diagrams and tables remain native editable slide objects.
- Each substantive slide includes an evidence-grade label.
- Full citations and source limitations appear in speaker notes; references occupy slides 17 and 18.
- Draft PR #14 content is always marked as proposed and unmerged.
- No slide may convert a normative commitment into an empirical finding.

## Build sequence

1. Confirm the four pinned repository revisions in `presentation.yml` still identify the intended sources.
2. Parse `slides.md` into 18 ordered slides.
3. Apply the layout system above and preserve the diagram semantics described in slides 4, 8 and 14.
4. Add speaker notes from each slide section and append the corresponding URLs from `references.yml`.
5. Render every slide at 1280 × 720 and inspect it at full size.
6. Repair clipping, low contrast, broken wrapping and misplaced connectors.
7. Export an editable PowerPoint through the presentation viewer.
8. Record the build and checks in `validation.md`.

## Reproducibility statement

The maintained content, evidence decisions, source revisions and visual rules are reproducible. The exported PowerPoint need not be byte-identical across presentation-runtime versions. Material equivalence means the same slide order, claims, evidence labels, speaker-note citations, diagrams and status boundaries.
