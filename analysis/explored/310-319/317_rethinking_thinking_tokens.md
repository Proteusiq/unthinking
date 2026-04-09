## Summary

This paper investigates why Thinking Tokens (TT) — unsupervised tokens inserted to give models "more time to reason" — consistently underperform compared to Chain-of-Thought (CoT). The core finding: single-embedding TTs receive noisy, inconsistent gradient signals during training, causing the embedding to barely move from initialization. TTs offer only marginal gains while being vastly outperformed by supervised CoT.

## Methodology

- **Models**: GPT-2 (synthetic), Llama 3.2-1B (natural language)
- **Tasks**: Digit multiplication (2/3/4-digit), GSM8K, OpenBookQA
- **Configurations**:
  - Baseline: Direct answer
  - CoT: Supervised intermediate steps
  - TT: Unsupervised "thinking" token
  - TT + CoT: Combined approach

## Key Findings

### Performance Comparison
```
┌─────────────────────────────────────────────────────────────────────┐
│  THINKING TOKENS VS CHAIN-OF-THOUGHT                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Task              Baseline    TT        CoT       TT+CoT           │
│  ──────────────────────────────────────────────────────────────────  │
│  2-digit mult      0.0%        7.3%      91.9%     92.3%            │
│  3-digit mult      0.0%        0.01%     66.3%     67.8%            │
│  GSM8K             6.3%        4.5%      18.7%     17.5%            │
│  OpenBookQA        37.2%       37.2%     42.0%     39.6%            │
│                                                                     │
│  TT provides marginal/no gains; CoT dominates                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Why TTs Fail: Gradient Analysis
1. **Single embedding problem**: One TT embedding must serve multiple, contextually distinct roles
2. **Noisy gradients**: Cumulative gradient for TT embedding is near-zero (signals cancel out)
3. **Stagnant learning**: TT embedding barely moves from random initialization
4. **Inconsistent signals**: Same embedding gets contradictory updates across examples

### Two Embeddings Help
- When using TWO distinct TT embeddings ("t" and "ts"):
  - Clearer, larger cumulative gradients observed
  - Embeddings actually move from initialization
  - Still underperforms CoT, but validates the hypothesis

## Critical Observations

### The Core Problem
```
CoT: Each reasoning step has a distinct, interpretable token
     → Structured, stable gradient updates per step
     → Clear learning signal for each reasoning component

TT:  Single embedding reused across all reasoning contexts
     → Conflicting gradient updates average to noise
     → No clear learning of reasoning structure
```

### Implications
1. **Unsupervised reasoning is hard**: Models can't learn intermediate reasoning without supervision
2. **Latent space isn't enough**: Operating in latent space doesn't substitute for explicit structure
3. **CoT's success is from supervision**: The key is supervised intermediate steps, not "extra compute time"

## Relevance to Thesis

**SUPPORTS** the thesis:

1. **Reasoning requires supervision**: Models cannot discover reasoning steps on their own
2. **CoT is template learning**: Success comes from learning the explicit structure, not from "more thinking"
3. **No emergent reasoning**: Giving models "time to think" via TTs doesn't produce reasoning

This shows that CoT improvements come from **supervised pattern matching** on intermediate steps, not from genuine reasoning emergence.

## Limitations

- Limited model sizes tested
- TT approach is relatively nascent (may improve with better methods)
- Doesn't test more sophisticated TT variants

## Connections

- **Supports**: Paper #315 (Globality Barrier), Paper #308 (BAPO Bounds)
- **Related**: Paper #305 (Effective Reasoning), Paper #2 (Illusion of Thinking)
- **Mechanism**: Explains why CoT works (supervision) and why unsupervised alternatives fail
