# Paper Analysis: Rethinking Thinking Tokens: Understanding Why They Underperform in Practice

## Metadata
- **arXiv ID**: 2411.11371
- **Title**: Rethinking Thinking Tokens: Understanding Why They Underperform in Practice
- **Authors**: Sreeram Vennam, David Valente, David Herel, Ponnurangam Kumaraguru (IIIT Hyderabad, Czech Technical University)
- **Date**: November 2024
- **Venue**: arXiv preprint

---

## Core Claims

1. **TTs underperform CoT**: Thinking Tokens (unsupervised reasoning tokens) consistently underperform Chain-of-Thought.

2. **Noisy gradient signals**: Single TT embedding receives inconsistent gradient updates that average to near-zero.

3. **Embedding barely moves**: TT embedding stays near random initialization due to conflicting gradients.

4. **CoT success is from supervision**: The key is supervised intermediate steps, not "extra compute time."

---

## Methodology

### Models
GPT-2 (synthetic), Llama 3.2-1B (natural language)

### Tasks
Digit multiplication (2/3/4-digit), GSM8K, OpenBookQA

### Configurations
- Baseline: Direct answer
- CoT: Supervised intermediate steps
- TT: Unsupervised "thinking" token
- TT + CoT: Combined approach

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

---

## Key Evidence

| Finding | Evidence | Context |
|---------|----------|---------|
| TT vs CoT (2-digit) | 7.3% vs 91.9% | TT nearly useless |
| TT embedding movement | Barely moves from init | Gradient analysis |
| Cumulative gradient | Near-zero for TT | Signals cancel out |
| Two TT embeddings | Helps (validates hypothesis) | Clearer gradients |
| CoT dominates | All benchmarks | Consistent pattern |

### Why TTs Fail: Gradient Analysis
1. **Single embedding problem**: One TT embedding must serve multiple, contextually distinct roles
2. **Noisy gradients**: Cumulative gradient for TT embedding is near-zero (signals cancel out)
3. **Stagnant learning**: TT embedding barely moves from random initialization
4. **Inconsistent signals**: Same embedding gets contradictory updates across examples

---

## Relationship to Other Papers

### Supports
- **#315 Globality Barrier** (2406.06467): Both show unsupervised reasoning fails
- **#308 BAPO Bounds** (2602.02909): Both analyze CoT mechanism
- **#305 Effective Reasoning** (2509.19284): Both examine reasoning success factors
- **#2 Illusion of Thinking** (2506.06941): Both challenge "thinking" framing

---

## REBUTTALS

### This Paper Demonstrates
- Unsupervised reasoning is hard: models can't learn intermediate reasoning without supervision
- Latent space isn't enough: operating in latent space doesn't substitute for explicit structure
- CoT's success is from supervision: the key is supervised intermediate steps, not "extra compute time"

### Limitations (Authors Acknowledge)
1. Limited model sizes tested
2. TT approach is relatively nascent (may improve with better methods)
3. Doesn't test more sophisticated TT variants

---

## Key Quotes

> "TTs marginally improve performance and consistently underperform CoT."

> "Single embedding results in inconsistent learning signals and noisy gradients."

> "The cumulative gradient for the TT embedding is near-zero, causing it to barely move from its random initialization."

---

## Significance for Thesis

### The Core Problem
```
CoT: Each reasoning step has a distinct, interpretable token
     → Structured, stable gradient updates per step
     → Clear learning signal for each reasoning component

TT:  Single embedding reused across all reasoning contexts
     → Conflicting gradient updates average to noise
     → No clear learning of reasoning structure
```

**SUPPORTS** the thesis:

1. **Reasoning requires supervision**: Models cannot discover reasoning steps on their own
2. **CoT is template learning**: Success comes from learning the explicit structure, not from "more thinking"
3. **No emergent reasoning**: Giving models "time to think" via TTs doesn't produce reasoning

This shows that CoT improvements come from **supervised pattern matching** on intermediate steps, not from genuine reasoning emergence.

**Stance**: SUPPORTS

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
