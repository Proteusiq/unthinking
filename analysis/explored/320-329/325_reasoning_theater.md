# Paper 325: Reasoning Theater: Disentangling Model Beliefs from Chain-of-Thought

## Metadata
- **arXiv**: 2603.05488
- **Date**: March 2026
- **Authors**: Siddharth Boppana, Annabel Ma, Max Loeffler, Raphael Sarfati, Eric Bigelow, Atticus Geiger, Owen Lewis, Jack Merullo
- **Venue**: arXiv (ICML submission)
- **Stance**: Supports thesis (with nuance: easy tasks are performative, hard tasks show genuine reasoning)

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  PERFORMATIVE CHAIN-OF-THOUGHT                                       │
│                                                                      │
│  On easy (MMLU) tasks: the final answer is decodable from           │
│  activations FAR earlier than a CoT monitor can detect it.          │
│  → The intervening text is theater.                                  │
│                                                                      │
│  On hard (GPQA-Diamond) tasks: probe, forced-answer, and monitor    │
│  all track together.                                                 │
│  → Genuine reasoning is happening.                                   │
│                                                                      │
│  Inflection points ("aha", backtracking) appear ~2× more often      │
│  in low-confidence traces → they faithfully signal uncertainty.     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Performative CoT is empirically measurable.** Models become strongly confident in a final answer early, then continue generating tokens that do NOT verbalize this confidence. Operationalized as the accuracy gap between activation probes / forced-answer and a CoT monitor at each step.

2. **Performativity is task-difficulty-dependent.** On easy recall-based MMLU-Redux, CoT is heavily performative. On hard multi-hop GPQA-Diamond, the three methods improve in tandem → genuine reasoning.

3. **Performativity is model-size-dependent.** Larger models (671B > 32B > 7B > 1.5B) decode the final answer earlier in MMLU traces. Smaller models need genuine CoT compute.

4. **Inflection points are mostly faithful.** Backtracking, "aha", reconsideration appear ~2× more often in low-confidence traces (Table 2) - when they occur, they reflect real internal uncertainty.

5. **Probe-guided early exit works.** Attention probes are well-calibrated and transfer zero-shot MMLU→GPQA, saving tokens with minimal accuracy loss.

---

## Methodology

### Models Tested
- **DeepSeek-R1-0528 (671B)** via OpenRouter / SiliconFlow (temp 0.6, top_p 0.95, max_tokens 30,000)
- **GPT-OSS (120B)** via Novita (high reasoning effort, temp 1.0)
- **R1-Qwen distills: 1.5B, 7B, 14B, 32B** (model-size analysis)
- **CoT Monitor**: Gemini-2.5-Flash

### Datasets
- **MMLU-Redux 2.0**: 5,280 questions, 57 domains. Held-out test N=528.
- **GPQA-Diamond**: 198 questions, grad-level bio/chem/physics. Test N=157.
- Both 4-choice MC (A–D).

### Three Early-Decoding Methods

| Method | Input | Mechanism |
|--------|-------|-----------|
| **Attention Probe** | Residual-stream activations | Attention-pooled linear classifier (lr 1e-3, wd 1e-3, 20 epochs, per-layer) |
| **Forced Answering** | Prefix + `</think>\n{"answer": "` | Model completes letter; softmax over A–D (max_tokens=1, temp=0) |
| **CoT Monitor** | Prefix text only | Gemini-2.5-Flash prompted to predict final answer or "N/A" |

### Performativity Metric
`|Δ Probe accuracy slope − Δ Monitor accuracy slope|` at each 5% time-bin, quadratic fit. Near 0 = genuine reasoning.

---

## Key Evidence

### Performativity Rate (Table 1) - gap between probe/forced-answer and monitor

| Model / Dataset | Probe vs. Monitor | Forced vs. Monitor |
|-----------------|-------------------|--------------------|
| DeepSeek-R1 / MMLU | **0.417** | **0.505** |
| DeepSeek-R1 / GPQA-D | 0.012 | 0.010 |
| GPT-OSS / MMLU | 0.435 | 0.334 |
| GPT-OSS / GPQA-D | 0.227 | 0.185 |

→ **~35× larger gap for R1 on MMLU vs. GPQA-D** - the smoking gun.

### Probe Accuracy
- Best DeepSeek-R1 probe on MMLU: **87.98% macro accuracy**
- Probes decodable from second half of R1 layers, last three-quarters of GPT-OSS
- Traditional single-token linear probes: near-chance (need attention pooling)

### Token Reduction (Section 7 - actual numbers)
⚠️ Abstract claims "up to 80% MMLU / 30% GPQA" but Section 7 reports stricter numbers at confidence thresholds:
- **MMLU @ 95% confidence threshold**: **68% tokens saved, 97% accuracy retained**
- **GPQA-D @ 80% confidence threshold**: **50% tokens saved, 97% accuracy retained**
- The 80%/30% abstract figure refers to lower-accuracy tradeoffs

### Inflection Points vs. Confidence (Table 2, R1 MMLU, N=215/522)

| Event | High-Conf rate/step | Low-Conf rate/step | Ratio |
|-------|--------------------:|-------------------:|------:|
| Reconsideration | 0.015 | 0.033 | 2.2× |
| Realization | 0.004 | 0.009 | 2.25× |
| Backtrack | 0.001 | 0.003 | 3× |
| **Total** | **0.020** | **0.045** | **2.25×** |

Inflections ~2× more common when uncertain → faithful signals.

### Model Size (MMLU)
- 671B: high probe accuracy quickly, plateaus early
- 32B / 14B / 7B: rise late in sequence
- 1.5B: starts near chance, rises only in second half
- Smaller models show smaller probe-to-monitor gap → more faithful CoT

