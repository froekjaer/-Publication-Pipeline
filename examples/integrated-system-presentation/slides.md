# Slide 1 — Mission Framework and Collaborative Intelligence

**Subtitle:** An evidence-governed system for human-AI collaboration

**Status line:** Research and architecture presentation · November 2026

**Speaker notes:** This presentation integrates four separate concerns: Collaborative Intelligence as a research programme, Mission Framework as the canonical semantic and governance layer, reference implementations as empirical challenges, and Publication Pipeline as the derived communication layer. The deck is a publication prototype. It does not claim that the combined system is validated.

# Slide 2 — Four repositories, four authorities

**On slide:**

- Collaborative Intelligence: research questions, competing theories and programme synthesis
- Mission Framework: canonical semantics, evidence discipline and change governance
- Reference missions and platforms: implementation, observation and falsification
- Publication Pipeline: traceable transformation for specific audiences

**Takeaway:** Integration depends on links and feedback. It does not create one repository that owns every concern.

**Evidence:** P · Verified repository state

**Speaker notes:** The authority map prevents a presentation from becoming a competing normative source. It also introduces coordination overhead. That trade-off should remain visible. Sources: Collaborative Intelligence `AI_CONTEXT.md` and README at commit `fab97b5`; Publication Pipeline README at `fa07f26`.

# Slide 3 — What the integrated system claims

**Supported now:**

- A coherent governance and provenance architecture exists in the repositories.
- The programme poses falsifiable questions and preserves uncertainty.
- Relevant literature supplies mechanisms, comparators and warnings.

**Not established:**

- That the full architecture improves decisions or outcomes.
- That Collaborative Intelligence is a distinct theory.
- That human-AI teams outperform strong alternatives by default.

**Evidence:** P · Synthesis with explicit limits

**Speaker notes:** This distinction is central. Repository coherence is directly inspectable. Outcome superiority requires comparative evidence that does not yet exist. The draft v2 document itself says it is unsettled whether CI is a theory, integration framework, design method or research programme.

# Slide 4 — The system as a governed learning loop

**Diagram labels:** Reality; Observation and Evidence; Claims and Reasoning; Recommendation and Decision; Controlled Action; Outcome and Learning.

**Cross-cutting controls:** identity, provenance, policy, accountability, audit, uncertainty, contradiction.

**Takeaway:** Every material transition should remain reviewable, and outcomes must be able to revise the model.

**Evidence:** P · Canonical architecture plus editorial synthesis

**Speaker notes:** The main sequence comes from Mission Framework Architecture and Evidence Model. The integrated visual is editorial synthesis, not a canonical diagram. It should be read as a hypothesis about how the system's parts fit together.

# Slide 5 — Canonical Mission Loop and proposed Reality Belt

**Canonical:** Reality informs need, mission, decision, action, outcome and learning.

**Proposed addition from draft CI v2:**

- Outbound consequence tracking includes distributional and ecological effects.
- Inbound challenge includes testimony, contradiction and affected-stakeholder feedback.
- Intended output, observed outcome and causal effect remain separate.

**Counterargument:** The proposal may restate double-loop learning, realist evaluation and theory-of-change practice. Its distinct value needs testing.

**Evidence:** P · Draft, unmerged proposal

**Speaker notes:** Draft PR #14 calls this the Reality Belt. The deck preserves its status as a proposal. The critical review argues that the idea has close predecessors and needs a comparative test showing it reduces false-success declarations.

# Slide 6 — Human-AI synergy is conditional

**Finding 1:** A preregistered meta-analysis of 106 experiments found human-AI combinations performed worse than the better of humans or AI alone on average, with losses concentrated in decision tasks.

**Finding 2:** A field experiment found unrestricted GPT-4 improved practice performance but reduced later unaided performance. A guardrailed tutor reduced the harm.

**Implication:** Evaluate task quality, calibration, time, cost and retained competence against strong human-only and conventional-tool baselines.

**Evidence:** A/B · Synthesised evidence and direct study

**Speaker notes:** Sources: Vaccaro, Almaatouq and Malone, 2024, DOI `10.1038/s41562-024-02024-1`; Bastani et al., 2025, DOI `10.1073/pnas.2422633122`. These results do not prove all current systems behave the same way. The meta-analysis mostly covers studies through mid-2023, and the education experiment is one setting.

