# Paper Analysis: No Global Plan in Chain-of-Thought

## Metadata
- **arXiv ID**: 2602.02103
- **Title**: No Global Plan in Chain-of-Thought: Uncover the Latent Planning Horizon of LLMs
- **Authors**: Liyan Xu, Mo Yu, Fandong Meng, Jie Zhou (WeChat AI)
- **Date**: February 2026
- **Code**: https://github.com/lxucs/tele-lens

---

## Core Claims

1. **LLMs exhibit myopic horizon**: Hidden states primarily support immediate, local transitions rather than long-range, global trajectories
2. **No precise global planning**: For compositional tasks, final-answer probing only converges at the FINAL counting position (>90%), while preceding positions hover around random guessing (50%)
3. **Coarse early signals ≠ planning**: Early hidden states show predictive signals for final answers on simpler tasks, but these are "vague perceptual cues" not resulting from precise pre-planned reasoning
4. **CoT is "Wooden Barrel"**: Reliability determined by a small number of pivot positions, not global aggregates

---

## Methodology

### Tele-Lens Probing Method
- Low-rank adapter (bottleneck) that transforms hidden states to predict teleological information
- Probes three dimensions:
  1. **Subsequent tokens**: Predict m following tokens from hidden state
  2. **Reasoning length**: Predict total length of thinking
  3. **Final answer**: Predict answer directly from hidden state

### Experimental Setup
- **12 diverse tasks** across 3 categories:
  - **Explicit Compositional**: Parity, Cycle, Subsum
  - **Implicit Compositional**: GSM8K, MATH, AIME, MuSR, Zebra
  - **Knowledge/Semantic**: CSQA, MMLU, QuALITY, GPQA
- **LLM Backbones**: 
  - Off-the-shelf: Qwen3-32B
  - In-domain: Qwen2.5-7B-Instruct (GRPO trained)
- **Dataset splits**: 4000/100/500 (train/dev/test) per task

---

## Key Evidence

### Finding 1: Myopic Planning Horizon (Table 1)

Final-answer probabilities for **Parity** at positions after counting digits:

| Position | -4 | -3 | -2 | -1 | 0 (final) |
|----------|------|------|------|------|------|
| In-Domain LLM | 0.49 | 0.51 | 0.51 | **0.97** | **0.99** |
| Off-the-Shelf LLM | 0.50 | 0.52 | 0.51 | **0.94** | **0.97** |

**Key insight**: Final answer is only planned ONE STEP before completion. All preceding positions are at random guessing (0.50).

### Finding 2: Subsequent Token Prediction Fails (Table 2)

F1 scores for predicting tokens at offset δ from current position:

| Task | δ=1 | δ=2 | δ=4 | δ=8 | δ=16 |
|------|-----|-----|-----|-----|------|
| Parity | 0.90 | 0.78 | 0.42 | 0.11 | 0.03 |
| GSM8K | 0.55 | 0.24 | 0.07 | 0.04 | 0.02 |
| CSQA | 0.45 | 0.18 | 0.05 | 0.03 | 0.02 |

**Key insight**: Prediction quality degrades rapidly. At δ=16, performance drops to near-zero for ALL tasks.

### Finding 3: Coarse Signals ≠ Planning (Figure 4)

Comparing task accuracy:
- **w/ CoT** (thinking mode): Best performance
- **w/o CoT** (direct answer): Intermediate
- **Early probing** (best initial positions): Worst
- **Random**: Baseline

**Key insight**: Even with comparable budgets, early planning is LESS effective than direct answering. This proves coarse signals are not precise plans.

### Finding 4: Wooden Barrel Hypothesis (Section 3.1)

Using top-k pivot positions instead of full CoT for uncertainty estimation:
- **Up to 6% absolute improvement** in calibration
- Small subset of positions effectively represents entire path uncertainty
- Supports myopic horizon: most tokens are high-confident local transitions that dilute uncertainty

### Finding 5: CoT Bypass (Section 3.2)

