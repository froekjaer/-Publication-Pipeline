import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, Presentation, PresentationFile } from "@oai/artifact-tool";

const here = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(here, ".visual-build");
const outputDir = path.join(here, "dist");
const finalPath = path.join(outputDir, "mission-framework-collaborative-intelligence-visual-edition.pptx");
const A = (name) => path.join(here, "assets", name);

const C = {
  navy: "#10243A", navy2: "#18324D", ink: "#17212B", cream: "#F2EEE5",
  paper: "#FBF9F4", orange: "#DD6B38", cyan: "#52A9A8", gold: "#E0B45B",
  sage: "#A8B8A4", muted: "#667580", line: "#D7D1C5", white: "#FFFFFF",
  red: "#AD4D47", paleCyan: "#DCEDEC", paleOrange: "#F5DFD2",
};
const W = 1280, H = 720;

function shape(slide, x, y, w, h, fill, radius = false, line = "none") {
  return slide.shapes.add({ geometry: radius ? "roundRect" : "rect", position: { left: x, top: y, width: w, height: h }, fill, line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 } });
}
function text(slide, value, x, y, w, h, size = 20, color = C.ink, bold = false, align = "left") {
  const s = slide.shapes.add({ geometry: "textbox", position: { left: x, top: y, width: w, height: h }, fill: "none", line: { style: "solid", fill: "none", width: 0 } });
  s.text = value;
  s.text.style = { fontFamily: "Arial", fontSize: size, color, bold, alignment: align, verticalAlignment: "middle" };
  return s;
}
function title(slide, n, value, sub = "", dark = false) {
  text(slide, String(n).padStart(2, "0"), 72, 46, 48, 24, 12, C.orange, true);
  text(slide, value, 72, 76, 1110, 52, 31, dark ? C.cream : C.navy, true);
  if (sub) text(slide, sub, 72, 128, 1080, 28, 15, dark ? C.sage : C.muted);
}
function footer(slide, label, dark = false) {
  shape(slide, 72, 680, 1136, 1, dark ? "#5C7183" : C.line);
  text(slide, label, 82, 686, 600, 16, 9, dark ? C.sage : C.muted);
  text(slide, "Mission Framework / Collaborative Intelligence", 810, 686, 390, 16, 9, dark ? C.sage : C.muted, false, "right");
}
function note(slide, content, sources) {
  slide.speakerNotes.text = `${content}\n\nSources and limitations:\n${sources}`;
}
function pill(slide, value, x, y, w, fill = C.navy) {
  shape(slide, x, y, w, 30, fill, true);
  text(slide, value, x + 10, y, w - 20, 30, 11, C.white, true, "center");
}
function bullet(slide, value, x, y, w, size = 18, color = C.ink) {
  shape(slide, x, y + 10, 8, 8, C.orange, true);
  text(slide, value, x + 24, y, w - 24, 52, size, color);
}
function chapter(slide, eyebrow, heading, body, imageDataUrl, side = "left") {
  slide.background.fill = C.navy;
  slide.images.add({ dataUrl: imageDataUrl, alt: heading, position: { left: 0, top: 0, width: W, height: H }, fit: "cover" });
  const left = side === "left" ? 0 : 720;
  shape(slide, left, 0, 560, H, C.navy);
  text(slide, eyebrow.toUpperCase(), left + 72, 132, 420, 28, 13, C.cyan, true);
  text(slide, heading, left + 72, 182, 420, 145, 38, C.cream, true);
  text(slide, body, left + 72, 355, 410, 145, 19, C.white);
}
async function writeBlob(target, blob) { await fs.writeFile(target, new Uint8Array(await blob.arrayBuffer())); }

