import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const base = path.join(root, "dist", "mission-framework-collaborative-intelligence-visual-edition.pptx");
const out = path.join(here, "dist");
const preview = path.join(here, "preview");

const da = [
  {
    "MISSION FRAMEWORK + COLLABORATIVE INTELLIGENCE": "MISSION FRAMEWORK + COLLABORATIVE INTELLIGENCE",
    "A system for\njustified collaboration": "Et system til\nbegrundet samarbejde",
    "Architecture, evidence and a research agenda for human–AI work": "Arkitektur, evidens og en forskningsdagsorden for menneske–AI-arbejde",
    "Research presentation · November 2026": "Forskningspræsentation · november 2026",
    "Proposed integration · not a validated whole-system claim": "Foreslået integration · ikke en valideret helhedspåstand",
  },
  {
    "The proposition in one sentence": "Forskningsspørgsmålet i én sætning",
    "Can people and AI produce better justified decisions": "Kan mennesker og AI skabe bedre begrundede beslutninger",
    "without hiding uncertainty, shifting accountability or losing contact with reality?": "uden at skjule usikkerhed, flytte ansvar eller miste kontakten med virkeligheden?",
    "BETTER": "BEDRE", "Quality + calibration": "Kvalitet + kalibrering",
    "JUSTIFIED": "BEGRUNDET", "Evidence + provenance": "Evidens + proveniens",
    "ACCOUNTABLE": "ANSVARLIGT", "Authority + consequences": "Mandat + konsekvenser",
    "The framework does not assume the answer is yes.": "Rammeværket antager ikke, at svaret er ja.",
    "Research proposition": "Forskningspåstand",
  },
  {
    "Four authorities keep the system honest": "Fire autoriteter holder systemet redeligt",
    "Integration without a single owner of truth": "Integration uden én samlet ejer af sandheden",
    "RESEARCH": "FORSKNING", "Questions, mechanisms, rival theories": "Spørgsmål, mekanismer og rivaliserende teorier",
    "SEMANTICS": "SEMANTIK", "Canonical concepts and change governance": "Kanoniske begreber og ændringsstyring",
    "REALITY TEST": "VIRKELIGHEDSTEST", "Reference missions": "Referencemissioner", "Observed outcomes, failures and findings": "Observerede resultater, fejl og fund",
    "PUBLICATION": "PUBLICERING", "Traceable outputs for each audience": "Sporbare produkter til hver målgruppe",
    "A publication may explain the system. It never becomes the system’s semantic authority.": "En publikation kan forklare systemet. Den bliver aldrig systemets semantiske autoritet.",
    "Verified repository authority map": "Verificeret autoritetskort for repositories",
  },
  {
    "A governed loop from reality to learning": "Et styret kredsløb fra virkelighed til læring",
    "The value lies in reviewable transitions, not in one model": "Værdien ligger i kontrollerbare overgange, ikke i én model",
    "Reality": "Virkelighed", "Observation": "Observation", "Evidence": "Evidens", "Reasoning": "Ræsonnement", "Decision": "Beslutning", "Action": "Handling", "Outcome": "Resultat",
    "Learning returns observed consequences to the model": "Læring fører observerede konsekvenser tilbage til modellen",
    "Identity   Provenance   Policy   Accountability   Audit   Uncertainty   Contradiction": "Identitet   Proveniens   Politik   Ansvar   Revision   Usikkerhed   Modsigelse",
    "P · canonical architecture + synthesis": "P · kanonisk arkitektur + syntese",
    "Editable architecture diagram": "Redigerbart arkitekturdiagram",
  },
  {
    "EVIDENCE DISCIPLINE": "EVIDENSDISCIPLIN",
    "Evidence is the currency of justified trust": "Evidens er grundlaget for begrundet tillid",
    "Preserve the original. Record provenance. Keep interpretation separate. Let contradiction survive publication.": "Bevar originalen. Registrér proveniens. Hold fortolkning adskilt. Lad modsigelser overleve publiceringen.",
  },
  {
    "Five labels prevent category errors": "Fem mærkater forebygger kategorifejl",
    "Every load-bearing claim carries its epistemic status": "Enhver bærende påstand viser sin epistemiske status",
    "SYNTHESISED": "SYNTESE", "Meta-analysis or systematic review": "Meta-analyse eller systematisk review",
    "DIRECT STUDY": "DIREKTE STUDIE", "Empirical or substantial field study": "Empirisk eller væsentligt feltstudie",
    "CONCEPTUAL": "BEGREBSLIG", "Theory, interviews or exploratory work": "Teori, interviews eller eksplorativt arbejde",
    "PROPOSITION": "FORSLAG", "Architecture or mechanism to be tested": "Arkitektur eller mekanisme som skal testes",
    "NORMATIVE": "NORMATIV", "Value choice requiring legitimate authority": "Værdivalg som kræver legitim autoritet",
    "A grade is a routing signal, not a substitute for reading the source.": "En evidensgrad er et navigationssignal, ikke en erstatning for at læse kilden.",
    "The claim register keeps sources, counterevidence and limitations visible.": "Påstandsregisteret synliggør kilder, modevidens og begrænsninger.",
    "Local evidence rubric": "Lokal evidensrubrik", "Evidence-register.csv": "Evidence-register.csv",
  },
  {
    "Human–AI synergy is conditional": "Synergi mellem mennesker og AI er betinget",
    "The best comparative evidence rejects a default advantage": "Den stærkeste sammenlignende evidens afviser en automatisk fordel",
    "Performance relative to the better of human or AI alone": "Præstation relativt til den bedste af menneske eller AI alene",
    "Average meta-analytic effect": "Gennemsnitlig meta-analytisk effekt", "106 experiments": "106 eksperimenter",
    "What changes the result": "Hvad ændrer resultatet",
    "Task type: content creation differs from decisions": "Opgavetype: indholdsproduktion adskiller sig fra beslutninger",
    "Relative human and AI capability": "Menneskets og AI'ens relative kapabilitet",
    "Reliance, interface and review conditions": "Afhængighed, grænseflade og reviewbetingelser",
    "Evaluation must compare systems, not celebrate model capability.": "Evaluering skal sammenligne systemer, ikke fejre modelkapabilitet.",
    "Vaccaro et al. 2024 · A evidence": "Vaccaro et al. 2024 · A-evidens",
  },
  {
    "Immediate productivity can conceal learning loss": "Umiddelbar produktivitet kan skjule læringstab",
    "Practice performance\nwith unrestricted GPT-4": "Træningspræstation\nmed ubegrænset GPT-4",
    "Later performance\nwithout access": "Senere præstation\nuden adgang",
    "Guardrailed tutoring reduced the harm": "En tutor med værn reducerede skaden",
    "Measure both assisted performance and retained independent competence.": "Mål både assisteret præstation og bevaret selvstændig kompetence.",
    "B · field experiment": "B · felteksperiment",
  },
  {
    "COLLABORATION DESIGN": "SAMARBEJDSDESIGN",
    "Fluency is not shared understanding": "Flydende sprog er ikke fælles forståelse",
    "Stable collaboration requires a shared task state, visible assumptions and a fair distribution of repair work.": "Stabilt samarbejde kræver fælles opgavetilstand, synlige antagelser og en rimelig fordeling af reparationsarbejdet.",
  },
  {
    "Four research lenses make the design more specific": "Fire forskningslinser gør designet mere præcist",
    "WHO DOES WHAT?": "HVEM GØR HVAD?", "Activity · actor · authority\nCoordination · evaluation": "Aktivitet · aktør · autoritet\nKoordinering · evaluering",
    "HOW DOES THE COLLECTIVE THINK?": "HVORDAN TÆNKER KOLLEKTIVET?", "Transactive memory\nattention · reasoning": "Transaktiv hukommelse\nopmærksomhed · ræsonnement",
    "WHO REPAIRS MISALIGNMENT?": "HVEM REPARERER FEJLJUSTERING?", "Grounding capacity\nand repair burden": "Grounding-kapacitet\nog reparationsbyrde",
    "WHEN IS IT CO-CREATION?": "HVORNÅR ER DET SAMSKABELSE?", "Initiative · authorship\nresponsibility": "Initiativ · forfatterskab\nansvar",
    "These frameworks sharpen questions. They do not validate the integrated system.": "Disse rammeværk skærper spørgsmålene. De validerer ikke det integrerede system.",
    "Conceptual and exploratory evidence": "Begrebslig og eksplorativ evidens",
  },
  {
    "A collaboration contract for every consequential task": "En samarbejdskontrakt for enhver konsekvensfuld opgave",
    "BEFORE": "FØR", "Purpose": "Formål", "Scope\nSource authority\nDecision owner": "Afgrænsning\nKildeautoritet\nBeslutningsejer",
    "DURING": "UNDER", "Grounding": "Fælles grounding", "Shared state\nVisible assumptions\nRepair path": "Fælles tilstand\nSynlige antagelser\nReparationsvej",
    "AFTER": "EFTER", "Accountability": "Ansvarlighed", "Independent check\nAction record\nObserved outcome": "Uafhængig kontrol\nHandlingsspor\nObserveret resultat",
    "Collaboration is earned through design. It is not inferred from a conversational interface.": "Samarbejde skabes gennem design. Det kan ikke udledes af en samtalegrænseflade.",
    "Proposed operating pattern": "Foreslået arbejdsmønster",
  },
  {
    "Human oversight works only under real operating conditions": "Menneskeligt tilsyn virker kun under reelle arbejdsbetingelser",
    "CHECKBOX OVERSIGHT": "SYMBOLSK TILSYN", "OPERATIONAL OVERSIGHT": "OPERATIONELT TILSYN",
    "Approval under time pressure": "Godkendelse under tidspres", "No independent signal": "Intet uafhængigt signal", "Unclear authority": "Uklar myndighed", "Error rate unmeasured": "Fejlrate ikke målt",
    "Authority and ability to refuse": "Mandat og mulighed for at afvise", "Time and relevant competence": "Tid og relevant kompetence", "Independent evidence": "Uafhængig evidens", "Measured detection performance": "Målt detektionsevne",
    "A named human can still become a moral crumple zone.": "Et navngivet menneske kan stadig blive systemets moralske stødpude.",
    "A/C/N · mixed evidence": "A/C/N · blandet evidens", "Automation bias and governance": "Automatiseringsbias og styring",
  },
  {
    "Five objections the programme must survive": "Fem indvendinger programmet skal kunne modstå",
    "A credible framework makes its failure conditions visible": "Et troværdigt rammeværk synliggør sine fejlbetingelser",
    "Novelty": "Nyhedsværdi", "Integration may relabel established ideas.": "Integration kan blot omdøbe etablerede idéer.",
    "Performance": "Præstation", "More agents can add correlated error and delay.": "Flere agenter kan tilføre korrelerede fejl og forsinkelse.",
    "Inclusion": "Inklusion", "Justice does not depend on a productivity gain.": "Retfærdighed afhænger ikke af en produktivitetsgevinst.",
    "Oversight": "Tilsyn", "Accountability can be symbolic or displaced.": "Ansvar kan blive symbolsk eller forskudt.",
    "Usability": "Brugbarhed", "Provenance overhead can make work unusable.": "Provenienskrav kan gøre arbejdet uanvendeligt.",
    "Counterarguments become tests": "Modargumenter bliver til test",
  },
  {
    "Evaluation compares complete work systems": "Evaluering sammenligner komplette arbejdssystemer",
    "A model benchmark cannot answer the collaboration question": "En modelbenchmark kan ikke besvare samarbejdsspørgsmålet",
    "HUMAN ONLY": "KUN MENNESKE", "CONVENTIONAL TOOL": "KONVENTIONELT VÆRKTØJ", "HUMAN + AI": "MENNESKE + AI", "AI-LED + REVIEW": "AI-LEDET + REVIEW",
    "Quality": "Kvalitet", "Independent task score": "Uafhængig opgavescore", "Calibration": "Kalibrering", "Confidence versus accuracy": "Sikkerhed sammenholdt med nøjagtighed",
    "Resources": "Ressourcer", "Time, cost and review effort": "Tid, omkostning og reviewindsats", "Learning": "Læring", "Retained competence": "Bevaret kompetence", "Distribution": "Fordeling", "Who benefits and who bears risk": "Hvem får gevinsten, og hvem bærer risikoen",
    "Preregister · seed errors · publish negative results": "Præregistrér · indsæt fejl · publicér negative resultater", "Proposed evaluation contract": "Foreslået evalueringskontrakt",
  },
  {
    "A staged path from synthesis to evidence": "En trinvis vej fra syntese til evidens",
    "DEFINE": "AFGRÆNS", "Smallest distinctive claim": "Mindste særkende påstand", "TEST": "TEST", "Grounding, repair and retained skill": "Grounding, reparation og bevaret kunnen",
    "APPLY": "ANVEND", "Reference mission under real constraints": "Referencemission under reelle vilkår", "PROPAGATE": "FORANKR", "Review before semantic change": "Review før semantisk ændring",
    "Decision gate": "Beslutningsport", "No whole-system validity claim before independent replication and cross-domain evidence.": "Ingen påstand om helhedsvaliditet før uafhængig replikation og evidens på tværs af domæner.",
    "Research before promotion": "Forskning før udbredelse",
  },
  {
    "What can be said now": "Hvad kan vi sige nu",
    "A narrower conclusion is more credible": "En smallere konklusion er mere troværdig",
    "EXISTS": "FINDES", "A coherent architecture for evidence, authority and correction.": "En sammenhængende arkitektur for evidens, autoritet og korrektion.",
    "SUPPORTED": "UNDERSTØTTET", "Conditional mechanisms and strong reasons for caution.": "Betingede mekanismer og stærke grunde til forsigtighed.",
    "OPEN": "ÅBENT", "Distinctiveness, causal benefit, usability and cultural portability.": "Særkende, kausal gevinst, brugbarhed og kulturel overførbarhed.",
    "An evidence-governed research and design programme": "Et evidensstyret forsknings- og designprogram",
    "not yet a validated theory or finished product": "endnu ikke en valideret teori eller et færdigt produkt",
    "Evidence-bounded conclusion": "Evidensafgrænset konklusion",
  },
  {
    "References: system and collaboration design": "Referencer: system- og samarbejdsdesign",
    "Full URLs and verification states: references.yml": "Fuldstændige URL'er og verifikationsstatus: references.yml",
  },
  {
    "References: evidence and counterarguments": "Referencer: evidens og modargumenter",
    "Targeted search, not a systematic review": "Målrettet søgning, ikke et systematisk review",
    "Claim-level basis and limits: evidence-register.csv": "Grundlag og begrænsninger pr. påstand: evidence-register.csv",
  },
];

