# PDF evaluation — Sprint 2

## Decision

Keep HTML as the only implemented output in Sprint 2. Do not introduce a PDF builder yet.

## Evidence

- [Pandoc's official installation guidance](https://pandoc.org/installing.html) identifies a separate PDF engine and, by default, LaTeX; its official Docker image can provide a controlled Pandoc/LaTeX environment.
- [Pandoc's guide](https://pandoc.org/getting-started.html) confirms that PDF output requires a LaTeX installation by default.
- [Playwright's official documentation](https://playwright.dev/python/docs/library) requires downloading browser binaries, adding a large browser-runtime dependency to this small CLI.
- WeasyPrint is a credible HTML/CSS-to-PDF option, but its system-library requirements need a platform matrix and visual regression evidence before it is acceptable as the cross-platform default.

## Recommendation

Evaluate a pinned Pandoc plus pinned TeX toolchain in a dedicated container-backed CI profile in Sprint 3. It is the strongest current candidate for reproducibility, but is not yet justified for local macOS/Linux use without a maintained container and representative layout tests. HTML stays authoritative as the generated output until that evidence exists.
