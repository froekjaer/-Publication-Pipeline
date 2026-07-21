# Configuration

Every build project has a `publication.yml` file:

```yaml
project:
  id: minimal-mission
  title: Minimal Mission Handbook
  version: 0.1.0
  language: en
  type: mission-handbook
content:
  - docs/introduction.md
  - docs/objectives.md
outputs:
  html: true
  pdf: false
```

`content` is an allowlist and is the source selection boundary. Files must be Markdown and remain inside the project root. The generator then orders them by their required frontmatter `order` field.

Required frontmatter fields are `id`, `title`, `order`, `status`, `version`, `audience`, and `language`. Extra fields are retained by the source file but reported as build warnings in this release.

Relative image files must stay inside the project root. Remote content is not fetched.
