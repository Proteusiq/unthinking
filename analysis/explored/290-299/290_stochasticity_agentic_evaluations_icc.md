# Stochasticity in Agentic Evaluations: Quantifying Inconsistency with ICC

**arXiv**: [2512.06710](https://arxiv.org/abs/2512.06710)
**Date**: December 2025
**Authors**: Zairah Mustahsan, Abel Lim, Megna Anand, Saahil Jain, Bryan McCann (You.com)

## Summary

Proposes Intraclass Correlation Coefficient (ICC) to measure evaluation reliability. Single-run benchmark results hide massive variance: GAIA Level 3 shows ICC=0.304 (70% of variance is random noise, not task difficulty). Even with 64 trials per question, agent behavior is highly stochastic. Recommends reporting accuracy + ICC + within-query variance as standard practice.

## Key Findings

```
┌─────────────────────────────────────────────────────────────────────┐
│  CORE INSIGHT: Single-run evaluations are unreliable                │
│  GAIA Level 3 ICC = 0.304 → 70% variance is trial-to-trial noise    │
│  Current leaderboards report lucky samples, not true capability     │
└─────────────────────────────────────────────────────────────────────┘
```

### What ICC Measures

```
┌─────────────────────────────────────────────────────────────────────┐
│  ICC = σ²_between / (σ²_between + σ²_within)                        │
│                                                                     │
│  σ²_between: Variance from task difficulty (signal)                 │
│  σ²_within:  Variance from agent inconsistency (noise)              │
│                                                                     │
│  High ICC (≥0.75): Task difficulty dominates, agent is consistent   │
│  Low ICC (<0.50):  Agent stochasticity dominates, results unreliable│
└─────────────────────────────────────────────────────────────────────┘
```

### Key Quantitative Results

| Benchmark | Model | Accuracy | ICC | Interpretation |
|-----------|-------|----------|-----|----------------|
| GAIA Level 1 | GPT-4o | 22.7% | 0.561 | Moderate reliability |
| GAIA Level 2 | GPT-4o | 23.2% | 0.662 | Moderate reliability |
| GAIA Level 3 | GPT-4o | 6.6% | **0.304** | Poor - 70% is noise |
| GAIA Level 3 | GPT-5 | 44.2% | 0.629 | Improved consistency |
| FRAMES | GPT-4o search | 63.5% | 0.735 | Good reliability |
| FRAMES | GPT-5 search | 77.3% | **0.496** | Higher accuracy, lower consistency! |

### The Critical Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│  SAME ACCURACY, DIFFERENT RELIABILITY:                              │
│                                                                     │
│  Agent A: 73% accuracy, ICC = 0.66                                  │
│  Agent B: 73% accuracy, ICC = 0.30                                  │
│                                                                     │
│  Agent A: Tasks separate by difficulty, agent is consistent         │
│  Agent B: Agent behavior unpredictable, same task → different results│
│                                                                     │
│  Without ICC, these look identical. With ICC, B is unreliable.      │
└─────────────────────────────────────────────────────────────────────┘
```

### ICC Convergence

- Levels 1-2: ICC stabilizes by n=8-16 trials
- Level 3: ICC requires n≥32 trials to converge
- Current practice (n=1) is fundamentally inadequate

## Relevance to Thesis

**Stance**: Supports

This paper provides rigorous statistical evidence that:

1. **Evaluation is stochastic noise**: Up to 70% of variance is agent inconsistency, not task difficulty
2. **Single-run results meaningless**: Current benchmark practice hides fundamental unreliability
3. **Leaderboards are luck**: Without ICC, we cannot distinguish capability from lucky sampling

### Connection to Broader Thesis

| Aspect | Evidence |
|--------|----------|
| Pattern matching is noisy | Same input → different outputs across trials |
| No stable reasoning | If reasoning were principled, ICC would be high |
| Evaluation theater | Leaderboards report single runs, hiding variance |

## Key Quotes

> "A single accuracy number from a single run obscures the variance that determines whether the result is reproducible at all."

> "Observed differences may partly reflect random variation, scorer choices, or agent inconsistency rather than genuine differences in capability."

> "ICC=0.304 meaning 70% of observed variance is trial-to-trial randomness rather than question difficulty. Single-run results are essentially unreliable."

> "Accuracy improvements without ICC improvements may not be robust under deployment."

> "High accuracy with low ICC indicates unreliable evaluation, not a suitable system for deployment."

## Methodology

- **64 trials per question**: Far beyond standard practice
- **GAIA benchmark**: Levels 1-3 (53, 86, 26 questions)
- **FRAMES benchmark**: 50 questions sampled
- **Multiple models**: GPT-4o, GPT-5, Claude 4.5, Gemini 2.5 Pro, Qwen, DeepSeek
- **o4-mini as judge**: For scoring consistency

## Connections to Other Papers

- **Supports #290**: Both show evaluation requires multiple trials
- **Supports #287-289**: All reveal systematic evaluation unreliability
- **Complements #291**: Blind spots + stochasticity = fundamentally unreliable evaluation

## Implications

1. **Current benchmarks are broken**: Single-run reporting hides massive variance
2. **Leaderboards are misleading**: Without ICC, rankings are partly luck
3. **Deployment decisions need ICC**: High accuracy + low ICC = unreliable system

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE MEASUREMENT PROBLEM:                                           │
│                                                                     │
│  If LLM agents were reasoning consistently, ICC would be high.      │
│  The same problem with the same reasoning should yield the same     │
│  answer. Instead, we see ICC as low as 0.304 - meaning the          │
│  "reasoning" is more like random sampling than principled thought.  │
│                                                                     │
│  This is the stochastic parrot made measurable.                     │
└─────────────────────────────────────────────────────────────────────┘
```

## REBUTTALS

None identified. This is rigorous measurement science applied to AI evaluation. The ICC methodology is well-established in psychometrics.

**Potential counter-argument**: Some tasks may inherently require exploration/stochasticity.
**Response**: The authors acknowledge this, but note: (1) single-run results remain unreliable regardless, (2) low ICC signals need for more trials, (3) even "exploration" tasks should have some consistency if reasoning is principled.

---

*Analysis conducted following AGENTS.md methodology. Full paper read via arXiv HTML.*
