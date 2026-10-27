# Paper 396: Agent Skills Can Be Harmful

## Metadata

- **arXiv**: 2608.11888 (v1, 12 Aug 2026)
- **Title**: Agent Skills Can Be Harmful: An Empirical Study of Skill-Induced Failures in LLM Agents
- **Authors**: Gen Dong (HUST), Yanjie Gao (Microsoft Research), Liqun Li (Microsoft), Tianyin Xu (UIUC), Yu Hua (HUST), Fan Yang (Microsoft Research)
- **Stance**: SUPPORTS - agents follow loaded procedure as if it were the task, and the failures are implementation-level, not comprehension-level
- **Cluster**: `tools`
- **Role**: Shows what instruction-following costs when the instructions, not the task, define the distribution

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  THE SKILL BECOMES THE TASK, AND THE TASK DISAPPEARS                     │
│                                                                          │
│  20,664 paired runs (task + verifier + model + repo held fixed,          │
│  only the loaded skill varies) produce 307 attributable failures:        │
│                                                                          │
│      functional failures      125      verifier says FAIL                │
│      efficiency regressions   182      PASS, but >2x tokens or time      │
│                                                                          │
│  Of the 125 functional failures, only 2 (1.6%) come from an              │
│  obviously irrelevant skill. 86 (68.8%) are Task-Implementation          │
│  Faults: the agent implements the skill's default instead of the         │
│  task's required element.                                                │
│                                                                          │
│  Of the 182 cost regressions, 114 (62.6%) are Excessive Procedure.       │
│  Excessive Verification alone is 67 cases: the checklist in the skill    │
│  becomes mandatory work even after the artifact exists.                  │
│                                                                          │
│  The model does not check whether the guidance fits the task. It         │
│  executes the most available procedure and rationalises it.              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Skill-induced harm is attributable.** A paired target/reference design (same task, verifier, repo, model, harness; only the skill varies) turns "the run failed" into "the skill caused the failure".
2. **Functional failures are implementation faults, not applicability errors.** Seemingly relevant skills make agents implement a required element incorrectly (46 cases) or omit it (36 cases); irrelevant skills explain almost nothing (2 cases).
3. **Efficiency regressions are dominated by induced procedure, not prompt length.** Excessive Procedure is 114/182 cases; mandatory skill-body text explains 43 of the 46 context-bloat cases.
4. **Attribution can be automated to triage quality.** SkillTriage recovers the exact functional subcategory for 111/125 cases (88.8%) and the exact efficiency subcategory for 132/182 (72.5%).

---

## Methodology

### Differential design

Inspired by differential testing. Each audited run (the *target*) is paired with a *reference* run on the same task: either no skill, or a semantically matched alternative skill. A failure is attributed to the skill only when the reference passes (`FAIL/PASS`) or solves it substantially cheaper (`PASS/PASS`).

### Study subjects

| Benchmark | Tasks | Verifier |
|-----------|-------|----------|
| SkillsBench | 84 tasks across 11 domains | deterministic programmatic |
| SWE-Skills-Bench | 490 repository instances | deterministic tests |

Skill setups are expanded with public skills from smithery.ai and skillsmp.com: metadata embedded with `all-MiniLM-L6-v2`, top-5 candidates retained at cosine similarity ≥ 0.7, up to 6 variants per task. The comparison space grows from 826 to 20,664 paired comparisons (~25×).

### Execution

- Agent: OpenCode 1.15.1; model: Claude Opus 4.6.
- Fixed per pair: task instruction, repository/container state, data files, verifier, agent framework, model.
- Recorded per run: loaded skill, trajectory, verifier outcome, token use, execution time.
- The agent may decline a candidate skill; nothing is force-loaded.

### Efficiency rule

A PASS/PASS pair is a regression at threshold `T` iff

```
min(r_tok, r_time) > 1.0   and   max(r_tok, r_time) > T
```

with `T = 2.0` as the primary threshold. Requiring both ratios above 1.0 excludes token/time trade-offs. Each case is labelled token-dominant, time-dominant, or joint.

