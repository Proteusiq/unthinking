# Paper Analysis: Alice in Wonderland: Simple Tasks Showing Complete Reasoning Breakdown in SOTA LLMs

## Metadata
- **arXiv ID**: 2406.02061
- **Title**: Alice in Wonderland: Simple Tasks Showing Complete Reasoning Breakdown in State-Of-the-Art Large Language Models
- **Authors**: Marianna Nezhurina, Lucia Cipolina-Kun, Mehdi Cherti, Jenia Jitsev
- **Date**: June 2024 (v5 updated)
- **Venue**: arXiv preprint
- **Institutions**: LAION, Juelich Supercomputing Center, University of Bristol

---

## Core Claims

1. **Complete reasoning breakdown on simple problems**: SOTA LLMs fail dramatically on trivially simple common-sense problems that any human can solve

2. **Severe fluctuations on structure-preserving variations**: Models show wild performance swings (0% to 100%) across variations that don't change problem difficulty at all

3. **Control experiments rule out low-level issues**: Failures are NOT due to parsing, tokenization, arithmetic, or family structure understanding

4. **Overconfidence and confabulation accompany failures**: Wrong answers come with persuasive-sounding explanations

5. **Standardized benchmarks fail to detect these deficits**: Models scoring high on MMLU, ARC, etc. show near-zero accuracy on AIW

---

## The AIW Problem

**Template**: "Alice has N brothers and she also has M sisters. How many sisters does Alice's brother have?"

**Correct Answer**: C = M + 1 (Alice must be counted as a sister to her brother)

**Variations 1-4** (N,M ≤ 7):
| Variation | Setup | Correct Answer |
|-----------|-------|----------------|
| 1 | 3 brothers, 6 sisters | 7 |
| 2 | 2 sisters, 4 brothers | 3 |
| 3 | 4 sisters, 1 brother | 5 |
| 4 | 4 brothers, 1 sister | 2 |

These variations are **structurally identical** — only numbers change.

---

## Key Evidence

### Average Correct Response Rates

| Model | Avg Accuracy | Notes |
|-------|--------------|-------|
| GPT-4o | **64.9%** | Best non-reasoning model |
| Claude 3 Opus | **43.1%** | Second best |
| Llama-2 70B Chat | ~30% | Only open-weights above 30% |
| Most models | **< 20%** | Severe breakdown |
| Command R+, Qwen1.5-72B | **0%** | Complete failure |
| Llama-3-8B, Mixtral-8x22B | ~0% | Near-complete failure |

### Performance Fluctuations (STRONGEST EVIDENCE)

**GPT-4 (THINKING prompt)**:
- Variation 3: **≈ 0%** correct
- Variation 4: **≈ 100%** correct

This is a ~100% swing on the SAME problem with just different numbers!

**Pattern**:
- Better performers show HIGHER fluctuation amplitude
- Fluctuations persist regardless of prompt type
- This is the "hallmark of poor generalization"

### Control Experiments (AIW Light) — Critical

Three control problems tested whether failures stem from low-level issues:

| Control | Question | Correct Formula |
|---------|----------|-----------------|
| AIW Light Siblings | "How many siblings?" | N + M |
| AIW Light Family | "How many brothers does sister have?" | N |
| AIW Light Girls | "How many girls total?" | M + 1 |

**Results**: 
- **ALL models achieve ~100%** on all controls
- Even models with **0% on AIW original** score near 100% on controls
- **NO fluctuations** across variations on controls

**Conclusion**: Failures are NOT due to:
- Natural language parsing
- Number tokenization
- Basic arithmetic
- Family structure understanding

The breakdown is **generic reasoning failure**.

### Reasoning Models Performance

| Model | AIW Original | AIW+ (Harder) | Robustness (R) |
|-------|--------------|---------------|----------------|
| o1-preview | ~100% | High | **0.9** |
| o1-mini | Fluctuations | **< 20%** | < 0.6 |
| DeepSeek-R1 | Fluctuations | ~10% | < 0.6 |

**o1-mini collapses on harder variants** — claims of matching o1-preview are falsified.

### Confabulation Findings

Wrong answers accompanied by:

**Claude 3 Opus** (wrong answer):
> "logic holds up; double-checking the solution; no mistakes in the reasoning; solution is correct"

**Command R+** (wrong answer):
> "This conclusion is straightforward and clear"

**Llama 2 70B** (wrong answer):
> "carefully analyzing; use logical reasoning; provide a precise and accurate solution; conclusion might seem counterintuitive at first, but it's actually correct"

Models **cannot self-correct** when encouraged to revise.

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis

This paper provides some of the **cleanest evidence** for the pattern matching hypothesis:

1. **Distribution-dependent performance**: The wild fluctuations across number variations suggest models are pattern matching on training data, not reasoning abstractly. Certain number combinations may be more common in training.

