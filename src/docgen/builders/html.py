import html
import re
from pathlib import Path

import bleach
import markdown

from ..models import ProjectConfig, SourceDocument

ALLOWED_TAGS = set(bleach.sanitizer.ALLOWED_TAGS).union(
    {
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "pre",
        "code",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "img",
        "hr",
    }
)
ALLOWED_ATTRIBUTES = {"a": ["href", "title"], "img": ["src", "alt", "title"], "*": ["id", "class"]}
STYLES = """
body {
  font-family: system-ui, sans-serif;
  line-height: 1.55;
  max-width: 56rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
nav { border-bottom: 1px solid #ddd; margin-bottom: 2rem; }
pre { overflow: auto; padding: 1rem; background: #f5f5f5; }
table { border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: .4rem; }
img { max-width: 100%; height: auto; }
"""


def _anchor(document: SourceDocument) -> str:
    return re.sub(r"[^a-z0-9-]+", "-", document.document_id.lower()).strip("-")


def _rewrite_relative_images(body: str, document: SourceDocument) -> str:
    prefix = document.path.parent.as_posix()

    def replace(match: re.Match[str]) -> str:
        target = match.group(2)
        if target.startswith(("https://", "http://", "#", "data:")):
            return match.group(1) + target
        return match.group(1) + f"{prefix}/{target}"

    return re.sub(r"(!\[[^]]*\]\()([^\s)]+)", replace, body)


def build_html(config: ProjectConfig, documents: list[SourceDocument], destination: Path) -> None:
    rendered_sections = []
    navigation = []
    for document in documents:
        anchor = _anchor(document)
        navigation.append(
            f'<li><a href="#{html.escape(anchor)}">{html.escape(document.title)}</a></li>'
        )
        rendered = markdown.markdown(
            _rewrite_relative_images(document.body, document),
            extensions=["tables", "fenced_code", "toc"],
        )
        clean = bleach.clean(rendered, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES, strip=True)
        rendered_sections.append(f'<section id="{html.escape(anchor)}">{clean}</section>')
    page = f"""<!doctype html>
<html lang="{html.escape(config.language)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="generator" content="mission-docgen 0.1.0">
  <title>{html.escape(config.title)}</title>
  <style>{STYLES}</style>
</head>
<body>
  <header><h1>{html.escape(config.title)}</h1><p>Version {html.escape(config.version)}</p></header>
  <nav aria-label="Publication contents"><ol>{"".join(navigation)}</ol></nav>
  <main>{"".join(rendered_sections)}</main>
</body>
</html>"""
    destination.write_text(page, encoding="utf-8")
