# Paper Analysis: Diagnosing Dynamic Instability in LLM Reasoning

## Metadata
- **arXiv ID**: 2602.02863
- **Title**: Diagnosing Dynamic Instability in LLM Reasoning
- **Authors**: Dalhousie University (multiple authors)
- **Date**: February 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **Instability predicts failures**: JSD + entropy signal predicts wrong answers with above-chance AUC.

2. **Timing matters for recovery**: Corrective instability (early) can recover; destructive instability (late) cannot.

3. **"Loses the thread"**: Many failures manifest as process-level breakdown mid-reasoning.

4. **Model-agnostic diagnostic**: Training-free method works across model sizes.

---

## Methodology

### Signal
Combines consecutive-step JSD (distributional shift) + entropy (uncertainty)

### Summary
Peak instability strength per trace

### Results
- Above-chance AUC for predicting wrong answers
- Monotonic bucket-level accuracy decline across model sizes
- Works on GSM8K and HotpotQA

### Key Distinction
| Type | Timing | Outcome |
|------|--------|---------|
| Corrective | Early | Can stabilize → correct |
| Destructive | Late | Leads to failure |

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

---

## Key Evidence

- Above-chance AUC for predicting failures
- Monotonic accuracy decline with instability
- Early instability can recover; late cannot
- Works on GSM8K and HotpotQA
- Model-agnostic, training-free diagnostic

---

## Relationship to Other Papers

### Closely Related
- **#309 EDIS** (2602.01288): Both analyze entropy/instability dynamics

### Supports
- **#305 Effective Reasoning** (2509.19284): Both identify patterns in correct vs incorrect
- **#306 Lost in Noise** (2601.07226): Both show models can "lose the thread"

---

## REBUTTALS

### This Paper Reveals
- Reasoning failures are process-level breakdowns
- Detectable but not self-correctable
- Timing dependency undermines claims of robust reasoning

### Limitations (Authors Acknowledge)
- Signal is diagnostic, not prescriptive
- Requires access to token probabilities
- Correlation study, not causal intervention

---

## Key Quotes

> "Many failures manifest as a process-level breakdown: the model 'loses the thread' mid-reasoning."

> "Instability strength predicts wrong answers with above-chance AUC and yields monotonic bucket-level accuracy decline at scale across model sizes."

> "Recoverability depends not only on how strongly the distribution changes but also on when such changes occur relative to the remaining decoding horizon."

---

## Significance for Thesis

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

**Stance**: SUPPORTS

Reveals process-level breakdown in reasoning: detectable failure modes, timing-dependent recovery, and models "lose the thread" mid-reasoning.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
