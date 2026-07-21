# Editorial Transformation Contract

## Purpose

This contract defines the boundary between authoritative mission source material and derived publication artefacts. It is intentionally reviewable and may become a Framework candidate if validated across missions.

## The generator may

- change presentation and layout;
- number chapters and generate a table of contents or index from existing structure;
- generate references from explicit source references;
- copy local declared assets;
- report validation errors and warnings;
- record provenance, selection and renderer information.

## The generator must never

- change the meaning or rewrite source text;
- add facts, interpretations or certainty;
- hide stated uncertainty, contradiction or limitations;
- execute source-provided code or commands;
- fetch remote content during a build;
- generate AI content without explicit future approval and traceable provenance;
- modify source files.

## Review rule

Any output-specific selection, omission, generated navigation or editorial addition must be visible in configuration, generated output or manifest. A derived artefact never supersedes the source repository's canonical meaning.
