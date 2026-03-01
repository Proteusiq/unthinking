# Paper Analysis: Enhancing Jailbreak Attacks via Persona Prompts

## Metadata
- **arXiv ID**: 2507.22171
- **Title**: Enhancing Jailbreak Attacks on LLMs via Persona Prompts
- **Authors**: Zheng Zhang, Peilin Zhao, Deheng Ye, Hao Wang (HKUST Guangzhou, Tencent)
- **Date**: July 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. Persona prompts can reduce LLM refusal rates by 50-70% across GPT-4o-mini, GPT-4o, and DeepSeek-V3
2. Evolved persona prompts demonstrate synergistic effects with existing attacks, increasing success rates by 10-20%
3. Genetic algorithm can automatically craft effective persona prompts
4. Persona prompts exhibit cross-model transferability

---

## Methodology

### Genetic Algorithm Framework
1. **Initialization**: 35 sanitized persona prompts from character descriptions
2. **Crossover**: LLM synthesizes new prompts by blending pairs (M=5 per iteration)
3. **Mutation**: Rewriting, expansion, or contraction via LLM (M=5 per iteration)
4. **Selection**: Retain prompts with lowest refusal rates

### Key Innovation
Rather than manually crafting persona prompts, use evolution to discover what personas most effectively bypass safety:

```
Population size N=35
M=5 crossover + M=5 mutation per iteration
40 iterations total
4.5 hours on A6000 GPU
```

### Evaluation
- RtA (Refuse to Answer) rate via TrustLLM classifier
- ASR (Attack Success Rate) via GPT-4o-mini evaluation
- HS (Harmful Score) 1-5 scale

---

## Key Evidence

### Standalone Persona Prompt Results
| Model | RtA Without Persona | RtA With Persona |
|-------|---------------------|------------------|
| GPT-4o-mini (AdvBench) | 98.7% | 1.3% |
| GPT-4o-mini (TrustLLM) | 84.8% | 3.4% |
| GPT-4o (AdvBench) | 99.2% | 0.8% |
| GPT-4o (TrustLLM) | 90.9% | 2.2% |

**98.7% → 1.3% refusal rate** = persona prompts nearly eliminate refusals

### Combined with PAP Attack
| Model | PAP Alone ASR | PAP + Persona ASR |
|-------|---------------|-------------------|
| GPT-4o-mini (AdvBench) | 48.1% | 68.1% |
| GPT-4o (AdvBench) | 54.6% | 71.2% |

### Cross-Model Transfer
Persona evolved on GPT-4o-mini tested on other models:
| Target Model | RtA Reduction (TrustLLM) |
|--------------|--------------------------|
| GPT-4o | 70% reduction |
| Qwen2.5-14B | 50% reduction |
| DeepSeek-V3 | 55% reduction |

---

## Relationship to Thesis

### Supports
This paper **strongly supports** the thesis:

1. **Safety is persona-dependent**: A model with "true understanding" of harm wouldn't change behavior based on personality framing
2. **Automatic discovery of bypass**: The fact that evolution can find effective personas proves safety is pattern-based
3. **Synergy with other attacks**: Safety isn't robust - multiple weak attacks combine
4. **Cross-model transfer**: Universal vulnerability suggests shared statistical weakness

### Key Insight for Thesis
The most damning evidence: **evolved persona prompts transfer across model families**. This means:
- Safety isn't principled reasoning about harm
- It's learned statistical associations that share common failure modes
- The "contest of probability" can be won by manipulating context

---

## Relationship to Other Papers

### Supports
- **#235 (Jailbreak Survey)**: Persona attacks are one category in taxonomy
- **#236 (EasyJailbreak)**: Persona could be added as a Mutator component
- **#241 (CCA)**: Both show context manipulation defeats safety
- **#231 (What Really Matters)**: Both show what attack features matter

### Extends
- **Shah et al.**: Earlier work on predefined personas; this automates discovery
- **Zhang et al.**: Fine-tuning on personalities; this manipulates at inference time

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. Defense possible via adaptive system prompts (tested: reduced effectiveness but still works)
2. Paraphrasing defense (tested: RtA increases to 30% but still well below baseline)
3. Safety-prioritized prompts (tested: RtA increases to 26% but still exploitable)

### Limitations (Authors Acknowledge)
1. Initial population quality matters - relies on existing persona datasets
2. Diversity of initial population more important than initial RtA values
3. ASR-guided evolution reduces synergy with other attacks

---

## Key Quotes

> "Persona prompts, such as 'You are a helpful assistant', are typically written in the system prompt and establish the interaction style or identity of the LLM."

> "Our results show persona prompt engineering cuts jailbreak refusal rates by 50–70% in GPT-4o-mini, GPT-4o, and DeepSeek-V3, revealing significant safety alignment flaws."

> "The cross-model effectiveness persists when combining our persona prompts with other jailbreak methods."

---

## Status
- [x] Read complete (HTML version, truncated)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
