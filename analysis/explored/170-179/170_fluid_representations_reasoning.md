# Paper Analysis: Fluid Representations in Reasoning Models

## Metadata
- **arXiv ID**: 2602.04843
- **Title**: Fluid Representations In Reasoning Models
- **Authors**: Dmitrii Kharlapenko, Alessandro Stolfo, Mrinmaya Sachan (ETH Zurich), Arthur Conmy, Zhijing Jin (University of Toronto)
- **Date**: February 2026
- **Venue**: arXiv preprint
- **URL**: https://arxiv.org/abs/2602.04843

---

## Core Claims

1. **Representational dynamics**: QwQ-32B progressively adapts internal representations of actions/predicates during reasoning, converging toward abstract encodings regardless of initial action names

2. **Causal validation**: These representational adaptations causally improve problem-solving — injecting refined representations boosts accuracy, disrupting them degrades it

3. **Symbolic abstraction**: Adapted representations achieve naming-invariant structural encoding — cross-naming representations transfer across different obfuscations

4. **Fluid Reasoning Representations**: The authors coin this term for in-context refinement of token representations during extended reasoning

---

## Methodology

### Task Domain
- **BlocksWorld**: Classic IPC planning domain with 4-block puzzles
- **Mystery BlocksWorld**: Semantically obfuscated version (e.g., "pick up" → "attack", "on(x,y)" → "craves(x,y)")
- 15 different naming variants tested
- 300 four-block puzzles

### Representation Extraction
1. Extract hidden states at layers 1-64 at timestamps 2k, 4k, 7k, 10k tokens
2. Average across token sequences encoding each action/predicate
3. Center representations by subtracting mean across all actions
4. Compute cross-naming representations by averaging across all namings

### Experiments
1. **Positive Steering**: Inject refined representations from late reasoning into early stages
2. **Symbolic Patching**: Replace naming-specific representations with cross-naming "symbolic" representations
3. **Negative Steering**: Subtract converged representations from activations

---

## Key Evidence

### Performance Results

| Model | BlocksWorld | Mystery BW | Accuracy Preserved |
|-------|-------------|------------|-------------------|
| QwQ-32B | 96% | 35% | 36% |
| GPT-4.1 (CoT) | 92% | 18% | 20% |
| Qwen2.5-32B | 21% | 0% | 0% |
| DeepSeek-R1-Distill-Qwen-32B | 81% | 8% | 10% |

### Cross-Naming Convergence
- Similarity plateaus around **7,000 tokens**
- PCA shows semantically equivalent actions cluster together in deeper layers

### Steering Results (Positive)

| Layer | Condition | Mean Δ | p-value |
|-------|-----------|--------|---------|
| 20 | In-naming | +1.57% | 0.042* |
| 20 | Cross-naming | +1.79% | 0.044* |
| 20 | Random | -0.36% | 0.627 |
| 40 | Cross-naming | +1.43% | 0.021* |

Best individual naming improvements: **up to 10%** (rare cases)

### Negative Steering
- 2.9% ± 1.06% difference with shuffled control (layer 30)

### Mystery Naming Variance
- Accuracy ranges from **5% to 47%** across naming variants
- **Worst**: Coherent semantic domains (gardening, legal) — 5-14%
- **Best**: Abstract/incoherent terms — up to 47%

---

## Relationship to Thesis

### DOES NOT FUNDAMENTALLY CHALLENGE Thesis

Despite initial characterization as a potential challenge, this paper actually **supports** the pattern-matching thesis with important nuances:

#### 1. Base Model Shows Same Adaptation (CRITICAL)

> "Both models [QwQ and its base model] exhibit similar adaptation dynamics... This finding, combined with prior work on in-context learning, indicates representational adaptation is an inherent property of large language models rather than a specialized reasoning model feature."

**Implication**: The "fluid representations" capability is NOT unique to reasoning models — it's a general LLM property. Reasoning models just generate longer context that allows this adaptation to occur.

#### 2. Semantic Interference Pattern

> "The model performs worst on namings suggesting reversible operations ('open/close,' 'plant/harvest') or coherent alternative domains (legal proceedings, gardening cycles)"

**Implication**: Models still pattern-match to replacement word meanings. When replacements have coherent semantics, the model gets confused because it pattern-matches to the wrong domain.

#### 3. Massive Accuracy Drop Under Obfuscation

- QwQ-32B: 96% → 35% (only 36% preserved)
- This dramatic drop when semantic associations are broken is exactly what the pattern-matching thesis predicts

