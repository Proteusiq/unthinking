## Summary

This paper introduces NoRa (Noisy Rationales), a benchmark testing LLM robustness when Chain-of-Thought demonstrations contain irrelevant or inaccurate reasoning steps. GPT-3.5 drops 1.4%-19.8% with irrelevant thoughts and 2.2%-40.4% with inaccurate thoughts. Existing robust methods (self-correction, self-consistency) show limited efficacy. The proposed CD-CoT (Contrastive Denoising) achieves 17.8% average improvement by contrasting noisy rationales with one clean example.

## Methodology

- **Models**: GPT-3.5-turbo, Gemini-Pro, Llama2-70B, Mixtral-8x7B
- **Dataset**: NoRa (26,391 questions) across math, symbolic, commonsense reasoning
- **Noise types**:
  - Irrelevant: Correct but unhelpful information (e.g., "five oceans on Earth" during math)
  - Inaccurate: Relevant but factually wrong (e.g., "5+4=9" inserted mid-calculation)
- **Baselines**: Self-correction, Self-consistency, Self-denoise

## Key Findings

### Quantitative Results
```
┌─────────────────────────────────────────────────────────────────────┐
│  PERFORMANCE DROP WITH NOISY RATIONALES (GPT-3.5)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Noise Type        Easy      Medium     Hard      Average           │
│  ─────────────────────────────────────────────────────────────────  │
│  Irrelevant        -6.2%     -13.0%    -17.8%    -12.3%             │
│  Inaccurate       -23.1%     -24.4%    -27.3%    -24.9%             │
│                                                                     │
│  Inaccurate noise is MORE harmful than irrelevant noise             │
└─────────────────────────────────────────────────────────────────────┘
```

### Self-Correction Fails
- ISC (Intrinsic Self-Correction): Often WORSE than base model
- Self-Denoise: Degrades on symbolic tasks (10.4% → 0.1%)
- Self-Consistency: Best baseline but still limited gains

### CD-CoT Solution
- Requires only ONE clean rationale as supervision
- Four steps: Rephrase → Select → Explore → Vote
- Average 17.8% improvement over base model
- Stronger denoising power than all baselines

### Key Insight
```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY NOISY RATIONALES ARE CHALLENGING                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Models cannot distinguish:                                         │
│  - Relevant vs. irrelevant reasoning steps                          │
│  - Accurate vs. inaccurate calculations                             │
│                                                                     │
│  They pattern-match on surface features, not semantic validity      │
└─────────────────────────────────────────────────────────────────────┘
```

## Critical Observations

1. **Noisy rationales are harder than noisy questions**: Denoising rationales requires context-specific knowledge
2. **Inaccurate > Irrelevant harm**: Factual errors within reasoning are more damaging than distractions
3. **Self-correction inadequate**: Models cannot reliably identify and fix their own reasoning errors
4. **External supervision required**: Breaking the noise barrier requires clean examples as guidance

## Relevance to Thesis

**SUPPORTS** the thesis that LLMs don't genuinely reason:

1. **Surface-level processing**: Models can't distinguish valid from invalid reasoning steps
2. **Sensitivity to noise**: Real reasoning should be robust to irrelevant information
3. **No self-verification**: Models cannot validate their own reasoning chains
4. **Pattern matching confirmed**: Models follow the structure of CoT without evaluating its content

This is strong evidence that CoT is template-following, not genuine inference.

## Limitations

- Synthetic noise generation may differ from real-world noise
- Limited to specific reasoning domains
- CD-CoT requires clean supervision (not fully unsupervised)

## Connections

- **Supports**: Paper #312 (Unfaithful CoT), Paper #306 (Lost in Noise)
- **Related**: Paper #3 (GSM-Symbolic), Paper #305 (Effective Reasoning)
- **Mechanism**: Explains why reasoning fails with context perturbations