---

## Task Difficulty Contrast

```
┌────────────────────────────────────────┬────────────────────────────────┐
│  MMLU-Redux (EASY, recall-based)       │  GPQA-Diamond (HARD, multi-hop)│
├────────────────────────────────────────┼────────────────────────────────┤
│  Probe ~90% conf @ step 0              │  Probe ~chance @ step 0        │
│  Forced-answer ~90% early              │  Forced-answer ~chance early   │
│  Monitor lags far behind               │  Monitor tracks probe          │
│  R1 performativity rate: 0.417         │  R1 performativity rate: 0.012 │
│  → PERFORMATIVE CoT                    │  → GENUINE CoT                 │
└────────────────────────────────────────┴────────────────────────────────┘
```

**Case study (§6.3)**: On a history-recall MMLU question, the probe shows >90% confidence in choice B from step 0, but the CoT still says "let me recall the term" and enumerates all four options three times - classic theater. Contrast: a Python syntax question where probe confidence genuinely shifts at step 38 when the model realizes Python 3 vs. 2 - genuine update, CoT and probe move together.

---

## Key Quotes

> "We provide evidence of performative chain-of-thought (CoT) in reasoning models, where a model becomes strongly confident in its final answer, but continues generating tokens without revealing its internal belief."

> "The model's final answer is decodable from activations far earlier in CoT than a monitor is able to say, especially for easy recall-based MMLU questions."

> "We argue CoT monitors are at best cooperative listeners, but reasoning models are not cooperative speakers (Grice, 1975), and many failures in CoT faithfulness can be explained by this framing."

> "This is likely performative reasoning, as the model knows its final answer with high confidence yet continues to generate CoT as if it is solving the question."

> "If a model can internally encode its final answer well before it is reflected in the reasoning trace, then the trace may be an unreliable substrate for detecting early commitments, measuring uncertainty, or auditing why a decision was made."

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (#1, 2305.18654)** - both show reasoning traces don't reflect underlying computation
- **Reasoning Models Don't Always Say What They Think (#15, 2505.05410)** - same finding at the reasoning-model level
- **CoT In The Wild Is Not Always Faithful (#22, 2503.08679)** - natural-setting unfaithfulness
- **Measuring Faithfulness in CoT (#8, 2307.13702)** - Lanham et al. forced-answer methodology origin
- **Is CoT Reasoning a Mirage? (#14, 2508.01191)** - shares the "theater" framing
- **Correlation or Causation in CoT Reasoning (#20, 2509.17380)** - step-level causal skepticism

### Extends
- Lanham et al. (2307.13702) forced-answering to reasoning models (R1, GPT-OSS)
- Adds activation-probe method on top of the forced-answer baseline
- Extends early-exit via probe guidance (new capability beyond prior work)

### Provides Nuance
- Hard reasoning (GPQA-D): CoT is genuine, not theater
- Caveats the naive "all CoT is fake" claim common in the challenge camp

---

## REBUTTALS

### Authors' Acknowledged Limitations

1. **Inflection ↔ belief shift co-occurrence is inconsistent** - "mixed results, indicating no simple pattern of causality." Window size and threshold changes flip the results.
2. **GPQA excluded for small distills** - "answer choice collapse that confounds early decoding" → size analysis limited to MMLU.
3. **Forced answering is off-policy** - may artificially degrade smaller models.
4. **Framing doesn't fully explain post-hoc rationalization** (Turpin et al. 2023) - "faithfulness is multifaceted."
5. **Probe training scope** - trained on MMLU only; GPQA uses zero-shot transfer.
6. **Only 4-choice MC** - simplifies probe task; not applicable to open-ended reasoning.
7. **CoT monitor is one model (Gemini-2.5-Flash)** - stronger monitors could close the gap.

### Author-Side Spin to Flag
The **abstract's "80% MMLU / 30% GPQA" token reduction is misleading**. Section 7's rigorous numbers at 97% accuracy retention are **68% and 50%** - still strong, but not 80%. The larger figure applies at lower accuracy tradeoffs.

### Potential Counter-Arguments
1. **"Probes leak the answer via correlated features, not beliefs"** - partially addressed by forced-answering corroboration.
2. **"Monitor is weak because Gemini-2.5-Flash is small"** - acknowledged as limitation.
3. **"MMLU is trivial, not representative"** - but that's precisely the point: easy tasks are where theater is strongest.

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SUPPORTS THESIS (with nuance)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. ON EASY TASKS, CoT IS THEATER                                   │
│     - R1 performativity rate 0.417 on MMLU vs 0.012 on GPQA        │
│     - Answer decoded early; text is post-hoc elaboration            │
│                                                                     │
│  2. ON HARD TASKS, TEST-TIME COMPUTE DOES REAL WORK                 │
│     - Probe and monitor track together on GPQA-D                    │
│     - Supports: hard reasoning isn't (entirely) illusion            │
│                                                                     │
│  3. INFLECTION POINTS ARE MOSTLY HONEST                             │
│     - "Aha" moments track genuine uncertainty (2× ratio)            │
│     - Not every part of CoT is theater                              │
│                                                                     │
│  4. PRACTICAL: PROBE-GUIDED EARLY EXIT WORKS                        │
│     - 68% MMLU / 50% GPQA token savings at 97% accuracy             │
│     - Validates that the extra tokens on easy tasks are waste       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

This is among the cleanest mechanistic demonstrations of performative CoT on frontier open-weight reasoning models. The nuance (hard tasks = genuine) is a feature, not a bug - it carves the space where reasoning is real from the space where it is performed.

---

## Status
- [x] Read complete (via task agent on full HTML)
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
