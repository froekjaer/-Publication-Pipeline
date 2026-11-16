# Version 2 bilingual presentation package

**Status:** Review candidate. Derived publication; not a canonical source and not evidence that the integrated system is empirically validated.

## Deliverables

- English and Danish PowerPoint presentations with speaker notes.
- English and Danish evidence briefs in editable Word format.
- A shared bilingual claim-level evidence map.
- Reproducible presentation and document build sources.

The package uses one architecture and one evidence map in both languages. Translation does not create a second semantic authority.

## Epistemic boundary

Every substantive element is treated as one of three layers:

1. **Finding:** what a source directly studied and reported, including scope limits.
2. **Synthesis:** a bounded programme interpretation across sources.
3. **Choice:** a normative or architectural decision requiring accountable human authority.

Evidence grades A, B, C, P and N retain the definitions used by the parent presentation package. A grade routes attention; it is not a universal quality score for a publication.

## Rebuild

The presentation builder imports the reviewed visual edition, applies the Version 2 identity, creates the Danish edition and verifies both exports by re-importing them. The document builder consumes `evidence-map.yml` and produces the two evidence briefs.

Generated files remain downstream of Mission Framework, Collaborative Intelligence and Publication Pipeline authority.
