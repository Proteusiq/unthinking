# Paper 385: Towards Understanding Distilled Reasoning Models

## Metadata
- **arXiv**: 2503.03730 (v2, Mar 2025)
- **Title**: Towards Understanding Distilled Reasoning Models: A Representational Approach
- **Authors**: David D. Baek, Max Tegmark
- **Affiliation**: MIT
- **Stance**: BALANCED - finds distillation creates unique "reasoning features" that are causally active in distilled models but acausal in base models; however, these features are lexical triggers ("Wait", "Therefore") not semantic reasoning operations
- **Cluster**: `distillation`

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  DISTILLATION CREATES NEW FEATURE DIRECTIONS, BUT THEY'RE           │
│  LEXICAL TRIGGERS, NOT REASONING OPERATIONS                          │
│                                                                      │
│  Method: Sparse crosscoder trained on Qwen base vs                   │
│          DeepSeek-R1-Distill-Qwen (1.5B, 7B, 14B)                   │
│          32,768 features, 400M tokens                                │
│                                                                      │
│  What crosscoder finds:                                              │
│    • Distilled models have UNIQUE feature directions                 │
│      (high NRN = present in distilled, absent in base)               │
│    • These features correspond to:                                   │
│      - Self-reflection: fires on "Wait"                              │
│      - Verification: fires on "Let me check"                         │
│      - Alternative reasoning: fires on "Alternatively"               │
│      - Contrastive reasoning: fires on "But", "However"              │
│                                                                      │
│  The critical test (ablation):                                       │
│    • Zero-ablate distilled-unique features →                         │
│      distilled model logits DROP significantly                       │
│    • Zero-ablate same features in base model →                       │
│      base model logits UNCHANGED (acausal)                           │
│                                                                      │
│  ⇒  The "reasoning features" are causally active token-generation   │
│     patterns in distilled models, but they fire on LEXICAL           │
│     markers, not semantic reasoning content                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Distilled models develop unique feature directions** not present in base models, identifiable via sparse crosscoder Normalized Relative Norm (NRN) analysis.
2. **These unique features correspond to reasoning-related lexical patterns**: self-reflection ("Wait"), verification ("Let me check"), alternative reasoning ("Alternatively"), contrastive reasoning ("But", "However").
3. **Ablation proves causal role in distilled models**: zero-ablating distilled-unique features significantly drops target logits in distilled models but not in base models.
4. **Steering via these features controls reasoning behavior**: adding the self-reflection feature direction pushes the model into "over-thinking" mode; adding the deductive feature direction creates "incisive-thinking" mode.
5. **Larger distilled models develop more structured representations**: 14B distilled model shows lower parallelogram loss than base model across all function classes; 1.5B distilled model does not.

---

## Methodology

### Sparse Crosscoder
- Trained on Qwen base vs DeepSeek-R1-Distill-Qwen pairs (1.5B, 7B, 14B)
- 32,768 features per crosscoder
- 200M tokens from OpenThoughts-114k (reasoning traces) + 200M tokens from RedPajama (general text)
- Reconstructs residual stream at half-depth layer
- **Relative Decoder Norm (RDN)**: ratio of decoder L1 norms between distilled (B) and base (A) models
- **Normalized Relative Norm (NRN)**: RDN/(1+RDN), where 0 = base-unique, 0.5 = shared, 1.0 = distilled-unique

### Feature Analysis
- Top 100 distilled-unique features (high NRN) annotated by GPT-4o-mini
- Bottom 100 base-unique features (low NRN) also annotated
- Four reasoning categories identified: self-reflection, deductive, alternative, contrastive

### Ablation Experiment
- Zero-ablate features with NRN > 0.5 and firing frequency in top k% (k = 0.5, 1, 2, 5, 10, 20)
- Measure average logit change across 100 randomly chosen target tokens
- Compare distilled vs base model logit changes

### Feature Geometry
- Parallelogram loss on semantic analogies (Todd et al., 2023 dataset)
- PCA to 20D on residual stream activations at half-depth
- Compare base vs distilled across function classes

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Distilled-unique features: self-reflection | NRN → 1.0 | Fires on "Wait" tokens in reasoning traces |
| Distilled-unique features: verification | NRN → 1.0 | Fires on computation verification tokens |
| Ablation: distilled model logit drop | Significant across all k | Zero-ablating top-k% distilled-unique features drops target logits |
| Ablation: base model logit change | ~0 across all k | Same features are acausal in base model |
| Base model "Wait" feature | NRN → 0.0 | Base model learns token-level "Wait" feature but it lacks causal reasoning role |
| Steering: over-thinking mode | Single feature vector | Adding self-reflection decoder vector to 1.5B distilled model makes it overthink "What is 5-1?" |
| Steering: incisive-thinking mode | Single feature vector | Adding deductive decoder vector makes model skip redundant verification loops |
| Parallelogram loss: 1.5B | Base < Distilled | Base model has better-structured representations at 1.5B |
| Parallelogram loss: 14B | Distilled < Base | Distilled model has better-structured representations at 14B |
| Average NRN scaling | Increases with model size | 14B has highest average NRN divergence from base |
| Feature count | 32,768 per crosscoder | Trained on 400M tokens total |

