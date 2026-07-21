# Getting started

Documentation Generator builds a local project containing `publication.yml` and ordered Markdown source files.

```bash
python -m venv .venv
. .venv/bin/activate
pip install -e '.[dev]'
docgen build examples/minimal-mission
```

The build writes `dist/index.html` and `dist/build-manifest.json` below the project directory. It never changes source Markdown.

Run all checks with:

```bash
ruff check .
pytest
```

PDF is not enabled in the Foundation Sprint. A project that requests `outputs.pdf: true` exits with a clear error instead of pretending that a PDF was generated.