const danishNotes = [
  "Præsentér materialet som et forsknings- og designsystem. Det visuelle forbinder et menneske, et AI-netværk og den eksterne virkelighed. Pilene viser læring i begge retninger.\n\nKilder og begrænsninger:\nRepository-pins og fulde litteraturreferencer findes i pakkens manifest og på slide 17–18.",
  "Systemet har kun værdi, hvis det kan synliggøre, hvornår samarbejdet fejler. Behandl overlegenhed som en hypotese, ikke en præmis.\n\nKilder og begrænsninger:\nCollaborative Intelligence README ved fab97b5; foreslåede v2-fundamenter ved 84b5178.",
  "Adskillelsen mellem repositories understøtter sporbarhed, men øger koordineringsomkostningen. Det er en reel designafvejning.\n\nKilder og begrænsninger:\nCollaborative Intelligence AI_CONTEXT.md; Publication Pipeline README; Mission Framework OP-001.",
  "Hver overgang bør efterlade et reviewbart spor. Evidens om resultatet kan udfordre ræsonnementet, beslutningen og nogle gange selve missionen.\n\nKilder og begrænsninger:\nMission Framework Architecture and Evidence Model, commit 9a1a454. Det integrerede diagram er redaktionel syntese.",
  "Dette afsnit bevæger sig fra arkitektur til evidenspraksis. Billedet er illustrativt og ikke dokumentarisk evidens fra en faktisk mission.\n\nKilder og begrænsninger:\nMission Framework Evidence Model. Billedet er genereret til præsentationen.",
  "Normative forpligtelser må ikke sammenblandes med empiriske fund. Et sammenhængende begrebsrammeværk er ikke af den grund valideret.\n\nKilder og begrænsninger:\nMission Framework Evidence Model; lokalt evidence-register.csv.",
  "Gennemsnitseffekten er negativ, ikke universel. Studierne ligger hovedsageligt før de nuværende frontier-LLM'er, så moderatorerne er vigtigere end overskriften alene.\n\nKilder og begrænsninger:\nVaccaro, Almaatouq og Malone. DOI 10.1038/s41562-024-02024-1.",
  "Fundet stammer fra én uddannelseskontekst. Det støtter en risikomekanisme, ikke et universelt estimat for tab af færdigheder. Tilgængelighed kan legitimt gøre assisteret præstation til succeskriteriet.\n\nKilder og begrænsninger:\nBastani et al. DOI 10.1073/pnas.2422633122.",
  "Billedet er illustrativt. Personerne er genererede og forestiller ikke faktiske programdeltagere.\n\nKilder og begrænsninger:\nVishwarupe et al. arXiv 2604.18096; genereret redaktionelt billede.",
  "Hver linse bidrager med en anden analyseenhed. Deres konvergens understøtter designspørgsmål, ikke en kausal påstand om helheden.\n\nKilder og begrænsninger:\nZheng et al.; Gupta et al.; Vishwarupe et al.; Quinones-Gomez.",
  "Kontrakten er en syntese, som bør testes mod enklere arbejdsgange med assistance.\n\nKilder og begrænsninger:\nCollaboration Gap; Mission Framework OP-001 og evidensarkitektur.",
  "Menneskelig kontrol er ikke ensartet ineffektiv. Kvaliteten afhænger af arbejdsbelastning, opgavekompleksitet, træning, grænseflade og reel autoritet.\n\nKilder og begrænsninger:\nGoddard et al.; Green 2022; Elish 2019.",
  "Dette er ikke dekorative forbehold. Hver indvending skal begrænse forskningsdesignet eller udløse revision af arkitekturen.\n\nKilder og begrænsninger:\nCI v2 advisory review ved 84b5178; evidence-register.csv.",
  "Brug den stærkeste realistiske sammenligning. Et afgrænset eksperiment kan afvise svage antagelser, selv om det ikke kan validere hele arkitekturen.\n\nKilder og begrænsninger:\nCI v2 RQ1–RQ8; Vaccaro et al. 2024; Lu et al. 2012.",
  "Negative resultater bør indsnævre eller afvise dele af arkitekturen, ikke behandles som et kommunikationsproblem.\n\nKilder og begrænsninger:\nCI v2 kortsigtede leverancer og rådgivende review.",
  "Det umiddelbare bidrag er disciplineret integration: eksplicitte spørgsmål, evidenstilstande, autoritet og korrektionsveje. Overlegen effekt er fortsat et åbent spørgsmål.\n\nKilder og begrænsninger:\nSyntese af fastlåste repository-kilder og målrettet litteratur.",
  "YAML-registeret registrerer URL'er, kildetype og verifikationsstatus.\n\nKilder og begrænsninger:\nreferences.yml i denne pakke.",
  "Brug evidensregisteret til kilder, modevidens og status på påstandsniveau.\n\nKilder og begrænsninger:\nreferences.yml og evidence-register.csv.",
];

