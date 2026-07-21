# System context

## Purpose and role

Documentation Generator is the executable part of Publication Pipeline. It turns one reviewed, Markdown-based project into derived documentation products while preserving source authority and build provenance. Publication Pipeline is a supporting implementation in the Collaborative Intelligence programme; it does not own Mission Framework semantics or mission evidence.

## Inputs and outputs

Inputs are a local project root, `publication.yml`, an explicit allowlist of Markdown source files, YAML frontmatter, and local image assets. The Foundation Sprint output is sanitised `dist/index.html` plus `dist/build-manifest.json`. The manifest records source paths and SHA-256 hashes.

## Boundaries and dependencies

The generator reads only files below the supplied project root. It does not execute Markdown, project configuration, shell commands, remote content, or AI runtimes. It uses Python 3.11, PyYAML safe loading, Python-Markdown and Bleach. Mission repositories remain external suppliers of canonical source material; their Markdown is never edited by a build.

Mission Framework supplies the principles of source authority, traceability, explicit transformation and reviewability. Mission Solar Eclipse can later provide a project root without changing generator core code, provided it follows the local project contract.

## Deliberately excluded

This version does not include a database, web server, plugin marketplace, knowledge graph, AI generation, remote repository discovery, citation engine, slide builder, or PDF renderer. PDF remains an explicit error when requested until a controlled builder is selected and tested across supported environments.
