# ruff: noqa
from __future__ import annotations

from pathlib import Path
from datetime import date
import yaml
from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

HERE = Path(__file__).resolve().parent
OUT = HERE / "dist"
DATA = yaml.safe_load((HERE / "evidence-map.yml").read_text(encoding="utf-8"))

NAVY = "10243A"
ORANGE = "DD6B38"
CYAN = "52A9A8"
CREAM = "F2EEE5"
MUTED = "667580"
WHITE = "FFFFFF"

COPY = {
    "en": {
        "title": "Mission Framework + Collaborative Intelligence",
        "subtitle": "Evidence brief and design boundary — Version 2",
        "status": "Review candidate · 16 November 2026",
        "purpose": "Purpose and status",
        "purpose_body": (
            "This brief supports a proposed integration of Mission Framework and Collaborative Intelligence. "
            "It is a derived publication: it explains a research and design programme but does not establish that the integrated system is valid, superior or complete. "
            "The document deliberately separates what academic sources report, what we infer across sources, and what the programme chooses as a matter of design or values."
        ),
        "reading": "How to read the evidence",
        "finding": "FINDING — what a source directly studied and reported. Findings retain the source's population, task, date and method limits.",
        "synthesis": "SYNTHESIS — our bounded interpretation across sources. It is useful for design, but is not itself a reported result.",
        "choice": "CHOICE — a normative or architectural decision requiring accountable human authority. Evidence can inform it; evidence cannot make the value choice.",
        "current": "What the evidence currently supports",
        "supports": [
            "Human–AI performance should be treated as conditional. Comparative evaluation must use the strongest realistic alternative, not human-only performance by default.",
            "Immediate assisted output and retained independent competence are different outcomes. Both may matter, depending on purpose and accessibility needs.",
            "Oversight quality depends on authority, time, competence, independent signals, workload and interface design—not merely on naming a human reviewer.",
            "Distributed information, grounding and repair are system properties. More participants or more dialogue do not automatically resolve them.",
            "Conceptual frameworks can sharpen mechanisms and research questions. They do not validate the proposed integration as a whole.",
        ],
        "challenge": "What the evidence challenges",
        "challenges": [
            "A general claim that adding AI creates synergy.",
            "A claim that fluent interaction demonstrates shared understanding or genuine collaboration.",
            "A claim that human oversight guarantees accountability.",
            "A claim that diversity can be justified only through average productivity gains.",
            "A claim that a coherent repository architecture is already an established academic theory or proven product.",
        ],
        "map": "Claim-level evidence map",
        "map_intro": "Grades describe the kind and maturity of support used in this package; they are not universal quality scores for a publication.",
        "method": "Method", "reported": "Reported finding", "limits": "Limits", "relevance": "Relevance to the programme", "not_mean": "Does not imply",
        "synthesis_h": "Bounded programme synthesis",
        "synthesis_body": (
            "Taken together, the sources support an evidence-governed collaboration programme built around explicit authority, shared task state, provenance, independent challenge, repair, and learning from observed outcomes. "
            "They do not establish that these mechanisms form a distinctive theory or that the full architecture improves outcomes. The appropriate claim is therefore narrower: the integration is a coherent, testable research and design candidate."
        ),
        "choices_h": "Normative and architectural choices",
        "choices": [
            "Reality outranks agreement: contradiction is preserved when credible evidence conflicts with the current model.",
            "Consequential authority remains with legitimate human or organisational decision-makers.",
            "Provenance, uncertainty and correction paths are required for load-bearing claims.",
            "Inclusion and accessibility are treated as legitimate values, not only as instruments for higher average performance.",
            "Publication remains downstream of semantic authority and must not silently redefine the system.",
        ],
        "evaluation_h": "Proposed evaluation programme",
        "evaluation": [
            "Define the smallest distinctive claim and its failure conditions.",
            "Compare human-only, conventional-tool, human–AI and AI-led-with-review conditions where appropriate.",
            "Measure task quality, calibration, time, cost, review effort, retained competence, error detection and distribution of benefit and risk.",
            "Seed known errors and hidden information to test challenge, repair and provenance mechanisms.",
            "Use reference missions under real constraints, preregister critical hypotheses and publish negative results.",
            "Do not claim whole-system validity before independent replication and cross-domain evidence.",
        ],
        "counter_h": "Counterarguments that remain open",
        "counter": [
            "Novelty: the integration may mainly relabel established ideas.",
            "Complexity: governance and provenance may add cost without proportional benefit.",
            "Correlated error: multiple AI agents may amplify shared failure modes rather than create independent challenge.",
            "Symbolic accountability: named reviewers can become moral crumple zones without real control.",
            "Portability: assumptions about authority, dissent and individual responsibility may not transfer across cultures and institutions.",
        ],
        "conclusion_h": "Current conclusion",
        "conclusion": (
            "Version 2 is an evidence-bounded research and design package. It contains a coherent architecture, testable mechanisms and explicit value choices. "
            "It is not yet a validated theory, a finished product or proof that human–AI collaboration outperforms alternatives. The next legitimate step is review followed by staged empirical testing."
        ),
        "refs": "References and verification locators",
        "footer": "Mission Framework / Collaborative Intelligence · Version 2 · review candidate",
    },
    "da": {
        "title": "Mission Framework + Collaborative Intelligence",
        "subtitle": "Evidensnotat og designafgrænsning — Version 2",
        "status": "Reviewkandidat · 16. november 2026",
        "purpose": "Formål og status",
        "purpose_body": (
            "Dette notat understøtter en foreslået integration af Mission Framework og Collaborative Intelligence. "
            "Det er en afledt publikation: Det forklarer et forsknings- og designprogram, men dokumenterer ikke, at det integrerede system er validt, bedre eller færdigt. "
            "Dokumentet adskiller bevidst det, de akademiske kilder rapporterer, det vi udleder på tværs af kilder, og det programmet vælger som design- eller værdispørgsmål."
        ),
        "reading": "Sådan læses evidensen",
        "finding": "FUND — hvad en kilde direkte undersøgte og rapporterede. Fundet beholder kildens begrænsninger i population, opgave, tidspunkt og metode.",
        "synthesis": "SYNTESE — vores afgrænsede fortolkning på tværs af kilder. Den kan informere design, men er ikke i sig selv et rapporteret resultat.",
        "choice": "VALG — en normativ eller arkitektonisk beslutning, som kræver ansvarlig menneskelig autoritet. Evidens kan informere valget; evidens kan ikke træffe værdivalget.",
        "current": "Hvad evidensen aktuelt understøtter",
        "supports": [
            "Menneske–AI-præstation bør behandles som betinget. Sammenlignende evaluering skal bruge det stærkeste realistiske alternativ og ikke automatisk mennesket alene.",
            "Umiddelbar assisteret produktion og bevaret selvstændig kompetence er forskellige resultater. Begge kan være relevante afhængigt af formål og tilgængelighedsbehov.",
            "Kvaliteten af tilsyn afhænger af mandat, tid, kompetence, uafhængige signaler, arbejdsbelastning og grænseflade — ikke blot af at navngive en menneskelig reviewer.",
            "Distribueret information, grounding og reparation er systemegenskaber. Flere deltagere eller mere dialog løser dem ikke automatisk.",
            "Begrebslige rammeværk kan skærpe mekanismer og forskningsspørgsmål. De validerer ikke den foreslåede integration som helhed.",
        ],
        "challenge": "Hvad evidensen udfordrer",
        "challenges": [
            "En generel påstand om, at tilføjelse af AI skaber synergi.",
            "En påstand om, at flydende interaktion viser fælles forståelse eller reelt samarbejde.",
            "En påstand om, at menneskeligt tilsyn garanterer ansvarlighed.",
            "En påstand om, at diversitet kun kan begrundes gennem højere gennemsnitlig produktivitet.",
            "En påstand om, at en sammenhængende repository-arkitektur allerede er en etableret akademisk teori eller et dokumenteret produkt.",
        ],
        "map": "Evidenskort på påstandsniveau",
        "map_intro": "Graderne beskriver typen og modenheden af den støtte, der bruges i pakken; de er ikke universelle kvalitetskarakterer for en publikation.",
        "method": "Metode", "reported": "Rapporteret fund", "limits": "Begrænsninger", "relevance": "Relevans for programmet", "not_mean": "Betyder ikke",
        "synthesis_h": "Afgrænset programsyntese",
        "synthesis_body": (
            "Samlet understøtter kilderne et evidensstyret samarbejdsprogram bygget omkring eksplicit autoritet, fælles opgavetilstand, proveniens, uafhængig udfordring, reparation og læring fra observerede resultater. "
            "De dokumenterer ikke, at disse mekanismer udgør en særskilt teori, eller at hele arkitekturen forbedrer resultater. Den relevante påstand er derfor smallere: Integrationen er en sammenhængende og testbar forsknings- og designkandidat."
        ),
        "choices_h": "Normative og arkitektoniske valg",
        "choices": [
            "Virkeligheden står over enighed: Modsigelser bevares, når troværdig evidens er i konflikt med den aktuelle model.",
            "Konsekvensfuld autoritet forbliver hos legitime menneskelige eller organisatoriske beslutningstagere.",
            "Proveniens, usikkerhed og korrektionsveje kræves for bærende påstande.",
            "Inklusion og tilgængelighed behandles som legitime værdier, ikke kun som midler til højere gennemsnitlig præstation.",
            "Publicering forbliver underordnet semantisk autoritet og må ikke stiltiende omdefinere systemet.",
        ],
        "evaluation_h": "Foreslået evalueringsprogram",
        "evaluation": [
            "Definér den mindste særkende påstand og dens fejlbetingelser.",
            "Sammenlign, hvor det er relevant, menneske alene, konventionelt værktøj, menneske–AI og AI-ledet arbejde med review.",
            "Mål opgavekvalitet, kalibrering, tid, omkostning, reviewindsats, bevaret kompetence, fejldetektion og fordeling af gevinst og risiko.",
            "Indsæt kendte fejl og skjult information for at teste udfordring, reparation og proveniens.",
            "Brug referencemissioner under reelle vilkår, præregistrér kritiske hypoteser og publicér negative resultater.",
            "Fremsæt ikke en påstand om helhedsvaliditet før uafhængig replikation og evidens på tværs af domæner.",
        ],
        "counter_h": "Modargumenter som fortsat er åbne",
        "counter": [
            "Nyhedsværdi: Integrationen kan hovedsageligt omdøbe etablerede idéer.",
            "Kompleksitet: Styring og proveniens kan tilføre omkostninger uden tilsvarende gevinst.",
            "Korrelerede fejl: Flere AI-agenter kan forstærke fælles fejlmønstre frem for at skabe uafhængig udfordring.",
            "Symbolsk ansvar: Navngivne reviewere kan blive moralske stødpuder uden reel kontrol.",
            "Overførbarhed: Antagelser om autoritet, uenighed og individuelt ansvar kan have begrænset gyldighed på tværs af kulturer og institutioner.",
        ],
        "conclusion_h": "Aktuel konklusion",
        "conclusion": (
            "Version 2 er en evidensafgrænset forsknings- og designpakke. Den indeholder en sammenhængende arkitektur, testbare mekanismer og eksplicitte værdivalg. "
            "Den er endnu ikke en valideret teori, et færdigt produkt eller dokumentation for, at menneske–AI-samarbejde overgår alternativer. Det næste legitime skridt er review efterfulgt af trinvis empirisk afprøvning."
        ),
        "refs": "Referencer og verifikationshenvisninger",
        "footer": "Mission Framework / Collaborative Intelligence · Version 2 · reviewkandidat",
    },
}