function replaceAll(slide, replacements) {
  for (const shape of slide.shapes.items) {
    if (!shape.text) continue;
    for (const [from, to] of Object.entries(replacements)) shape.text.replace(from, to);
  }
}

async function saveVerified(pres, target) {
  const candidate = `${target}.candidate.pptx`;
  await (await PresentationFile.exportPptx(pres)).save(candidate);
  const check = await PresentationFile.importPptx(await FileBlob.load(candidate));
  if (check.slides.items.length !== 18) throw new Error(`Expected 18 slides in ${target}`);
  if (check.slides.items.some((s) => !s.speakerNotes.text.trim())) throw new Error(`Missing speaker notes in ${target}`);
  await (await PresentationFile.exportPptx(check)).save(target);
  await fs.unlink(candidate);
  return check;
}

async function saveBlob(target, blob) {
  await fs.writeFile(target, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(out, { recursive: true });
  await fs.mkdir(preview, { recursive: true });

  const en = await PresentationFile.importPptx(await FileBlob.load(base));
  en.slides.items[0].shapes.items.forEach((shape) => {
    if (!shape.text) return;
    shape.text.replace("Research presentation · November 2026", "Version 2 · review candidate · November 2026");
  });
  const enPath = path.join(out, "mission-framework-collaborative-intelligence-v2-en.pptx");
  const enChecked = await saveVerified(en, enPath);
  await saveBlob(path.join(preview, "v2-en-montage.webp"), await enChecked.export({ format: "webp", montage: true }));

  const dk = await PresentationFile.importPptx(await FileBlob.load(base));
  dk.slides.items.forEach((slide, i) => {
    replaceAll(slide, da[i]);
    slide.speakerNotes.text = danishNotes[i];
  });
  const daPath = path.join(out, "mission-framework-collaborative-intelligence-v2-da.pptx");
  const daChecked = await saveVerified(dk, daPath);
  await saveBlob(path.join(preview, "v2-da-montage.webp"), await daChecked.export({ format: "webp", montage: true }));

  console.log(enPath);
  console.log(daPath);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
