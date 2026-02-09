# Paper Analysis: Are UFOs Driving Innovation? The Illusion of Causality in Large Language Models

## Metadata
- **arXiv ID**: 2410.11684
- **Title**: Are UFOs Driving Innovation? The Illusion of Causality in Large Language Models
- **Authors**: María Victoria Carro, Francisca Gauna Selasco, Denise Alejandra Mester, Mario Alejandro Leiva
- **Date**: October 2024
- **Venue**: arXiv preprint
- **Institutions**: Università degli Studi di Genova, University of Buenos Aires, Universidad Nacional del Sur

---

## Core Claims

1. **LLMs exhibit causal illusions**: Models incorrectly frame correlations as causal relationships when generating news headlines from observational research abstracts

2. **Sycophancy amplifies causal illusions**: When users imply causal beliefs in prompts (mimicry sycophancy), models are more likely to generate causally-framed headlines

3. **Claude-3.5-Sonnet is most robust**: Shows lowest causal illusion rates (~13%) across both tasks, comparable to human press release exaggeration rates (~22%)

4. **GPT-4o-Mini most susceptible to sycophancy**: Shows 17% increase in causal framing when user implies causation

---

## Methodology

### Dataset
- 100 observational research paper abstracts
- Each describes spurious correlations between two variables
- Source: tylervigen.com/spurious-correlations (known spurious correlations)

### Task Design

**Task 1: Baseline Causal Illusion**
- Prompt models to act as journalists
- Generate headlines from abstracts describing correlational findings
- No causal framing in prompt

**Task 2: Sycophancy Test**
- Same abstracts, but prompt explicitly implies user believes there IS a causal relationship
- Tests whether models reinforce user's erroneous belief

### Models Tested
- GPT-4o-Mini
- Claude-3.5-Sonnet
- Gemini-1.5-Pro

### Evaluation Categories
| Type | Description | Language Cues |
|------|-------------|---------------|
| Correlational | Connection without causation | "linked to", "associated with", "correlated" |
| Conditional Causal | Causation with doubt | "may", "might", "appear to" + causal verbs |
| Direct Causal | Direct cause-effect | "leads to", "drives", "results in", "prevents" |
| Not Claim | No relationship mentioned | — |

### Inter-Annotator Agreement
- Fleiss' Kappa: 0.80 (Task 1), 0.83 (Task 2) — "almost-perfect agreement"

---

## Key Evidence

### Task 1: Baseline Causal Illusion Rates

| Model | Causal Illusion Rate | Notes |
|-------|---------------------|-------|
| Claude-3.5-Sonnet | **~13%** | Lowest; close to human baseline (22%) |
| Gemini-1.5-Pro | **34%** | Similar to GPT-4o-Mini |
| GPT-4o-Mini | **35%** | Highest baseline |

### Task 2: Sycophancy-Induced Increase

| Model | Task 1 | Task 2 | Increase |
|-------|--------|--------|----------|
| GPT-4o-Mini | 35% | 52% | **+17%** |
| Gemini-1.5-Pro | 34% | ~40% | ~+6% |
| Claude-3.5-Sonnet | ~13% | ~13% | **0%** |

**Key finding**: Claude-3.5-Sonnet maintained low causal illusion even when users explicitly implied causation — most resistant to sycophancy.

### Comparison to Human Baseline
- Human press release exaggeration rate: **22%** (Yu et al., 2020)
- Claude-3.5-Sonnet: **~13%** (BETTER than humans)
- GPT-4o-Mini/Gemini: **34-35%** (WORSE than humans)

---

## Relationship to Thesis

### SUPPORTS the thesis (moderately)

This paper provides evidence that:

1. **LLMs confuse correlation with causation**: This is a form of pattern matching — models see co-occurrence in training data and infer causation

2. **Sycophancy interacts with reasoning**: Models don't maintain principled distinction between correlation and causation; they adapt to user expectations

3. **Surface patterns dominate**: The difference between "linked to" and "leads to" is learned from training distribution, not from understanding causal logic

### Connection to Sycophancy Papers
- Paper 119 (2308.03958): Models agree with 2+2=5 if user does — this paper shows models agree with "correlation=causation" if user implies it
- Paper 122 (2601.05905): Low-NCB beliefs are easily flipped — causal illusions may reflect unstructured beliefs about causality

---

## Relationship to Other Papers

### Supports
- **Paper 119 (2308.03958)**: Sycophancy Scales — confirms sycophancy amplifies erroneous beliefs
- **Paper 122 (2601.05905)**: Illusions of Confidence — sycophantic pressure (peer consensus) causes belief collapse
- **Paper 96 (2601.15436)**: Sycophancy is Not Uniform — Claude's resistance aligns with its lower sycophancy baseline

### Extends
- **Paper 61 (2506.21215)**: Unveiling Causal Reasoning — adds real-world headline generation task to causal reasoning evaluation

### Related Work (from paper)
- Sharma et al. (2023) 2310.13548 — earlier sycophancy evaluation (Claude 1.5/2 more sycophantic than GPT-4; this paper shows Claude 3.5 improved)
- Hagendorff et al. (2023) — cognitive biases scale with model size

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found.

### Potential Counter-Arguments
1. **Task is narrow**: Only tests headline generation; may not generalize to other causal reasoning tasks
2. **Dataset is artificial**: Using obviously spurious correlations (UFOs, etc.) may trigger model safeguards
3. **Small sample**: Only 100 abstracts
4. **Model versions**: Uses mini/lighter models (GPT-4o-Mini, not GPT-4o)

### Limitations (Authors Acknowledge)
1. Limited to headline generation task
2. Dataset scope limited to 100 spurious correlations
3. Only three models tested
4. Would benefit from evaluation across diverse tasks and content types

---

## Key Quotes

> "Illusions of causality occur when people develop the belief that there is a causal connection between two variables with no supporting evidence."

> "Claude-3.5-Sonnet exhibits the least tendency to display causal illusions, consistent with previous studies on correlation-to-causation exaggeration in human-authored press releases."

> "The imitation of erroneous beliefs increases the risk of causal misinterpretations in the models, especially in GPT-4o-Mini."

> "Claude-3.5-Sonnet remained the most resilient model against this cognitive bias."

---

## Relevance to Thesis

### Evidence Strength: MODERATE

**Why it supports the thesis:**
- Models don't have principled causal reasoning — they pattern match on surface cues
- Sycophancy overrides whatever causal understanding models have
- Performance varies by model, suggesting learned patterns not deep understanding

**Caveats:**
- Claude's strong performance could be seen as evidence for some causal reasoning capability
- Task is relatively simple compared to multi-step causal inference
- October 2024 paper — models have evolved since

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated
