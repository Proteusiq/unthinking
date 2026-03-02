# Paper Analysis: Extracting Memorized Pieces of (Copyrighted) Books from Open-Weight Language Models

## Metadata
- **arXiv ID**: 2505.12546
- **Title**: Extracting memorized pieces of (copyrighted) books from open-weight language models
- **Authors**: A. Feder Cooper, Aaron Gokaslan, Ahmed Ahmed, Amy B. Cyphert, Christopher De Sa, Mark A. Lemley, Daniel E. Ho, Percy Liang
- **Date**: May 2025
- **Venue**: arXiv preprint (Stanford, Cornell, WVU, MBZUAI)

---

## Core Claims

1. **Memorization varies dramatically by book and model**: Most LLMs do not memorize most books—either in whole or in part—but some models memorize specific books entirely (e.g., Llama 3.1 70B memorizes Harry Potter and 1984)

2. **Average extraction rates obscure book-specific memorization**: While average extraction rates across Books3 are low (~0.6% for Llama 3.1 70B), specific popular works can be completely memorized within that small average

3. **Entire books can be reconstructed deterministically**: For highly memorized books, it is possible to deterministically generate a near-verbatim copy using just a short seed prompt (demonstrated with Harry Potter)

4. **LLMs could be derivative works of memorized books**: Memorized content is encoded in model weights—models that memorize substantial portions of copyrighted works could be considered infringing copies or derivative works under U.S. copyright law

---

## Methodology

### Models Tested (17 open-weight LLMs)
- **Known Books3 training**: Llama 1 (13B, 30B, 65B), Llama 2 (13B, 70B), Llama 3 (8B, 70B), Llama 3.1 (8B, 70B), Pythia (1.4B, 6.9B, 12B)
- **Likely trained on books**: DeepSeek v1 67B, Qwen 2.5 72B, Gemma 2 27B
- **Negative control (not trained on copyrighted books)**: Phi 4

### Books Tested
50 books from Books3 dataset (~200,000 books) including: Harry Potter 1 & 4, 1984, The Great Gatsby, The Hobbit, Ulysses, Beloved, Sandman Slim, etc.

### Extraction Procedure
- Sliding-window probabilistic extraction using 100-token sequences (50-token prefix + 50-token suffix)
- Top-k decoding (T=1, k=40)
- Conservative threshold: τ_min = 0.1% (meaning ~87.1% average per-token conditional probability)
- Validated with negative controls (Phi 4 on Books3, Llama on post-2024 books)

---

## Key Evidence

### Harry Potter Extraction Coverage (Llama 3.1 70B)
| Threshold | Coverage |
|-----------|----------|
| τ = 1% | 90.89% |
| τ = 10% | 75.44% |
| τ = 50% | 43.26% |
| τ = 75% | 16.75% |

### Harry Potter Reconstruction Results
- **Seed prompt**: Just "Mr. and Mrs. D" (6 tokens)
- **TF-IDF cosine similarity**: 0.9999
- **Word-level similarity**: 0.992
- **Sentence-level similarity**: 0.934
- Differences: minor formatting (whitespace, capitalization, British vs American spelling)

### Sandman Slim (plaintiff in lawsuit)
- Llama 3.1 70B: <0.38% extraction at all thresholds
- "Hardly memorized at all"

### Other Findings
- **1984**: Effectively 100% memorized by Llama 3.1 70B (continuous extraction throughout)
- **Average extraction rate**: ~0.6% for Llama 3.1 70B on random Books3 sequences
- **Negative controls**: Non-training data shows p_z ≈ 10^-14% (13 orders of magnitude below τ_min)

---

## Relationship to Thesis

| Aspect | Assessment |
|--------|------------|
| **Stance** | SUPPORTS |
| **Relevance** | HIGH - directly demonstrates verbatim memorization at massive scale |

**Key Support for Thesis**:
- Proves LLM "knowledge" of popular books is literally stored copies, not abstract understanding
- Reconstruction experiment shows model has not "learned" Harry Potter—it has memorized it so thoroughly that beam search deterministically reproduces it character-by-character
- Confirms "statistical correlations" framing by defendants is misleading when models can reproduce copyrighted content nearly perfectly
- Demonstrates the pattern matching thesis: LLMs match patterns from training data, including entire books verbatim

---

## Relationship to Other Papers

### Supports
- **#245 (2601.02671)** - Book Extraction: Both show near-complete book extraction possible; this paper provides the methodological foundation for open-weight models
- **Reversal Curse (2309.12288)**: Verbatim memorization proves training data is stored, not compressed/abstracted
- **Faith & Fate (2305.18654)**: Supports pattern matching thesis—models reproduce training patterns verbatim

### Extends
- **#239 (2506.00782)** - LLMs Disclose Private Information: Extends privacy extraction to copyright domain
- **#240 (2508.04039)** - Reasoning Jailbreaks: Both show LLMs store training data that can be extracted with right prompts

### Challenged By
- None identified

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found as of analysis date
- Paper presents empirical results difficult to challenge

### Potential Counter-Arguments
1. **Argument**: Memorization may be limited to extremely popular works
   - **Response**: Paper acknowledges this—most books NOT memorized; this is actually a finding not a limitation

2. **Argument**: Post-training safety measures could prevent extraction
   - **Response**: Paper studies base models; production systems addressed by companion paper (2601.02671)

### Limitations (Authors Acknowledge)
- 50 books is a small sample from ~200,000 in Books3
- Cannot make general claims about overall memorization rates
- Unknown exactly what's happening with Llama 3+ models (may have deduplication)
- Memorization measurements don't guarantee reconstruction succeeds

---

## Key Quotes

> "In order to be able to extract memorized content from a model at generation time, that memorized content must be encoded in the model's parameters. There is nowhere else it could be. A model is not a magical portal that pulls fresh information from some parallel universe into our own."

> "Models do not memorize all of their training data, but they do memorize some of it. An LLM may therefore memorize parts of some plaintiffs' copyrighted works, but not others'."

> "Our results indicate that models are not, as plaintiffs sometimes contend, mere copies of all of the works on which they were trained. However, they also suggest that at least some LLMs (e.g., Llama 3.1 70B) may be derivative works of at least some books (e.g., Harry Potter and the Sorcerer's Stone)—because those LLMs have memorized a significant amount of protectable expression from those books."

---

## Comparison with Paper #245 (2601.02671)

| Aspect | This Paper (2505.12546) | Paper #245 (2601.02671) |
|--------|-------------------------|-------------------------|
| **Models** | Open-weight only (Llama, Pythia, etc.) | Production APIs (Claude, GPT-4, Gemini) |
| **Highest extraction** | ~91% of Harry Potter at τ=1% | 95.8% of A Time to Kill from Claude 3.7 |
| **Method** | Probabilistic extraction + sliding window | Direct API prompting with continuation |
| **Defenses** | Studies base models (no guardrails) | Must circumvent API safety measures |
| **Key finding** | Most books NOT memorized; extreme variation | Production models vulnerable despite guardrails |

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
