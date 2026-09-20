# Programme 360 Generator

## Purpose

Programme 360 produces a reproducible cross-repository map and current-state report for the Collaborative Intelligence programme.

The generator distinguishes three things that must not be collapsed:

1. **Declared state** — reviewed metadata supplied by each owning repository.
2. **Observed state** — repository evidence collected from pinned revisions or other configured sources.
3. **Disposition** — accountable decisions made by people through the owning repositories.

The generator may report discrepancies. It must not silently resolve them or infer authority from persuasive prose.

## Initial scope

The first implementation supports a local, deterministic build from a source catalogue and checked-out repository manifests. Network collection is deliberately deferred.

Inputs:

- a catalogue file identifying repositories and local manifest paths;
- one `programme.yml` in each participating repository;
- optional pinned revision and observation metadata.

Outputs:

- Markdown programme map;
- repository catalogue;
- ownership map;
- greenfield/brownfield validation matrix;
- dependency summary;
- consistency findings;
- provenance block identifying source files.

## Initial repositories

- `froekjaer/collaborative-intelligence`
- `froekjaer/mission-framework`
- `froekjaer/Mission-Platform`
- `froekjaer/mission-solar-eclipse`
- `froekjaer/timelapse-pro`
- `froekjaer/-Publication-Pipeline`

## Manifest principles

A repository manifest is a declaration by that repository. It is not automatically true merely because it is machine-readable. Review and repository governance remain authoritative.

The initial schema records:

- programme and repository identity;
- role, lifecycle, status and version;
- summary of purpose;
- owned and explicitly non-owned concerns;
- provided and consumed capabilities;
- current baseline and initiative;
- publication sources;
- reference implementation type where applicable.

## Consistency checks

The first generator checks:

- missing required manifest fields;
- duplicate repository identifiers;
- duplicate canonical ownership declarations;
- dependencies on repositories absent from the catalogue;
- greenfield or brownfield reference roles without a declared type;
- missing current baseline or status document;
- manifests using unsupported schema versions.

Future observed-state adapters may check:

- README version against declared version;
- default branch and pinned commit;
- stale roadmap links;
- open release candidates and superseded pull requests;
- build and validation status;
- referenced files and repositories;
- publication provenance.

## Safety boundary

Programme 360 is read-only with respect to source repositories. It generates derived artefacts and findings. It does not:

- edit source manifests automatically;
- merge or close pull requests;
- decide canonical ownership;
- convert an AI inference into declared state;
- treat generated publication as semantic authority.

## Command

The prototype is invoked from the Publication Pipeline repository:

```bash
python tools/programme_360.py \
  examples/programme-360/sources.yml \
  --output dist/programme-360.md
```

The catalogue may use absolute paths or paths relative to the catalogue file.

## Evolution path

1. Validate local manifests and generate Markdown.
2. Add deterministic tests and example fixtures.
3. Add JSON Schema or equivalent strict validation.
4. Integrate as a `docgen programme-360` command.
5. Add optional GitHub collection using pinned revisions.
6. Render through existing HTML and future PDF profiles.
7. Publish drift reports through CI without modifying owning repositories.
