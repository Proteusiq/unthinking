## Summary

This paper provides a rigorous theoretical framework explaining why more test-time compute can HURT LLM performance. Using Extreme Value Theory, the authors derive a maximum useful beam width k-hat beyond which search degrades performance due to overestimation bias. Key finding: perplexity scoring yields k-hat=1 (no beam width helps), while PRM scoring yields k-hat>=4. The bias grows as sigma*sqrt(2*log(n-1)) where sigma is scorer noise and n is candidate pool size. Across three 7B models and 5,975 questions, perplexity-guided beam search showed no benefit (even degraded up to -5.4 pp), while PRM-guided search gained up to +8.9 pp.

## Key Coverage

- **Overestimation Bias Formula**: Bias = sigma * sqrt(2 * log(n-1)) grows with candidate pool size and scorer noise
- **Maximum Useful Beam Width**: n-hat = 1 + exp(Delta^2 / 2*sigma^2) - depends exponentially on signal-to-noise ratio
- **Perplexity k-hat=1**: No benefit at any beam width tested; Llama/Mistral actually degraded (-5.4 and -3.9 pp at k=4)
- **PRM k-hat>=4**: Gains up to +8.9 pp (Mistral 42.3% to 51.2%)
- **Reward Inversion**: 44% of perplexity selections had margin <0.1 between top candidates (near-random selection)
- **Score Margins as Diagnostic**: Small margins signal scorer cannot support wider search

## Coverage of Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  OVERTHINKING: MORE COMPUTE CAN MAKE THINGS WORSE                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PERPLEXITY SCORING (high noise)                                    │
│  ├── k-hat = 1: search provides NO benefit at any width             │
│  ├── Llama: -5.4 pp at k=4 vs k=1                                   │
│  └── Mistral: -3.9 pp at k=4 vs k=1                                 │
│                                                                     │
│  PRM SCORING (lower noise)                                          │
│  ├── k-hat >= 4: search helps                                       │
│  └── But still has a MAXIMUM beyond which it hurts                  │
│                                                                     │
│  KEY INSIGHT: The benefit depends on scorer quality, not            │
│  on compute. Bad scorers select fluent but wrong paths.             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Supports thesis**. This provides theoretical foundation for the "overthinking" phenomenon observed in other papers. The key insight is that more compute with an unreliable scorer (like perplexity/log-prob) selects fluent but incorrect paths. This connects to the broader pattern that LLMs optimize surface fluency not correctness. The existence of a maximum useful compute budget for any given scorer quality directly supports the thesis that test-time scaling has fundamental limits.

## Relevance to Thesis

- **Overthinking**: Directly provides theoretical explanation for why more tokens/compute can hurt
- **Fluency vs Correctness**: Shows perplexity (fluency measure) is anti-correlated with correctness for selection
- **Fundamental Limits**: Even with PRM scoring, there's a k-hat beyond which search degrades
- **Pattern Matching**: Models select confident (fluent) but wrong paths when using surface signals

## Quantitative Findings

| Finding | Measurement |
|---------|-------------|
| Perplexity k-hat | 1 (no benefit at any beam width) |
| PRM k-hat | >= 4 |
| Llama perplexity degradation | -5.4 pp at k=4 |
| Mistral PRM gain | +8.9 pp at k=4 |
| Near-random selections (perplexity) | 44% with margin < 0.1 |
| Bias growth rate | sigma * sqrt(2 * log(n-1)) |
| Questions evaluated | 5,975 (MR-BEN) |
| Models tested | 3 (Qwen 7B, Llama 8B, Mistral 7B) |

## Methodology

- **Theoretical**: Extreme Value Theory (EVT), Generalized Extreme Value distribution
- **Gaussian noise model**: Scorer outputs = true quality + Gaussian noise
- **Two-class quality**: One correct candidate among n-1 incorrect ones (worst case)
- **Beam search**: k beams each generate k candidates = k^2 candidates per step
- **Evaluation**: 10 domains, 3 seeds, temperature 0.7

## Connections

- **Directly supports**: #19 (Overthinking), #14 (CoT is Mirage) - provides theoretical foundation
- **Mechanism for**: #294 (Surface Heuristics) - explains why surface signals override constraints
- **Related**: #3 (GSM-Symbolic), #11 (Simple Reasoning Failures) - same underlying pattern matching issue
- **Extends**: Reward overoptimization literature (Gao et al. 2023)

## Limitations (per authors)

- Two-class quality model simplifies reality (but conservative bound)
- Scale limited to 7B models, beam width <= 4
- MR-BEN benchmark only
- Intrinsic signal analysis limited to perplexity (not entropy, self-certainty, etc.)

## REBUTTALS

None identified. This paper provides new theoretical framework; no direct challenges from other analyzed papers.

## Stance: Supports
