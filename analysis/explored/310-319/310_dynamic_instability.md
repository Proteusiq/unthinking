## Summary

Dalhousie University study showing **dynamic instability predicts reasoning failure** from inference-time observables (token log probabilities). Key finding: instability signal (JSD + entropy) predicts wrong answers with **above-chance AUC** across GSM8K and HotpotQA. Crucially distinguishes **corrective instability** (early, can recover) from **destructive instability** (late, leads to failure). Model-agnostic, training-free diagnostic.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: When instability occurs matters for recoverability   │
│                                                                     │
│  CORRECTIVE instability (early):                                    │
│    → Can be followed by stabilization and correct answer            │
│    → Model "course corrects" during reasoning                       │
│                                                                     │
│  DESTRUCTIVE instability (late):                                    │
│    → Often followed by failure                                      │
│    → Too late to recover before answer                              │
│                                                                     │
│  Same magnitude, different outcomes based on TIMING                 │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

Reveals process-level breakdown in reasoning:

1. **Detectable failure modes**: Instability predicts wrong answers with above-chance AUC
2. **Timing matters**: Recoverability depends on when instability occurs
3. **"Loses the thread"**: Models experience mid-reasoning breakdowns
4. **Monotonic accuracy decline**: Higher instability → lower accuracy at scale

## Methodology

**Signal**: Combines consecutive-step JSD (distributional shift) + entropy (uncertainty)

**Summary**: Peak instability strength per trace

**Results:**
- Above-chance AUC for predicting wrong answers
- Monotonic bucket-level accuracy decline across model sizes
- Works on GSM8K and HotpotQA

**Key distinction:**
| Type | Timing | Outcome |
|------|--------|---------|
| Corrective | Early | Can stabilize → correct |
| Destructive | Late | Leads to failure |

## Key Quotes

> "Many failures manifest as a process-level breakdown: the model 'loses the thread' mid-reasoning."

> "Instability strength predicts wrong answers with above-chance AUC and yields monotonic bucket-level accuracy decline at scale across model sizes."

> "Recoverability depends not only on how strongly the distribution changes but also on when such changes occur relative to the remaining decoding horizon."

## Connections to Other Papers

- **Closely related to Paper #309** (EDIS): Both analyze entropy/instability dynamics
- **Supports Paper #305** (Effective Reasoning): Both identify patterns in correct vs incorrect
- **Supports Paper #306** (Lost in Noise): Both show models can "lose the thread"

## REBUTTALS

**Key insight for thesis:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  REASONING FAILURES ARE PROCESS-LEVEL BREAKDOWNS                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Models don't just "get wrong answers"—they:                        │
│    • Experience detectable instability during reasoning             │
│    • "Lose the thread" mid-generation                               │
│    • Have limited ability to recover from late instability          │
│                                                                     │
│  If reasoning were robust inference:                                │
│    • Late corrections would still work                              │
│    • Instability wouldn't predict failure                           │
│    • Recovery wouldn't depend on remaining tokens                   │
│                                                                     │
│  Instead: Pattern matching that can be derailed                     │
└─────────────────────────────────────────────────────────────────────┘
```
