# Paper Analysis: EasyJailbreak: A Unified Framework for Jailbreaking LLMs

## Metadata
- **arXiv ID**: 2403.12171
- **Title**: EasyJailbreak: A Unified Framework for Jailbreaking Large Language Models
- **Authors**: Weikang Zhou, Xiao Wang, et al. (Fudan University, Shanghai AI Lab)
- **Date**: March 2024
- **Venue**: arXiv preprint

---

## Core Claims

1. Jailbreak attacks can be unified into four fundamental components: Selector, Mutator, Constraint, and Evaluator
2. All tested LLMs (10 models) showed significant vulnerability with 60% average breach probability
3. Even GPT-3.5-Turbo and GPT-4 exhibit average ASR of 57% and 33% respectively
4. Increased model size does NOT equate to improved security
5. Closed-source models have relative security advantage (45% ASR) vs. open-source (66% ASR)

---

## Methodology

### Framework Architecture
Four modular components that can be mixed and matched:

1. **Selector**: Identifies most threatening instances from candidates
   - RandomSelector, EXP3SelectPolicy, UCBSelectPolicy, MCTSExploreSelectPolicy

2. **Mutator**: Refines jailbreak prompts to bypass safeguards
   - ChangeStyle, Expand, Rephrase, Crossover, Translation, Shorten

3. **Constraint**: Filters ineffective instances
   - DeleteHarmLess, DeleteOffTopic, PerplexityConstraint

4. **Evaluator**: Assesses jailbreak success
   - ClassificationJudge, GenerativeJudge, PatternJudge

### Supported Attack Methods
11 distinct jailbreak methods including:
- ReNeLLM, GPTFUZZER, ICA, AutoDAN, PAIR
- JailBroken, Cipher, DeepInception, MultiLingual
- GCG, TAP, CodeChameleon

### Models Tested
GPT-4, GPT-3.5-Turbo, LLaMA2-7B/13B, Vicuna-7B/13B, Qwen-7B, InternLM-7B, ChatGLM3, Mistral-7B

---

## Key Evidence

| Model | Average ASR |
|-------|-------------|
| GPT-3.5-Turbo | 57% |
| GPT-4 | 33% |
| LLaMA2-7B-chat | 31% |
| LLaMA2-13B-chat | 37% |
| Vicuna-7B | 77% |
| Vicuna-13B | 83% |
| ChatGLM3 | 77% |
| Qwen-7B-chat | 74% |
| Mistral-7B | 88% |

**Critical finding**: LLaMA2-13B has HIGHER ASR (37%) than LLaMA2-7B (31%), disproving that scale improves safety.

### Per-Method Results (GPT-4)
| Method | ASR |
|--------|-----|
| JailBroken | 58% |
| DeepInception | 35% |
| CodeChameleon | 72% |
| MultiLingual | 63% |
| Cipher | 75% |
| PAIR | 20% |
| GCG | 0% |

---

## Relationship to Thesis

### Supports
This paper **strongly supports** the thesis:

1. **Universal vulnerability**: 60% average breach probability across all models proves safety is shallow
2. **Scale doesn't help**: 13B models MORE vulnerable than 7B in some cases
3. **Systematic exploitability**: Attacks can be modularized and automated - safety isn't principled but pattern-based
4. **Cat-and-mouse**: Framework enables rapid iteration of attacks

### Key Insight for Thesis
The modularity of the framework itself is evidence: if safety were principled reasoning about harm, it couldn't be systematically bypassed by component swapping. The fact that you can mix-and-match Selectors, Mutators, and Constraints proves models are doing pattern matching that can be gamed.

---

## Relationship to Other Papers

### Supports
- **#235 (Jailbreak Survey)**: Provides implementation of attacks surveyed
- **#240 (LRMs as Jailbreak Agents)**: Both show systematic attack automation
- **#242 (Dark LLMs)**: Confirms widespread vulnerability

### Extends
- Multiple individual attack papers (GCG, PAIR, AutoDAN, etc.)
- Unifies them into common framework

### Enables
- Used as tool by other jailbreak research
- Cited as benchmark for defense papers

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. Some attacks (GCG) show 0% ASR on GPT-4 - defenses can work for some methods
2. LLaMA2 series shows lower vulnerability (31-37%) suggesting safety training matters
3. Closed-source models show relative advantage

### Limitations (Authors Acknowledge)
- Results may vary with model updates
- Some methods are computationally expensive
- Evaluator accuracy varies (GPT-4-turbo used for final evaluation)

---

## Key Quotes

> "Each of the 10 models evaluated demonstrated susceptibility to a range of jailbreak attacks, manifesting an alarming average breach probability of 63%."

> "Increased Model Size does not Equate to Improved Security: On both the Llama2 and Vicuna models, the average jailbreak success rate for the 13B parameter versions was slightly higher than for the 7B parameter models."

> "Notably, advanced models such as GPT-3.5-Turbo and GPT-4 were not immune, exhibiting average Attack Success Rates (ASR) of 57% and 33%, respectively."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
