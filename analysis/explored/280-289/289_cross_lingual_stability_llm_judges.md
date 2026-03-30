# Cross-Lingual Stability of LLM Judges Under Controlled Generation

**arXiv**: [2602.02287](https://arxiv.org/abs/2602.02287)
**Date**: February 2026
**Authors**: Isaac Chung, Linda Freienthal (Zendesk)

## Summary

Tests whether LLM judges produce stable model rankings when evaluating semantically equivalent dialogues across Estonian, Finnish, and Hungarian. Using controlled generation (identical parameters, 10K synthetic customer-support dialogues per language), they find surface-level metrics remain stable (τ ≥ 0.76) but discourse-level judgments (coherence, instruction-following) exhibit systematic rank inversions (τ ≈ 0). Since content is controlled, instability reflects judge transfer failure rather than true quality differences.

## Key Findings

```
┌─────────────────────────────────────────────────────────────────────┐
│  CORE INSIGHT: LLM judges evaluate surface patterns, not semantics  │
│  Same content in different languages → completely different rankings│
└─────────────────────────────────────────────────────────────────────┘
```

### The Experimental Design

1. **Controlled generation**: Identical parameters across languages
2. **40K dialogues**: 10K per language (Estonian, Finnish, Hungarian, English)
3. **Surface verification**: Semantic similarity .89-.94 confirms content equivalence
4. **Judge evaluation**: gpt-5-mini scoring Grammar, Readability, Coherence, Fluency, LRA

### The Divergence Pattern

```
┌─────────────────────────────────────────────────────────────────────┐
│  SURFACE-LEVEL METRICS              PRAGMATIC/DISCOURSE METRICS     │
│  (Grammar, Readability, Fluency)    (Coherence, Instruction-Following)│
├─────────────────────────────────────────────────────────────────────┤
│  Kendall τ ≥ 0.70                   Kendall τ ≈ 0 (or negative!)    │
│  Rank inversions: 1-3 per pair      Rank inversions: 6-9 per pair   │
│  Rankings STABLE across languages   Rankings SCRAMBLED              │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Quantitative Results

| Metric Type | Cross-Language τ | Interpretation |
|-------------|------------------|----------------|
| Surface (G,R,F) | τ ≥ 0.70 | Stable rankings |
| Coherence | τ = -0.06 to -0.17 | Random/inverted |
| LRA | τ = 0.33-0.47 | Unstable |

### Why This Matters

- **Same semantic content** verified by embedding similarity (.89-.94)
- **Different rankings** for coherence across languages
- **Controlled generation** rules out content quality differences
- **Conclusion**: Judge evaluates surface patterns, not discourse understanding

## Relevance to Thesis

**Stance**: Supports

This paper provides controlled evidence that:

1. **Surface matching, not semantic evaluation**: Rankings scramble when only surface form changes
2. **Morphological patterns dominate**: Finno-Ugric languages have different surface patterns → different judgments
3. **Zero-shot transfer fails**: LLM judges cannot generalize discourse assessment across languages

### Connection to Broader Thesis

| Aspect | Evidence |
|--------|----------|
| Pattern matching | Coherence τ ≈ 0 across language pairs despite same content |
| Form over meaning | Surface metrics stable, discourse unstable |
| Evaluation circularity | LLM judges fail on fundamental consistency requirement |

## Key Quotes

> "Coherence rankings scramble across language pairs, indicating that discourse-level assessment logic does not transfer reliably across morphologically rich languages."

> "Since generation parameters are held constant and automatic metrics confirm comparable generation quality, these Coherence rank inversions point to judge transfer failure at the discourse level."

> "Zero-shot judge transfer is unreliable for discourse-level assessment in morphologically rich languages."

> "Surface-level evaluation transfers; discourse assessment does not."

## Methodology

- **6 generator models**: GPT-4.1-mini, Llama-3.3-70B, Mixtral-8x7B, Command-R, Llama-3.1-8B, Claude Sonnet 4
- **Human baseline**: 3 Estonian native speakers, 100 dialogues (κ = 0.385 coherence)
- **Judge ablation**: 6 judge models show identical patterns (variance Δ < 0.02)
- **Meta-prompt check**: Estonian prompts vs English prompts show negligible difference (<0.05)
- **Bootstrap CIs**: N = 1,500 for statistical rigor

## Connections to Other Papers

- **Supports #288**: Both show LLM judges rely on surface patterns
- **Supports #287**: SCOPE also found judge calibration needed for reliability
- **Supports #275**: LLM-as-a-Jury showed systematic judge biases
- **Complements multilingual work**: Fu & Liu (2025) found Fleiss κ ≈ 0.3 across 25 languages

## Implications

1. **Evaluation is surface-level**: Discourse coherence cannot be zero-shot transferred
2. **Language-specific calibration required**: Each language needs human baseline
3. **Rankings are artifacts**: Same content, different language → different ranking

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE CIRCULARITY EXPOSED:                                           │
│                                                                     │
│  If LLM judges cannot maintain consistent rankings for              │
│  semantically equivalent content across languages, they are         │
│  not evaluating meaning - they are matching surface patterns.       │
│                                                                     │
│  This is evaluation theater, not evaluation.                        │
└─────────────────────────────────────────────────────────────────────┘
```

## REBUTTALS

None identified. The controlled generation design is rigorous - if content is semantically equivalent (verified by embedding similarity) and rankings differ, the judge is the problem.

**Potential counter-argument**: Surface patterns in different languages *should* affect generation quality assessment.
**Response**: Semantic similarity scores (.89-.94) show content quality is equivalent. Rank inversions (not just differences) prove this isn't about calibration offsets but fundamental instability.

---

*Analysis conducted following AGENTS.md methodology. Full paper read via arXiv HTML.*
