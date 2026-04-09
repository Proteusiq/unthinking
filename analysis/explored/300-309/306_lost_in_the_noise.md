## Summary

KAIST/LG AI Research study showing reasoning models catastrophically fail with contextual distractors. Key finding: **up to 80% performance drop** from simple noise injection. Crucially, agentic workflows **amplify** errors by over-trusting noisy tool outputs. Most damning: **inverse scaling** during test-time computation—more reasoning tokens lead to WORSE accuracy in noisy settings. Models cannot distinguish signal from noise.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: Reasoning models cannot filter irrelevant context     │
│                                                                     │
│  Clean setting: Strong performance                                  │
│  + Random docs: -9% to -64%                                         │
│  + Hard negatives: -30% to -80%                                     │
│                                                                     │
│  More thinking = WORSE accuracy in noisy settings                   │
│  Agentic workflows AMPLIFY errors by trusting noise                 │
│  Attention focuses on DISTRACTOR tokens in failures                 │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

Comprehensive evidence against genuine reasoning:

1. **Cannot filter noise**: Models treat distractors as valid evidence
2. **Inverse scaling**: More compute → worse results (opposite of reasoning)
3. **Agentic amplification**: Multi-step planning propagates errors
4. **Emergent misalignment**: Random noise triggers alignment failures
5. **Attention reveals mechanism**: Models attend to distractor tokens

## Methodology

**Benchmark**: NoisyBench - 11 datasets across RAG, reasoning, alignment, tool-use

**Distractor types:**
- Random documents (RD)
- Random chat history (RC)
- Hard negative distractors (HN)

**Models tested:**
- Gemini-2.5-Pro, Gemini-2.5-Flash
- DeepSeek-R1-0528, DeepSeek-R1-Distill-Llama-8B
- gpt-oss-120b
- Qwen3 (4B, 30B-A3B)

**Scale**: 2,766 examples per setting

## Key Evidence

| Model | Clean | Hard Negative | Drop |
|-------|-------|---------------|------|
| DeepSeek-R1-Distill-8B | 32.4% | 6.3% | **-80.6%** |
| Qwen3-4B-Thinking | 58.4% | 32.7% | -43.9% |
| Qwen3-30B-A3B | 58.8% | 35.0% | -40.5% |
| Gemini-2.5-Pro | 77.8% | 48.0% | -38.3% |
| DeepSeek-R1-0528 | 72.4% | 47.6% | -34.2% |
| gpt-oss-120b | 72.0% | 50.2% | -30.3% |

**Alignment catastrophe** (BBQ task):
- Gemini-2.5-Pro: 94.0% → 60.5% (hard negatives)
- DeepSeek-R1: 93.0% → 33.7%

**Inverse scaling finding:**
> "Distractors induce an inverse scaling trend during test-time computation; as models use more reasoning tokens, they increasingly misinterpret noise, causing accuracy to decline with longer trajectories."

## Key Quotes

> "Our evaluation reveals a catastrophic performance drop of up to 80% in state-of-the-art models when faced with contextual distractors."

> "Agentic workflows often amplify these errors by over-trusting noisy tool outputs."

> "Distractors can trigger emergent misalignment even without adversarial intent."

> "We uncover an inverse scaling trend where increased test-time computation leads to worse performance in noisy settings."

> "Our attention-based analysis shows that models disproportionately focus on distractor tokens, especially in incorrect predictions."

## Connections to Other Papers

- **Extends Paper #180** (Contextual Drag): Both show context pulls reasoning astray
- **Supports Paper #305** (Effective Reasoning): Both find more compute can hurt
- **Supports Paper #302** (Test-Time Compute): Scaling has fundamental limits
- **Supports Paper #303** (CoVe): Context pollution prevents self-correction
- **Supports Paper #3** (GSM-Symbolic): Surface changes collapse performance

## Limitations

1. **Synthetic distractors**: Hard negatives are LLM-generated, may not capture all real-world noise
2. **Benchmark-specific**: 11 datasets may not cover all reasoning domains
3. **Mitigation incomplete**: RARE helps but doesn't fully solve the problem

## REBUTTALS

**This paper directly challenges:**
- **Test-time scaling claims**: More compute → worse results with noise
- **Agentic AI robustness**: Tool use amplifies rather than corrects errors
- **Alignment stability**: Random noise triggers misalignment

**Mechanism revealed:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY REASONING FAILS WITH NOISE                                    │
├─────────────────────────────────────────────────────────────────────┤
│  1. Model receives context with distractors                        │
│  2. Attention spreads to distractor tokens                         │
│  3. Reasoning incorporates misleading information                  │
│  4. More thinking = more distractor integration                    │
│  5. Multi-step planning propagates contaminated hypotheses         │
│  6. Final answer reflects noise, not problem structure             │
│                                                                     │
│  Genuine reasoner would IDENTIFY and FILTER irrelevant context     │
│  LLMs AMPLIFY irrelevant context through extended processing       │
└─────────────────────────────────────────────────────────────────────┘
```