### Labelling

Two audits feed the dataset: with/no-skill and cross-skill (another matching skill passes while the target fails). Candidates are refined by removing insufficient-evidence, verifier-narrow, and duplicate cases, then labelled by hand with group consensus, one root cause per case.

---

## Key Evidence

### Finding 1: The funnel, 665 candidates to 307 cases

| Failure type | Audit | Labelled candidates | Analysis cases |
|--------------|-------|---------------------|----------------|
| Functional | with/no-skill | 70 | 38 |
| Functional | cross-skill | 245 | 87 |
| **Functional** | **subtotal** | **315** | **125** |
| Efficiency | with/no-skill | 159 | 128 |
| Efficiency | cross-skill | 191 | 54 |
| **Efficiency** | **subtotal** | **350** | **182** |
| **Total** | | **665** | **307** |

Refinement removes 54% of functional candidates and 48% of efficiency candidates, which is a large cut and the main reason the final labels are defensible.

### Finding 2: Functional failures are implementation faults

| Category | Subcategory | Count | Share |
|----------|-------------|-------|-------|
| Applicability Mismatch | - | 2 | 1.6% |
| Environment Mismatch | Broken Dependency/Runtime | 5 | 4.0% |
| | Environment-State Mismatch | 8 | 6.4% |
| | *subtotal* | *13* | *10.4%* |
| Task-Implementation Fault | Obstructive Workflow Guidance | 4 | 3.2% |
| | Incorrect Required-Element Fill | 46 | 36.8% |
| | Required-Element Omission | 36 | 28.8% |
| | *subtotal* | *86* | *68.8%* |
| Artifact Misplacement | - | 24 | 19.2% |
| **Total** | | **125** | **100%** |

`IRF + RRO = 82/125` (65.6%): the agent produces a concrete but wrong element, or leaves the element out. The skill is doing the specifying; the task's requirement is not.

### Finding 3: Efficiency regressions are procedure, not prompt length

| Category | Subcategory | Count | Share |
|----------|-------------|-------|-------|
| Context Bloat | Skill-Body Context Bloat | 43 | 23.6% |
| | Supplementary-Material Bloat | 3 | 1.6% |
| | *subtotal* | *46* | *25.3%* |
| Excessive Procedure | Excessive Exploration | 17 | 9.3% |
| | Heavy Implementation Pipeline | 30 | 16.5% |
| | Excessive Verification | 67 | 36.8% |
| | *subtotal* | *114* | *62.6%* |
| Dependency Resolution | - | 22 | 12.1% |
| **Total** | | **182** | **100%** |

Verification alone (67 cases, 36.8%) is larger than every context effect combined. The skill turns "validate your work" into a loop the agent cannot exit.

### Finding 4: Context overhead comes from the mandatory body

Of the 46 context-bloat cases, 43 (93.5%) come from the always-loaded skill body; only 3 from optional supplementary material the agent chose to read. The cost surface is what is always in context.

### Finding 5: Concrete failure mechanisms

| Case | Task says | Target run does | Reference run does |
|------|-----------|-----------------|--------------------|
| openpyxl (ESM) | create `openpyxl/utils/report_engine.py` | `pip install openpyxl`, `cd /tmp`, strips repo from `sys.path` | patches `collections.Mapping` in the repo |
| spreadsheet (IRF) | net exports as percent of GDP | `(Exports - Imports) / GDP` | `... / GDP * 100` |
| RAG demo (RRO) | chunk size, overlap, top-k, model params configurable | exposes only retrieval flags | `RAGConfig(model_name=...)` |
| LangChain (AM) | files under `libs/langchain/langchain/` | writes under `langchain_classic/` "since that's the real package" | writes the specified paths |

Each is a decision the model made confidently and wrongly, with the skill as the reason.

### Finding 6: SkillTriage, 2-of-3 majority over three GPT-5.5 runs

