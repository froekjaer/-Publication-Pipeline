# Integrated Mission Framework / Collaborative Intelligence presentation

**Status:** Publication prototype. The deck is a derived publication, not a canonical source and not evidence that the integrated system has been empirically validated.

This package turns reviewed repository material and a bounded academic source set into a reusable PowerPoint presentation. It preserves the Publication Pipeline distinction between maintained sources and derived outputs.

## Contents

- `presentation.yml` records audience, source revisions, build inputs and output identity.
- `slides.md` is the maintained slide and speaker-note source.
- `references.yml` records bibliographic identity, source type, verification state and relevance.
- `evidence-register.csv` maps presentation claims to evidence grades and counterarguments.
- `BUILD.md` records the reproducible authoring and validation procedure.
- `preview/montage.png` is a review preview of the 18-slide deck.
- The editable PowerPoint is delivered as the live presentation artifact associated with this package and can be downloaded as `.pptx` from the presentation viewer.

## Evidence labels

- **A — Synthesised evidence:** systematic review or meta-analysis, with scope limits retained.
- **B — Direct study:** peer-reviewed empirical study or substantial field study.
- **C — Conceptual or qualitative:** conceptual framework, theory, interview study or small exploratory study.
- **P — Programme proposition:** a Mission Framework or Collaborative Intelligence proposal that still needs external validation.
- **N — Normative commitment:** a value or governance choice. It cannot be established by empirical evidence alone.

The grade identifies the type and maturity of support for the claim in this presentation. It is not a universal quality score for the cited publication.

## Rebuild

The current prototype is generated with the Codex presentation runtime because the stable Publication Pipeline does not yet implement a presentation builder. All maintained content inputs, layout rules and the validation receipt are included so the editorial transformation can be reviewed and repeated in that runtime. See `BUILD.md`.

A future supported presentation builder should consume the same maintained inputs or migrate them through an explicit transformation contract. Generated files do not become semantic authority.

## Source boundaries

- Mission Framework `main` supplies canonical semantics and governance.
- Collaborative Intelligence `main` supplies the programme research posture.
- Collaborative Intelligence draft PR #14 supplies clearly labelled proposed v2 research material and its advisory critical review.
- Publication Pipeline `main` supplies publication architecture and provenance requirements.
- Academic publications supply comparative evidence, mechanisms and counterarguments.

The deck does not merge, accept or canonise draft PR #14. It presents the proposal as a research candidate.
