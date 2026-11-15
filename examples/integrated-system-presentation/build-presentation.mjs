import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, Presentation, PresentationFile } from "@oai/artifact-tool";

const here = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(here, ".build");
const outputDir = path.join(here, "dist");
const finalPath = path.join(outputDir, "mission-framework-collaborative-intelligence.pptx");

const palette = {
  navy: "#13263D", cream: "#F4F0E7", paper: "#FBF9F4", orange: "#D96C3D",
  cyan: "#55A7A8", gold: "#D8AE5E", sage: "#A9B7A4", ink: "#17212B",
  muted: "#64727E", line: "#D7D1C5", white: "#FFFFFF",
};

function textBox(slide, text, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox", position, fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = { fontFamily: "Aptos", color: palette.ink, fontSize: 20, ...style };
  return shape;
}

function cleanBody(text) {
  return text
    .replace(/^\*\*(.+?):\*\*\s*$/gm, "$1")
    .replace(/^\*\*(.+?)\*\*\s*/gm, "$1\n")
    .replace(/^[-*]\s+/gm, "• ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseSlides(markdown) {
  const chunks = markdown.split(/^# Slide \d+ — /m).slice(1);
  return chunks.map((chunk) => {
    const [title, ...rest] = chunk.split("\n");
    const joined = rest.join("\n");
    const noteMarker = "**Speaker notes:**";
    const noteIndex = joined.indexOf(noteMarker);
    const body = noteIndex >= 0 ? joined.slice(0, noteIndex) : joined;
    const notes = noteIndex >= 0 ? joined.slice(noteIndex + noteMarker.length).trim() : "";
    return { title: title.trim(), body: cleanBody(body), notes };
  });
}

async function writeBlob(target, blob) {
  await fs.writeFile(target, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(buildDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
  const source = await fs.readFile(path.join(here, "slides.md"), "utf8");
  const models = parseSlides(source);
  if (models.length !== 18) throw new Error(`Expected 18 slides, found ${models.length}`);

  const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });

  for (const [index, model] of models.entries()) {
    const slide = presentation.slides.add();
    const dark = index === 0 || [5, 9, 13, 17].includes(index);
    slide.background.fill = dark ? palette.navy : index % 3 === 0 ? palette.cream : palette.paper;
    const titleColor = dark ? palette.cream : palette.navy;
    const bodyColor = dark ? palette.white : palette.ink;

    if (index === 0) {
      slide.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: 18, height: 720 }, fill: palette.orange, line: { style: "solid", fill: "none", width: 0 } });
      textBox(slide, model.title, { left: 90, top: 150, width: 960, height: 150 }, { fontSize: 44, bold: true, color: titleColor });
      textBox(slide, model.body, { left: 92, top: 335, width: 940, height: 190 }, { fontSize: 21, color: bodyColor });
    } else {
      textBox(slide, String(index + 1).padStart(2, "0"), { left: 72, top: 48, width: 50, height: 24 }, { fontSize: 12, bold: true, color: palette.orange });
      textBox(slide, model.title, { left: 72, top: 76, width: 1110, height: 58 }, { fontSize: 31, bold: true, color: titleColor });
      slide.shapes.add({ geometry: "rect", position: { left: 72, top: 150, width: 1128, height: 2 }, fill: dark ? palette.cyan : palette.line, line: { style: "solid", fill: "none", width: 0 } });
      const size = index >= 16 ? 16 : model.body.length > 850 ? 16 : model.body.length > 600 ? 18 : 20;
      textBox(slide, model.body, { left: 86, top: 175, width: 1090, height: 455 }, { fontSize: size, color: bodyColor, verticalAlignment: "top" });
      textBox(slide, "Mission Framework / Collaborative Intelligence", { left: 800, top: 678, width: 400, height: 18 }, { fontSize: 9, color: dark ? palette.sage : palette.muted, alignment: "right" });
    }
    slide.speakerNotes.text = model.notes;
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    await writeBlob(path.join(buildDir, `slide-${String(index + 1).padStart(2, "0")}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
  }
  await writeBlob(path.join(buildDir, "montage.webp"), await presentation.export({ format: "webp", montage: true }));

  const candidatePath = path.join(buildDir, "candidate.pptx");
  await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
  const verified = await PresentationFile.importPptx(await FileBlob.load(candidatePath));
  if (verified.slides.items.length !== 18) throw new Error("PPTX import did not preserve all 18 slides");
  await (await PresentationFile.exportPptx(verified)).save(finalPath);
  console.log(finalPath);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
