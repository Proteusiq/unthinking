# Paper Analysis: Detecting RLVR Training Data via Structural Convergence of Reasoning

## Metadata
- **arXiv ID**: 2602.11792
- **Title**: Detecting RLVR Training Data via Structural Convergence of Reasoning
- **Authors**: Hongbo Zhang, Yang Yue, Jianhao Yan, Guangsheng Bao, Yue Zhang, Yue Zhang
- **Date**: February 2026
- **Venue**: ICML (Machine Learning)

---

## Core Claims

1. **RLVR induces structural convergence in reasoning trajectories** — Prompts encountered during training yield increasingly similar, rigid generations, while unseen prompts retain high variability. This convergence concentrates on symbolic and algebraic reasoning components.

2. **Conventional detection methods fail for RLVR** — Unlike pretraining/SFT which optimize via token-level probabilities, RLVR optimizes through reward feedback on self-generated reasoning, making perplexity-based methods ineffective.

3. **Min-kNN Distance can detect RLVR exposure in black-box settings** — By sampling multiple completions and computing average of k smallest nearest-neighbor edit distances, the method reliably distinguishes seen from unseen prompts.

4. **RLVR compresses reasoning into 2-4 structural modes** — Not a single canonical trajectory, but a limited set of recurring patterns.

5. **Seen data exhibits greater rigidity than unseen data** — Training prompts show 34% more rigid logic 3-grams and higher proportion of clustered reasoning structures.

---

## Methodology

### Models Tested
- **Analysis model**: Qwen-2.5-7B-Base (trained with DAPO and GRPO)
- **Open-source RLVR models**: SimpleRL-32B, DAPO-Qwen-32B, JustRL-DeepSeek-1.5B, Open-Reasoner-Zero-7B
- **RL-MIA benchmark**: Qwen2.5-7B-Instruct, DeepSeek-Math-7B-Instruct (K&K and SAT settings)
- **Total**: 8 model configurations (1.5B to 32B parameters)

### Detection Method: Min-kNN Distance
1. Sample 32 completions per prompt
2. Compute pairwise normalized edit distances
3. Average the k smallest nearest-neighbor distances (k=10 default)
4. Lower score = more rigid = likely seen during training

### Diversity Metrics
- **EAD** (lexical): Expectation-adjusted distinct n-grams
- **NLI** (logical): Entailment/contradiction rates between completion pairs
- **Embedding** (semantic): 1 - average pairwise cosine similarity

### Data
- **Member (seen)**: 300 examples from each model's RL training data
- **Non-member (unseen)**: AIME 2024/2025 (60), Beyond-AIME (100), Omni-Math (100), MATH-500 (40)

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Min-kNN Distance AUC | 0.70 | +17% over strongest baseline (average across 8 models) |
| Best single-model AUC | 0.80 | DeepSeek-Math-7B K&K setting |
| PPL baseline AUC | 0.60 | Near random performance |
| Min-K% baseline AUC | 0.42 | Below random |
| Self-Critique baseline | 0.51 | Near random |
| Paraphrasing robustness | 0.72 → 0.71 | Minimal degradation |
| Distillation detection | 0.76 | Can detect distillation prompts |
| Seen vs Unseen rigidity | 4,673 vs 3,476 | 34% more rigid logic 3-grams in seen data |
| Cluster distribution (≤2) | 44.9% vs 22.5% | Seen data more concentrated |

---

## Relationship to Other Papers

### Supports
- **#3 GSM-Symbolic** (2410.05229): Structural convergence explains brittleness to symbolic variations—model retrieves templates that fail on novel combinations
- **#8 Measuring Faithfulness** (2307.13702): If reasoning is template retrieval, CoT faithfulness is illusory
- **#10 Illusion of Insight** (2601.00514): Provides mechanism for why reasoning models lack genuine insight
- **#295 Test-Time Compute** (2603.15377): Explains why more compute can hurt—selects among memorized structures

### Extends
- **Gandhi et al. (2025)**: Prior work showed RLVR reduces reasoning coverage; this quantifies the collapse
- **Yue et al. (2025)**: Prior work showed narrower trajectories; this provides detection method

### Challenges
- **Tao et al. (2025) Self-Critique**: Min-kNN outperforms (0.70 vs 0.51 AUC)
- **Shi et al. (2023) Min-K%**: Shows these methods fail for RLVR (0.42 AUC)

---

## REBUTTALS

### Known Rebuttals
None identified — paper provides new evidence on RLVR behavior.

### Limitations (Authors Acknowledge)
1. **Domain-specific**: Code detection harder (AUC 0.69) than math (AUC 0.80)
2. **Computational cost**: Requires 32 samples per prompt
3. **Temperature sensitivity**: Lower temperatures obscure structural collapse
4. **Pretraining interaction**: Works better when pretraining contamination is lower
5. **Binary detection**: Cannot quantify amount of RL exposure

---

## Key Quotes

> "RLVR induces a systematic convergence in reasoning trajectories: prompts seen during RL training yield increasingly similar generations, while unseen prompts retain high variability."

> "Unlike likelihood-based training, RLVR optimizes models through reward feedback on self-generated reasoning trajectories, which makes conventional token-level or likelihood-based signals ineffective."

> "RLVR significantly compresses the symbolic reasoning components, especially the logical tokens, which carry the model's reasoning structure. As these segments become more rigid, they form a core set of standardized reasoning steps."

> "Many recent releases provide only RLVR-tuned models, without access to the base checkpoints or RL training data, making it difficult to assess whether benchmark problems or close paraphrases were encountered during training."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  RLVR: "RECALL NOT REASON"                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  UNSEEN PROMPT:  32 completions → diverse reasoning paths          │
│  SEEN PROMPT:    32 completions → 2-4 rigid structural modes       │
│                                                                     │
│  The model doesn't reason through seen problems—                   │
│  it retrieves cached solution structures.                          │
│                                                                     │
│  WHAT CONVERGES:                                                    │
│  ├── Symbolic logic fragments: 856 → 4,673 (+5.5×)                 │
│  ├── Boilerplate phrases: slower growth                            │
│  └── Core reasoning steps become TEMPLATES                         │
│                                                                     │
│  The chain-of-thought becomes a retrieval index,                   │
│  not a derivation trace.                                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

This paper provides mechanistic evidence that RLVR-trained reasoning models recall rather than reason. The structural convergence phenomenon demonstrates that for seen prompts, the model produces the same 2-4 reasoning structures regardless of temperature—suggesting memorized templates rather than fresh reasoning. The finding that *symbolic reasoning segments freeze first* (the actual mathematical derivations) directly supports the thesis that LLMs are sophisticated pattern matchers. The diversity on unseen prompts shows the model *can* reason variably, but chooses cached paths when available—the path of least resistance.

---

## Status
- [x] Read complete (full HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
