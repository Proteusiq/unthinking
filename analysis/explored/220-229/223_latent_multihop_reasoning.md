# Paper Analysis: Do Large Language Models Perform Latent Multi-Hop Reasoning without Exploiting Shortcuts?

## Metadata
- **arXiv ID**: 2411.16679
- **Title**: Do Large Language Models Perform Latent Multi-Hop Reasoning without Exploiting Shortcuts?
- **Authors**: Sohee Yang, Nora Kassner, Elena Gribovskaya, Sebastian Riedel, Mor Geva
- **Date**: November 2024
- **Venue**: Google DeepMind, UCL, Google Research, Tel Aviv University

---

## Core Claims

1. **Previous latent reasoning evaluations are confounded by shortcuts**: 85% of test queries from prior datasets (e.g., MQuAKE) are prone to shortcuts where models can answer without true reasoning
2. **Latent multi-hop reasoning exists but is highly variable by entity type**: ~80% latent composability for country-type bridge entities, but only ~5% for year-type bridge entities
3. **Significant gap between latent and CoT reasoning**: CoT composability is much higher and more consistent across entity types than latent composability
4. **Model scaling has marginal effect on latent reasoning**: Unlike CoT, latent composability barely improves with model scale
5. **Latent reasoning correlates with internal bridge entity representation**: Models that successfully reason latently show clearer internal representations of the bridge entity

---

## Methodology

### Shortcut-Free Evaluation Design (SOCRATES Dataset)

**Two desiderata for valid evaluation:**
1. **Latent multi-hop reasoning**: Model must answer without generating intermediate results (no CoT)
2. **Shortcut-free**: No subject-object or relation-object shortcuts

**Dataset construction:**
- Used Wikidata knowledge graph
- Selected fact pairs where single-hop facts are well-known but composition unlikely to appear in training
- Filtered out cases where head entity (e1) and answer entity (e3) co-occur in training documents
- Used 4.8B unique documents as proxy corpus for co-occurrence filtering
- Result: 7,232 test cases across 17 relation composition types and 4 bridge entity types

**Evaluation metric: Latent Composability**
- Measures: P(correct multi-hop | knows both single-hop facts)
- Excludes "guessable" cases where model can answer without considering head entity
- Excludes "unusable" cases where model doesn't know single-hop facts

### Models Tested
- 41 LLMs from 9 families
- Includes GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1, and others
- Both base and instruction-tuned variants

---

## Key Evidence

### Main Quantitative Findings

| Bridge Entity Type | Best Model Latent Composability | CoT Composability |
|-------------------|--------------------------------|-------------------|
| Country | ~80% | ~95% |
| City | ~40-50% | ~80% |
| University | ~30-40% | ~70% |
| Year | ~5-6% | ~60-70% |

### Critical Numbers

1. **85% of MQuAKE queries prone to shortcuts** — prior evaluations overestimate latent reasoning
2. **80% vs 5% latent composability** — country vs year bridge entities (16x difference)
3. **Marginal scaling effect**: Larger models show only slight improvement in latent composability
4. **CoT gap**: CoT composability 30-60 percentage points higher than latent composability
5. **Patchscopes analysis**: Bridge entity representation appears more often in high-composability queries

### Why Year Queries Fail

The paper notes that year-type bridge entities have high arity (many entities share same year), making latent composition more difficult. This aligns with theoretical work showing high-arity relations are harder for Transformers.

---

## Relationship to Thesis

**Supports thesis that LLMs are pattern matchers, not reasoners:**

1. **Shortcut exploitation is the norm**: Without careful filtering, 85% of "reasoning" evaluations are confounded by co-occurrence patterns
2. **Latent reasoning is type-dependent**: The 80% vs 5% gap reveals that "reasoning" depends heavily on entity-type statistics, not genuine composition
3. **Scaling doesn't help**: If reasoning were emergent, we'd expect scaling to improve it — but latent composability barely budges
4. **CoT is retrieval, not reasoning**: The large gap between CoT and latent composability suggests CoT works by making the bridge entity explicit (enabling retrieval), not by enabling true composition

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show compositionality failures depend on structural properties
- **Reversal Curse Theory (2405.04669)**: Weight asymmetry explains why latent composition fails — information must flow through explicit tokens
- **Embers of Autoregression (2309.13638)**: Latent reasoning failures reflect autoregressive training limitations

### Extends
- **MQuAKE literature**: Shows 85% of prior evaluations were confounded
- **Factual knowledge probing**: Extends to multi-hop with shortcut controls

### Mechanism Connection
- **Dot by Dot (2404.15758)**: CoT benefits from explicit intermediate computation, not latent semantic understanding — this paper shows the same for factual reasoning

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found on arXiv as of analysis date.

### Potential Counter-Arguments
1. **Proxy corpus limitation**: 4.8B documents may not capture all co-occurrences in proprietary training data
2. **Year queries may be intrinsically harder**: High-arity relations might require different mechanisms, not implying failure of reasoning
3. **Instruction-tuned models may differ**: Base models tested extensively; instruction-tuned models might develop different capabilities

### Limitations (Authors Acknowledge)
1. **Proxy corpus approximation**: Cannot guarantee complete exclusion of co-occurring entities without exact pretraining data
2. **Limited to factual multi-hop**: Does not test mathematical or logical multi-hop reasoning
3. **Two-hop only**: Does not extend to longer reasoning chains

---

## Key Quotes

> "Our analysis shows that 85% of the test queries from a previous dataset are prone to shortcuts."

> "Notably, state-of-the-art models demonstrate strong latent composability of over 80% when the bridge entity is a country. However, the number is only around 6% for year-based queries."

> "Model scaling marginally improves overall performance... On the contrary, CoT composability effectively increases with the number of known facts and model size."

> "Latent representation of the bridge entity appears more often for query types with higher latent composability."

> "Shortcut exploitation is problematic for evaluating latent multi-hop reasoning abilities because it allows the model to bypass the need to latently recall and compose single-hop facts."

---

## Critical Assessment

### Strengths
1. **Rigorous methodology**: Careful attention to shortcuts that plague prior work
2. **Large-scale**: 41 models, 7,232 test cases, 4 bridge entity types
3. **Mechanistic insight**: Patchscopes analysis reveals internal representations
4. **Reproducible**: Code and dataset publicly available

### Weaknesses
1. **Limited to factual composition**: Doesn't test abstract reasoning
2. **Two-hop only**: Real reasoning often requires longer chains
3. **Entity-type confound**: Results may reflect entity frequency, not reasoning capacity

### Implications for Thesis
This paper provides strong evidence that what appears to be "multi-hop reasoning" in LLMs is largely:
1. Shortcut exploitation (85% of prior benchmarks)
2. Entity-type dependent pattern matching
3. CoT-mediated retrieval rather than latent composition

The 16x difference between country and year queries (80% vs 5%) is particularly damning — if LLMs could truly compose facts latently, performance shouldn't depend so heavily on entity type.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