# Slide 7 — Four external lenses sharpen the architecture

**9A Framework:** activity, actor and authority connect to awareness, accountability, adaptability and evaluation.

**COHUMAIN:** collective performance depends on transactive memory, attention and reasoning across people and machines.

**Collaboration Gap:** shared grounding and repair burden distinguish assistance from stable collaboration.

**IHCF:** co-creation depends on negotiated initiative, authorship and responsibility, not mere AI participation.

**Evidence:** C · Conceptual and exploratory research

**Speaker notes:** These sources support design questions, not validation of Mission Framework. Zheng et al. is a 2026 preprint and explicitly conceptual. Gupta et al. is peer reviewed but presents a research agenda and sociocognitive architecture. Vishwarupe et al. builds a conceptual framework from 16 interviews. Quinones-Gomez combines 13 publications with a questionnaire of 16 design professionals.

# Slide 8 — A collaboration contract for each task

**Before work:** purpose, task boundary, source authority and accountable decision owner.

**During work:** shared state, visible assumptions, permission scope and repair mechanisms.

**After work:** independent checks, action record, observed outcome and unresolved contradiction.

**Design rule:** The system earns the label collaboration only when both grounding and repair are designed, not inferred from fluent interaction.

**Evidence:** C/P · Literature-informed system proposal

**Speaker notes:** This operating contract combines the collaboration-gap framework with Mission Framework's provenance and authority requirements. It is a proposed design pattern. Its value should be tested against simpler assistance workflows.

# Slide 9 — Human oversight needs operating conditions

**Weak form:** A person approves an AI recommendation under time pressure with limited independent evidence.

**Stronger form:** The reviewer has authority, time, competence, an independent signal and a measured error-detection task.

**Known risks:** automation bias, workload effects, rubber-stamping and moral crumple zones.

**Evidence:** A/C/N · Systematic review, policy analysis and governance commitment

**Speaker notes:** Goddard et al. reviewed 74 studies of automation bias. Green argues that human-oversight policies can legitimise flawed systems when people cannot perform the expected function. Elish describes how accountability can collapse onto the nearest human operator. Oversight is therefore a capability and system-design problem, not a checkbox.

# Slide 10 — Evidence grades prevent category errors

**A:** systematic review or meta-analysis

**B:** direct empirical study

**C:** conceptual, qualitative or exploratory research

**P:** programme proposition requiring validation

**N:** normative commitment requiring legitimate authority and justification

**Rule:** Grade each claim, keep the underlying source and counterevidence visible, and never convert a normative choice into an empirical fact.

**Evidence:** P · Publication method

**Speaker notes:** The grades are local to this deck. They identify evidence type and maturity, not a complete risk-of-bias assessment. The evidence register retains claim-level sources, limitations and status.

# Slide 11 — Counterarguments that could change the design

**Novelty:** The system may integrate known ideas without adding a distinct explanatory construct.

**Performance:** More humans or AI can add correlated error, delay and coordination cost.

**Inclusion:** Demographic diversity does not guarantee performance gains. Justice-based inclusion stands independently of utility.

**Oversight:** Human accountability can become symbolic when reviewers lack real authority or capacity.

**Evidence burden:** Provenance can improve trust while making ordinary work unusably heavy.

**Evidence:** A/C/P/N · Mixed evidence and normative critique

**Speaker notes:** A credible presentation should not answer these objections rhetorically. Each counterargument should become a design constraint or falsification test. The draft v2 review recommends defining CI as an integration programme until a distinct construct and comparative evidence exist.

# Slide 12 — Evaluation compares systems, not isolated models

**Conditions:** human only; conventional tools; human plus AI; AI-led workflow with human review where ethically permissible.

**Outcomes:** task quality and calibration; time and total resource use; retained competence; repair burden; distribution of benefits and harms.

**Guardrails:** preregistration, seeded errors, independent grading, subgroup analysis, negative-result publication and stopping rules.

**Evidence:** P · Research design proposal

**Speaker notes:** The first bounded study should focus on a small number of mechanisms. One candidate is seeded-error detection with authentic dissent and clear baselines. A narrow experiment cannot validate the full architecture, but it can eliminate weak design assumptions.

# Slide 13 — Authority remains explicit

**AI systems may:** retrieve, classify, compare, simulate, draft, challenge and recommend within authorised scope.