def set_cell_shading(cell, color):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), color)


def configure(doc: Document, lang: str):
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Inches(8.5), Inches(11)
    sec.top_margin, sec.bottom_margin = Inches(0.7), Inches(0.65)
    sec.left_margin, sec.right_margin = Inches(0.75), Inches(0.75)
    styles = doc.styles
    normal = styles["Normal"]
    normal.font.name, normal.font.size, normal.font.color.rgb = "Arial", Pt(9.5), RGBColor.from_string("17212B")
    normal.paragraph_format.space_after = Pt(5)
    normal.paragraph_format.line_spacing = 1.07
    for name, size, color in [("Title", 28, NAVY), ("Subtitle", 15, MUTED), ("Heading 1", 19, NAVY), ("Heading 2", 13, NAVY), ("Heading 3", 10.5, ORANGE)]:
        st = styles[name]
        st.font.name, st.font.size, st.font.bold = "Arial", Pt(size), True
        st.font.color.rgb = RGBColor.from_string(color)
        st.paragraph_format.keep_with_next = True
        st.paragraph_format.space_before = Pt(10 if name != "Title" else 0)
        st.paragraph_format.space_after = Pt(5)
    header = sec.header.paragraphs[0]
    header.text = "MISSION FRAMEWORK + COLLABORATIVE INTELLIGENCE"
    header.style = styles["Caption"]
    header.runs[0].font.color.rgb = RGBColor.from_string(MUTED)
    footer = sec.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer.add_run(COPY[lang]["footer"] + "  ·  ")
    field = OxmlElement("w:fldSimple")
    field.set(qn("w:instr"), "PAGE")
    footer._p.append(field)


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.left_indent = Inches(0.22)
    p.paragraph_format.first_line_indent = Inches(-0.15)
    p.add_run(text)
    return p


