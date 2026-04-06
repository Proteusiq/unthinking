## Summary

This paper provides rigorous mechanistic evidence that LLMs apply surface heuristics (distance, cost, efficiency, semantic similarity) that systematically override implicit feasibility constraints. The "car wash problem" - where all models recommend walking 50m to wash a car despite needing the car at the car wash - reveals a fundamental failure pattern. Through causal-behavioral analysis, the authors show heuristic dominance ratios of 8.7-38x: distance cues are an order of magnitude more influential than goal constraints. The Heuristic Override Benchmark (HOB) with 500 instances across 4 heuristic x 5 constraint families demonstrates this generalizes: no model exceeds 75% accuracy under strict evaluation.

## Key Coverage

- **Heuristic Dominance Ratios**: Distance cue exerts 8.7-38x more influence than goal constraints across all 6 models tested
- **Token-level Attribution**: Patterns "more consistent with keyword associations than compositional inference"
- **Universal Sigmoid Pattern**: All models produce sigmoid curves mapping distance to decision in goal-independent manner - heuristic overrides constraint regardless of goal
- **14-Model Benchmark**: Under strict 10/10 evaluation, no model exceeds 75%; presence constraints hardest (44%)
- **Hint Recovery**: +15 pp accuracy from minimal hint (e.g., emphasizing "my car") - failure is in constraint inference, not missing knowledge
- **Conservative Bias**: 12/14 models perform WORSE when constraint is removed (up to -39 pp) - reveals they default to harder option rather than genuinely reason
- **Goal Decomposition**: Forcing precondition enumeration recovers +6-9 pp - consistent with inference-order bottleneck

## Coverage of Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  SMOKING GUN FOR PATTERN MATCHING OVER REASONING                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  WHAT THESIS CLAIMS           WHAT THIS PAPER SHOWS                 │
│  ─────────────────────────    ─────────────────────────────────────  │
│  LLMs match patterns,         Heuristic dominance ratio 8.7-38x:    │
│  not reason                   surface cues override constraints     │
│                                                                     │
│  CoT doesn't help             Token attribution shows "keyword      │
│  fundamentally                associations, not compositional       │
│                               inference"                            │
│                                                                     │
│  Knowledge present but        +15 pp from minimal hint: "failure    │
│  not activated                is in constraint inference rather     │
│                               than missing knowledge"               │
│                                                                     │
│  Processing order matters     Goal-decomposition prompting works    │
│                               "consistent with inference-order      │
│                               bottleneck"                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Strongly supports thesis**. This is one of the clearest mechanistic demonstrations of pattern-matching over reasoning. The sigmoid curves showing goal-independent heuristic application, combined with token attribution revealing keyword associations rather than compositional inference, directly support the thesis that LLMs perform sophisticated pattern matching rather than genuine reasoning. The finding that models perform *worse* when constraints are removed (conservative bias) further shows much "correct" behavior is accidental rather than reasoned.

## Relevance to Thesis

- **Scale**: 14 models including GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro, DeepSeek R1 - frontier models systematically fail
- **Robustness**: 70,000 total evaluations with strict 10/10 criterion
- **Mechanism**: Provides causal explanation for failures (sigmoid heuristics, inference bottleneck)
- **Frame Problem Connection**: Authors connect to classical frame problem - models can't enumerate relevant unstated conditions

## Quantitative Findings

| Finding | Measurement |
|---------|-------------|
| Heuristic Dominance Ratio | 8.7-38x across 6 models |
| Best model strict accuracy | 74.6% (Gemini 3.1 Pro) |
| Presence constraint accuracy | 44.4% (hardest) |
| Hint recovery | +15.3 pp average |
| Conservative bias | 12/14 models worse on minimal pairs (up to -38.5 pp) |
| Goal decomposition gain | +6-9 pp |
| Token vs distance effect | Distance 5x larger than any token |

## Limitations (per authors)

- English-only; cross-lingual generality untested
- Mitigation is proof-of-concept; alternative explanations possible
- "Causal" in interventionist sense, not circuit-level
- Study 1 limited to models up to 32B
- Semantic heuristic family has only 1/5 cells populated

## Connections

- **Supports**: #1 (Faith and Fate), #3 (GSM-Symbolic), #11 (Simple Reasoning Failures), #12 (Illusions of Reflection), #14 (CoT is Mirage)
- **Extends**: #8 (Faithfulness in CoT) - provides mechanistic explanation for unfaithful reasoning
- **Related Mechanism**: #2 (Illusion of Thinking) - both show reasoning traces don't reflect actual computation
- **Frame Problem**: Connects to classical AI frame problem literature

## Methodology

- **Causal Occlusion**: Perturbing input components to measure influence on decision scores
- **Teacher-Forced Scoring**: Deterministic log-probability extraction via anchored scoring
- **Minimal Pairs**: Every instance has constraint-removed variant to isolate genuine reasoning
- **Parametric Sweeps**: Distance varied over 14 log-spaced values to characterize heuristic shape
- **Strict Evaluation**: Instance correct only if all 10 trials correct (reliability criterion)

## REBUTTALS

None identified. This paper provides new evidence; no direct challenges from other analyzed papers.

## Stance: Supports