---

## The Thesis-Relevant Interpretation

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  WHAT THE CROSSCODER ACTUALLY SHOWS                                  │
│                                                                      │
│  The authors frame their findings as "reasoning features."           │
│  But examine what the features fire on:                              │
│                                                                      │
│    Self-reflection  → fires on "Wait"                                │
│    Deductive        → fires on "Therefore", "Thus"                   │
│    Alternative      → fires on "Alternatively"                       │
│    Contrastive      → fires on "But", "However"                      │
│                                                                      │
│  These are the SAME lexical pivots identified by Style over          │
│  Substance (#384) as the stylistic markers that drive distilled     │
│  model performance. The crosscoder independently confirms:           │
│                                                                      │
│    DISTILLATION CREATES FEATURES FOR GENERATING                      │
│    STYLE TOKENS, NOT FOR PERFORMING REASONING                        │
│                                                                      │
│  The ablation proves these features are causal for TOKEN             │
│  GENERATION (logit of "Wait" drops when ablated), not for           │
│  REASONING CORRECTNESS. No accuracy metric was ablated.              │
│                                                                      │
│  The over-thinking steering example is revealing:                    │
│  amplifying the "Wait" feature makes the model loop                  │
│  endlessly on "What is 5-1?" — it generates MORE reasoning          │
│  STYLE without BETTER reasoning.                                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Other Papers

### Supports (same finding, different method)
- **2504.01738 - Style over Substance (#384)**: Style over Substance identifies four pivot types (realization, verification, exploration, integration) as the key distillation signal. This paper independently finds the *same four categories* as distinct feature directions in the crosscoder, confirming that distillation creates features for generating these style markers.
- **2305.18654 - Faith and Fate (#1)**: subgraph matching at the representational level. Distilled models develop pattern-matching features, not reasoning circuits.
- **2604.01193 - SSD Code Gen (#292)**: SSD shows distillation works with gibberish data. This paper shows the "reasoning features" distillation creates are lexical trigger features, not semantic reasoning.

### Extends
- **Lindsey et al. 2024 - Sparse Crosscoders**: extends the crosscoder diffing technique from instruction-tuning to reasoning distillation.
- **2601.19897 - SDFT (#342)**: SDFT shows self-distillation reshapes distributions. This paper reveals the representational mechanism: new feature directions for style token generation.

### Challenges
- **Papers claiming distilled reasoning is genuine reasoning**: the ablation shows features are causal for *token generation* but the paper does not test whether they are causal for *task accuracy*. This ambiguity could be read both ways.

---

## REBUTTALS

### Known Rebuttals
None identified (Mar 2025, from MIT/Tegmark group - high credibility lab).

### Limitations (Authors Acknowledge)
1. **Feature annotation by GPT-4o-mini**: categories were assigned by another LLM, not verified by human experts. Potential circularity.
2. **Only Qwen model family tested**: all crosscoders trained on Qwen base vs DeepSeek-R1-Distill-Qwen. Findings might not generalize to other architectures.
3. **No accuracy-level ablation**: ablation measures logit change of target tokens ("Wait", "Therefore"), not downstream reasoning accuracy. The causal claim is about token generation, not reasoning capability.
4. **Parallelogram test is indirect**: lower parallelogram loss = better-structured representations, but this does not directly map to reasoning ability.
5. **1.5B distilled model has WORSE feature geometry than base**: the structure improvement only appears at scale (14B), suggesting distillation at small scale might degrade representations.
6. **Small paper scope**: no benchmarking of reasoning accuracy, no comparison across distillation methods, limited dataset scale for crosscoder training.

### Independent Assessment
The paper is well-executed mechanistic interpretability work, but the authors' framing as discovering "reasoning features" is misleading. The features fire on specific tokens ("Wait", "Therefore"), and the ablation measures logit change of those tokens - not reasoning performance. A more precise characterization: **distillation creates dedicated feature directions for generating reasoning-style tokens**, which is consistent with the Style over Substance (#384) finding that style markers, not reasoning content, are the primary learning signal during distillation.

The parallelogram geometry finding is interesting but underdeveloped. It shows larger distilled models develop better-structured representations, but without connecting this to downstream accuracy, it remains suggestive rather than conclusive.

---

## Key Quotes

1. > "We find various reasoning features from the sparse crosscoder, such as self-reflection and computation verification feature."

2. > "We observe that distilled models contain unique reasoning feature directions, which could be used to steer the model into over-thinking or incisive-thinking mode."

3. > "We find that across all reasoning categories, the distilled model's target logit drops significantly as a result of ablation, while the base model's target logit tends to remain identical."

4. > "We found that bottom 100 features sometimes activate on reasoning contexts as well; however, we believe that base model's crosscoder feature simply learns the token feature 'wait'."

5. > "Larger distilled models may develop more structured representations, which correlate with enhanced distillation performance."

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [ ] Paper graph updated