def add_label(doc, label, body, color):
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Inches(1.05)
    table.columns[1].width = Inches(5.75)
    c0, c1 = table.rows[0].cells
    set_cell_shading(c0, color)
    set_cell_shading(c1, CREAM)
    c0.vertical_alignment = c1.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    p0 = c0.paragraphs[0]; p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r0 = p0.add_run(label); r0.bold = True; r0.font.color.rgb = RGBColor.from_string(WHITE)
    c1.paragraphs[0].add_run(body).font.size = Pt(9)
    doc.add_paragraph().paragraph_format.space_after = Pt(0)


def add_evidence_record(doc, rec, lang):
    doc.add_heading(f"{rec['id']}  |  {rec['source']}  |  Grade {rec['grade']}", level=2)
    p = doc.add_paragraph()
    r = p.add_run(rec["locator"]); r.font.color.rgb = RGBColor.from_string(CYAN); r.underline = True
    table = doc.add_table(rows=5, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    labels = [COPY[lang]["method"], COPY[lang]["reported"], COPY[lang]["limits"], COPY[lang]["relevance"], COPY[lang]["not_mean"]]
    method = rec["method_da"] if lang == "da" else rec["method"]
    values = [method, rec[f"finding_{lang}"], rec[f"limits_{lang}"], rec[f"relevance_{lang}"], rec[f"does_not_imply_{lang}"]]
    for row, label, value in zip(table.rows, labels, values):
        row.cells[0].width = Inches(1.25); row.cells[1].width = Inches(5.55)
        set_cell_shading(row.cells[0], NAVY)
        row.cells[0].vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        a = row.cells[0].paragraphs[0].add_run(label); a.bold = True; a.font.color.rgb = RGBColor.from_string(WHITE); a.font.size = Pt(8.5)
        b = row.cells[1].paragraphs[0].add_run(value); b.font.size = Pt(8.5)
        row.cells[0].margin_top = row.cells[0].margin_bottom = 60
        row.cells[1].margin_top = row.cells[1].margin_bottom = 60


def build(lang: str):
    c = COPY[lang]
    doc = Document()
    configure(doc, lang)
    doc.core_properties.title = c["title"] + " — " + c["subtitle"]
    doc.core_properties.subject = "Evidence-bounded research and design package"
    doc.core_properties.author = "Mission Framework / Collaborative Intelligence"

    p = doc.add_paragraph(style="Title")
    p.add_run(c["title"])
    doc.add_paragraph(c["subtitle"], style="Subtitle")
    p = doc.add_paragraph(c["status"])
    p.runs[0].bold = True; p.runs[0].font.color.rgb = RGBColor.from_string(ORANGE)
    doc.add_paragraph("\n")
    line = doc.add_table(rows=1, cols=3)
    line.alignment = WD_TABLE_ALIGNMENT.LEFT
    for cell, color in zip(line.rows[0].cells, [ORANGE, CYAN, NAVY]): set_cell_shading(cell, color)
    doc.add_paragraph("\n")
    q = doc.add_paragraph()
    q.alignment = WD_ALIGN_PARAGRAPH.CENTER
    maxim = ("Reality outranks agreement.\nMemory inspires. Evidence governs. Reality decides." if lang == "en" else
             "Virkeligheden står over enighed.\nHukommelsen inspirerer. Evidens styrer. Virkeligheden afgør.")
    rr = q.add_run(maxim)
    rr.bold = True; rr.font.size = Pt(15); rr.font.color.rgb = RGBColor.from_string(NAVY)

    doc.add_page_break()
    doc.add_heading(c["purpose"], level=1); doc.add_paragraph(c["purpose_body"])
    doc.add_heading(c["reading"], level=1)
    add_label(doc, "FINDING" if lang == "en" else "FUND", c["finding"], ORANGE)
    add_label(doc, "SYNTHESIS" if lang == "en" else "SYNTESE", c["synthesis"], CYAN)
    add_label(doc, "CHOICE" if lang == "en" else "VALG", c["choice"], NAVY)
    doc.add_heading(c["current"], level=1)
    for item in c["supports"]: add_bullet(doc, item)
    doc.add_heading(c["challenge"], level=1)
    for item in c["challenges"]: add_bullet(doc, item)

    doc.add_page_break()
    doc.add_heading(c["map"], level=1); doc.add_paragraph(c["map_intro"])
    for i, rec in enumerate(DATA["records"]):
        add_evidence_record(doc, rec, lang)
        if i in {2, 5, 8}: doc.add_page_break()

    doc.add_page_break()
    doc.add_heading(c["synthesis_h"], level=1); doc.add_paragraph(c["synthesis_body"])
    doc.add_heading(c["choices_h"], level=1)
    for item in c["choices"]: add_bullet(doc, item)
    doc.add_heading(c["evaluation_h"], level=1)
    for item in c["evaluation"]: add_bullet(doc, item)
    doc.add_heading(c["counter_h"], level=1)
    for item in c["counter"]: add_bullet(doc, item)
    doc.add_heading(c["conclusion_h"], level=1); doc.add_paragraph(c["conclusion"])

    doc.add_page_break()
    doc.add_heading(c["refs"], level=1)
    for rec in DATA["records"]:
        p = doc.add_paragraph()
        p.add_run(f"{rec['id']}  {rec['source']}. ").bold = True
        r = p.add_run(rec["locator"]); r.font.color.rgb = RGBColor.from_string(CYAN); r.underline = True
    doc.add_paragraph("\nRepository sources are pinned in the presentation package. Academic locators were checked against DOI, publisher, PubMed/PMC or arXiv metadata during package preparation." if lang == "en" else "Repository-kilder er fastlåst i præsentationspakken. Akademiske henvisninger blev kontrolleret mod DOI-, forlags-, PubMed/PMC- eller arXiv-metadata under udarbejdelsen.")

    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / f"mission-framework-collaborative-intelligence-v2-evidence-brief-{lang}.docx"
    doc.save(target)
    print(target)


if __name__ == "__main__":
    build("en")
    build("da")
