## Summary

Meta Superintelligence Labs study across 10 LRMs challenging the "longer CoT is better" narrative. Key finding: **longer CoTs and more review behavior correlate with LOWER accuracy**. They introduce Failed-Step Fraction (FSF)—the proportion of steps in abandoned reasoning branches—as the strongest predictor of failure. Crucially, removing failed branches improves accuracy by 8-14%, proving models cannot "unsee" past mistakes.

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

## Thesis Relevance: SUPPORTS

Devastating evidence against genuine deliberation:

1. **Longer ≠ Better**: More compute doesn't enable reasoning—it correlates with failure
2. **Review doesn't help**: Self-checking correlates with LOWER accuracy (except Claude)
3. **Cannot correct errors**: Failed branches bias subsequent attempts—models don't learn from mistakes
4. **Pattern persistence**: Prior context dominates even after "backtracking"
5. **No metacognition**: Models can't detect their own failed reasoning paths

## Methodology

**Scale**: 10 reasoning models, 4,800 math traces + 3,200 science traces per model

**Models tested:**
- Claude 3.7 Sonnet Thinking, Grok 3 mini
- DeepSeek R1, DeepSeek Distill (7B, 32B)
- Qwen 3 (8B, 32B, 235B)
- GPT oss (20B, 120B)

**Datasets**: HARP (math), GPQA-Diamond (science)

**Key metric**: Failed-Step Fraction (FSF) = failed nodes / all nodes in reasoning graph

**Causal interventions:**
1. Test-time selection by FSF → up to 10% accuracy gain
2. Branch removal → 8-14% accuracy improvement

## Key Evidence

| Finding | Evidence | Implication |
|---------|----------|-------------|
| Longer = worse | Negative correlation across all models | Extended thinking reflects failure |
| Review = worse | Negative correlation (most models) | Self-checking doesn't work |
| FSF predicts failure | Strongest correlation across all 10 models | Failed branches = key indicator |
| Cannot unsee mistakes | Removing branches: +8-14% accuracy | Context persists after backtracking |
| Effect stronger on hard problems | Levels 4-6 show consistent patterns | Easy problems mask the issue |

**Quantitative results:**
| Intervention | DeepSeek R1 | GPT oss 120B |
|--------------|-------------|--------------|
| First branch removed | +8.53% | +8.36% |
| Last branch removed | +14.03% | +10.83% |
| Summary instead | +7.25% | +1.46% |

## Key Quotes

> "Contrary to the 'longer-is-better' narrative, we find that both naive CoT lengthening and increased review are associated with *lower* accuracy."

> "FSF emerges as a stronger and more stable predictor of correctness than CoT Length or Review Ratio, with consistent, significant correlations across difficulty strata and across all ten models."

> "Long failed branches bias subsequent exploration even after backtracking; current models do not fully 'unsee' past mistakes."

> "These results suggest that models have the ability to generate a viable path to the correct answer; however, the presence of failed branches biases subsequent exploration and lowers the overall success rate."

## Connections to Other Papers

- **Directly rebuts Paper #7** (s1): Wait tokens → longer CoT → claimed improvement, but this shows longer = worse
- **Supports Paper #302** (Test-Time Compute): Both find limits to scaling test-time compute
- **Supports Paper #12** (Illusions of Reflection): Review behavior doesn't enable self-correction
- **Supports Paper #180** (Contextual Drag): Prior context biases subsequent predictions
- **Supports Paper #295** (Overestimation Bias): More compute can hurt via accumulated errors

## Limitations

1. **Correlation within-question**: Controls for question difficulty but not solution path difficulty
2. **Graph extraction by Claude**: May have systematic biases in identifying "failed" nodes
3. **Branch removal is oracle**: Requires knowing which branches failed (not available in practice)

## REBUTTALS

**This paper directly rebuts:**
- **s1 paper (2501.19393)**: Claims wait tokens improve reasoning; this shows longer CoT correlates with LOWER accuracy
- **DeepSeek R1 "aha moment" narrative**: Claims review enables insight; this shows review correlates with failure

**Mechanism explanation:**
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
