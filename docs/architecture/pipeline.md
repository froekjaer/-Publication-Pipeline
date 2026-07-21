# Pipeline architecture

```text
publication.yml + local Markdown
          ↓
safe configuration and path validation
          ↓
frontmatter validation and ordered discovery
          ↓
sanitised HTML rendering + local asset copy
          ↓
source-hash manifest
```

The configuration list limits what may be read. Each source document has required frontmatter and is sorted by `order`. The builder receives normalised documents, not arbitrary file access. HTML is sanitised before writing; image paths are validated to remain below the project root. The manifest is written after outputs, so it can record the exact accepted source set.