Using Qwen3-32B:
- **16.2% CoT bypass** achievable
- **Only 0.03 accuracy drop**
- Automatic recognition of when CoT is unnecessary

---

## Relationship to Thesis

### Strongly Supports Pattern-Matching Thesis

This paper provides **mechanistic evidence** that:

1. **No global planning**: LLMs do NOT have a pre-computed global plan. They operate via "incremental transitions" — exactly what pattern matching would predict.

2. **Myopic = pattern completion**: The myopic horizon shows LLMs predict the next step based on current context, not based on understanding the full problem structure.

3. **Coarse signals ≠ reasoning**: Early signals that appear to "know" the answer are actually just pattern recognition on surface features, not genuine planning.

4. **Compositional reasoning fails**: For tasks requiring true multi-step reasoning (Parity, Cycle), hidden states show NO planning until the very last step — confirming these tasks cannot be solved via single-pass pattern matching.

### Key Quote
> "LLMs exhibit a myopic horizon, primarily conducting incremental transitions without precise global planning."

> "For harder tasks requiring explicit multi-step, the initial prediction drops to near-flat."

---

## Relationship to Other Papers

### Supports
- **Paper 150 (Planning Abilities)**: Both show LLMs lack genuine planning capabilities
- **Paper 156 (LLMs Still Can't Plan)**: Both provide evidence against planning in LLMs
- **Paper 131 (Can LLMs Reason and Plan)**: Both support Kambhampati's skeptic view
- **Paper 132 (Stop Anthropomorphizing)**: Both show CoT traces lack semantic planning
- **Paper 163 (Mechanistic CoT)**: Both probe hidden states to understand CoT
- **Paper 161 (Dot by Dot)**: Both show CoT provides compute, not planning

### Extends
- **Paper 135 (Demystifying Long CoT)**: Extends by showing WHY long CoT helps (more local transitions)
- **Paper 137 (CoT Training Mechanisms)**: Extends mechanistic understanding of CoT

### Challenges
- **Paper 26 (CoT Without Prompting)**: Challenges claim that internal planning precedes CoT

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **Task selection bias**: Compositional tasks are cherry-picked to show failure
   - **Counter**: 12 diverse tasks across 3 categories, including knowledge tasks
2. **Probing methodology**: Tele-Lens may not capture true planning
   - **Counter**: Method validated across multiple dimensions; consistent results
3. **Model-specific**: Results may not generalize
   - **Counter**: Tested on both off-the-shelf (Qwen3-32B) and in-domain models

### Limitations (Authors Acknowledge)
- Focus on specific probing dimensions; other aspects may exist
- Model families limited to Qwen series
- In-domain model trained on specific tasks

---

## Key Quotes

> "Our empirical results indicate that LLMs exhibit a myopic horizon, primarily conducting incremental transitions without precise global planning."

> "For explicit compositional tasks requiring multi-step reasoning, hidden states can reliably capture the precise answer only one or two steps away from the reasoning completion."

> "The coarse predictive signals primarily reflect a vague perceptual cue, but not resulting from exercising a pre-planned reasoning path."

> "Just as the capacity of a barrel is determined not by its average stave height but by its shortest stave, the reliability of a reasoning chain is governed by a small number of pivot positions."

> "LLM hidden states encode limited foresight over subsequent reasoning paths."

---

## Relevance to Thesis

**Verdict**: STRONGLY SUPPORTS

This paper is particularly significant because:

1. **Mechanistic evidence**: Uses probing to show hidden states do NOT encode global plans
2. **Quantitative precision**: Final-answer probing at ~50% (random) until last step
3. **Diverse task coverage**: 12 tasks across 3 categories with consistent findings
4. **Explains prior observations**: Unifies seemingly contradictory findings about early planning
5. **"Wooden Barrel" insight**: Shows CoT reliability is fragile, determined by weakest links

The paper directly supports the thesis that LLMs are pattern matchers operating via local, incremental transitions rather than global planning or reasoning.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
