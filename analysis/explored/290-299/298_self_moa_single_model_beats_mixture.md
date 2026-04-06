## Summary

This Princeton paper (4 authors) shows that Self-MoA—aggregating multiple outputs from a single top-performing model—outperforms Mixed-MoA (aggregating diverse models) by 6.6% on AlpacaEval 2.0. The key insight: MoA performance is more sensitive to quality than diversity, and mixing models often degrades average quality.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: QUALITY TRUMPS DIVERSITY                              │
│                                                                     │
│  Traditional MoA:  Mix different LLMs → cross-model diversity       │
│  Self-MoA:         Same model, multiple samples → in-model diversity│
│                                                                     │
│  Result: Self-MoA wins because quality matters more than diversity  │
│          α (quality) > β (diversity) in regression analysis         │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

This paper supports the thesis in a subtle but important way: it shows that LLM ensemble success depends on quality (training), not emergent reasoning from diverse perspectives. The model isn't "reasoning better" with more diverse inputs—it's pattern-matching better when given higher-quality patterns to aggregate.

**Key implications for thesis:**
1. **No emergent reasoning from diversity**: If LLMs could genuinely reason, diverse perspectives should help (like human brainstorming). Instead, quality dominates—suggesting aggregation, not reasoning.
2. **Aggregator as pattern selector**: The aggregator model selects from cached patterns, not synthesizing new reasoning from diverse sources.
3. **In-model diversity sufficient**: Multiple samples from same model provide enough variation—no need for diverse "reasoning approaches" from different models.

## Methodology

**Experiments:**
- AlpacaEval 2.0: Self-MoA beats Mixed-MoA by 6.6 points (65.7 vs 59.1)
- MMLU, CRUX, MATH: Self-MoA with task-best model consistently outperforms 13 Mixed-MoA configurations
- Over 200 experiments mapping quality-diversity tradeoff

**Quality-Diversity Analysis:**
- Linear regression: t = α×quality + β×diversity + γ
- Finding: α > β across all datasets (quality effect stronger)
- R² ≈ 0.7 (quality + diversity explain 70% of performance)

**Models tested:**
- General: Qwen1.5-110B-Chat, WizardLM-8x22B, LLaMA-3-70B, etc.
- Specialized: Qwen2-7B-Instruct (MMLU), DeepSeek-Coder-V2 (CRUX), Qwen2-Math-7B (MATH)

## Key Evidence

| Finding | Quantitative Result |
|---------|---------------------|
| Self-MoA vs Mixed-MoA (AlpacaEval) | +6.6 points (65.7 vs 59.1) |
| Quality coefficient (α) | 2.56-4.72 across datasets |
| Diversity coefficient (β) | 1.42-2.84 across datasets |
| Quality > Diversity | α > β in all 3 datasets (MMLU, CRUX, MATH) |
| State-of-the-art | Self-MoA achieves #1 on AlpacaEval 2.0 |

**Critical finding**: When diversity is maximized at the expense of quality (including weak models), performance degrades. The aggregator cannot synthesize "better reasoning" from diverse weak models—it needs high-quality patterns to select from.

## Key Quotes

> "Surprisingly, Self-MoA outperforms standard MoA that mixes different LLMs in a large number of scenarios."

> "MoA performance is rather sensitive to the quality, and mixing different LLMs often lowers the average quality of the models."

> "We confirm that the MoA performance is particularly sensitive to variations in quality, highlighting the importance of prioritizing quality within the proposer mixture."

> "Compared to Self-MoA on the best-performing model, simply aiming for greater diversity in the proposer mixture can result in lower overall quality, which may negatively impact MoA's performance."

## Connections to Other Papers

**Directly Supports:**
- **#296 RLVR Structural Convergence** (2602.11792): Both show in-model consistency matters more than diversity; Self-MoA success parallels RLVR structural convergence
- **#295 Test-Time Compute** (2603.15377): Both challenge "more diverse compute = better"; quality of scorer/proposer dominates
- **#297 Gemini Scientific Discovery** (2602.03837): Aggregator as selector, not reasoner—aligns with "junior collaborator" framing

**Conceptual connection:**
- **#146 Emergent Abilities Mirage** (2304.15004): If emergence were real, diverse models should produce emergent insights; instead, quality dominates
- **#145 SCoRe** (2409.12917): Self-correction requires same-distribution training; Self-MoA success suggests similar principle

## Limitations

1. **Limited model coverage**: Primarily tested on instruction-following benchmarks
2. **Aggregator quality**: Uses strong aggregator (Qwen1.5-110B); unclear if findings hold with weaker aggregators
3. **Task-specific**: Self-MoA advantage may vary by task type
4. **No mechanistic analysis**: Shows correlation, not why quality > diversity mechanistically

## Rebuttals

**Potential counter-argument**: Self-MoA works because the aggregator is just "selecting the best" from multiple samples, not because reasoning fails.

**Response**: This is exactly the point—the aggregator is a selector/ranker, not a synthesizer of novel reasoning. If LLMs could genuinely reason, diverse perspectives should enable novel insights beyond any individual sample. Instead, the aggregator pattern-matches to the highest-quality cached patterns.

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY SELF-MOA SUPPORTS THE THESIS                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF LLMs reasoned:                                                  │
│  • Diverse perspectives → novel insights                            │
│  • Mixed-MoA should beat Self-MoA (like human brainstorming)       │
│                                                                     │
│  WHAT ACTUALLY HAPPENS:                                             │
│  • Quality (training) trumps diversity (perspectives)               │
│  • Self-MoA beats Mixed-MoA                                         │
│  • Aggregator selects best pattern, doesn't synthesize reasoning    │
│                                                                     │
│  CONCLUSION:                                                        │
│  Ensemble success = better pattern selection                        │
│                  ≠ emergent reasoning from diverse views            │
└─────────────────────────────────────────────────────────────────────┘
```

The paper's finding that in-model diversity suffices suggests the "diversity" that helps is sampling variation from the same distribution—not genuinely different reasoning approaches. This aligns with the thesis that LLMs are sophisticated pattern matchers whose "reasoning" is constrained by training distribution quality.
