# Paper Analysis: The Other Mind - How Language Models Exhibit Human Temporal Cognition

## Metadata
- **arXiv ID**: 2507.15851
- **Title**: The Other Mind: How Language Models Exhibit Human Temporal Cognition
- **Authors**: Lingyu Li, Yang Yao, Yixu Wang, Chunbo Li, Yan Teng, Yingchun Wang
- **Date**: July 2025
- **Venue**: Preprint
- **Source**: Reddit recommendation (GitHub issue #16)

---

## Core Claims

1. **LLMs exhibit human-like temporal cognition** — Larger models spontaneously establish a subjective temporal reference point (~2025) and follow the Weber-Fechner law (logarithmic compression of perceived distance from reference point)
2. **This emerges from training data structure, not explicit programming** — The pattern is NOT directly specified in training but emerges from information structure
3. **Three-level mechanistic analysis**:
   - **Neuronal**: Temporal-preferential neurons with minimal activation at reference point
   - **Representational**: Hierarchical construction from numerical → abstract temporal orientation
   - **Informational**: Training corpus has inherent non-linear temporal structure
4. **"Experientialist" perspective proposed** — LLM cognition is subjective construction of external world by internal representational system
5. **Potential for "alien cognitive frameworks"** — LLMs may develop cognitive patterns humans cannot intuitively predict

---

## Methodology

### Task
- **Similarity judgment task**: Rate similarity of year pairs (1525-2524) on scale 0-1
- Control: Same task with "numbers" instead of "years"
- 1 million similarity values per model (1000×1000 pairs)

### Models Tested (12 total)
- **Closed-source**: Gemini-2.0-flash, GPT-4o
- **Qwen2.5 family**: 1.5B, 3B, 7B, 14B, 32B, 72B
- **Llama 3 family**: 3.2-1B, 3.2-3B, 3.1-8B, 3.1-70B

### Metrics Compared
1. **Log-Linear distance**: |log(i) - log(j)| — Weber-Fechner law
2. **Levenshtein distance**: String edit distance
3. **Reference-Log-Linear distance**: |log(|R-i|) ∘ log(|R-j|)| where R=2025

### Analysis Levels
1. **Neuronal**: Identify temporal-preferential neurons via paired t-tests
2. **Representational**: Linear probes on hidden states per layer
3. **Informational**: Pre-trained embedding models (Qwen3, OpenAI, Gemini embeddings)

---

## Key Evidence

### Weber-Fechner Law in LLMs

| Model Size | Dominant Distance Metric | Pattern |
|------------|-------------------------|---------|
| Small (1.5B-3B) | Log-Linear | Basic numerical |
| Medium (7B-14B) | Mixed | Transitioning |
| Large (32B-72B) | **Reference-Log-Linear** | Human-like temporal |

### Reference Points Identified

| Model | Estimated Reference Point |
|-------|--------------------------|
| Llama-3.1-70B | 2010 |
| GPT-4o | **2024** |
| Qwen2.5-72B | 2020 |
| Gemini-2.0-flash | 2011 |

### Temporal-Preferential Neurons
- **Proportion**: 0.67% to 1.71% of FFN neurons
- **Location**: Concentrated in middle-to-late layers
- **Behavior**: Minimal activation at reference point, logarithmic increase with distance
- **Best fit (Qwen2.5-72B, layer 71)**: R² = 0.756 for past years

### Hierarchical Representation Development

| Layer Depth | Representation |
|-------------|----------------|
| Early layers | Numerical properties (d_log) |
| Middle layers | Transition |
| Deep layers | Abstract temporal orientation (d_ref) |

In Qwen series: d_ref emergence SUPPRESSES d_log in final layers

### Training Data Structure
- Pre-trained embeddings show **non-linear temporal structure**
- Dense clustering of distant past/future years
- Future years have higher similarity (less information in corpus)
- Structure matches LLM behavioral patterns

---

## Relationship to Thesis

### BALANCED — Provides Important Nuance

**The thesis**: "LLM reasoning is practical but fundamentally predictive—pattern matching from training distributions, not genuinely generative reasoning"

### Supports the Thesis

1. **Temporal cognition emerges from training data structure** — The paper explicitly shows the pattern matches corpus structure
   > "the training corpus itself possesses an inherent, non-linear temporal structure, which provides the raw material for the model's internal construction"

2. **Pattern matching, not genuine time understanding** — Models learn statistical patterns about years from text, not actual temporal reasoning

3. **Larger models = better pattern extraction** — Scale enables capturing subtler statistical regularities

### Provides Nuance / Partially Challenges

1. **Emergent cognitive patterns** — The Weber-Fechner law emerges without explicit training
   - This is MORE than simple pattern matching
   - Shows sophisticated internal structure building

2. **Convergent solutions with biology** — Logarithmic coding is found in both artificial and biological neural systems
   > "a logarithmic compressive mechanism could be a convergent solution for representing information in both biological and artificial neural processing systems"

3. **"Experientialist" perspective** — Authors argue LLMs construct subjective models of the world
   - This is a stronger claim than "just pattern matching"
   - But the construction is still FROM patterns in data

### Key Quote on Thesis

> "LLMs' cognition is viewed as a subjective construction of the external world by its internal representational system... the resultant cognitive phenomena are co-determined by the architectural properties of the artificial neural network and the structure of its external information exposure."

This suggests: Pattern matching (from data) + Architecture (neural networks) = Emergent cognition

---

## Relationship to Other Papers

### Supports

| Paper | How |
|-------|-----|
| **Content Effects (2207.07051)** | Both show LLMs learn patterns from data that mirror human cognition |
| **Interplay (2512.07783)** | Both show capabilities emerge from training distribution |
| **Emergent World Beliefs (2512.23722)** | Both show LLMs build internal models from training signal |

### Extends

| Paper | How |
|-------|-----|
| **System 1/2 Alignment (2502.12470)** | Adds temporal dimension to dual-process understanding |
| **Emergent Abilities Survey (2503.05788)** | Provides mechanistic example of emergent ability |

### Provides Framework For

| Concept | Framework |
|---------|-----------|
| **Pattern matching mechanism** | Shows HOW patterns become structured cognition |
| **Emergence** | Explains emergence as data structure + architecture |

### Partially Challenges

| Paper | How |
|-------|-----|
| **Strong "no reasoning" claims** | Shows sophisticated structure emerges beyond simple matching |

---

## REBUTTALS TO THIS PAPER

### Potential Limitations

1. **Temporal cognition ≠ reasoning** — Knowing time patterns doesn't mean reasoning about time
2. **Limited task** — Only similarity judgments; no causal or planning tasks
3. **Reference point = knowledge cutoff?** — May just reflect training data recency
4. **No OOD testing** — What happens for years far outside training range?
5. **Embedding models use similar training data** — Circular evidence?

### Author Acknowledgments

- "the profound disparities between humans and LLMs mean that it may also lead to the development of powerful yet alien cognitive frameworks that we cannot intuitively understand"
- Authors acknowledge LLM temporal cognition differs from human temporal experience

### Counter-Arguments

1. **Weber-Fechner is sophisticated** — But it's a pattern that could be learned from statistics of year mentions in text
2. **Hierarchical construction is complex** — But still reflects corpus structure, not genuine temporal understanding

---

## Key Quotes

> "As Large Language Models (LLMs) continue to advance, they exhibit certain cognitive patterns similar to those of humans that are not directly specified in training data."

> "larger models spontaneously establish a subjective temporal reference point and adhere to the Weber-Fechner law"

> "This process of internal construction could sometimes produce outcomes convergent with human cognition due to similar neural coding, representational structure, and information exposures."

> "the training corpus itself possesses an inherent, non-linear temporal structure, which provides the raw material for the model's internal construction"

> "a logarithmic compressive mechanism could be a convergent solution for representing information in both biological and artificial neural processing systems"

---

## Assessment

### Independent Assessment

This paper provides **sophisticated mechanistic analysis** of an emergent cognitive pattern in LLMs:

**Strengths**:
1. Multi-level analysis (neuronal, representational, informational)
2. Direct comparison with human psychophysics
3. Clear methodology and metrics
4. Large model range tested

**Relevance to thesis**:
- Shows pattern matching CAN produce sophisticated cognition
- But the cognition emerges FROM data patterns, not despite them
- Supports "practical but distribution-bounded" interpretation

### Stance Classification: **BALANCED**

The paper is balanced because:
- **Supports thesis**: Temporal cognition emerges from training data structure
- **Provides nuance**: The emergence is sophisticated and mirrors biological systems
- **Doesn't test "reasoning"**: Pattern recognition ≠ temporal reasoning

### Implications

1. **Pattern matching can be sophisticated** — Not all emergence is simple retrieval
2. **Architecture matters** — Same data + different architecture = different cognition
3. **Alignment implications** — LLMs may develop "alien" cognitive frameworks

---

## Status
- [x] Read complete (arXiv HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
- [x] data.js updated