async function main() {
  await fs.mkdir(buildDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
  const imageData = {};
  for (const name of ["hero-system.png", "human-ai-collaboration.png", "evidence-provenance.png"]) {
    imageData[name] = `data:image/png;base64,${(await fs.readFile(A(name))).toString("base64")}`;
  }
  const p = Presentation.create({ slideSize: { width: W, height: H } });

  // 1 — cover
  {
    const s = p.slides.add();
    s.images.add({ dataUrl: imageData["hero-system.png"], alt: "Human, AI and reality connected by evidence flows", position: { left: 0, top: 0, width: W, height: H }, fit: "cover" });
    shape(s, 0, 0, 580, H, C.navy);
    text(s, "MISSION FRAMEWORK + COLLABORATIVE INTELLIGENCE", 72, 96, 440, 28, 12, C.cyan, true);
    text(s, "A system for\njustified collaboration", 72, 152, 460, 170, 44, C.cream, true);
    text(s, "Architecture, evidence and a research agenda for human–AI work", 74, 355, 430, 86, 21, C.white);
    shape(s, 74, 480, 240, 3, C.orange);
    text(s, "Research presentation · November 2026", 74, 500, 390, 28, 14, C.sage);
    text(s, "Proposed integration · not a validated whole-system claim", 74, 628, 450, 24, 12, C.gold, true);
    note(s, "Frame the deck as a research and design system. The visual connects a human participant, an AI network and external reality. The arrows indicate learning in both directions.", "Repository pins and full literature references appear in the package manifest and slides 17–18.");
  }

  // 2 — thesis
  {
    const s = p.slides.add(); s.background.fill = C.paper; title(s, 2, "The proposition in one sentence");
    text(s, "Can people and AI produce better justified decisions", 96, 188, 1080, 58, 34, C.navy, true, "center");
    text(s, "without hiding uncertainty, shifting accountability or losing contact with reality?", 130, 255, 1020, 78, 27, C.orange, true, "center");
    const labels = [["BETTER", "Quality + calibration"], ["JUSTIFIED", "Evidence + provenance"], ["ACCOUNTABLE", "Authority + consequences"]];
    labels.forEach((d, i) => { const x = 120 + i * 365; shape(s, x, 414, 310, 105, i === 1 ? C.navy : C.cream, true); text(s, d[0], x + 20, 430, 270, 24, 13, i === 1 ? C.cyan : C.orange, true, "center"); text(s, d[1], x + 20, 465, 270, 32, 18, i === 1 ? C.white : C.navy, true, "center"); });
    text(s, "The framework does not assume the answer is yes.", 290, 575, 700, 42, 22, C.navy, true, "center");
    footer(s, "Research proposition"); note(s, "The system is valuable only if it can expose when collaboration fails. Treat superiority as a hypothesis, not a premise.", "Collaborative Intelligence README at fab97b5; draft v2 foundations at 84b5178.");
  }

  // 3 — authority map
  {
    const s = p.slides.add(); s.background.fill = C.cream; title(s, 3, "Four authorities keep the system honest", "Integration without a single owner of truth");
    const items = [
      ["RESEARCH", "Collaborative Intelligence", "Questions, mechanisms, rival theories", C.orange],
      ["SEMANTICS", "Mission Framework", "Canonical concepts and change governance", C.cyan],
      ["REALITY TEST", "Reference missions", "Observed outcomes, failures and findings", C.gold],
      ["PUBLICATION", "Publication Pipeline", "Traceable outputs for each audience", C.sage],
    ];
    items.forEach((d, i) => { const x = 66 + i * 300; shape(s, x, 208, 260, 270, C.paper, true, C.line); shape(s, x, 208, 260, 10, d[3]); text(s, d[0], x + 24, 245, 212, 22, 12, d[3], true); text(s, d[1], x + 24, 290, 212, 62, 22, C.navy, true); text(s, d[2], x + 24, 375, 212, 64, 16, C.ink); if (i < 3) text(s, "↔", x + 264, 315, 34, 40, 28, C.muted, true, "center"); });
    shape(s, 100, 535, 1080, 70, C.navy, true); text(s, "A publication may explain the system. It never becomes the system’s semantic authority.", 130, 548, 1020, 44, 20, C.white, true, "center");
    footer(s, "Verified repository authority map"); note(s, "The repository separation supports traceability but adds coordination cost. That cost is a real design trade-off.", "Collaborative Intelligence AI_CONTEXT.md; Publication Pipeline README; Mission Framework OP-001.");
  }

  // 4 — loop
  {
    const s = p.slides.add(); s.background.fill = C.paper; title(s, 4, "A governed loop from reality to learning", "The value lies in reviewable transitions, not in one model");
    const labs = ["Reality", "Observation", "Evidence", "Reasoning", "Decision", "Action", "Outcome"];
    labs.forEach((lab, i) => { const x = 50 + i * 171; shape(s, x, 236, 145, 90, i === 0 ? C.navy : i === 6 ? C.sage : [C.cyan, C.gold, C.gold, C.orange, C.red][i - 1], true); text(s, lab, x + 8, 252, 129, 55, 17, C.white, true, "center"); if (i < 6) text(s, "›", x + 145, 258, 26, 40, 26, C.muted, true, "center"); });
    text(s, "Learning returns observed consequences to the model", 680, 366, 490, 42, 20, C.navy, true, "center");
    text(s, "↶", 1060, 330, 65, 72, 46, C.orange, true, "center");
    shape(s, 86, 472, 1108, 75, C.navy, true); text(s, "Identity   Provenance   Policy   Accountability   Audit   Uncertainty   Contradiction", 110, 488, 1060, 42, 17, C.white, true, "center");
    pill(s, "P · canonical architecture + synthesis", 900, 606, 294); footer(s, "Editable architecture diagram");
    note(s, "Each transition should leave a reviewable record. Outcome evidence can challenge the reasoning, the decision and sometimes the mission itself.", "Mission Framework Architecture and Evidence Model, commit 9a1a454. The integrated diagram is editorial synthesis.");
  }

  // 5 — evidence chain visual
  {
    const s = p.slides.add(); chapter(s, "Evidence discipline", "Evidence is the currency of justified trust", "Preserve the original. Record provenance. Keep interpretation separate. Let contradiction survive publication.", imageData["evidence-provenance.png"], "left");
    note(s, "This chapter moves from architecture to evidence practice. The image is illustrative, not documentary evidence of a real mission.", "Mission Framework Evidence Model. Image generated for this presentation and used as an editorial visual.");
  }

  // 6 — evidence grades
  {
    const s = p.slides.add(); s.background.fill = C.navy; title(s, 6, "Five labels prevent category errors", "Every load-bearing claim carries its epistemic status", true);
    const grades = [["A", "SYNTHESISED", "Meta-analysis or systematic review", C.orange], ["B", "DIRECT STUDY", "Empirical or substantial field study", C.gold], ["C", "CONCEPTUAL", "Theory, interviews or exploratory work", C.cyan], ["P", "PROPOSITION", "Architecture or mechanism to be tested", C.sage], ["N", "NORMATIVE", "Value choice requiring legitimate authority", C.red]];
    grades.forEach((d, i) => { const y = 184 + i * 80; shape(s, 88, y, 56, 56, d[3], true); text(s, d[0], 88, y, 56, 56, 25, C.white, true, "center"); text(s, d[1], 174, y, 250, 24, 17, C.cream, true); text(s, d[2], 174, y + 29, 500, 26, 15, C.white); });
    text(s, "A grade is a routing signal, not a substitute for reading the source.", 710, 300, 430, 105, 28, C.gold, true);
    text(s, "The claim register keeps sources, counterevidence and limitations visible.", 710, 432, 430, 72, 18, C.white);
    pill(s, "Local evidence rubric", 920, 605, 220, C.orange); footer(s, "Evidence-register.csv", true);
    note(s, "Do not collapse normative commitments into empirical findings. Do not treat a conceptual framework as validated because it is coherent.", "Mission Framework Evidence Model; local evidence-register.csv.");
  }

  // 7 — synergy chart
  {
    const s = p.slides.add(); s.background.fill = C.paper; title(s, 7, "Human–AI synergy is conditional", "The best comparative evidence rejects a default advantage");
    text(s, "Performance relative to the better of human or AI alone", 90, 176, 580, 28, 15, C.muted, true);
    shape(s, 112, 258, 4, 215, C.line); shape(s, 112, 365, 490, 2, C.line);
    const zeroX = 360; shape(s, zeroX, 235, 2, 255, C.muted);
    shape(s, zeroX - 118, 286, 118, 58, C.orange, true); text(s, "−0.23", zeroX - 112, 286, 106, 58, 27, C.white, true, "center");
    text(s, "Average meta-analytic effect", 110, 410, 500, 30, 18, C.navy, true, "center");
    text(s, "106 experiments", 110, 448, 500, 26, 14, C.muted, true, "center");
    shape(s, 690, 190, 470, 315, C.cream, true); text(s, "What changes the result", 720, 220, 410, 34, 22, C.navy, true);
    bullet(s, "Task type: content creation differs from decisions", 720, 278, 390, 17);
    bullet(s, "Relative human and AI capability", 720, 342, 390, 17);
    bullet(s, "Reliance, interface and review conditions", 720, 406, 390, 17);
    shape(s, 90, 548, 1070, 62, C.navy, true); text(s, "Evaluation must compare systems, not celebrate model capability.", 112, 558, 1026, 40, 21, C.white, true, "center");
    footer(s, "Vaccaro et al. 2024 · A evidence");
    note(s, "The effect is negative on average, not universally. The study set mostly predates current frontier LLMs, so moderators matter more than the headline alone.", "Vaccaro, Almaatouq and Malone. DOI 10.1038/s41562-024-02024-1.");
  }

  // 8 — learning risk
  {
    const s = p.slides.add(); s.background.fill = C.cream; title(s, 8, "Immediate productivity can conceal learning loss");
    const nums = [["+48%", "Practice performance\nwith unrestricted GPT-4", C.cyan], ["−17%", "Later performance\nwithout access", C.orange]];
    nums.forEach((d, i) => { const x = 130 + i * 510; shape(s, x, 210, 440, 225, i === 0 ? C.paleCyan : C.paleOrange, true); text(s, d[0], x + 28, 236, 384, 78, 54, d[2], true, "center"); text(s, d[1], x + 45, 325, 350, 70, 20, C.navy, true, "center"); });
    text(s, "Guardrailed tutoring reduced the harm", 210, 476, 860, 44, 27, C.navy, true, "center");
    text(s, "Measure both assisted performance and retained independent competence.", 220, 532, 840, 50, 19, C.ink, false, "center");
    pill(s, "B · field experiment", 944, 618, 210, C.orange); footer(s, "Bastani et al. 2025");
    note(s, "The finding comes from one educational setting. It supports a risk mechanism, not a universal deskilling estimate. Accessibility contexts may legitimately define competence as assisted performance.", "Bastani et al. DOI 10.1073/pnas.2422633122.");
  }

  // 9 — collaboration chapter
  {
    const s = p.slides.add(); chapter(s, "Collaboration design", "Fluency is not shared understanding", "Stable collaboration requires a shared task state, visible assumptions and a fair distribution of repair work.", imageData["human-ai-collaboration.png"], "left");
    note(s, "The image is illustrative. The people shown are generated and do not depict actual programme participants.", "Vishwarupe et al. arXiv 2604.18096; generated editorial visual.");
  }

  // 10 — four lenses
  {
    const s = p.slides.add(); s.background.fill = C.paper; title(s, 10, "Four research lenses make the design more specific");
    const items = [["9A", "WHO DOES WHAT?", "Activity · actor · authority\nCoordination · evaluation", C.orange], ["COHUMAIN", "HOW DOES THE COLLECTIVE THINK?", "Transactive memory\nattention · reasoning", C.cyan], ["GAP", "WHO REPAIRS MISALIGNMENT?", "Grounding capacity\nand repair burden", C.gold], ["IHCF", "WHEN IS IT CO-CREATION?", "Initiative · authorship\nresponsibility", C.sage]];
    items.forEach((d, i) => { const x = 68 + i * 298; shape(s, x, 190, 260, 350, C.cream, true); shape(s, x, 190, 260, 12, d[3]); text(s, d[0], x + 24, 228, 212, 30, 14, d[3], true); text(s, d[1], x + 24, 280, 212, 68, 18, C.navy, true); text(s, d[2], x + 24, 380, 212, 92, 17, C.ink); });
    text(s, "These frameworks sharpen questions. They do not validate the integrated system.", 140, 578, 1000, 38, 21, C.navy, true, "center");
    footer(s, "Conceptual and exploratory evidence");
    note(s, "Each lens contributes a different unit of analysis. Their convergence supports design questions, not a whole-system causal claim.", "Zheng et al. arXiv 2610.22948; Gupta et al. DOI 10.1111/tops.12679; Vishwarupe et al.; Quinones-Gomez DOI 10.23726/cij.2026.1857.");
  }

  // 11 — contract
  {
    const s = p.slides.add(); s.background.fill = C.cream; title(s, 11, "A collaboration contract for every consequential task");
    const stages = [["BEFORE", "Purpose", "Scope\nSource authority\nDecision owner", C.orange], ["DURING", "Grounding", "Shared state\nVisible assumptions\nRepair path", C.cyan], ["AFTER", "Accountability", "Independent check\nAction record\nObserved outcome", C.gold]];
    stages.forEach((d, i) => { const x = 100 + i * 380; shape(s, x, 195, 320, 310, C.paper, true, C.line); shape(s, x, 195, 320, 12, d[3]); text(s, d[0], x + 24, 232, 272, 22, 12, d[3], true); text(s, d[1], x + 24, 280, 272, 38, 24, C.navy, true); text(s, d[2], x + 24, 350, 272, 105, 19, C.ink); });
    shape(s, 100, 548, 1080, 58, C.navy, true); text(s, "Collaboration is earned through design. It is not inferred from a conversational interface.", 126, 556, 1028, 42, 20, C.white, true, "center");
    footer(s, "Proposed operating pattern"); note(s, "This contract is a synthesis that should be tested against simpler assistance workflows.", "Collaboration Gap framework; Mission Framework OP-001 and evidence architecture.");
  }

  // 12 — oversight
  {
    const s = p.slides.add(); s.background.fill = C.paper; title(s, 12, "Human oversight works only under real operating conditions");
    text(s, "CHECKBOX OVERSIGHT", 100, 185, 420, 24, 13, C.red, true); text(s, "OPERATIONAL OVERSIGHT", 690, 185, 420, 24, 13, C.cyan, true);
    shape(s, 100, 225, 440, 255, C.paleOrange, true); shape(s, 690, 225, 440, 255, C.paleCyan, true);
    const weak = ["Approval under time pressure", "No independent signal", "Unclear authority", "Error rate unmeasured"];
    const strong = ["Authority and ability to refuse", "Time and relevant competence", "Independent evidence", "Measured detection performance"];
    weak.forEach((v, i) => bullet(s, v, 135, 255 + i * 52, 360, 17)); strong.forEach((v, i) => bullet(s, v, 725, 255 + i * 52, 360, 17));
    text(s, "A named human can still become a moral crumple zone.", 250, 540, 780, 42, 25, C.navy, true, "center");
    pill(s, "A/C/N · mixed evidence", 930, 618, 220, C.orange); footer(s, "Automation bias and governance");
    note(s, "Human review is not uniformly ineffective. Its quality depends on workload, task complexity, training, interface design and authority.", "Goddard et al. DOI 10.1136/amiajnl-2011-000089; Green 2022 DOI 10.1016/j.clsr.2022.105681; Elish 2019.");
  }

  // 13 — counterarguments
  {
    const s = p.slides.add(); s.background.fill = C.navy; title(s, 13, "Five objections the programme must survive", "A credible framework makes its failure conditions visible", true);
    const rows = [["01", "Novelty", "Integration may relabel established ideas."], ["02", "Performance", "More agents can add correlated error and delay."], ["03", "Inclusion", "Justice does not depend on a productivity gain."], ["04", "Oversight", "Accountability can be symbolic or displaced."], ["05", "Usability", "Provenance overhead can make work unusable."]];
    rows.forEach((d, i) => { const y = 182 + i * 84; text(s, d[0], 92, y, 48, 34, 13, [C.orange, C.cyan, C.gold, C.red, C.sage][i], true); text(s, d[1], 166, y - 4, 220, 38, 20, C.cream, true); text(s, d[2], 430, y - 4, 700, 38, 18, C.white); shape(s, 166, y + 54, 964, 1, "#536A7D"); });
    footer(s, "Counterarguments become tests", true); note(s, "These are not decorative caveats. Each objection should constrain research design or trigger revision of the architecture.", "CI v2 advisory review at 84b5178; evidence-register.csv.");
  }

  // 14 — evaluation matrix
  {
    const s = p.slides.add(); s.background.fill = C.paper; title(s, 14, "Evaluation compares complete work systems", "A model benchmark cannot answer the collaboration question");
    const cols = ["HUMAN ONLY", "CONVENTIONAL TOOL", "HUMAN + AI", "AI-LED + REVIEW"];
    cols.forEach((v, i) => { const x = 62 + i * 300; shape(s, x, 188, 260, 58, i === 2 ? C.orange : C.navy, true); text(s, v, x + 8, 188, 244, 58, 14, C.white, true, "center"); });
    const measures = [["Quality", "Independent task score"], ["Calibration", "Confidence versus accuracy"], ["Resources", "Time, cost and review effort"], ["Learning", "Retained competence"], ["Distribution", "Who benefits and who bears risk"]];
    measures.forEach((d, i) => { const y = 285 + i * 54; text(s, d[0], 92, y, 170, 30, 16, C.navy, true); shape(s, 270, y + 14, 90, 4, [C.orange, C.cyan, C.gold, C.sage, C.red][i]); text(s, d[1], 390, y - 3, 720, 34, 17, C.ink); });
    pill(s, "Preregister · seed errors · publish negative results", 760, 590, 390, C.navy); footer(s, "Proposed evaluation contract");
    note(s, "Use the strongest realistic comparator. A narrow experiment can eliminate weak assumptions even when it cannot validate the whole architecture.", "CI v2 RQ1–RQ8; Vaccaro et al. 2024; Lu et al. 2012.");
  }

  // 15 — research path
  {
    const s = p.slides.add(); s.background.fill = C.cream; title(s, 15, "A staged path from synthesis to evidence");
    const stages = [["01", "DEFINE", "Smallest distinctive claim"], ["02", "TEST", "Grounding, repair and retained skill"], ["03", "APPLY", "Reference mission under real constraints"], ["04", "PROPAGATE", "Review before semantic change"]];
    stages.forEach((d, i) => { const x = 68 + i * 300; shape(s, x, 218, 260, 210, C.paper, true, C.line); shape(s, x, 218, 260, 12, [C.orange, C.cyan, C.gold, C.sage][i]); text(s, d[0], x + 24, 250, 64, 32, 15, [C.orange, C.cyan, C.gold, C.sage][i], true); text(s, d[1], x + 24, 298, 210, 34, 22, C.navy, true); text(s, d[2], x + 24, 350, 210, 55, 16, C.ink); if (i < 3) text(s, "›", x + 262, 296, 34, 42, 28, C.muted, true, "center"); });
    shape(s, 120, 490, 1040, 86, C.navy, true); text(s, "Decision gate", 150, 505, 180, 24, 13, C.orange, true); text(s, "No whole-system validity claim before independent replication and cross-domain evidence.", 340, 502, 780, 48, 20, C.white, true);
    footer(s, "Research before promotion"); note(s, "Negative results should narrow or reject elements of the architecture rather than being treated as a communication problem.", "CI v2 near-term deliverables and advisory review.");
  }

  // 16 — conclusion
  {
    const s = p.slides.add(); s.background.fill = C.navy; title(s, 16, "What can be said now", "A narrower conclusion is more credible", true);
    const blocks = [["EXISTS", "A coherent architecture for evidence, authority and correction."], ["SUPPORTED", "Conditional mechanisms and strong reasons for caution."], ["OPEN", "Distinctiveness, causal benefit, usability and cultural portability."]];
    blocks.forEach((d, i) => { const x = 80 + i * 390; shape(s, x, 205, 340, 245, i === 1 ? C.orange : C.paper, true); text(s, d[0], x + 26, 238, 288, 24, 13, i === 1 ? C.white : [C.cyan, C.orange, C.gold][i], true); text(s, d[1], x + 26, 292, 288, 110, 21, i === 1 ? C.white : C.navy, true); });
    text(s, "An evidence-governed research and design programme", 150, 515, 980, 50, 29, C.cream, true, "center");
    text(s, "not yet a validated theory or finished product", 240, 568, 800, 38, 19, C.gold, true, "center"); footer(s, "Evidence-bounded conclusion", true);
    note(s, "The immediate contribution is disciplined integration: explicit questions, evidence states, authority and correction paths. Outcome superiority remains open.", "Synthesis of pinned repository sources and targeted literature.");
  }

  // 17 — references
  {
    const s = p.slides.add(); s.background.fill = C.paper; title(s, 17, "References: system and collaboration design");
    const refs = ["Mission Framework. Architecture; Evidence Model; OP-001. Commit 9a1a454.", "Collaborative Intelligence. Foundation v1.0 and draft v2. Commits fab97b5 and 84b5178.", "Publication Pipeline. Foundation v1.1. Commit fa07f26.", "Gupta et al. COHUMAIN. 10.1111/tops.12679.", "Zheng, Pan & Lan. 9A Framework. arXiv 2610.22948.", "Vishwarupe et al. Collaboration Gap. arXiv 2604.18096.", "Quinones-Gomez. Hybrid Co-Creation. 10.23726/cij.2026.1857."];
    refs.forEach((v, i) => { const y = 158 + i * 66; text(s, String(i + 1).padStart(2, "0"), 90, y, 40, 28, 12, C.orange, true); text(s, v, 150, y - 3, 1000, 38, 16, C.ink); shape(s, 150, y + 43, 1000, 1, C.line); });
    footer(s, "Full URLs and verification states: references.yml"); note(s, "The YAML register records URLs, source type and verification status.", "references.yml in this package.");
  }

  // 18 — references evidence
  {
    const s = p.slides.add(); s.background.fill = C.navy; title(s, 18, "References: evidence and counterarguments", "Targeted search, not a systematic review", true);
    const refs = ["Vaccaro et al. Human–AI combinations. 10.1038/s41562-024-02024-1.", "Bastani et al. AI and learning. 10.1073/pnas.2422633122.", "Goddard et al. Automation bias. 10.1136/amiajnl-2011-000089.", "Green. Human oversight. 10.1016/j.clsr.2022.105681.", "van Dijk et al. Team diversity. 10.1016/j.obhdp.2012.06.003.", "Lu et al. Hidden profiles. 10.1177/1088868311417243.", "Elish. Moral crumple zones. 10.17351/ests2019.260."];
    refs.forEach((v, i) => { const y = 165 + i * 64; text(s, String(i + 8).padStart(2, "0"), 90, y, 40, 28, 12, C.gold, true); text(s, v, 150, y - 3, 1000, 38, 16, C.white); shape(s, 150, y + 41, 1000, 1, "#536A7D"); });
    footer(s, "Claim-level basis and limits: evidence-register.csv", true); note(s, "Use the evidence register for claim-level sources, counterarguments and status.", "references.yml and evidence-register.csv.");
  }

  for (const [i, slide] of p.slides.items.entries()) await writeBlob(path.join(buildDir, `slide-${String(i + 1).padStart(2, "0")}.png`), await p.export({ slide, format: "png", scale: 1 }));
  await writeBlob(path.join(buildDir, "montage.webp"), await p.export({ format: "webp", montage: true }));
  const candidate = path.join(buildDir, "candidate.pptx");
  await (await PresentationFile.exportPptx(p)).save(candidate);
  const verified = await PresentationFile.importPptx(await FileBlob.load(candidate));
  if (verified.slides.items.length !== 18) throw new Error("Expected 18 slides after import");
  await (await PresentationFile.exportPptx(verified)).save(finalPath);
  console.log(finalPath);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
