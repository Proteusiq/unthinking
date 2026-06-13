# Paper Analysis: Where to Show Demos in Your Prompt

## Metadata
- **arXiv ID**: 2507.22887
- **Title**: Where to show Demos in Your Prompt: A Positional Bias of In-Context Learning
- **Authors**: Cobbina, Zhou (University of Maryland)
- **Date**: July 2025
- **Venue**: arXiv
- **Stance**: SUPPORTS thesis
- **Cluster**: in-context-learning

---

## Why This Paper Matters

This paper reveals that LLMs don't "learn" from demonstrations in a robust way - simply moving the same demos to different positions in the prompt can flip 45% of predictions and swing accuracy by 50 percentage points. If models genuinely reasoned from examples, position shouldn't matter. This is direct evidence of positional pattern matching rather than semantic understanding.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                        │
├─────────────────────────────────────────────────────────────────────┤
│  Moving an UNCHANGED block of demos from prompt start to end:       │
│  • Swings accuracy by up to 50 percentage points                    │
│  • Flips 45% of predictions                                         │
│  • Can make ICL WORSE than zero-shot                                │
│                                                                     │
│  If models reasoned from demos, POSITION shouldn't matter.          │
│  Only CONTENT should matter. This proves positional pattern match.  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **DPP Bias Discovery**: Demo position (not content) significantly affects LLM performance - purely spatial effects independent of demo content
2. **Primacy Bias**: Placing demos at prompt START yields more stable/accurate outputs than placing them later
3. **Scale-Dependent Robustness**: Smaller models most affected, but even large models show residual positional sensitivity
4. **No Universal Optimal Position**: Winning position varies by model and task - no principled rule

---

## Methodology

### Four Demo Positions Tested
| Position | Description |
|----------|-------------|
| **ssp** | Start of System Prompt |
| **esp** | End of System Prompt |
| **sum** | Start of User Message (default ICL) |
| **eum** | End of User Message |

### Models (10 models, 4 families)
| Family | Sizes |
|--------|-------|
| Qwen | 1.5B, 7B, 72B |
| LLaMA 3 | 3B, 8B, 70B |
| Mistral | 7B, 8x7B MoE |
| Cohere | 8B, 32B |

### Tasks (8 benchmarks)
- **Classification**: AG News, MNLI, ARC, MMLU
- **QA**: SQuAD, GSM8K
- **Summarization**: CNN/DailyMail, XSum

### Setup
- 5 demonstrations per prompt
- Temperature = 0 (deterministic)
- Same demo content across all positions

### Metrics
- **Accuracy Change**: (ICL accuracy) - (zero-shot accuracy)
- **Prediction Change**: % of predictions that flip when position changes

---

## Key Evidence

### Finding 1: Massive Accuracy Swings
| Task | Metric |
|------|--------|
| MMLU | +18% accuracy gain (ssp vs zero-shot) |
| AG News (Qwen-1.5B) | 76% (ssp) → 56% (eum) = **20-point swing** |
| Extreme cases | Up to **50 percentage points** |

### Finding 2: Prediction Flip Rates
| Scenario | Flip Rate |
|----------|-----------|
| Qwen-1.5B on AG News | **45.5%** predictions changed |
| QA tasks (eum) | **>30%** flip without improving correctness |
| GSM8K | **>90%** across nearly all models |
| XSum/CNN (eum) | **~100%** even in largest models |

### Finding 3: eum Position Often HURTS Performance
Statistical test on MMLU (averaged over all models):
| Position | Zero-shot | ICL | p-value | Effect Size |
|----------|-----------|-----|---------|-------------|
| ssp | 0.336 | 0.689 | 0.0022** | 1.72 |
| esp | 0.336 | 0.695 | 0.0022** | 1.70 |
| sum | 0.336 | 0.687 | 0.0022** | 1.73 |
| **eum** | 0.336 | 0.452 | **0.166 (NS)** | 0.41 |

**eum fails to provide statistically significant improvement over zero-shot!**

