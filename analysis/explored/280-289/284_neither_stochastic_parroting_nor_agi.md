# Neither Stochastic Parroting nor AGI: LLMs Solve Tasks through Context-Directed Extrapolation

**arXiv**: [2505.23323](https://arxiv.org/abs/2505.23323)  
**Date**: May 2025  
**Authors**: Madabushi, Torgbi, Bonial (University of Bath, Army Research Lab)  
**Type**: Position paper

## Summary

Proposes a middle-ground framework: LLMs perform **context-directed extrapolation from training data priors**. Rejects both "stochastic parroting" (too dismissive) and "emergent reasoning / AGI" (too generous). Provides theoretical grounding using Bloom's taxonomy — argues LLMs achieve **Understand** but not **Apply**.

```
┌─────────────────────────────────────────────────────────────────────┐
│              CONTEXT-DIRECTED EXTRAPOLATION                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  MECHANISM:                                                         │
│  Context (prompt/examples) → activates relevant priors → extrapolate│
│                                                                     │
│  BASE MODELS: ICL examples provide context direction                │
│  INSTRUCTION-TUNED: Prompts provide context direction               │
│                                                                     │
│  KEY INSIGHT:                                                       │
│  In ICL, the HUMAN does the Apply process (selecting examples)      │
│  The MODEL only needs to Understand the pattern shown               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Arguments

### Why Not Stochastic Parroting

Evidence that LLMs go beyond predicting statistically likely next tokens:

1. **Novel MWEs**: Models learn entirely new phrases like "winking at pringles" from ONE example
2. **Winodict**: Pronoun resolution with nonce words defined only in prompt
3. **Random token pattern completion**: [A][B]...[A] → [B] works with random tokens
4. **Flipped-label ICL**: Models classify correctly even with meaningless labels ("Foo", "Bar")

### Why Not AGI / Emergent Reasoning

Evidence that LLMs lack advanced reasoning:

| Test | LLM Performance | Human Performance |
|------|-----------------|-------------------|
| Faux-pas test (children) | 0.40 | 0.82 (ages 9-11) |
| Blocksworld planning | 35.6% (GPT-4 + CoT) | 78% |
| Mystery Blocksworld | 0% (zero-shot) | — |
| Counterfactual tasks | Dramatic drops | Stable |

**Hallucinations** explained: When prompts lack context to direct to correct priors, outputs default to broader training data → statistically likely but wrong.

### Bloom's Taxonomy Analysis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LLMs IN BLOOM'S TAXONOMY                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  REMEMBER: Retrieve from memory                                     │
│  └── LLMs: ✓ Extensive (may masquerade as Understanding)           │
│                                                                     │
│  UNDERSTAND: Interpret, classify, infer, compare                    │
│  └── LLMs: ✓ LIMITED — when priors + context align                 │
│                                                                     │
│  APPLY: Use knowledge for NEW problems where                        │
│         generalization is NOT given                                 │
│  └── LLMs: ✗ FAIL — cannot truly generalize                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Critical distinction**: Understanding = given labeled examples, classify new items. Apply = determine generalization yourself for novel domain.

### On Chain-of-Thought and "Thinking" Models

- CoTs can generate **incorrect traces** while reaching **correct answers**
- Even **incorrect reasoning traces** improve performance
- CoT effectiveness based on "local statistical distribution of pre-training data"
- **o1 and DeepSeek-R1**: "Still rely on approaches that are not fundamentally different"
- Continue to hallucinate; continue to fail at generalization

## Evidence Synthesis

### ICL Mechanism Research

All theoretical frameworks point to reliance on training priors:
- Bayesian inference (Xie et al., Zhang et al.)
- PAC learning (Li et al.)
- Implicit gradient descent (Akyürek et al.)
- ICL as fine-tuning analog (Dai et al.)

**Key finding**: ICL ability **diminishes** for less frequent tokens in training data (Niu et al.)

### Agency Claim

> "Importantly, LLMs will never gain 'agency' in the ICL setting as what they do is always limited to user input through in-context examples."

Fears of "uncontrollable emergence of agency" are unfounded under this framework.

## Relevance to Thesis

### Strong Theoretical Support

The paper provides a precise articulation of "sophisticated pattern matching":

| Thesis Claim | Paper's Evidence |
|--------------|------------------|
| Pattern matching | Context-directed extrapolation = matching context to priors |
| Simulation, not reasoning | Understand without Apply = appearance of reasoning |
| CoT unfaithfulness | Incorrect traces improve performance; statistical basis |
| Brittleness | Counterfactual failures (base-9, Mystery Blocksworld) |
| Anthropomorphization | ELIZA effect cited explicitly |

### Connection to Other Papers

- **Supports #280 URIAL**: ICL as context direction explains why few examples work
- **Supports #284 SAH Operationalization**: Kilobytes of information = context direction
- **Complements #285 Large Models of What**: Different framework (cognitive vs enactive) reaching same conclusion

## Key Quotes

> "Context-directed extrapolation from training data priors offers a comprehensive framework to adequately explain the capabilities and limitations of LLMs."

> "LLM abilities are supported by non-transferable, default-condition-specific behaviors, rather than generalizable reasoning skills."

> "In ICL, the human is doing the Apply process by pointing out the relevant generalization... the model need only Understand at a basic level."

## Limitations

- Position paper — synthesizes existing evidence rather than new experiments
- Bloom's taxonomy may not perfectly map to ML capabilities
- Some may argue the distinction between Understand and Apply is fuzzy

## Stance: **Supports Thesis**

**Strong theoretical support.** Provides a precise, nuanced framework that:
1. Acknowledges LLMs go beyond naive stochastic parroting
2. But firmly denies advanced reasoning / AGI claims
3. Grounds capabilities in Bloom's taxonomy (Understand, not Apply)
4. Explains ICL, CoT, and "reasoning models" as context-directed extrapolation
5. Allays fears of emergent agency

The "context-directed extrapolation" framework is essentially a more precise articulation of "sophisticated pattern matching that simulates reasoning."

## Connections

- **Supports**: URIAL (#280), SAH (#284), Large Models of What (#285)
- **Provides mechanism for**: Why CoT appears to work but isn't faithful
- **Explains**: Counterfactual failures, hallucinations, ICL
- **Theoretical framework**: Bridges "stochastic parrot" critique and capability evidence
