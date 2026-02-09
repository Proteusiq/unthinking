# Paper Analysis: Sequential Enumeration in Large Language Models

## Metadata
- **arXiv ID**: 2512.04727
- **Title**: Sequential Enumeration in Large Language Models
- **Authors**: Kuinan Hou, Marco Zorzi, Alberto Testolin
- **Date**: December 2025
- **Venue**: arXiv (University of Padova)

---

## Core Claims

1. **LLMs cannot spontaneously deploy counting procedures** — they only count reliably when *explicitly prompted* to do so
2. **Naming tasks (counting given items) are harder than production tasks (generating N items)** — even with explicit counting instructions, models fail at naming
3. **No model spontaneously initiated systematic counting** in any trial across all prompting conditions
4. **Explicit counting exploits surface-level token prediction**, not true internal counters — mechanistic analysis reveals periodic patterns tied to token probabilities
5. **Counting accuracy scales gradually with model size** (3B→70B: 10%→24%) — not emergent as sharp phase transition
6. **Persistent gap between neural and symbolic approaches** for compositional tasks requiring systematic counting

---

## Methodology

### Tasks
- **Naming task**: Given sequence of N elements, report N (how-many)
- **Production task**: Given target N, generate sequence of N elements (give-N)
- Stimuli: letters and words (homogeneous and heterogeneous)
- Target range: 10-100 in increments of 10

### Prompting Conditions
1. **Explicit counting**: Obligated to count, use markers/annotations
2. **Spontaneous counting**: No guidance — model decides autonomously
3. **Mental counting**: Allowed to count but no visible symbols
4. **Forbid counting**: Explicitly instructed not to count

### Models Tested
- GPT-5 (reasoning), GPT-4.1
- Gemini 2.5 Pro
- Llama 3.2-3B, 3.1-8B, 3.3-70B
- QwQ-32B

### Mechanistic Analysis
- PCA on last-layer embeddings during token generation
- Neuronal tuning profiles: correlation with step indices

---

## Key Evidence

### Behavioral Results

| Condition | Naming Accuracy | Production Accuracy | Notes |
|-----------|-----------------|---------------------|-------|
| Explicit counting | Poor | Near-ceiling (proprietary) | Naming still fails |
| Spontaneous counting | Very poor | Poor | **Zero models counted systematically** |
| Mental counting | Slightly better than forbid | Better than spontaneous | Suggests some internal encoding |
| Forbid counting | Poor | Poor | Approximate estimation only |

### Scaling Analysis (Llama family)
| Model Size | Accuracy | MAE |
|------------|----------|-----|
| 3B | ~10% | >200 |
| 8B | ~15% | ~150 |
| 70B | ~24% | ~70 |

**Conclusion**: Counting improves gradually, not as sharp emergent ability.

### Mechanistic Findings (PCA Analysis)

| Condition | PC1 Pattern | Interpretation |
|-----------|-------------|----------------|
| **Mental counting** | Smooth, monotonic trajectory | r>0.83 with step number — resembles accumulator |
| **Explicit counting** | **Periodic dips at multiples of 10** | Token-level patterns, not true counter |

**Critical finding**: "Explicit counting condition shows periodic trend with large dips at steps that are multiples of ten... might be linked to the observation that LLMs use Fourier features to compute basic arithmetic operations and/or to the presence of biases for decade numbers in training corpora."

**Conclusion**: "Explicit prompting leads to high performance via less interpretable, potentially token-based mechanisms" — i.e., not genuine counting, but pattern exploitation.

### Neuronal Population Analysis
- Mental counting: Two populations with opposite activation trajectories (accumulator-like)
- Explicit counting: Near-zero variance, oscillating around mean (no counting signal)

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Confirms "linearized subgraph matching" — counting uses token patterns, not true algorithms
- **OMEGA (2506.18880)**: Supports compositional failure — counting is compositional skill that fails OOD
- **Planning Gap (2601.14456)**: Supports ID/OOD gap — counting only works when trained patterns apply
- **Illusion of Thinking (2506.06941)**: Supports cognitive limits — systematic failure on counting-dependent tasks
- **GSM-Symbolic (2410.05229)**: Supports brittleness — surface pattern exploitation vs. genuine computation

### Extends
- **Comprehension Without Competence (2507.10624)**: Provides mechanistic evidence for why symbolic computation fails
- **Effective Without Thinking (2504.09858)**: Suggests explicit "thinking" traces may just be token patterns, not computation

### Potential Tensions With
- **Emergent Symbolic Mechanisms (2502.20332)**: Claims symbolic circuits exist — but this paper shows they don't support systematic counting
- **Algorithmic Primitives (2510.15987)**: Claims learned primitives — but counting primitives not reliably deployed

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found as of analysis date
- Paper is recent (December 2025)

### Potential Counter-Arguments
1. **Tokenization artifacts**: Letter sequences may be tokenized differently, confounding counting — but authors control for this with one-token words
2. **Prompting limitations**: Better prompts might elicit counting — but authors tested 4 conditions including explicit instructions
3. **Task difficulty**: Counting 10-100 items is hard even for humans — but humans can count perfectly with effort

### Limitations (Authors Acknowledge)
1. Limited to text-based counting (no visual enumeration)
2. Only tested specific model families
3. Prompting strategies may not exhaust all possibilities
4. Analysis limited to Llama models for mechanistic insights

---

## Key Quotes

> "None of the models can reliably enumerate the elements of a sequence when not explicitly instructed to count."

> "In the spontaneous counting condition, none of the models exhibits systematic counting behavior."

> "Explicit prompting leads to high performance via less interpretable, potentially token-based mechanisms... the LLM rather exploits an associative chaining mechanism that allows it to keep track of the items by only relying on the previously generated symbolic number, thereby exploiting a surface-level token prediction strategy rather than maintaining an internal counter."

> "Our work shows that while in some circumstances LLMs develop internal activation dynamics resembling serial accumulation mechanisms, these signals are not precise enough to guarantee accurate enumeration performance."

> "Our results suggest that, despite their impressive emergent abilities, LLMs cannot yet robustly and systematically deploy counting procedures, highlighting a persistent gap between neural and symbolic approaches to compositional generalization."

---

## Relevance to Thesis

**STRONGLY SUPPORTS thesis**

This paper provides both behavioral and mechanistic evidence that:

1. **LLMs don't spontaneously count** — they need explicit prompting, suggesting counting isn't a native capability
2. **Even with explicit counting, they use token-level patterns** — the PCA analysis shows periodic patterns tied to decade numbers, not true accumulator dynamics
3. **Naming (recognition) is harder than production** — pattern: generating from learned distributions is easier than applying algorithms to novel inputs
4. **Counting scales gradually, not emergently** — consistent with thesis that capabilities are pre-existing in training distribution, not emergent

The mechanistic finding that "explicit counting" shows periodic patterns at decade boundaries (10, 20, 30...) strongly suggests the model is exploiting training corpus biases (decade numbers are more frequent) rather than learning a true counting algorithm. This is direct evidence for the "pattern matching from training distribution" hypothesis.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated

---

## Verdict: STRONGLY SUPPORTS THESIS
