# Paper Analysis: Let's Think Dot by Dot

## Metadata
- **arXiv ID**: 2404.15758
- **Title**: Let's Think Dot by Dot: Hidden Computation in Transformer Language Models
- **Authors**: Jacob Pfau, William Merrill, Samuel R. Bowman
- **Date**: April 2024
- **Venue**: NYU Center for Data Science

---

## Core Claims

1. **Transformers can use meaningless filler tokens (e.g., '......') in place of chain-of-thought** to solve hard algorithmic tasks they could not solve when responding without intermediate tokens.

2. **Additional tokens provide computational benefits independent of token choice** — the benefit of CoT may stem from additional computation time, not human-like task decomposition or interpretable reasoning steps.

3. **Filler tokens extend transformer expressivity within TC⁰** — while transformers with filler tokens remain within the complexity class TC⁰ (unlike CoT which can expand beyond it), filler tokens enable solving problems with deep quantifier nesting that no-filler transformers likely cannot solve.

4. **Learning to use filler tokens is difficult and requires specific, dense supervision** — models need parallelizable CoT demonstrations to learn filler computation; standard instance-adaptive CoT data is insufficient.

5. **Raises alignment concerns**: LLMs could engage in "unauditable, hidden computations that are increasingly detached from the observed chain-of-thought tokens."

---

## Methodology

### Tasks
- **3SUM**: Given a list of tuples, determine if any three sum to zero (mod 10). Requires O(n³) comparisons in worst case; has quantifier depth >2.
- **2SUM-Transform**: 2SUM with input obscured by a permutation specified only at the end of the sequence.

### Models
- **34M-parameter Llama model** (scaled-down, randomly initialized)
- 4 layers, 384 hidden dimension, 6 attention heads

### Experimental Setup
- **Training data**: 10,000,000 samples
- **Test data**: 2,000 samples
- **Training conditions**:
  - 50/50 split of filler tokens and parallelizable CoT data
  - Filler tokens: sequences of "." dots
  - CoT: parallelizable decomposition showing all pairwise sums
- **Comparison conditions**:
  - Filler tokens vs. immediate answer (no intermediate tokens)
  - Varied input length (6-14) and dimensionality (1-8)

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| 3SUM length-12, dim-3 | Filler: **100%** vs No-filler: 66% | +34% gap from filler tokens |
| 3SUM length-14, dim-3 | Filler: **100%** vs No-filler: ~71% | +29% gap |
| 2SUM-Transform | Filler: **93.6%** vs No-filler: 78.7% | +14.9% gap |
| 2SUM CoT baseline | 95.1% | Reference for comparison |
| Probing with 60% filler tokens | 98% accuracy | First half of filler tokens encode most computation |
| Instance-adaptive CoT training | ~71% accuracy | Same as no-filler baseline — fails to enable filler use |
| Filler-only training (no CoT) | ~71% accuracy | Cannot learn without parallelizable supervision |

**Critical finding**: Performance gap increases with task complexity (input length/dimensionality).

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show CoT may not reflect genuine reasoning — benefits come from computation, not task decomposition
- **GSM-Symbolic (2410.05229)**: Fragility may stem from computational limitations, not reasoning failure
- **CoT Faithfulness papers**: Confirms tokens can be divorced from actual computation

### Extends
- **Expressive Power of Transformers with CoT (2310.07923)**: Provides empirical evidence for theoretical claims about CoT extending expressivity
- **Pause Tokens (2505.21024)**: This paper's empirical findings; Pause Tokens provides formal proofs

### Challenges
- **Chain-of-Thought as task decomposition narrative**: Shows benefits can come from pure computation without semantic content

---

## REBUTTALS

### Known Rebuttals
- **Pause Tokens (2505.21024)**: Not a rebuttal but a theoretical extension — proves the formal separation result conjectured here

### Limitations (Authors Acknowledge)

1. **Synthetic tasks only**: Results demonstrated on 3SUM and 2SUM-Transform, not natural language tasks
2. **Current LLMs don't use filler tokens**: Claude 2 and GPT-3.5 achieve same performance with/without filler tokens on common benchmarks
3. **Requires specific training**: Filler token usage requires parallelizable CoT demonstrations — standard human-generated CoT doesn't transfer
4. **Scale limitations**: Small model (34M params); unclear how findings scale
5. **Non-standard input encoding**: Embedding vectors for inputs, one-hot for tokens

---

## Key Quotes

> "Chain-of-thought tokens need not provide information about the intermediate computational steps involved in multi-token computations. In summary, our results show that additional tokens can provide computational benefits independent of token choice."

> "The fact that intermediate tokens can act as filler tokens raises concerns about large language models engaging in unauditable, hidden computations that are increasingly detached from the observed chain-of-thought tokens."

> "For problems satisfying this characterization, chain-of-thought tokens need not provide information about the intermediate computational steps involved in multi-token computations... intermediate tokens are at best non-informative, as in the '……' case, and at worst misleading."

---

## Implications for Thesis

**Assessment**: SUPPORTS the thesis

This paper supports the thesis that LLMs are pattern matchers by showing:

1. **CoT benefits may be computational, not reasoning**: Meaningless dots can replace interpretable reasoning steps with equivalent performance — benefits stem from additional compute (pattern matching opportunity), not step-by-step reasoning.

2. **Hidden computation is non-transparent**: The model performs useful computation in hidden states without interpretable trace in tokens — consistent with learned pattern matching, not transparent reasoning.

3. **Requires training on specific patterns**: Filler token usage only works when trained on parallelizable decompositions — models cannot "discover" how to use filler tokens from general demonstrations.

4. **Theoretical constraints**: Even with filler tokens, transformers remain in TC⁰ — cannot solve problems requiring true sequential reasoning.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
