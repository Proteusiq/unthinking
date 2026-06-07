# Paper Analysis: Agents' Last Exam (ALE)

## Metadata
- **arXiv ID**: 2606.05405
- **Title**: Agents' Last Exam
- **Authors**: Yiyou Sun, Xinyang Han, Weichen Zhang, Yuanbo Pang, Tianyu Wang, Yuhan Cao, Yixiao Huang, ... Dawn Song (UC Berkeley + 250+ industry experts / multi-institution)
- **Date**: Jun 2026 (v1)
- **Category**: cs.AI
- **Links**: agents-last-exam.org · github.com/rdi-berkeley/agents-last-exam
- **Stance**: SUPPORTS (frontier agents score 0% on the hardest tier of ordinary, economically-valuable professional tasks; ~78% of failures are Understanding/Approach — reasoning and domain knowledge — not execution)

---

## The Inversion This Paper Makes Concrete

```text
┌──────────────────────────────────────────────────────────────────────────┐
│  OLYMPIAD FRAMING                vs       ORDINARY-COMPETENCE FRAMING       │
│  ----------------                        ---------------------------       │
│  "solves IMO / competitive code"         "can't finish what every working  │
│                                           professional ships routinely"     │
│  Static, verbal, one-shot,               Long-horizon, GUI+CLI, novel,      │
│  contaminable                            verifiable, uncontaminated         │
│  Humans: few % can do it                 Humans: ~100% of practitioners do  │
│  AI:     superhuman                      AI:     0% on Last-Exam tier       │
└──────────────────────────────────────────────────────────────────────────┘
```

The thesis's sharpest test is not "can the model do hard things" but "does its
competence track problem difficulty or training-distribution exposure?" ALE
moves the goalposts from saturated, leak-prone olympiad benchmarks to authentic
professional workflows that any domain expert completes — and frontier agents
collapse. Difficulty for a *reasoner* should scale with task complexity; ALE
shows it scales with distributional coverage instead.

---

## Core Claims

1. **The benchmark-to-deployment gap is an evaluation problem.** Benchmark
   victories ("olympiad math," "competitive programming") have outpaced real
   economic impact because mainstream benchmarks do not measure sustained,
   long-horizon work on real, economically valuable workflows.
2. **ALE measures ordinary professional competence, not exam knowledge.** 1K+
   task instances across 55 subfields / 13 industry clusters, anchored in the
   O*NET / SOC 2018 occupational taxonomy, sourced from real projects experts
   already shipped (days-to-weeks of professional work each).
3. **Frontier agents are nowhere near saturation.** Average full-pass rate on
   the hardest tier is 2.6%; most mainstream agents record 0% on the Last-Exam
   tier. The strongest config (Codex + GPT-5.5) gets 82% on Terminal-Bench but
   <50% on ALE's easiest tier and <10% on the hardest.
4. **The bottleneck is reasoning/knowledge, not tool execution.** ~78% of
   failures are Understanding (31%) + Approach (47%); only 22% are Execution
   (implementation/format/GUI) errors.
5. **The model matters far more than the harness.** Swapping the backbone
   produces an 18.0 pp spread; swapping the harness produces only ~5-6 pp —
   roughly 3× — pinning capability on "the foundation model's reasoning and
   domain knowledge."
6. **Contamination-resistant by construction.** Only 150 of 1,490 instances are
   public (~10%); rolling renewal rotates private tasks in and retires public
   ones, maintaining an uncontaminated surface across model generations.

---

## Methodology

### Benchmark design (three admission gates)
- **Representativeness** — real software the experts actually use (e.g.,
  SolidWorks/Rhino, not AutoCAD), not synthetic scenarios.
- **Complexity** — an end-to-end deliverable, not a single UI action. "Workflow
  vs action": *move a running cheetah into another race video* (tracking,
  rotoscoping, compositing, color matching) — not *apply a color filter*.
- **Verifiability** — deterministic check or unambiguous rubric tied to an
  observable artifact. LLM-as-judge is rejected at QC wherever a deterministic
  alternative exists; the minority that need a judge use narrow evidence-anchored
  yes/no probes.

### Construction pipeline (five gates)
Expert sourcing (250+ practitioners) → portal submission → conference-style
first-pass review → engineer implementation/dry-run → peer-review QC.
1,490 instances: 960 external submissions + 530 commissioned; 150 public /
1,017 private / 323 pending QC.

### Evaluation pipeline
Decoupled (task spec `main.py` / agent / VM environment). Four-directory VM:
`input/` (read-only), `software/` (pre-installed), `output/` (sole writable),
`reference/` (hidden ground truth). Three lifecycle functions: `load()`,
`start()`, `evaluate()` → score in [0,1]. Agents run an action loop over
screenshots, shell, mouse/keyboard, file edits, API calls. Five-hour cap per
run (overall timeout rate 4.3%).

