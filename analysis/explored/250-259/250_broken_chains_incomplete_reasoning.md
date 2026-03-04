# Paper Analysis: Broken Chains: The Cost of Incomplete Reasoning in LLMs

## Metadata
- **arXiv ID**: 2602.14444
- **Title**: Broken Chains: The Cost of Incomplete Reasoning in LLMs
- **Authors**: Ian Su, Gaurav Purushothaman, Jey Narayan, Ruhika Goel, Kevin Zhu, et al.
- **Date**: February 2026
- **Venue**: arXiv

---

## Core Claims

1. **Truncated reasoning hurts more than no reasoning** — DeepSeek-V3.2 achieves 53% with no reasoning but only 17% with truncated CoT at 50% budget
2. **Code degrades gracefully vs NL** — Comments collapse to 0% while code maintains 43-47% under token constraints
3. **Hybrid reasoning underperforms** — Combining code and comments never achieves best performance due to modality-switching overhead
4. **Robustness is model-dependent** — Grok maintains 80-90% at 30% budget where OpenAI/DeepSeek collapse to 7-27%

---

## Methodology

**Framework**: Constrain models to reason through 5 conditions:
1. **Code-only**: Express all reasoning as executable code
2. **Comments-only**: Natural language without code
3. **Both**: Hybrid code + comments
4. **Nothing**: Direct answer without explicit reasoning
5. **CoT**: Standard chain-of-thought

**Token Ablation**: Constrain to 10%, 30%, 50%, 70% of optimal token count

**Models**: GPT-5.1, Gemini 3 Flash, DeepSeek-V3.2, Grok 4.1

**Datasets**: AIME, GSM8K, HMMT (mathematical reasoning benchmarks)

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| DeepSeek no reasoning vs truncated CoT | 53% vs 17% | At 50% token budget |
| Gemini comments vs code at 30% budget | 0% vs 43% | Code maintains performance |
| Grok vs others at 30% budget | 80-90% vs 7-27% | Model-dependent robustness |
| OpenAI/DeepSeek at 10% budget | ~0% | Complete collapse |
| Grok at 10% budget | 77-83% | Maintains high performance |
| Hybrid vs single modality | Always worse | Modality-switching overhead |
| HMMT accuracy range | 3-83% | Most challenging benchmark |

---

## Relationship to Other Papers

### Supports
- **Faithfulness Decay (2602.11201)** — Both find later reasoning steps can hurt; incomplete chains actively mislead
- **Inverse Scaling TTC (2507.14417)** — More tokens can be worse; truncation harms more than absence
- **Overthinking (2412.21187)** — Extended reasoning isn't always beneficial
- **Code over Words (2601.18352)** — Code more robust than natural language

### Challenges
- **Chain-of-Thought Prompting (2201.11903)** — Challenges assumption that CoT always helps

### Extends
- **Underthinking (2501.18585)** — Adds token budget dimension to reasoning efficiency analysis

---

## REBUTTALS

### Known Rebuttals
None found yet — paper is recent

### Potential Counter-Arguments
1. **Mathematical tasks only** — May not generalize to commonsense, coding, scientific reasoning
2. **Fixed percentage ablation** — Adaptive budgets might perform differently
3. **API-based evaluation** — Model internals not examined
4. **Future models** — Newer models may be trained for truncation robustness

### Limitations (Authors Acknowledge)
- Focus on mathematical reasoning; generalization uncertain
- Fixed percentage token ablation rather than adaptive budgets
- Only four models tested
- No architectural analysis of why Grok is robust

---

## Key Quotes

> "Truncated reasoning can actually hurt performance, with Gemini achieving 67% accuracy with no reasoning but only 17% with truncated CoT."

> "We hypothesize that truncated chains leave models in inconsistent intermediate states causing variables declared but not resolved, logical premises established but not concluded."

> "When forced to produce an answer from this state, models may hallucinate completions that contradict the partial reasoning, whereas direct answering bypasses this failure mode entirely."

> "Code's syntactic structure preserves semantic coherence even when truncated, a partial loop or conditional still conveys algorithmic intent, whereas truncated natural language may lose critical logical connectives."

---

## Significance for Thesis

**SUPPORTS** the thesis that LLMs are pattern matchers:

1. **Incomplete patterns mislead** — Models can't recover from truncated reasoning = dependent on seeing full patterns
2. **Direct answering outperforms truncated CoT** — Pattern retrieval (no reasoning) beats partial pattern execution
3. **Code > NL robustness** — Structured patterns (code) more robust than unstructured (NL)
4. **Model dependence** — Reasoning robustness varies dramatically = not genuine reasoning

Key insight: If models were genuinely reasoning, partial progress should help. Instead, incomplete chains HURT because models pattern-match expecting complete traces.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
