# Paper Analysis: Do LLMs Share Human-Like Biases in Causal Reasoning?

## Metadata
- **arXiv ID**: 2602.02983
- **Title**: Do LLMs Share Human-Like Biases? Causal Reasoning Under Prior Knowledge, Irrelevant Context, and Varying Compute Budgets
- **Authors**: Hanna M. Dettki, Charley M. Wu, Bob Rehder (NYU, University of Tübingen)
- **Date**: February 2026
- **Venue**: ICLR 2026 Workshop "From Human Cognition to AI Reasoning (HCAIR)"

---

## Core Claims

1. **LLMs use rule-like strategies**: Models exhibit more rigid, rule-based reasoning than humans who account for latent factors.

2. **No human collider biases**: LLMs do NOT mirror characteristic human biases (explaining away, Markov violations).

3. **Compressible by simple model**: LLM causal judgments are well-captured by small interpretable models.

4. **Brittleness with uncertainty**: Rule-like reasoning breaks down when uncertainty is intrinsic.

---

## Methodology

### Benchmark
11 causal judgment tasks with collider structure (C₁ → E ← C₂)

### Subjects
20+ LLMs vs matched human baseline

### Probes
1. Semantic abstraction (different framings)
2. Prompt overloading (irrelevant text injection)

### Finding
CoT increases robustness for many LLMs

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

---

## Key Evidence

| Aspect | Humans | LLMs |
|--------|--------|------|
| Reasoning style | Probabilistic, accounts for latent factors | Rule-like, rigid |
| Explaining away | Shows weak effect | Does NOT show |
| Markov violations | Shows characteristic bias | Does NOT mirror |
| Uncertainty handling | Flexible | Breaks down |

**Compressibility**: Small interpretable model captures LLMs' causal judgments well—suggests simple rule-based computation, not rich causal inference.

---

## Relationship to Other Papers

### Supports
- **#306 Lost in Noise** (2601.07226): Both show LLMs struggle with uncertainty
- **#180 Contextual Drag** (2602.04288): Both show context/framing affects judgments
- **#206 Arithmetic Interpretation**: Both find rule-based computations

---

## REBUTTALS

### This Paper Reveals
- LLMs apply learned rules, not causal reasoning
- Different from human probabilistic inference
- Fails under intrinsic uncertainty

### Limitations (Authors Acknowledge)
1. Specific task type: Collider structures may not generalize to all causal reasoning
2. Workshop paper: ICLR 2026 Workshop
3. Limited to judgment tasks, not intervention planning

---

## Key Quotes

> "Most LLMs exhibit more rule-like reasoning strategies than humans who seem to account for unmentioned latent factors in their probability judgments."

> "Most LLMs do not mirror the characteristic human collider biases of weak explaining away and Markov violations."

> "Their rule-like reasoning may break down when uncertainty is intrinsic."

> "This divergence suggests LLMs can complement humans when known biases are undesirable, but their rule-like reasoning may break down when uncertainty is intrinsic."

---

## Significance for Thesis

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

**Stance**: SUPPORTS

Evidence for pattern-matching over genuine causal reasoning: rule-like strategies, compressible by simple models, different from human inference, and brittle under uncertainty.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