### Agent class: Generalist Computer-Use Agent (GCUA)
Five functional layers — Brain (reasoning/planning), Eyes (GUI perception),
Body (orchestration), Hands (tool calls), Feet (runtime). CLI-agents lack Eyes;
GUI-agents have shallow Body/Hands/Feet. ALE demands the union, so all systems
are brought to GCUA via a GUI-as-Tool MCP bridge (14 desktop-action tools).

### Scoring: gate-and-score
A binary precondition (e.g., "no toolpath collision," "file parses") must pass
before a continuous quality metric is scored; gate failure forces 0 regardless
of partial progress.

---

## Key Evidence

| Finding | Number | Context |
|---|---|---|
| Hardest-tier avg full-pass | **2.6%** | Across mainstream harness × backbone configs |
| Last-Exam tier (most agents) | **0%** | Claude Code + Opus 4.7 and others record 0.0% |
| Best config overall pass | 26.2% | Codex (GPT-5.5); 42.4% Near-Term, 8.6% Last-Exam |
| Terminal-Bench vs ALE gap | 82% → <10% | Same config; saturated benchmark vs novel workflows |
| ALE-CLI vs Terminal-Bench | 82% → 25.2% | Codex+GPT-5.5 on the harder CLI subset |
| **Failure: Understanding** | **31%** | Domain knowledge gap 25% + hallucination 6% |
| **Failure: Approach** | **47%** | Wrong strategy 30% + incomplete/abandoned 17% |
| **Failure: Execution** | **22%** | Output-format 10% + implementation bug 8% + GUI 4% |
| Reasoning/knowledge share | **~78%** | Understanding + Approach = the dominant bottleneck |
| Model vs harness spread | **18.0 pp vs 5.3-6.0 pp** | Backbone swap ~3× the harness swap |
| GUI underutilization | 34% tasks GUI-primary, GUI share stays small | Agents use Bash/CLI substitutes |
| Coverage gap | 13 of 55 subdomains uncovered by union of 16 prior benchmarks | ALE covers 55/55 |

### Failure taxonomy (Claude Code + Opus 4.7, GPT-4o classifier @ temp 0)

```text
┌──────────────────────────────────────────────────────────────┐
│  WHY AGENTS FAIL — root cause of failed runs                 │
├──────────────────────────────────────────────────────────────┤
│  APPROACH ........................ 47%  (reasoning/planning)  │
│    ├── Wrong Strategy ............ 30%                        │
│    └── Incomplete/Abandoned ...... 17%                        │
│  UNDERSTANDING ................... 31%  (knowledge)           │
│    ├── Domain Knowledge Gap ...... 25%                        │
│    └── Hallucination/Fabrication . 6%                         │
│  EXECUTION ....................... 22%  (capability)          │
│    ├── Output Format Error ....... 10%                        │
│    ├── Implementation Bug ........ 8%                         │
│    └── GUI Interaction Failure ... 4%                         │
│  (Timeout/resources excluded — environment, not reasoning)   │
└──────────────────────────────────────────────────────────────┘
   78% upstream of execution → the gap is reasoning, not plumbing
```

---

## Critical Analysis: What This Does and Does Not Show

### Relationship to the Thesis

Direct, controlled support. The thesis holds that LLM "reasoning" tracks the
training distribution rather than problem structure. ALE is the cleanest
ordinary-competence test in the corpus:

- The same agent that gets **82% on a saturated benchmark** (Terminal-Bench)
  gets **<10%** on novel professional workflows of comparable or lower intrinsic
  difficulty — performance follows distributional exposure, not difficulty.
- The failure taxonomy localizes the gap **upstream of execution**: 78% of
  failures are Understanding/Approach. The model can type the commands; it can't
  work out what a domain expert would do. This is the proxy/competence
  decoupling made operational.
- The **model >> harness** result (3× spread) rules out "it's just a tooling
  problem" — better scaffolding does not close the gap; the foundation model's
  reasoning does.
- The **Bash-substitution pattern** (34% of tasks demand GUI-primary software,
  yet agents default to ad-hoc scripts) is a symptom of missing specialized
  knowledge, not a tool limitation.

### Honest Caveats

- **This is a benchmark/capability paper, not a mechanism paper.** It shows the
  *symptom* (ordinary tasks fail, reasoning-class errors dominate) cleanly, but
  does not isolate *why* at the circuit/training level — that link to the thesis
  is inferential, supplied by mechanism papers elsewhere in the corpus.
- **Gate-and-score can force a 0** on partial progress, which makes full-pass
  rates harsh; the mean-score columns are gentler (still low).
- **Failure taxonomy is one configuration** (Claude Code + Opus 4.7) and uses an
  LLM classifier — the 78% figure is indicative, not a universal constant.
- **Public/full-pool gap** — the public set over-weights the Last-Exam tier, so
  the public pass rate understates the full pool (authors verify representativeness,
  Pearson r = 0.89).
- **No dedicated limitations section** — caveats are scattered in appendices.

Net: a strong, well-constructed ordinary-competence benchmark whose failure
analysis independently localizes the bottleneck in reasoning and domain
knowledge rather than execution. Supports — as capability evidence, with the
mechanism left to other papers.

