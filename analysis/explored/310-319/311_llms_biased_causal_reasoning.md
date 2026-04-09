## Summary

NYU/Tübingen study benchmarking 20+ LLMs against humans on causal judgment tasks (collider structures). Key finding: LLMs exhibit "**rule-like reasoning strategies**" rather than human-like probabilistic causal reasoning. Most LLMs do NOT mirror characteristic human biases (explaining away, Markov violations). Their rule-like reasoning "may break down when uncertainty is intrinsic"—highlighting brittleness of pattern-based causal judgments.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: LLMs use rule-like strategies, not causal reasoning  │
│                                                                     │
│  Human causal judgment: Accounts for latent factors, shows biases  │
│  LLM causal judgment: Rule-like, more rigid, different biases      │
│                                                                     │
│  LLMs DON'T show human collider biases:                            │
│    • Weak explaining away                                           │
│    • Markov violations                                              │
│                                                                     │
│  Rule-like reasoning breaks down with intrinsic uncertainty        │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

Evidence for pattern-matching over genuine causal reasoning:

1. **Rule-like strategies**: Compressible by simple interpretable model
2. **Not human-like inference**: Different bias patterns from humans
3. **Brittleness with uncertainty**: Rule-like reasoning fails under intrinsic uncertainty
4. **Lack probabilistic sophistication**: Don't account for latent factors like humans

## Methodology

**Benchmark**: 11 causal judgment tasks with collider structure (C₁ → E ← C₂)

**Subjects**: 20+ LLMs vs matched human baseline

**Probes**:
1. Semantic abstraction (different framings)
2. Prompt overloading (irrelevant text injection)

**Finding**: CoT increases robustness for many LLMs

## Key Evidence

| Aspect | Humans | LLMs |
|--------|--------|------|
| Reasoning style | Probabilistic, accounts for latent factors | Rule-like, rigid |
| Explaining away | Shows weak effect | Does NOT show |
| Markov violations | Shows characteristic bias | Does NOT mirror |
| Uncertainty handling | Flexible | Breaks down |

**Compressibility**: Small interpretable model captures LLMs' causal judgments well
- Suggests simple rule-based computation, not rich causal inference

## Key Quotes

> "Most LLMs exhibit more rule-like reasoning strategies than humans who seem to account for unmentioned latent factors in their probability judgments."

> "Most LLMs do not mirror the characteristic human collider biases of weak explaining away and Markov violations."

> "Their rule-like reasoning may break down when uncertainty is intrinsic."

> "This divergence suggests LLMs can complement humans when known biases are undesirable, but their rule-like reasoning may break down when uncertainty is intrinsic."

## Connections to Other Papers

- **Supports Paper #306** (Lost in Noise): Both show LLMs struggle with uncertainty
- **Supports Paper #180** (Contextual Drag): Both show context/framing affects judgments
- **Related to Paper #206** (Arithmetic Interpretation): Both find rule-based computations

## Limitations

1. **Specific task type**: Collider structures may not generalize to all causal reasoning
2. **3 authors**: Smaller author team than some papers
3. **Workshop paper**: ICLR 2026 Workshop

## REBUTTALS

**Key insight for thesis:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  RULE-LIKE ≠ REASONING                                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  What this paper reveals:                                           │
│                                                                     │
│  LLMs apply learned rules to causal problems:                       │
│    • Compressible by simple model                                   │
│    • Consistent but rigid                                           │
│    • Different from human probabilistic inference                   │
│                                                                     │
│  When rules don't apply (intrinsic uncertainty):                    │
│    • Rule-like reasoning breaks down                                │
│    • No fallback to genuine causal inference                        │
│                                                                     │
│  This is pattern matching with rules, not causal understanding      │
└─────────────────────────────────────────────────────────────────────┘
```