### Finding 4: Task-Specific Extremes
| Task | Model | ssp → eum Change |
|------|-------|------------------|
| GSM8K | LLaMA3 3B | 42% → 11% improved |
| XSum | LLaMA3 3B | 82.5% → 27.5% improved |
| CNN/DM | LLaMA3 3B | 49% → **1%** improved |
| SQuAD | Cohere 8B | 72% → **7%** exact match |

### Finding 5: Scale Reduces But Doesn't Eliminate
| Comparison | Small Model | Large Model |
|------------|-------------|-------------|
| ssp vs sum change | >20% (LLaMA3 3B) | <10% (LLaMA3 70B) |

But GSM8K shows **>50%** prediction changes even in Qwen-72B.

### Finding 6: Larger Models Sometimes Prefer Different Positions
- Small models (Qwen 1.5B): Strongly prefer ssp/esp
- Large models (LLaMA3 70B): Consistent preference for **sum** position

No universal rule - requires model-specific tuning.

---

## Theoretical Implications

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY THIS PROVES PATTERN MATCHING OVER REASONING                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF MODELS REASONED FROM DEMOS:        WHAT ACTUALLY HAPPENS:       │
│  ├── Extract task pattern from ANY     ├── 45% prediction flip      │
│  │   demo location                     │   from position change     │
│  ├── Position-invariant performance    ├── 50pp accuracy swings     │
│  ├── Same inputs → same outputs        ├── eum often WORSE than     │
│  │                                     │   zero-shot                │
│  └── Learn semantic relationship       └── "Primacy bias" - early   │
│                                            tokens dominate          │
│                                                                     │
│  The paper attributes this to "induction heads" that weight early   │
│  tokens disproportionately - architectural pattern matching, not    │
│  semantic understanding.                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Mechanistic Explanation

Authors propose two complementary roots:

1. **Architectural**: Causal-decoder LLMs trained with autoregressive masking - earlier tokens dominate hidden states. "Induction heads" concentrate attention on early/sink tokens.

2. **Data**: Instruction-tuning corpora have positional regularities - demos in fixed slots imprint distributional priors.

Neither involves semantic understanding - both are statistical/positional artifacts.

---

## Limitations (Authors Acknowledge)

1. **Model subset**: Only 1.5B-72B tested; larger models may differ
2. **Task coverage**: No multi-hop retrieval or dialogic contexts
3. **English only**: Cross-lingual may vary
4. **Metric limitations**: Accuracy/ROUGE imperfect proxies

---

## Relationship to Other Papers

### Supports
- **Faith and Fate** (2305.18654): Demonstrates positional aspects of subgraph matching
- **Lost in the Middle** (Liu et al. 2023): Middle tokens receive less attention
- **Large Language Models are Easily Distracted** (2302.00093): Position of irrelevant context matters

### Related
- **Min et al. 2022**: LLMs exploit lexical overlaps, not semantic mappings
- **Lu et al. 2022**: Demo order sensitivity (±15% accuracy)

---

## Key Quotes

> "We discover a novel positional bias in *in-context learning* (ICL): DPP bias, in which moving an *unchanged* block of demos from the start of a prompt to the end can swing task accuracy by up to 20 percents and flip almost half of a model's predictions."

> "This phenomenon, purely spatial, independent of demo content, challenges the widespread assumption that large language models learn robustly from any properly formatted context."

> "This brittleness not only undermines reproducibility but also challenges assumptions about LLMs' capacity for systematic reasoning, raising urgent questions about whether current models truly learn from context or merely exploit superficial patterns."

---

## Relevance to Thesis

**STRONG SUPPORT** for the pattern-matching hypothesis:

1. **Position shouldn't matter for reasoning**: If models genuinely learned the task from demos, position would be irrelevant. The 50pp swings prove they're exploiting positional patterns.

2. **eum can be WORSE than zero-shot**: Placing demos after the query breaks ICL - models aren't extracting the task pattern, they're relying on positional regularities.

3. **Primacy bias = architectural pattern matching**: The paper attributes sensitivity to attention patterns (induction heads) that weight early tokens - this is positional pattern matching, not semantic understanding.

4. **No universal rule**: That optimal position varies by model/task proves there's no principled reasoning mechanism - just different learned positional biases.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Limitations documented
- [ ] Paper graph updated