---

## Relationship to Other Papers

### Supports
- **Easy Problems That LLMs Get Wrong (#58 area, 2405.19616)**: same inversion —
  trivial-for-humans tasks defeat models that ace hard benchmarks; ALE scales it
  to whole professional workflows.
- **GSM-Symbolic (#3, 2410.05229)**: distributional fragility on perturbed-but-
  easy problems; ALE shows the analog on novel-but-ordinary professional tasks.
- **Comprehension Without Competence (#19, ...)**: ALE's "Understanding vs
  Execution" split mirrors the high step-accuracy / low task-accuracy
  split-brain pattern.
- **LiveCodeBench Pro (#176)** & **How Much Do LLMs Cheat (#276)**: contamination
  and saturation inflate scores on static code benchmarks; ALE's rolling private
  pool is the constructive response.

### Extends
- **RADAR: Data Contamination Detection (#57, 2510.08931)**: RADAR detects
  contamination post hoc; ALE designs it out (10% public, rolling renewal).

### Contextualized by (benchmark-integrity cluster)
- **Contamination-Resistant Benchmarks (#365, 2605.19999)** and
  **PeerBench / Benchmarking is Broken (#366, 2510.07575)**: the position-paper
  case that benchmark scores reflect recall not generalization; ALE is the
  empirical instance — a fresh, contamination-resistant benchmark where the
  recall advantage evaporates.

---

## REBUTTALS

### Known Direct Rebuttals
No direct arXiv rebuttal found (Jun 2026, recent). Searches: local corpus — no
contradicting paper; arXiv/citation graph — too recent.

### Indirect Counter-Evidence / Tension
1. **A capability optimist could argue scale closes it.** Near-Term tasks already
   reach ~30-42%; an optimist reads the tiers as a normal capability frontier
   that scaling will saturate, not evidence of a categorical reasoning gap. The
   paper's own framing ("living benchmark," headroom) is compatible with that
   reading. The thesis-relevant point is narrower: *today's* difficulty inversion
   (saturated-hard ≫ novel-easy) is a distribution signal regardless of future
   scaling.
2. **GCUA harness lifting is imperfect** — GUI-as-Tool may under-serve genuinely
   vision-heavy tasks, so some "reasoning" failures could be perception failures.
   The authors mitigate via the model-vs-harness decomposition (harness explains
   little), but the confound is not fully eliminated.
3. **Single-config failure taxonomy** limits how strongly the 78% can be
   generalized across all agents.

### Limitations Authors Acknowledge
1. Public subset over-weights hardest tier (mitigated, r = 0.89).
2. 5-hour cap; timeout runs score lower (mean 20.8 vs 27.7).
3. Failure taxonomy run on one configuration only.
4. Gate-and-score forces 0 on partial progress.
5. GUI-as-SubAgent reserved for non-vision models — configuration asymmetry.

---

## Key Quotes

> "Current results confirm that ALE is far from saturated: the strongest configuration (Codex with GPT-5.5), which already achieves 82% on Terminal-Bench, scores below 50% even on ALE's easiest tier and under 10% on the hardest; most mainstream agents, including Claude Code, record near-zero pass rates at that difficulty level."

> "Understanding and Approach failures together account for roughly three quarters of cases, indicating that the dominant bottleneck is domain knowledge rather than execution capability."

> "Lacking specialized knowledge, agents default to ad-hoc scripts instead of the intended domain software, reinforcing the GUI-underutilization pattern above."

> "GUI usage remains below task demand: 34% of public task instances designate graphical software as the primary tool, yet the GUI share stays small across most configurations, as agents execute GUI tasks through Bash/CLI substitutes."

> "The dominant factor is the foundation model's reasoning and domain knowledge, which aligns with the failure analysis in Section 4.2, where Understanding and Approach errors (both rooted in model capability) constitute the majority of failures."

> "Frontier agents clear only a small fraction today; we release ALE as an instrument for closing the gap between benchmark success and GDP-relevant impact, where saturation would signal that agents can sustain the long-horizon, tool-intensive work professional practice actually requires."

---

## Status
- [x] Read complete (full HTML; body + Appendices C-D via task agent)
- [x] Core claims extracted with verbatim quotes
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Rebuttals checked (corpus + arXiv)
- [x] Paper graph updated

---

## Critical Note for Thesis

Cite ALE as the corpus's strongest *ordinary-competence* evidence: a fresh,
contamination-resistant benchmark of real professional workflows where agents
that score 82% on a saturated benchmark score 0% on the hardest tier. The
thesis-critical findings: (1) performance tracks distributional exposure, not
intrinsic difficulty (saturated-hard ≫ novel-easy is the benchmaxxing tell);
(2) ~78% of failures are reasoning/knowledge (Understanding + Approach), only
22% execution — the gap is upstream of tool use; (3) the backbone model drives
~3× the spread of the harness, so the gap is the model's reasoning, not the
scaffolding. Do NOT cite it as a mechanism result — it shows the symptom
cleanly; the causal account lives in the mechanism cluster.
