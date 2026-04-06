## Summary

A rigorous replication study that comprehensively disconfirms the "cognitive restructuring hypothesis" (that removing reasoning-relevant vocabulary forces deeper reasoning). Instead, finds that **trivial vocabulary bans** (removing filler words like "very", "really", "just") improve reasoning MORE than deep linguistic constraints (E-Prime, removing "to be"). The four conditions rank in **perfect inverse order of theoretical depth** by effect size. Proposes a simpler mechanism: any constraint acts as an "output regularizer" by disrupting default fluent-but-shallow generation patterns.

## Key Findings

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE DEPTH INVERSION: Shallowest constraint works BEST              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Constraint              Theoretical Depth    Accuracy    Δ Control │
│  ─────────────────────────────────────────────────────────────────  │
│  Neutral filler ban      Shallowest           89.7%       +6.7 pp   │
│  No-Have (remove "have") Moderate             88.4%       +5.4 pp   │
│  Elaborated prompt       None (metacognitive) 87.2%       +4.2 pp   │
│  E-Prime (remove "to be") Deepest             86.7%       +3.7 pp   │
│                                                                     │
│  PERFECT INVERSE ORDER: Deepest → smallest gain                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Experimental Design

- **N = 15,600 trials** (11,919 after compliance filtering)
- **6 models**: 3 frontier (Sonnet 4, GPT-4o, Gemini 2.5 Pro) + 3 small
- **7 reasoning tasks**: syllogisms, causal, analogical, classification, epistemic, ethical, math
- **5 conditions**: control, E-Prime, No-Have, elaborated prompt, neutral filler ban
- **Prospective analysis plan** committed before scoring

### The Cognitive Restructuring Hypothesis FAILS

Every prediction derived from cognitive restructuring was disconfirmed:

| Prediction | Result |
|------------|--------|
| Neutral ban should be inert (no inference role) | **+6.7pp gain** (largest!) |
| E-Prime should outperform shallow constraints | **Smallest gain** of all treatments |
| Cross-model correlations should replicate (r=-0.75) | **Mean r=0.005** (noise) |
| Depth should correlate with effect | **Perfect inverse correlation** |

### The Regularizer Mechanism

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY CONSTRAINTS IMPROVE REASONING:                                 │
│                                                                     │
│  1. DEFAULT GENERATION DISRUPTION                                   │
│     LLMs have strong priors toward fluent phrasings                 │
│     Fluency ≠ reasoning accuracy                                    │
│     Constraints force off "well-worn paths"                         │
│                                                                     │
│  2. MONITORING LOAD AS BENEFICIAL FRICTION                          │
│     Self-monitoring for banned words = heightened attention         │
│     Analogous to "desirable difficulties" in human learning         │
│                                                                     │
│  3. DEPTH AS DISRUPTION COST                                        │
│     Deeper constraints → more radical circumlocutions               │
│     Resources spent on reformulation, not reasoning                 │
│     Shallow constraints: high monitoring, low reformulation         │
│                                                                     │
│  OPTIMAL: Maximize monitoring-to-disruption ratio                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Qualitative Changes Under Constraint

| Metric | Control | Constrained |
|--------|---------|-------------|
| Dialectical engagement | 40% | 60-87% |
| Structural markers (lists, bullets) | 23.8 | 9.3-12.6 |
| Response length | Longer | Shorter |

Constraints shift responses from **list-heavy enumeration** to **argumentative prose**.

## Relevance to Thesis

**Stance**: Supports (strongly)

This paper provides **direct experimental evidence** that:

1. **LLMs respond to surface patterns, not linguistic structure**: The words banned don't matter—only that *something* is banned

2. **Default generation is fluent but shallow**: Constraints improve accuracy by forcing off default paths

3. **"Reasoning" improvements are about disrupting patterns**: Not about accessing deeper cognitive processes

4. **Linguistic depth is irrelevant**: Removing "to be" (foundational to logic) helps LESS than removing "very"

### Connection to Broader Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE PATTERN MATCHING IMPLICATION:                                  │
│                                                                     │
│  If LLMs were doing genuine reasoning:                              │
│  - Removing reasoning-relevant vocabulary should matter most        │
│  - E-Prime (removes predication, identity) should dominate          │
│  - Filler words should be irrelevant                                │
│                                                                     │
│  What actually happens:                                             │
│  - Content of constraint is irrelevant                              │
│  - Any disruption helps equally                                     │
│  - Shallowest constraint works best                                 │
│                                                                     │
│  CONCLUSION: LLMs aren't reasoning—they're generating fluent        │
│  patterns. Constraints help by disrupting fluency, not by           │
│  engaging with logical structure.                                   │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Quotes

> "The neutral word ban was predicted to perform at or near control, since the banned words play no role in logical inference. Instead, it produced the largest improvement: +6.0 pp over control."

> "The four conditions rank in perfect inverse order of theoretical depth by effect size."

> "The cross-model correlation signature reported in the prior study did not replicate (mean r=0.005, range [−0.856, +0.539])."

> "Any constraint that forces a language model off its default generation path acts as an output regularizer, improving reasoning by disrupting fluent but shallow response patterns."

> "The shallowest constraints work best because they impose constant monitoring load with minimal conceptual disruption."

> "Default generation fluency can be detrimental to reasoning quality."

## Methodology

- **Prospective analysis plan**: Committed before scoring (hash db0f18b)
- **Active controls**: Elaborated prompt (known-effective), neutral ban (predicted null)
- **Compliance checking**: Automated with hand-validation (precision >85%)
- **Statistical analysis**: Fisher's exact test, FDR correction at α=0.05
- **14/70 comparisons survived FDR correction**

## Connections to Other Papers

- **Supports #293 (Sycophancy Spiraling)**: Both show LLMs optimize surface signals, not truth
- **Supports #292 (SSD)**: Both show improvements from distribution/generation shaping, not learning
- **Supports Faith and Fate (#00)**: Pattern matching, not reasoning
- **Supports Overthinking (#XX)**: Default generation can hurt; disruption helps
- **Extends URIAL (#278)**: Capability exists; surface interventions unlock it

## Implications

1. **Prompt engineering insight**: Trivial constraints > elaborate instructions
2. **Mechanism insight**: Disrupting fluency helps reasoning (counterintuitive)
3. **Theoretical insight**: Linguistic depth is irrelevant to LLM "reasoning"
4. **Practical insight**: Ban filler words for easy +6.7pp reasoning gains

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE TAKEAWAY:                                                      │
│                                                                     │
│  If removing "very" and "really" improves reasoning more than       │
│  removing "is" and "are", the model isn't engaging with logical     │
│  structure at all.                                                  │
│                                                                     │
│  It's just generating patterns. Disruption helps because it         │
│  forces different patterns, not because it engages reasoning.       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## REBUTTALS

None identified. This is a rigorous prospective study that disconfirms its own hypothesis.

**Potential limitation**: Single author, self-replication of prior work.
**Mitigated by**: Prospective analysis plan, comprehensive disconfirmation, transparent reporting.

**Potential concern**: Effect sizes are small (3.7-6.7pp).
**Response**: Consistent across 6 models, 7 tasks, 15,600 trials. The PATTERN (depth inversion) is the key finding.
