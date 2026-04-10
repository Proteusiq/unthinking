# Paper Analysis: What Characterizes Effective Reasoning? Revisiting Length, Review, and Structure of CoT

## Metadata
- **arXiv ID**: 2509.19284
- **Title**: What Characterizes Effective Reasoning? Revisiting Length, Review, and Structure of CoT
- **Authors**: Yunzhen Feng, Julia Kempe, Cheng Zhang, Parag Jain, Anthony Hartshorn
- **Date**: September 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **Longer CoT correlates with LOWER accuracy**: Challenges "longer-is-better" narrative across all 10 models tested.

2. **More review behavior correlates with failure**: Self-checking doesn't enable correction—it indicates struggling.

3. **Failed-Step Fraction (FSF) predicts failure**: Proportion of steps in abandoned branches is strongest accuracy predictor.

4. **Models cannot "unsee" mistakes**: Removing failed branches improves accuracy 8-14%, proving prior context bias.

---

## Methodology

### Scale
- **10 reasoning models**: Claude 3.7 Sonnet Thinking, Grok 3 mini, DeepSeek R1, DeepSeek Distill (7B, 32B), Qwen 3 (8B, 32B, 235B), GPT oss (20B, 120B)
- **4,800 math traces + 3,200 science traces** per model

### Datasets
- HARP (math), GPQA-Diamond (science)

### Key Metric
- Failed-Step Fraction (FSF) = failed nodes / all nodes in reasoning graph

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: Longer thinking = MORE failures, not better reasoning │
│                                                                     │
│  Within same question:                                              │
│    Shorter CoT  → Higher accuracy                                   │
│    Less review  → Higher accuracy                                   │
│    Lower FSF    → Higher accuracy                                   │
│                                                                     │
│  Failed branches BIAS subsequent reasoning                          │
│  Removing them improves accuracy 8-14%                              │
│  Models cannot "unsee" their own mistakes                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Finding | Evidence | Context |
|---------|----------|---------|
| Longer = worse | Negative correlation across all models | Extended thinking reflects failure |
| Review = worse | Negative correlation (most models) | Self-checking doesn't work |
| FSF predicts failure | Strongest correlation across all 10 models | Failed branches = key indicator |
| Cannot unsee mistakes | Removing branches: +8-14% accuracy | Context persists after backtracking |
| Effect stronger on hard | Levels 4-6 show consistent patterns | Easy problems mask the issue |

### Quantitative Results
| Intervention | DeepSeek R1 | GPT oss 120B |
|--------------|-------------|--------------|
| First branch removed | +8.53% | +8.36% |
| Last branch removed | +14.03% | +10.83% |
| Summary instead | +7.25% | +1.46% |

---

## Relationship to Other Papers

### Rebuts
- **#7 s1 paper** (2501.19393): Claims wait tokens improve reasoning; this shows longer CoT correlates with LOWER accuracy

### Supports
- **#302 Test-Time Compute** (2408.03314): Both find limits to scaling test-time compute
- **#12 Illusions of Reflection** (2510.18254): Review behavior doesn't enable self-correction
- **#180 Contextual Drag** (2602.04288): Prior context biases subsequent predictions
- **#295 Overestimation Bias** (2603.15377): More compute can hurt via accumulated errors

---

## REBUTTALS

### This Paper Directly Rebuts
- **s1 paper (2501.19393)**: Claims wait tokens improve reasoning
- **DeepSeek R1 "aha moment" narrative**: Claims review enables insight

### Limitations (Authors Acknowledge)
1. Correlation within-question: Controls for question difficulty but not solution path difficulty
2. Graph extraction by Claude: May have systematic biases in identifying "failed" nodes
3. Branch removal is oracle: Requires knowing which branches failed (not available in practice)

---

## Key Quotes

> "Contrary to the 'longer-is-better' narrative, we find that both naive CoT lengthening and increased review are associated with *lower* accuracy."

> "FSF emerges as a stronger and more stable predictor of correctness than CoT Length or Review Ratio, with consistent, significant correlations across difficulty strata and across all ten models."

> "Long failed branches bias subsequent exploration even after backtracking; current models do not fully 'unsee' past mistakes."

> "These results suggest that models have the ability to generate a viable path to the correct answer; however, the presence of failed branches biases subsequent exploration and lowers the overall success rate."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY LONGER COT = WORSE ACCURACY                                    │
├─────────────────────────────────────────────────────────────────────┤
│  Model takes wrong path → generates failed branch →                 │
│  tries to backtrack → but context is polluted →                     │
│  next attempt biased by failed content →                            │
│  more failures → longer CoT → lower accuracy                        │
│                                                                     │
│  Long CoT is SYMPTOM of failure, not solution to it                 │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

Devastating evidence against genuine deliberation: longer ≠ better, review doesn't help, failed branches bias subsequent attempts, and models cannot learn from mistakes within a single generation.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