2. **Control experiments are definitive**: Models CAN do the arithmetic, CAN parse the language, CAN understand family structure — but CANNOT compose these skills into reasoning.

3. **Confabulation = post-hoc justification**: The overconfident wrong explanations are exactly what we'd expect from pattern matching systems that generate plausible text, not genuine reasoners.

4. **Benchmark scores are misleading**: Models scoring high on MMLU/ARC fail on trivially simple problems — suggests benchmark contamination or narrow pattern matching.

---

## Critical Assessment

### Strengths

1. **Extremely simple problem**: No one can argue AIW is "too hard" — any human solves it instantly
2. **Control experiments are rigorous**: Rules out alternative explanations systematically
3. **Large model coverage**: Tests many SOTA models including reasoning models
4. **Quantitative with many trials**: 30+ trials per condition, proper statistical analysis
5. **Multiple prompt types**: Shows findings hold across STANDARD, THINKING, RESTRICTED

### Potential Weaknesses (Addressed by Authors)

1. **Data contamination concern**: Authors created novel variants (AIW Ext, AIW+, AIW Friends) and still observed breakdown
2. **Single problem type**: But control experiments and variants show the finding is generic

### Why This Matters for the Thesis

This paper shows that:
- **Pattern matching fails on simple recombination**: The same model that retrieves "sisters" and "brothers" correctly in isolation cannot compose them
- **Confidence ≠ Correctness**: Models are as confident wrong as right (no calibration to reasoning quality)
- **Scaling doesn't fix it**: GPT-4o is best at 65% — still fails 1/3 of the time on a trivial problem

---

## Relationship to Other Papers

### Supports
- **Paper 03 (2506.06941)**: Illusion of Thinking — both show reasoning collapse, AIW is even simpler
- **Paper 01 (2305.18654)**: Faith and Fate — compositional failure on simple combinations
- **Paper 04 (2410.05229)**: GSM-Symbolic — similar number sensitivity (but AIW fluctuations are MORE dramatic)
- **Paper 108 (2601.21618)**: WhatCounts — semantic content affects counting; AIW shows number content affects family reasoning

### Extends
- **Paper 05 (2307.13702)**: Measuring Faithfulness — AIW provides evidence of confabulation accompanying wrong answers
- **Paper 119 (2308.03958)**: Sycophancy Scales — overconfidence in wrong answers is related phenomenon

### Challenged By
- **Paper 124 (2506.09250)**: Illusion of Illusion — argues some failures are evaluation artifacts; but AIW controls rule this out

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found yet. The control experiments make this paper difficult to rebut.

### Potential Counter-Arguments

1. **"Problem is ambiguous"**: Authors address this — the common-sense interpretation is unambiguous, and models get AIW Light controls correct which require same parsing

2. **"Training data leakage"**: Authors created novel variants (AIW+, AIW Friends) not in training data and still observed breakdown

3. **"Need chain-of-thought"**: Authors tested THINKING prompt with CoT encouragement — same fluctuations

### Why Rebuttals Are Weak

The control experiments (AIW Light) are the key. If models can:
- Parse "Alice has N brothers and M sisters"
- Understand family structure
- Do arithmetic (N+M, M+1)

...but CANNOT combine these into "Alice's brother's sisters = M+1", then the failure is compositional reasoning, not low-level.

---

## Key Quotes

> "Models suffering a severe function breakdown... manifesting in low average correct response rates and strong fluctuations on natural, problem structure preserving variations."

> "Strong fluctuations on natural, structure preserving variations of such a simple problem points to severe lack of robustness and generalization deficits."

> "Reasoning capability is fragile and cannot be accessed robustly, even in such a simple scenario as posed by AIW problem variations."

> "Models with insufficient generalization and lack of robustness in basic reasoning are inherently unsafe."

> "The question isn't whether LRMs can reason on various problems, but whether current state-of-the-art evaluation properly separates reasoning from memorization, and whether reported progress reflects true advance."

---

## Verdict for Thesis

### Evidence Strength: VERY STRONG SUPPORT

**Why this is among the strongest evidence for the thesis:**

1. **Simplicity eliminates confounds**: No complex benchmarks, no ambiguity, just a trivial problem
2. **Controls isolate the failure**: Not parsing, not arithmetic, not structure — it's reasoning
3. **Fluctuations are smoking gun**: 0% to 100% on structurally identical problems = pattern matching on surface features
4. **Confabulation matches theory**: Post-hoc justification without genuine reasoning
5. **Scaling doesn't fix it**: Even GPT-4o fails 35% on a problem any human solves instantly

This paper should be cited as **primary evidence** that LLMs pattern match rather than reason.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Critical assessment included**
- [ ] **Paper graph updated**
