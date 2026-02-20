# Paper Analysis: Prompt Repetition Improves Non-Reasoning LLMs

## Metadata
- **arXiv ID**: 2512.14982
- **Title**: Prompt Repetition Improves Non-Reasoning LLMs
- **Authors**: Yaniv Leviathan, Matan Kalman, Yossi Matias (Google Research)
- **Date**: December 2024
- **Venue**: arXiv preprint

---

## Core Claims

1. **Repeating the prompt verbatim improves LLM performance** when reasoning is disabled, without increasing output tokens or latency
2. **Causal attention creates information asymmetry**: early tokens cannot attend to later tokens, so repeating the prompt allows all tokens to attend to all prompt content
3. **47 wins, 0 losses** across 70 benchmark-model combinations (p < 0.1, McNemar test)
4. **Reasoning models already do this**: o1-like models trained with RL often learn to repeat parts of the prompt, suggesting prompt repetition is a naturally discovered optimization
5. **When reasoning is enabled, prompt repetition is neutral to slightly positive** (5 wins, 1 loss, 22 neutral)

---

## Methodology

### Models Tested (7 models)
- Gemini 2.0 Flash and Flash Lite
- GPT-4o-mini and GPT-4o
- Claude 3 Haiku and Claude 3.7 Sonnet
- DeepSeek V3

### Benchmarks (7 benchmarks + 2 custom)
- ARC (Challenge)
- OpenBookQA
- GSM8K
- MMLU-Pro
- MATH
- NameIndex (custom): identify 25th name in list of 50
- MiddleMatch (custom): find name between two given names in list

### Experimental Design
- All tests via official APIs (Feb-Mar 2025)
- McNemar test for statistical significance (p < 0.1)
- Tested question-first vs. options-first ordering
- Ablations: Verbose repetition, 3x repetition, padding control

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Wins for prompt repetition | 47/70 | Benchmark-model combinations with p < 0.1 |
| Losses | 0/70 | No statistically significant regressions |
| NameIndex improvement (Flash-Lite) | 21.33% → 97.33% | Custom task showing dramatic gains |
| Reasoning mode wins | 5/28 | When "think step by step" enabled |
| Reasoning mode losses | 1/28 | Neutral to slightly positive overall |

### Ablation Results
- **Padding control**: No improvement (proves it's repetition, not length)
- **3x repetition**: Often outperforms 2x, especially on custom tasks
- **Verbose repetition** ("Let me repeat that:"): Similar performance

---

## Relationship to Other Papers

### Supports
- **Overthinking o1-Like LLMs (2412.21187)**: Authors note reasoning models learn to repeat prompts via RL—this paper shows why that's beneficial
- **Let's Think Dot by Dot (2404.15758)**: Both show extra computation (via different mechanisms) improves performance
- **Pause Tokens papers (195-200)**: Same principle—extra processing time before output improves accuracy

### Challenges
- **Zero-Shot Reasoners (2205.11916)**: Suggests "think step by step" may be unnecessary if prompt repetition achieves similar gains more efficiently
- **Chain of Thought papers**: Prompt repetition achieves improvements without generating reasoning tokens

### Extends
- **Re-reading improves reasoning (Xu et al., 2309.06275)**: Cited in paper; this extends by showing full prompt repetition (not just question) and systematic evaluation
- **Repetition Improves Embeddings (Springer et al., 2024)**: Shows repetition benefits extend from embeddings to generation

---

## REBUTTALS

### Known Rebuttals
None identified. Paper is recent (Dec 2024).

### Potential Counter-Arguments
1. **Limited to non-reasoning mode**: Authors acknowledge gains are smaller/neutral when reasoning is enabled
2. **API-based testing**: Cannot inspect internal mechanisms, only behavioral effects
3. **Context length implications**: For very long prompts, doubling length may be impractical
4. **Efficiency claims**: While output tokens don't increase, input processing (prefill) doubles

### Limitations (Authors Acknowledge)
- "Prompt repetition can affect latency for long prompts, and might be impossible for very long ones"
- Did not explore partial repetition strategies
- No mechanistic analysis of attention patterns (suggested as future work)

---

## Prompt Repetition Templates (Appendix A.4)

| Method | Template |
|--------|----------|
| **Baseline** | `<QUERY>` |
| **Prompt Repetition** | `<QUERY> <QUERY>` |
| **Verbose** | `<QUERY> Let me repeat that: <QUERY>` |
| **3x Repetition** | `<QUERY> Let me repeat that: <QUERY> Let me repeat that one more time: <QUERY>` |
| **Padding (control)** | `<QUERY> Ignore these periods: .......` (same length, no info) |

**Key insight**: In causal attention, early tokens cannot attend to later tokens. By repeating the prompt, every token in the second copy can attend to every token in the first copy—enabling full bidirectional information flow within the prompt.

---

## Key Quotes

> "We propose to repeat the prompt, i.e. transform the input from '<QUERY>' to '<QUERY><QUERY>'. This enables each prompt token to attend to every other prompt token."

> "As further motivation, we observe that reasoning models trained with RL often learn to repeat (parts of) the user's request."

> "Prompt repetition wins 47 out of 70 tests, with 0 losses."

> "On the custom tasks of NameIndex and MiddleMatch we observe strong gains with prompt repetition for all models (for example, prompt repetition improves the accuracy of Gemini 2.0 Flash-Lite on NameIndex from 21.33% to 97.33%)."

> "When reasoning is enabled, prompt repetition is neutral to slightly positive (5 wins, 1 loss, and 22 neutral), which is expected given that the reasoning often starts with repeating (parts-of) the prompt anyway."

---

## Assessment

**Stance: Supports thesis**

This paper provides indirect but meaningful evidence that LLMs are not genuine reasoners:

1. **Attention as the bottleneck**: The fact that simply repeating the prompt (allowing bidirectional attention to prompt content) dramatically improves accuracy suggests models struggle with basic information integration—a task trivial for genuine reasoners.

2. **Reasoning models redundantly re-discover repetition**: The observation that o1-like models learn to repeat prompts via RL suggests their "reasoning" includes this basic attention workaround, inflating apparent reasoning sophistication.

3. **NameIndex 21% → 97%**: A 76-point improvement on a simple "find the 25th item" task reveals severe limitations in basic information retrieval that genuine reasoning would not exhibit.

4. **Format over substance**: The improvement comes purely from prompt formatting, not from additional "thinking"—supporting the thesis that performance is driven by surface-level patterns.

However, this is **indirect** evidence. The paper doesn't directly test reasoning capabilities but reveals an architectural limitation that reasoning should not be subject to.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