**Accountable authorities must:** define purpose, set non-compensatory constraints, approve consequential action and own the consequences.

**Affected people need:** meaningful participation, routes to contest evidence and protection from coerced or token involvement.

**Evidence:** N/P · Canonical governance and proposed participation safeguards

**Speaker notes:** This is a normative commitment, not an empirical finding. It also requires operational substance. A human cannot be accountable in a meaningful sense without authority, information, time and the ability to refuse.

# Slide 14 — Publication is part of the trust architecture

**Source before output:** reviewed Markdown and registers remain maintained inputs.

**Explicit transformation:** selection, compression, visualisation and evidence labels remain inspectable.

**Derived status:** the PowerPoint explains sources but never supersedes them.

**Audience adaptation:** technical detail may change, while authority boundaries, uncertainty and evidence limits remain intact.

**Evidence:** P · Verified publication architecture

**Speaker notes:** Publication Pipeline currently generates HTML, not PowerPoint. This package is therefore a labelled prototype with source files, a manifest and a derived deck. It should not be represented as a stable pipeline capability.

# Slide 15 — A staged research path

**Stage 1:** Reconcile constructs with prior literature and define the smallest distinctive claim.

**Stage 2:** Test grounding, dissent, repair burden and retained competence in bounded comparative studies.

**Stage 3:** Apply the method in a reference mission with consequence-appropriate governance.

**Stage 4:** Propagate supported findings through formal review, then update publications.

**Decision gate:** No whole-system validity claim before independent replication and cross-domain evidence.

**Evidence:** P · Recommended programme direction

**Speaker notes:** The ordering prevents the publication from outrunning the research. Negative results should narrow or reject parts of the architecture rather than being treated as communication problems.

# Slide 16 — Current conclusion

**What exists:** a coherent, inspectable integration of mission semantics, evidence governance, human-AI research questions and publication controls.

**What the literature adds:** conditional mechanisms, credible baselines and strong reasons to distrust default synergy and checkbox oversight.

**What remains:** distinctiveness, causal benefit, usability, cultural portability and institutional feasibility.

**Conclusion:** Present the system as an evidence-governed research and design programme, not as a validated theory or finished product.

**Evidence:** P · Evidence-bounded synthesis

**Speaker notes:** This wording is deliberately narrower than a product claim. The value of the integrated system today lies in making questions, authority, evidence and correction paths explicit. Its outcome claims remain open.

# Slide 17 — References: system and collaboration design

Mission Framework. Architecture; Evidence Model; OP-001. 2026. Pinned at `9a1a454`.

Collaborative Intelligence. Foundation v1.0 and draft v2 foundations. 2026. Pinned at `fab97b5` and PR #14 `84b5178`.

Publication Pipeline. Foundation v1.1. 2026. Pinned at `fa07f26`.

Gupta et al. Fostering Collective Intelligence in Human-AI Collaboration. DOI `10.1111/tops.12679`.

Zheng, Pan and Lan. Designing Human-AI Collaborative Science, The 9A Framework. arXiv `2610.22948`.

Vishwarupe et al. The Collaboration Gap in Human-AI Work. arXiv `2604.18096`.

Quinones-Gomez. Hybrid Human-AI Co-Creation in Design. DOI `10.23726/cij.2026.1857`.

**Speaker notes:** Full URLs, verification states and source types are recorded in `references.yml`.

# Slide 18 — References: evidence and counterarguments

Vaccaro, Almaatouq and Malone. When combinations of humans and AI are useful. DOI `10.1038/s41562-024-02024-1`.

Bastani et al. Generative AI without guardrails can harm learning. DOI `10.1073/pnas.2422633122`.

Goddard, Roudsari and Wyatt. Automation bias, a systematic review. DOI `10.1136/amiajnl-2011-000089`.

Green. The flaws of policies requiring human oversight of government algorithms. DOI `10.1016/j.clsr.2022.105681`.

van Dijk, van Engen and van Knippenberg. Defying conventional wisdom. DOI `10.1016/j.obhdp.2012.06.003`.

Lu, Yuan and McLeod. Twenty-five years of hidden profiles. DOI `10.1177/1088868311417243`.

Elish. Moral crumple zones. DOI `10.17351/ests2019.260`.

**Speaker notes:** The search was targeted rather than systematic. The evidence register records which claims rely on abstracts, full text, repository inspection or synthesis.
