# Framework Findings

## FF-PUB-001 — Publication provenance needs a portable minimum contract

```yaml
id: FF-PUB-001
title: Publication provenance needs a portable minimum contract
status: proposed
observed_in: publication-pipeline
date: 2026-07-21
```

### Observation

Mission Framework strongly requires evidence, provenance and reviewability. Publication Pipeline could apply those principles directly, but it did not find a compact cross-repository contract for a derived publication to identify its exact source revision, source selection, renderer and editorial transformation.

### Evidence

The Foundation build required a local manifest containing source paths, SHA-256 hashes, generator version and output files. Without it, an HTML file could not be traced to the Markdown inputs that produced it.

### Impact

Different missions may produce visually plausible publications whose relation to canonical Markdown cannot be independently checked.

### Recommendation

Define a reusable, implementation-neutral minimum publication-provenance profile. It should distinguish canonical source identity, selection/ordering, editorial transformation, renderer/build identity, and responsible approval.

### Framework area

Evidence Model; Architecture; Versioning.

### Resolution status

Open. This repository records an implementation finding only; it does not change Mission Framework.

## FF-PUB-002 — Source authority needs a concrete publication boundary

```yaml
id: FF-PUB-002
title: Source authority needs a concrete publication boundary
status: proposed
observed_in: publication-pipeline
date: 2026-07-21
```

### Observation

The principle “no silent semantic authority” becomes operational only when the generator refuses dynamic content, shell hooks and unbounded filesystem paths.

### Evidence

The Foundation implementation needed explicit allowlisting, path-traversal validation and sanitisation to ensure that presentation generation does not accidentally acquire authority or execute unreviewed content.

### Impact

Without this boundary, publication tooling can alter or amplify mission meaning outside normal review.

### Recommendation

Treat the transformation boundary as a reviewable architecture object in future framework guidance.

### Framework area

Architecture; Evidence Model; Trust.

### Resolution status

Open.
