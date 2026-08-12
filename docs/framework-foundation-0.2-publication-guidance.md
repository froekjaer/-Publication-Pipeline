# Mission Framework Foundation 0.2 — Publication Guidance

**Status:** Publication alignment
**Source authority:** Mission Framework / Mission Platform Foundation 0.2

## Purpose

Publication Pipeline must be able to publish the Foundation 0.2 architecture without flattening or weakening its normative meaning. This document records the concepts that output profiles and future builders must preserve when selecting, compressing, visualising or explaining the framework.

## Trust is the primary architectural quality

Foundation 0.2 treats Trust as the primary architectural quality. Security is necessary but not sufficient. Publications describing critical-infrastructure use must preserve the relationship between Trust and Security, Safety, Availability, Reliability, Resilience, Recoverability, Explainability and Evidence.

Availability and Reliability must not be reduced to secondary operational concerns. A security response that unnecessarily destroys an essential service is not a trustworthy outcome.

## Local mission continuity

Publications must preserve the principle that loss of headend, cloud, WAN, DNS, AI or update services does not by itself stop an otherwise autonomous essential local function. Degraded operation, failure containment and recoverability are part of the Trust story.

## Edge trust boundary

The edge is not a transparent remote-control tunnel. It is a local Policy Enforcement Point, Execution Authority, failure-containment boundary, evidence producer and autonomy layer.

The concise formulation is:

> The headend requests; the edge decides and executes.

This distinction must survive editorial compression and diagrams.

## Action Requests

Remote intent should be presented as a signed Action Request rather than an unconditional command. The edge retrieves requests/artifacts, validates identity, authorization, freshness, target and integrity, evaluates local policy and mission state, and only then executes an allowed local action.

A valid signature establishes provenance and integrity; it does not prove that execution is safe or appropriate at that moment.

## Controlled two-way communication

Communication is bidirectional in meaning while preserving the edge boundary. Telemetry, logs, events and evidence flow outward under edge policy. Requests, configuration and signed artifacts flow inward through the controlled edge retrieval/pull mechanism. Publications must not accidentally depict a general-purpose inbound path from headend to the internal mission environment.

## Device Adapters and modularity

Vendor- and device-specific knowledge belongs in modular Device Adapters, not Mission Core. A PLC, camera, industrial PC, radio or other device family can add support for firmware, parameters, telemetry, logging, diagnostics, configuration backup/restore and device-specific verification without changing the core framework.

Adapters remain subordinate to Trust controls and cannot bypass identity, authorization, policy, audit, mission-state or update validation.

This modularity is an important ecosystem property: a device supplier or community contributor can add bounded support for a device family while preserving the common framework contract.

## Unified trusted update model

Updates to edge components and downstream devices use the same trust pattern: signed instruction and artifact, target binding, integrity verification, compatibility/precondition checks, controlled staging/execution, post-update verification, evidence and rollback or known-good recovery where technically possible.

An urgent vulnerability does not automatically imply immediate installation. Mission state, Safety, Availability and Reliability can require deferment, compensating controls or staged rollout.

## Failure semantics

Publications should distinguish at least:

- security/admission failure: fail closed;
- external dependency failure: degrade gracefully and preserve autonomous local mission functions;
- mission- or safety-critical failure: follow an explicitly defined mission-specific failure policy.

Generic restart/quarantine semantics must not be presented as sufficient for critical infrastructure.

## Actuation boundary

Read-only OT observation is the initial safe profile. Physical actuation requires explicit capability, authorization and mission/safety policy. High-consequence actuation requires separately governed contracts and hazard analysis.

## Waterworks example — evidence boundary

The REVIEW-001 waterworks simulation is useful evidence for domain neutrality, payload isolation/failure containment and read-only OT integration. It is not evidence that Mission Platform has been validated as a production waterworks control or safety system.

Publication outputs must preserve this limitation explicitly whenever the example is used.

## Profile-specific guidance

### Slides

Prefer an architecture sequence that visually shows Headend → controlled edge retrieval/validation → local execution → verification/evidence. Avoid arrows that imply direct headend-to-PLC/camera control. Trust, Availability and Reliability should be visible rather than relegated to speaker notes.

### Executive summaries

Explain Trust in mission-consequence terms. Preserve the distinction between signed/authorized and safe-to-execute-now. State the maturity/evidence boundary of examples.

### Books and articles

Retain the rationale for edge authority, local autonomy and modular Device Adapters, not only the resulting component names.

### Diagrams

Treat the edge boundary, direction of connection initiation, policy decision, execution authority and evidence return as semantic content. A visually simpler diagram must not erase those relationships.

## Provenance

Foundation 0.2 publication builds should record the exact source repository and commit/release used. Publication Pipeline remains a derived-output system and does not become semantic authority for Mission Framework concepts.