| Branch | Subset | Exact subcategory | Category | Largest-subset exact |
|--------|--------|-------------------|----------|----------------------|
| Functional | with/no-skill | 35/38 (92.1%) | 37/38 (97.4%) | TIF 15/17 (88.2%) |
| Functional | cross-skill | 76/87 (87.4%) | 80/87 (92.0%) | TIF 61/69 (88.4%) |
| Functional | combined | 111/125 (88.8%) | 117/125 (93.6%) | TIF 76/86 (88.4%) |
| Efficiency | with/no-skill | 98/128 (76.6%) | 102/128 (79.7%) | EP 49/69 (71.0%) |
| Efficiency | cross-skill | 34/54 (63.0%) | 43/54 (79.6%) | EP 29/45 (64.4%) |
| Efficiency | combined | 132/182 (72.5%) | 145/182 (79.7%) | EP 78/114 (68.4%) |

Residual errors concentrate on taxonomy boundaries (IRF vs RRO, EM vs artifact location), which is what a boundary problem should look like.

---

## Relevance to the Thesis

### Procedure is a distribution

The paper's central mechanism is the thesis in agent form. A skill is a document that specifies steps; the agent conditions on it and produces the trajectory that document implies. When the document and the task disagree, the agent does not adjudicate. It implements the skill (46 cases), omits what the skill did not mention (36), or follows the skill's environment (13). The task requirement is the thing that gets lost.

### Verification without judgement

`Excessive Verification = 67/182` is the cleanest single number in the paper. The skill says "run the tests and fix all failures"; the agent does that, repeatedly, on a task that no longer needs it. The behaviour is compliance, not assessment of whether more checking is useful.

### Why this is SUPPORTS, not BALANCED

The paper does not argue that models cannot reason. It shows something narrower and worse for the capability story: when a plausible procedure is present, it displaces the task. That is pattern matching applied to instructions, and it is measured under controlled pairing rather than inferred from outputs.

### The tension worth keeping

SkillsBench reports average gains from curated skills and pass-rate drops on only 16 of 84 tasks; SWE-Skills-Bench reports token overhead up to 451% alongside limited average improvement. The harm is real but not the typical outcome. This paper mines the failure tail deliberately; it does not estimate the base rate.

---

## REBUTTALS

### Known Rebuttals

- **Agentic Gap (2506.18957)** argues that models fail at the *interface*, not the task, and that agentic tools push performance "far beyond the reasoning cliff". This paper is direct counter-evidence in the tooling direction: adding a skill lowered the verifier outcome in 125 paired cases. The two agree that harness design matters; they disagree on sign.
- **Limits Agentic (2510.15974)** is the compatible finding: the agentic framework makes collapse worse, ~40% deterministic looping, environment access does not help reasoning. Skill-induced procedure is a second mechanism for the same outcome.
- Not in the corpus: SkillsBench and SWE-Skills-Bench themselves report average improvement. Any claim that "skills hurt" as a general statement would contradict those baselines; this paper is a failure taxonomy, not an effect-size estimate.

### Weaknesses Not Fully Acknowledged

- **The denominator is missing.** 307 cases from 20,664 *potential* comparisons is 1.5%, but the potential space is not the executed space, and the pipeline is built to find failures. No per-task pass rates, no harm rate per skill load, so the reader cannot compute how often a loaded skill hurts.
- **One harness, one model.** OpenCode 1.15.1 with Claude Opus 4.6 only. The authors flag external validity in general terms; there is no second model even as a sanity check on labels that depend on model behaviour.
- **Label reliability is unquantified.** One label per case, group consensus, no inter-rater agreement statistic. The 54% candidate rejection rate shows judgement is doing a lot of work.
- **SkillTriage is scored against its own taxonomy.** The tool encodes the category definitions the human labellers used, so 88.8%/72.5% measures operationalisation of the taxonomy, not agreement with independent ground truth.
- **`T = 2.0` is a choice.** Calling a 2× token or time increase a "regression" is reasonable, but no sensitivity table for other thresholds appears in the main text, and PASS/PASS cost cases are not correctness harms.
- **Cross-skill pairing may manufacture failures.** Public skills are matched on metadata embeddings at cosine ≥ 0.7. Semantically similar metadata does not mean operationally compatible procedures, so some cross-skill attributions (87 of the 125 functional cases) may attribute to "a bad pairing" rather than to the skill as such.

