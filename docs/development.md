# Development

Use Python 3.11 or later. Dependencies are version-pinned in `pyproject.toml`.

```bash
pip install -e '.[dev]'
ruff check .
pytest
docgen build examples/minimal-mission
```

The implementation intentionally keeps the architecture small:

- `config.py` parses the project contract with `yaml.safe_load`.
- `discovery.py` validates source boundaries and frontmatter.
- `pipeline.py` coordinates assembly, outputs and manifest generation.
- `builders/html.py` renders Markdown and sanitises generated HTML.

Do not add execution hooks, remote fetches, or project-defined shell commands. Those violate the trust boundary for source repositories.
