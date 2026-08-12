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

## FF-PUB-003 — Architecture diagrams carry normative semantics

```yaml
id: FF-PUB-003
title: Architecture diagrams carry normative semantics
status: proposed
observed_in: publication-pipeline
date: 2026-08-12
source_baseline: Mission Framework Foundation 0.2
```

### Observation
Foundation 0.2 makes distinctions that can be destroyed by visual simplification: Action Request versus command, headend versus local Execution Authority, controlled edge retrieval versus transparent inbound access, and signed/authorized versus safe-to-execute-now.

### Evidence
A simplified arrow drawn directly from headend to PLC can contradict the architecture even if the surrounding prose is correct.

### Impact
A presentation or executive diagram could communicate a materially different security, Availability and control model from the canonical source while appearing faithful.

### Recommendation
Treat selected architecture relationships and arrow semantics as publication invariants. Profiles should be able to declare relationships that must survive compression and visualisation.

### Framework area
Trust; Architecture; Evidence Model; Publication.

### Resolution status
Open. Publication Pipeline guidance now preserves these semantics, but a machine-readable invariant contract is future work.

## FF-PUB-004 — Trust requires mission-consequence-aware compression

```yaml
id: FF-PUB-004
title: Trust requires mission-consequence-aware compression
status: proposed
observed_in: publication-pipeline
date: 2026-08-12
source_baseline: Mission Framework Foundation 0.2
```

### Observation
Security-only summaries can misrepresent Foundation 0.2 because Trust explicitly includes Availability, Reliability, Safety, Resilience and Recoverability according to mission consequence.

### Evidence
For critical infrastructure, an apparently strong security response can still be untrustworthy if it unnecessarily interrupts an essential service. Likewise, a cryptographically valid firmware update is not automatically safe to execute immediately.

### Impact
Executive summaries and slides are particularly likely to compress away the conditions that make a control trustworthy in operational reality.

### Recommendation
Add mission-consequence fidelity to publication validation. When source material makes Availability, Reliability, Safety or local autonomy material to a claim, output profiles should not omit them without an explicit declared omission.

### Framework area
Trust; Availability; Reliability; Safety; Publication.

### Resolution status
Open. Added to Foundation 0.2 publication guidance and output-profile validation.