#### 4. Small Effect Sizes

- Steering improvements: 1.5-1.8% on average
- Best cases up to 10% but inconsistent
- These are meaningful but modest effects

#### 5. Single Narrow Domain

- Only BlocksWorld with fixed, well-defined action space
- Authors acknowledge: "We expect these findings to generalize to other structured planning setups with fixed action spaces... though verifying this and testing whether the patterns extend to less constrained domains remains future work"

### What This Paper Shows

The paper demonstrates that LLMs can do **local pattern adaptation** during extended context:
1. Representations converge toward task-relevant encodings
2. This happens automatically (base model does it too)
3. The process is slow (7k+ tokens to converge)
4. Effects are modest but causal

This is **compatible with** the pattern-matching thesis:
- Pattern matching can be adaptive/contextual
- In-context learning is itself a form of pattern matching
- The model learns new token→meaning associations during reasoning

---

## Relationship to Other Papers

### Supports
- **Paper 133 (Base Models Know How to Reason)**: Both show base models have latent capabilities; reasoning training surfaces them
- **Paper 135 (Demystifying Long CoT)**: Both show extended reasoning enables capabilities already present
- **Paper 14 (CoT In The Wild)**: Long CoT improves faithfulness through exposure to more patterns

### Related Methodologically
- **Park et al. (2025) ICLR**: In-context learning of representations — this paper extends that methodology
- **Paper 106 (Reasoning-Critical Neurons)**: Both use steering/probing to identify reasoning mechanisms

### Does NOT Challenge
- **Paper F0 (Faith and Fate)**: Compositional failures still occur (96%→35%)
- **Paper 03 (Illusion of Thinking)**: Complexity collapse still present
- **OMEGA (2506.18880)**: OOD generalization still fails

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Effect sizes are too small**: 1.5-1.8% improvements on average — is this practically meaningful?

2. **Base model confound**: If base models show the same adaptation, what's special about reasoning models?

3. **Domain restriction**: Only BlocksWorld — does this generalize to open-ended reasoning?

4. **Steering ≠ Understanding**: Causal influence doesn't prove the model "understands" — it could be finding shortcuts

5. **Mystery BlocksWorld limitations**: Authors note naming 3 (random strings) caused model to recognize task as BlocksWorld — suggests training data contamination

### Limitations (Authors Acknowledge)

> "We focus on a single reasoning model (QwQ-32B) and a single domain (BlocksWorld)."

> "More targeted or fine-grained causal tools could sharpen the picture"

> "Shuffled-control experiments reveal unexpected gains around later layers (notably layer 30), suggesting that some aspects of late-layer representational dynamics remain to be explained"

---

## Key Quotes

> "A fundamental question in understanding reasoning language models is whether these models merely pattern-match against memorized associations, or whether they can dynamically construct new representations during problem-solving."

> "Both models [QwQ and its base model] exhibit similar adaptation dynamics... This finding, combined with prior work on in-context learning, indicates representational adaptation is an inherent property of large language models rather than a specialized reasoning model feature. The difference is that reasoning models naturally produce the extended context needed to use these adaptations."

> "The model performs worst on namings suggesting reversible operations ('open/close,' 'plant/harvest') or coherent alternative domains (legal proceedings, gardening cycles), while abstract philosophical terms, mixed sensory modalities, and semantically incoherent combinations enable better performance."

> "While preliminary, our findings highlight representational refinement as a promising direction for understanding the internal mechanisms of reasoning models."

---

## Methodology Assessment

### Strengths
- Rigorous experimental design with steering/patching
- Causal validation, not just correlation
- Clear visualization (PCA, similarity plots)
- Honest about limitations

### Weaknesses
- Single model, single domain
- Small effect sizes
- Base model confound undermines "reasoning model" specificity claim
- Mystery BlocksWorld may have training contamination (naming 3)

---

## Status

- [x] Full paper read (HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Classification

| Dimension | Assessment |
|-----------|------------|
| **Stance** | Balanced (leans supports) |
| **Confidence** | High |
| **Relevance** | High — directly addresses pattern-matching question |
| **Evidence Type** | Empirical (mechanistic + causal) |
| **Venue Quality** | arXiv preprint (ETH Zurich) |

---

## One-Sentence Summary

QwQ-32B shows in-context representational adaptation during extended reasoning that causally improves performance, but this capability is inherent to all LLMs (not reasoning-specific), effect sizes are small, and semantic obfuscation still causes massive accuracy drops — supporting rather than challenging the pattern-matching thesis.