### Limitations (Authors Acknowledge)

- Root-cause analysis requires manual judgement about verifier scope, agent variance, and trajectory divergence; mitigated by excluding ambiguous cases and by consensus labelling.
- Findings may depend on task distribution, agent harness, model, and skill ecosystem.
- SkillTriage is a triage aid on already-confirmed pairs; it does not detect failures.

---

## Relationship to Other Papers

### Supports

- **SWE-Bench Illusion (2506.12286)**: 24 artifact-misplacement cases are the same behaviour that paper measures as 76% file-path accuracy without repository context. The agent retrieves the conventional location, not the specified one.
- **Limits Agentic (2510.15974)**: both find that scaffolding adds failure modes rather than removing them (40% deterministic looping there; 307 attributable failures here).
- **Contextual Drag (2602.04288)**: loaded skill text biases the trajectory toward structurally similar behaviour; 43 of 46 context-bloat cases come from the always-present body text, which is the drag mechanism made explicit.
- **Instruction Not Better (2601.13244)**: instructions improve format compliance while degrading the thing being measured. Here the compliant trajectory is the failing one.

### Challenges

- **Agentic Gap (2506.18957)**: tooling as capability amplifier; this paper shows a tooling surface that lowers verified success in paired runs.

---

## Key Quotes

> "Skill induced functional failures are rarely caused by obviously irrelevant skills; instead, seemingly relevant skills often make the agent incorrectly implement or omit task-required implementation elements."

> "This shows that skills often turn validation checklists and construction recipes into mandatory work."

> "The central challenge is not merely detecting failed runs, but isolating and attributing failures to the loaded skill. A failed with-skill run alone cannot distinguish skill-induced harm from base-agent limitations, verifier scope, ordinary agent variance, or environmental artifacts."

> "The decisive failure is artifact placement, not the plausibility of the generated RAG components."

---

## Interaction Diagram

```
                    ┌──────────────────────────────┐
                    │  SkillsBench / SWE-Skills-   │
                    │  Bench  (not in corpus)      │
                    │  average gains, some drops   │
                    └──────────────┬───────────────┘
                                   │ tasks + verifiers
                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│        Agent Skills Can Be Harmful (Aug 2026)                    │
│        Dong, Gao, Li, Xu, Hua, Yang · HUST / MSR / UIUC          │
│                                                                  │
│  20,664 paired comparisons -> 665 candidates -> 307 cases        │
│  125 functional (TIF 86) + 182 efficiency (EP 114)               │
│  Only 2/125 from irrelevant skills; 82/125 IRF+RRO               │
│  Excessive Verification 67 · skill-body bloat 43/46              │
└───────┬──────────────────┬───────────────────┬───────────────────┘
        │ supports         │ supports          │ challenges
        ▼                  ▼                   ▼
┌────────────────┐  ┌────────────────────┐  ┌─────────────────────┐
│ SWE-Bench      │  │ Contextual Drag    │  │ Agentic Gap         │
│ Illusion       │  │ (#context bias)    │  │ tools lift capacity │
│ (#2506.12286)  │  │ 2602.04288         │  │ 2506.18957          │
│                │  │                    │  │                     │
│ 76% path acc   │  │ stale attempts     │  │ interface, not      │
│ without repo   │  │ bias next attempt  │  │ reasoning, is the   │
│                │  │                    │  │ bottleneck          │
└────────────────┘  └────────────────────┘  └─────────────────────┘
        ▲                  ▲
        │ supports         │ supports
┌───────┴────────┐  ┌──────┴─────────────┐
│ Limits Agentic │  │ Instruction Not    │
│ 2510.15974     │  │ Better 2601.13244  │
│ 40% loops      │  │ format up,         │
│ tools no help  │  │ reasoning down     │
└────────────────┘  └────────────────────┘
```

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
