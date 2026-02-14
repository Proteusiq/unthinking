# Rebuttals & Counter-Evidence Matrix

> **Last updated**: 2026-02-14
> **Papers analyzed**: 192
> **See also**: `memento.md` for rebuttal status summary

This document tracks rebuttals **in both directions**:
- Rebuttals to "Against" papers (challenging pattern-matching thesis)
- Rebuttals to "For" papers (challenging genuine reasoning thesis)

---

## Rebuttals to "AGAINST" Papers

### 1. The Illusion of Thinking (2506.06941) — **3 REBUTTALS (1 COUNTER-REBUTTED)**

| Rebuttal | arXiv | Core Argument | Validity | Counter-Evidence |
|----------|-------|---------------|----------|------------------|
| **Lawsen** | 2506.09250 | Token limits exceeded; River Crossing N>5 mathematically impossible; alternative representations restore performance | HIGH | None |
| **Khan et al. (Agentic Gap)** | 2506.18957 | Execution gap, not reasoning gap; with tools, models solve beyond cliff | **CHALLENGED** | Limits of Innate Planning (2511.21591) |
| **Song et al. (Thinking Isn't Illusion)** | 2507.17699 | Tool augmentation: Hanoi 0%→100%, River Crossing →98.3% | **QUALIFIED** | Limits of Innate Planning shows tools don't always help |

**Assessment**: Original paper has methodological issues, but the "Agentic Gap" rebuttal is itself challenged by "Limits of Innate Planning" which shows 0% success even with move validator.

---

### 2. GSM-Symbolic (2410.05229) — **NO DIRECT REBUTTAL FOUND**

However, implicit counter-evidence exists:
- DeepSeek-R1 achieves 97.3% on MATH500 (higher than GSM-Symbolic's test set)
- s1 shows robust performance with minimal training

**Assessment**: Paper's core findings (fragility to irrelevant info) remain unrebutted.

---

### 3. Faith and Fate (2305.18654) — **NO DIRECT REBUTTAL FOUND**

Theoretical foundation remains unchallenged:
- "Linearized subgraph matching" mechanism not disputed
- Exponential error accumulation predictions confirmed by multiple papers

**Assessment**: Foundational theory stands. Strongest "Against" paper.

---

### 4. CoT Mirage (2508.01191) — **NO DIRECT REBUTTAL FOUND**

DataAlchemy methodology appears sound:
- Controlled ID/OOD experiments
- ID=100%, OOD=0% finding is stark

**Assessment**: Distribution-dependence claim robust.

---

### 5. Measuring Faithfulness (2307.13702) — **EXTENSIONS, NOT REBUTTALS**

Related work that builds on (not rebuts) findings:
| Paper | arXiv | Contribution |
|-------|-------|--------------|
| FUR (Unlearning) | 2502.14829 | New method to measure faithfulness via unlearning |
| FRIT | 2509.13334 | Method to *improve* faithfulness (implies problem is real) |

**Assessment**: Unfaithfulness finding is accepted; work focuses on fixing it.

---

### 6. Semantic Deception (2512.20812) — **NO DIRECT REBUTTAL FOUND**

Simple, controlled experiment:
- Novel symbol systems with semantic load
- Reasoning models fail MORE than base models

**Assessment**: Finding robust within experimental scope.

---

### 7. Reasoning Models Don't Say (2505.05410) — **NO DIRECT REBUTTAL FOUND**

Anthropic's own research:
- 25-40% faithfulness across models
- Misaligned hints hidden MORE

**Assessment**: Strong internal validity. Industry acknowledges problem.

---

## Rebuttals to "FOR" Papers

### 1. CoT Without Prompting (2402.10200) — **IMPLICIT CHALLENGES**

| Challenge | Source | Argument |
|-----------|--------|----------|
| CoT exists but is unfaithful | Measuring Faithfulness, Don't Say | Intrinsic CoT doesn't mean faithful CoT |
| Distribution-dependent | CoT Mirage | CoT paths may only exist for in-distribution |
| Post-hoc rationalization | Semantic Deception | Even if CoT exists, it may not drive decisions |

**Assessment**: Finding (CoT exists) is valid, but interpretation (genuine reasoning) is challenged.

---

### 2. DeepSeek-R1 (2501.12948) — **MULTIPLE CRITIQUES**

| Critique | Evidence | Implication |
|----------|----------|-------------|
| Still fails on OOD | CoT Mirage, Illusion | "Aha moments" may be within-distribution only |
| CoT unfaithful | Don't Say (tests R1) | R1's CoT only 39% faithful |
| Semantic override | Semantic Deception (tests R1) | R1 fails MORE on semantic traps than base |
| Training data leakage | General concern | AIME/MATH in training data |

**Assessment**: Impressive results, but "genuine reasoning" interpretation challenged.

---

### 3. s1: Simple Test-Time Scaling (2501.19393) — **IMPLICIT LIMITATIONS**

| Limitation | Evidence | Implication |
|------------|----------|-------------|
| Distribution-dependent | Requires 50 MSC categories | "Surfacing" still needs coverage |
| Eventually saturates | Budget forcing loops | Can't extrapolate indefinitely |
| Distillation from Gemini | Methodology | Success may depend on teacher |

**Assessment**: "Surfacing" hypothesis supported, but still distribution-bounded.

---

### 5. Comment: Agentic Gap (2506.18957) — **DIRECTLY CHALLENGED**

| Challenge | Source | Evidence |
|-----------|--------|----------|
| **Tools don't always work** | Limits of Innate Planning (2511.21591) | Move validator = 0% success |
| **Execution ≠ bottleneck** | Limits of Innate Planning | Execution offloaded, still fail |
| **SOTA models fail with tools** | Limits of Innate Planning | GPT-5-Thinking loops 100% |

**Assessment**: The "Agentic Gap" argument (execution vs reasoning distinction) is **directly refuted** by "Limits of Innate Planning". The external move validator test removes execution burden entirely, yet ALL models fail (0% success). GPT-5-Thinking loops 100% even when given only valid moves.

**Implication for thesis**: Cannot simply rely on tool augmentation rebuttals. The problem is planning/reasoning, not just execution.

---

### 4. Thinking Isn't an Illusion (2507.17699) — **COUNTER-COUNTER EVIDENCE (STRONG)**

| Counter-argument | Source | Implication |
|------------------|--------|-------------|
| Tool use ≠ reasoning | Conceptual | Following tools ≠ understanding |
| Tools provide algorithm | Lawsen observation | Model executes, doesn't derive |
| Still unfaithful with tools | Don't Say | CoT remains unreliable |
| **Move validator = 0% success** | **Limits of Innate Planning** | **Tool augmentation doesn't always work** |
| **GPT-5-Thinking loops 100%** | **Limits of Innate Planning** | **SOTA models fail even with tools** |

**Assessment**: Execution fixed for Hanoi/River Crossing, but 8-puzzle with move validator shows tool augmentation is NOT a general solution. "Genuine reasoning" remains questionable.

---

### 5. Emergence of Strategic Reasoning (2412.13013) — **COUNTER-ARGUMENT DEVELOPED**

| Counter-argument | Source | Implication |
|------------------|--------|-------------|
| Games are in training distribution | Authors acknowledge | Behavioral economics literature is vast |
| **Performance drops for p=4/3** | **Authors' own data** | **Cannot adapt to unusual parameters** |
| Exceeding human τ ≠ understanding | Conceptual | May pattern-match optimal solutions |
| No truly novel games tested | Methodology gap | Would likely fail on OOD games |

**Key quote from authors**: "LLMs are vastly trained on pBCGs which involve iterating downward"

**Our counter-argument**:
> Strategic reasoning in LRMs reflects sophisticated pattern completion within the behavioral economics literature, not genuine strategic understanding. The performance drop for unusual parameters (p=4/3) reveals the distribution boundary — models excel at games similar to training data but cannot extrapolate to variations.

**Assessment**: Strong "FOR" evidence that must be acknowledged, but the p=4/3 performance drop directly supports the thesis that reasoning is bounded by training distribution.

---

### 6. DeepSeek-R1 / s1 / "Surfacing" Claims — **SUPPORTED BUT BOUNDED**

| Counter-argument | Source | Implication |
|------------------|--------|-------------|
| **RL cannot create from void** | **Interplay (2512.07783)** | **0% exposure = RL fails** |
| **Controlled experimental proof** | **Interplay paper** | **Surfacing confirmed, not creation** |
| Distribution-bounded | CoT Mirage | Success depends on training coverage |
| Still unfaithful | Don't Say (tests R1) | R1's CoT only 39% faithful |

**Key quote from Interplay paper**: "RL cannot synthesize capabilities from a void; it requires latent 'seeds' to amplify"

**Assessment**: The "surfacing" hypothesis is CONFIRMED by controlled experiments. RL helps, but only when primitives exist from pre-training. This supports the thesis that capabilities are bounded by training distribution.

---

## Summary: Rebuttal Landscape (Updated)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    REBUTTAL LANDSCAPE (2026-02-10)                          │
│                                                                             │
│  AGAINST PAPERS                          FOR PAPERS                         │
│  ──────────────                          ──────────                         │
│                                                                             │
│  Illusion of Thinking ←───────────────→ Thinking Isn't Illusion            │
│  [3 rebuttals exist]                     [counter-counter from Limits]      │
│                                                                             │
│  Limits of Innate Planning ────────────→ Comment: Agentic Gap               │
│  [refutes Agentic Gap]                   [REFUTED by Limits paper]          │
│                                                                             │
│  Faith and Fate ←─────────────────────→ DeepSeek-R1                         │
│  [NO rebuttal, strong]                   [multiple critiques]               │
│                                                                             │
│  GSM-Symbolic ←───────────────────────→ s1 Simple Scaling                   │
│  [NO rebuttal, solid]                    [limitations acknowledged]         │
│                                                                             │
│  Measuring Faithfulness ←─────────────→ CoT Without Prompting               │
│  [extensions confirm problem]            [faithful? challenged]             │
│                                                                             │
│  CoT Mirage ←─────────────────────────→ (no direct counter)                 │
│  [NO rebuttal, robust]                                                      │
│                                                                             │
│  Semantic Deception ←─────────────────→ (no direct counter)                 │
│  [NO rebuttal, controlled]                                                  │
│                                                                             │
│  Don't Always Say ←───────────────────→ (no direct counter)                 │
│  [NO rebuttal, Anthropic's own]                                             │
│                                                                             │
│  Interplay (2512.07783) ──────────────→ "Surfacing" claims                  │
│  [CONFIRMS surfacing, bounds it]         [Now has controlled evidence]      │
│                                                                             │
│  (our counter-argument) ──────────────→ Strategic Reasoning (2412.13013)    │
│  [p=4/3 drop = distribution limit]       [Acknowledged by authors]          │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                      "MIRROR" REBUTTAL (NEW)                                │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  Mind Your Tone: Rude=WORSE ←─ OPPOSITE ─→ Mind Your Tone: Rude=BETTER     │
│  (2402.14531) Llama2: -48.5%               (2510.04950) GPT-4o: +4.0%       │
│                                                                             │
│  Same question, same methodology, OPPOSITE conclusions                      │
│  → LLMs are mirrors: behavior reflects training, not principles             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

KEY UPDATES:
1. "Mirror" Rebuttal (Papers 188 & 190): STRONGEST evidence for pattern matching
   - Same research question: "Does tone affect LLM performance?"
   - Opposite findings: Rude = WORSE (Llama2) vs Rude = BETTER (GPT-4o)
   - Implication: "LLMs are mirrors — you find what you look for"

2. "Interplay" (2512.07783): CONTROLLED proof that RL surfaces, doesn't create
   - 0% exposure = RL fails; ≥1% = success
   - "RL cannot synthesize capabilities from a void"
   
3. "Strategic Reasoning" counter-argument developed:
   - Performance drops for unusual parameters (p=4/3)
   - Games are in behavioral economics training distribution
   - Authors acknowledge: "LLMs are vastly trained on pBCGs"
```

---

## Implications for Thesis

### Strongest "Against" Evidence (Unrebutted)
1. **Faith and Fate** — Theoretical foundation stands
2. **CoT Mirage** — ID=100%, OOD=0% unchallenged
3. **Measuring Faithfulness** — CoT unfaithfulness accepted
4. **Semantic Deception** — Semantic override demonstrated
5. **Don't Always Say** — 25-40% faithfulness confirmed
6. **Limits of Innate Planning** — 0% with move validator; GPT-5-Thinking loops 100%
7. **AI Metacognition (2411.02478)** — Bengio, Mitchell et al.: "Smart but not wise"; lacks metacognition (reasoning about reasoning)
8. **On the Notion that LMs Reason (2511.11810)** — NeurIPS 2025 Workshop: LMs as Markov kernels; "reasoning" = statistical regularities; explicitly defends "statistical pattern matchers"
9. **Reasoning or Reciting (2307.02477)** — NAACL 2024; foundational counterfactual methodology; 11 tasks; high CCC + low CF = models understand but can't reason; "narrow, non-transferable procedures"
10. **Gaming the Judge (2601.14691)** — CoT manipulation inflates FPR by up to 90%; judges pattern-match on style not content; even thinking models (o4-mini, Claude-Thinking) fooled
11. **Beyond Memorization (2601.13392)** — 100% knowledge accuracy but 30-64pp drops on unseen DFA tasks; "pattern retrieval rather than robust symbolic reasoning"; CoT actually degrades performance
12. **o1 on PlanBench (2409.13373)** — Kambhampati Sep 2024: Even o1 fails — 97.8% Blocksworld → 52.8% Mystery BW → 23.6% on 20+ steps; reasoning models don't solve the planning problem

### Weakened "Against" Evidence
1. **Illusion of Thinking** — Methodological critiques valid; must qualify

### Strongest "For" Evidence
1. **CoT exists intrinsically** — But may be unfaithful
2. **RL surfaces capability** — But still distribution-bounded
3. ~~Tool augmentation works~~ — **WEAKENED by Limits of Innate Planning**

### Weakened "For" Evidence (NEW)
1. **Agentic Gap / Tool augmentation** — Directly refuted by Limits of Innate Planning
   - Move validator = 0% success
   - Execution vs reasoning distinction doesn't hold for planning

### Key Unresolved Questions
1. ~~Does tool success prove reasoning or just competent execution?~~ **Partially resolved**: Tool success doesn't always occur, even when execution is offloaded
2. Is "surfaced" reasoning genuine or sophisticated pattern completion?
3. Can unfaithful CoT coexist with genuine internal reasoning?
4. Why does tool augmentation work for some tasks (Hanoi) but not others (8-puzzle)?

---

## Revised Thesis Position (Accounting for Rebuttals) — UPDATED 2026-02-10

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              THESIS AFTER REBUTTAL ANALYSIS (2026-02-10)                    │
│                                                                             │
│  CONFIDENT CLAIMS (unrebutted, strong evidence):                            │
│  ✓ CoT is often unfaithful (7-13% on natural prompts, 25-40% overall)       │
│  ✓ Success is distribution-dependent (CoT Mirage: ID=100%, OOD=0%)          │
│  ✓ Semantic associations override instructions (Semantic Deception)         │
│  ✓ Reasoning patterns pre-exist in base models (s1, CoT-WP)                 │
│  ✓ Planning fails even with tools (Limits: 0% with move validator)          │
│  ✓ RL SURFACES, DOESN'T CREATE (Interplay: 0% exposure = fail)              │
│  ✓ Strategic reasoning is distribution-bounded (p=4/3 drop)                 │
│  ✓ BEHAVIOR IS MODEL-SPECIFIC PATTERN MATCHING (Mirror rebuttal) [NEW]      │
│                                                                             │
│  QUALIFIED CLAIMS:                                                          │
│  ~ "Reasoning collapse" may be execution limit FOR SOME TASKS               │
│    (Hanoi/River Crossing yes, 8-puzzle no)                                  │
│  ~ Tool augmentation reverses SOME failures (task-dependent)                │
│  ~ Strategic reasoning exceeds humans ON KNOWN GAMES                        │
│                                                                             │
│  RESOLVED CLAIMS (previously contested):                                    │
│  ✗ Tool success ≠ proof of genuine reasoning (Limits: 0% even with tools)   │
│  ✗ Strategic reasoning ≠ genuine understanding (p=4/3 reveals limit)        │
│  ✗ LLM behavior is consistent across models (Mirror: opposite findings)     │
│  ✓ Surfacing hypothesis CONFIRMED (Interplay: controlled experiments)       │
│                                                                             │
│  REMAINING QUESTIONS:                                                       │
│  ? Whether "Aha moments" are reasoning or pattern recognition               │
│  ? Whether unfaithful CoT is compatible with genuine internal reasoning     │
│  ? Why tools help for some tasks (Hanoi) but not others (8-puzzle)          │
│                                                                             │
│  KEY EVIDENCE:                                                              │
│  • "MIRROR" REBUTTAL (Papers 188 & 190): Same question, opposite answers    │
│    Rude prompts: -48.5% (Llama2) vs +4.0% (GPT-4o)                          │
│    → "LLMs are mirrors — behavior reflects training, not principles"        │
│  • Interplay (2512.07783): 0% exposure = RL fails; ≥1% = success            │
│    "RL cannot synthesize capabilities from a void"                          │
│  • Strategic Reasoning (2412.13013): τ=4.42 BUT p=4/3 causes failure        │
│    Authors: "LLMs are vastly trained on pBCGs"                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```


---

## New Evidence from Papers 180-190 (2026-02-09 to 2026-02-10)

### Paper 180: Contextual Drag (2602.04288)

**Challenges**: Self-improvement literature (e.g., Madaan et al. Self-Refine)

**Key evidence**:
- 10-20% drops across 11 models when conditioned on incorrect drafts
- Tree edit distance proves **structural inheritance** of errors
- Self-improvement via reflection fundamentally challenged
- "Iterative self-refinement in models with severe contextual drag can collapse into self-deterioration"

**Assessment**: Directly challenges the assumption that models can learn from mistakes.

### Paper 181: No Global Plan in CoT (2602.02103)

**Challenges**: Claims of internal planning in LLMs

**Key evidence**:
- Final-answer probing at random (50%) until LAST step
- No global plan — only myopic, incremental transitions
- "Wooden Barrel" principle: reliability determined by few pivot positions

**Assessment**: Mechanistic evidence against global planning in LLMs.

### Paper 182: LMs Struggle to Use ICL Representations (2602.04212)

**Challenges**: ICL enables genuine learning

**Key evidence**:
- LLMs encode novel semantics but CANNOT deploy them
- Representations are "inert" — exist but not causally used
- Even GPT-5 and Gemini-2.5 collapse on 2D grid topologies

**Assessment**: Smoking gun for pattern matching. Encoding ≠ understanding.

### Paper 183: Dot by Dot (2404.15758)

**Challenges**: CoT as reasoning mechanism

**Key evidence**:
- Filler tokens ('......') can replace meaningful CoT
- Benefits from additional compute, not task decomposition
- 100% vs 66% on 3SUM with fillers vs without

**Assessment**: CoT value may be computational, not semantic.

### Paper 184: Brain Rot (2510.13928)

**Key evidence**:
- Junk data causes LASTING cognitive decline (ARC-Challenge 74.9%→57.2%)
- "Thought-skipping" as primary lesion
- Partial healing only — persistent representational drift

**Assessment**: Training data quality directly determines reasoning patterns.

### Papers 188 & 190: THE "MIRROR" REBUTTAL — **CRITICAL**

| Paper | arXiv | Finding | Model | Effect |
|-------|-------|---------|-------|--------|
| **Paper 188**: Mind Your Tone (Yin et al.) | 2402.14531 | Rude prompts = **WORSE** | Llama2-70B, GPT-3.5 | **-48.5%** (Llama2) |
| **Paper 190**: Mind Your Tone (Bai et al.) | 2510.04950 | Rude prompts = **BETTER** | GPT-4o | **+4.0%** (84.8% vs 80.8%) |

**This is not a methodological dispute — both papers are well-executed.**

**The "Mirror" Insight**:
> Same research question → Same methodology → **OPPOSITE conclusions**
> 
> The difference? Which model you test on.

**Why this STRONGLY SUPPORTS the pattern-matching thesis**:
1. If LLMs had genuine understanding of tone, the effect should be consistent
2. Instead, tone sensitivity depends on **what patterns were reinforced during RLHF**
3. Llama2 was trained to respond negatively to rudeness; GPT-4o was trained differently
4. **LLMs are mirrors — they reflect their training distribution, not stable reasoning**

**Assessment**: This pair provides perhaps the clearest evidence that LLM behavior is learned pattern matching, not principled reasoning. The fact that the same input feature (tone) produces opposite effects based purely on model training history is a "smoking gun" for the thesis.

### Paper 189: Confidence Paradox (2506.23464)

**Key evidence**:
- DocVQA models produce overconfident wrong answers
- ~20% confidence-accuracy gap in base models
- Models don't intrinsically "know" when they're wrong
- HonestVQA framework reduces overconfidence by 35-40%

**Assessment**: Calibration requires external training — models lack intrinsic metacognition.

---

## NEW: "Mirror" Rebuttals Section

Papers that reach **opposite conclusions** on the same question, revealing model-specific learned patterns:

| Question | Paper A | Paper B | Resolution |
|----------|---------|---------|------------|
| Does tone affect performance? | Mind Your Tone (2402.14531): Rude = WORSE | Mind Your Tone (2510.04950): Rude = BETTER | **Model-dependent** — RLHF determines sensitivity |

**Implication**: When studies reach opposite conclusions depending only on which model is tested, this reveals that behavior is learned pattern matching, not principled reasoning.

---

## Updated Summary

| Category | Count | Notes |
|----------|-------|-------|
| Papers analyzed | 191 | +9 from last update |
| Direct rebuttals identified | 13 | +1 (Mirror rebuttal) |
| Counter-rebuttals identified | 3 | Unchanged |
| "Mirror" rebuttals (opposite findings) | 1 | **NEW CATEGORY** |
| Remaining contested claims | 3 | Unchanged |

---

*Last updated: 2026-02-10*

