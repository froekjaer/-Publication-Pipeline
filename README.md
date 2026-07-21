# Publication Pipeline

**Foundation Release v1.0**

Publication Pipeline defines a reproducible, reviewable method for transforming canonical Markdown source material into books, articles, PDF documents, GitHub Pages and presentations.

It is part of the [Collaborative Intelligence](https://github.com/froekjaer/collaborative-intelligence) research programme and supports publication from [Mission Framework](https://github.com/froekjaer/mission-framework), [Mission Solar Eclipse](https://github.com/froekjaer/mission-solar-eclipse) and future programme repositories.

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

## Relationship to the programme

### [Collaborative Intelligence](https://github.com/froekjaer/collaborative-intelligence)

Provides the research vision, programme architecture and shared principles.

### [Mission Framework](https://github.com/froekjaer/mission-framework)

Provides canonical semantic source material. Publication may reorganise or explain framework content, but must not silently change normative meaning.

### [Mission Solar Eclipse](https://github.com/froekjaer/mission-solar-eclipse)

Provides the first reference mission and practical source material for books, articles, operational documents, public pages and presentations.

## Publication targets

### Book

A book assembles a sustained argument or body of knowledge from multiple reviewed source files. It may include front matter, chapters, appendices, references, figures and indexes.

### Article

An article selects and reframes a bounded proposition for a defined audience and publication context. The article should identify its source revision and distinguish synthesis from new claims.

### PDF

PDF is a stable distribution and archival format generated from an approved source set. Page layout is a presentation concern; semantic corrections should return to the Markdown source rather than being made only in the generated PDF.

### GitHub Pages

GitHub Pages provides navigable web publication directly related to repository content. Web navigation, summaries and landing pages may be generated or curated, but should preserve links to canonical sources.

### Presentations

Presentations are audience-specific interpretations of reviewed source material. They necessarily compress and sequence content. Material omissions, simplifications and newly created diagrams should therefore be reviewable and traceable.

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

## Logical pipeline

```text
1. Discover
   Identify source repositories, revisions and candidate files.

2. Select
   Define the publication manifest and intended audience.

3. Validate source
   Check links, metadata, structure and required provenance.

4. Assemble
   Order source units and apply explicit inclusion rules.

5. Transform
   Resolve cross-references, figures, citations and format-specific structures.

6. Render
   Produce one or more target formats.

7. Validate output
   Check completeness, readability, accessibility and broken references.

8. Record provenance
   Store source revisions, configuration, tool versions and build identity.

9. Release
   Publish immutable or versioned artefacts with a changelog.
```

## Source and generated content

A recommended repository-neutral convention is:

```text
publication/
├── manifest.yml
├── metadata.yml
├── source-map.yml
└── profiles/
    ├── book.yml
    ├── article.yml
    ├── pages.yml
    └── presentation.yml

dist/
├── book/
├── articles/
├── pdf/
├── pages/
└── presentations/
```

This is an initial convention, not a mandatory implementation. Practical use should determine the final schemas and tools.

## Publication manifest

A publication manifest should eventually record at least:

- publication identifier and version
- title, language and audience
- source repositories and commit SHAs
- ordered source files or selection rules
- publication profile and target formats
- editorial transformations
- citation and figure policies
- build tooling and versions
- output checks
- release date and responsible approver

## Review model

The pipeline distinguishes three review layers:

- **semantic review** — whether the source claims and definitions are justified
- **editorial review** — whether selection, structure and explanation serve the intended audience
- **production review** — whether generated outputs are complete, readable and technically correct

A production correction should not conceal a semantic source defect. A semantic correction should be made in the owning source repository and then propagated through a new publication build.

## Foundation scope

Foundation v1.0 defines the publication architecture and cross-repository responsibilities. It does not yet prescribe one toolchain or provide complete build automation.

The next implementation step is a small end-to-end publication profile using reviewed Mission Framework or Mission Solar Eclipse Markdown and producing at least GitHub Pages and PDF with recorded source commit SHAs.

## License

Licensed under the Apache License, Version 2.0.