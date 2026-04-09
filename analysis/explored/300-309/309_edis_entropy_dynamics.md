## Summary

A 9-author paper showing **entropy dynamics reveal reasoning failures**. Key finding: erroneous solutions exhibit characteristic instability patterns—**burst spikes** (sustained uncertainty growth) and **peak-valley spikes** (sharp rebounds after transient confidence). These patterns persist across models and training stages, suggesting they reflect **intrinsic properties of reasoning failure**. The EDIS metric quantifies this instability and predicts incorrect answers.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: Wrong reasoning has a detectable entropy signature   │
│                                                                     │
│  Correct solutions: Stable entropy dynamics                         │
│  Incorrect solutions: Unstable dynamics with:                       │
│    • Burst spikes (sustained uncertainty growth)                    │
│    • Peak-valley spikes (sharp rebounds after transient confidence) │
│                                                                     │
│  This pattern persists across models and training stages            │
│  → Reflects INTRINSIC properties of reasoning failure               │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

Reveals internal signatures of reasoning failure:

1. **Temporal evolution matters**: Aggregate confidence hides failure patterns
2. **Instability predicts failure**: Erroneous reasoning has detectable signatures
3. **Intrinsic property**: Patterns persist across models—not superficial noise
4. **Model lacks metacognition**: Cannot use its own uncertainty signals to self-correct

## Methodology

**Approach:** Analyze token-level entropy trajectories during generation

**Key metric:** EDIS (Entropy Dynamics Instability Score)
- Trajectory-level metric quantifying instability in entropy evolution
- Effective diagnostic signal for inference-time selection

**Patterns identified:**
| Pattern | Description | Implication |
|---------|-------------|-------------|
| Burst spikes | Sustained uncertainty growth | Model losing confidence |
| Peak-valley spikes | Sharp rebounds after transient confidence | False certainty followed by doubt |

**Applications:**
- Inference-time selection (substantially improves accuracy)
- Training-time sample curation

## Key Evidence

**Characteristic patterns:**
- Erroneous solutions: unstable dynamics (burst spikes, peak-valley spikes)
- Correct solutions: stable entropy evolution
- Patterns persist across models and training stages

**Practical application:**
- EDIS substantially improves reasoning accuracy when used for inference-time selection
- Provides diagnostic signal without ground truth

## Key Quotes

> "Erroneous solutions exhibit unstable dynamics, including burst spikes (sustained uncertainty growth) and peak-valley spikes (sharp rebounds following transient confidence)."

> "These patterns persist across models and training stages, suggesting they reflect intrinsic properties of reasoning failure rather than superficial noise."

> "EDIS serves as an effective diagnostic signal for inference-time selection, substantially improving reasoning accuracy."

> "We show that the temporal evolution of confidence during generation carries richer information than aggregate statistics alone."

## Connections to Other Papers

- **Supports Paper #305** (Effective Reasoning): Both identify patterns distinguishing correct/incorrect reasoning
- **Supports Paper #306** (Lost in Noise): Both show models lack robust self-monitoring
- **Supports Paper #310** (Dynamic Instability): Both analyze dynamic signatures of failure
- **Related to Paper #303** (CoVe): Both show models can't reliably detect own errors

## Limitations

1. **Diagnostic, not prescriptive**: Identifies failures but doesn't fix underlying reasoning
2. **Requires token-level access**: Needs internal probabilities, not just outputs
3. **Selection vs correction**: Uses instability for selection, not self-repair

## REBUTTALS

**This paper reveals:**
- Models have detectable failure modes in their uncertainty dynamics
- Yet they cannot use these signals for self-correction
- Patterns are intrinsic to reasoning failure, not random noise

**Key insight for thesis:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  ENTROPY DYNAMICS EXPOSE THE MACHINERY                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  What entropy patterns reveal:                                      │
│                                                                     │
│  CORRECT reasoning:                                                 │
│    Stable dynamics → consistent token predictions                   │
│    Model "knows what it's doing"                                    │
│                                                                     │
│  INCORRECT reasoning:                                               │
│    Unstable dynamics → uncertainty spikes                           │
│    Model is "guessing" or "confused"                                │
│                                                                     │
│  Yet models cannot USE this information:                            │
│    • They don't self-correct when uncertain                         │
│    • External selection required to exploit signal                  │
│    • Lacks metacognitive access to own confidence                   │
│                                                                     │
│  Implication: Reasoning is pattern matching with                    │
│  detectable quality variations, not robust inference                │
└─────────────────────────────────────────────────────────────────────┘
```
