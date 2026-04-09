## Summary

This paper demonstrates that LLM internal representations encode information about Chain-of-Thought (CoT) success **before generating a single token**. A probing classifier trained on hidden states achieves 60-76.4% accuracy predicting whether CoT will succeed, substantially outperforming BERT baselines (53.5-69.1%). Crucially, additional CoT steps don't always improve prediction—in some cases early representations already contain the key information.

## Methodology

- **Models**: Llama-3.1-8B, Mistral-7B (instruction-tuned versions)
- **Datasets**: Olympiad (math competitions), Cn-k12 (Chinese K-12), AQuA (algebraic)
- **Approach**: Train probing classifiers on hidden representations at various layers and CoT stages
- **Baseline**: BERT text classifier using only generated tokens (not hidden states)

## Key Findings

### Quantitative Results
- **Before-generation prediction accuracy**:
  - Llama-3.1-8B: 60% (AQuA), 76.4% (Olympiad), 69.1% (Cn-k12)
  - Mistral-7B: 64.7% (AQuA), 71.8% (Olympiad), 67.1% (Cn-k12)
- Hidden representations **outperform BERT baseline** by 6.5-7.3% on average
- Middle layers (11-17) most predictive; layer 14 and 16 consistently informative

### The "Knowing Before Saying" Phenomenon
```
┌─────────────────────────────────────────────────────────────────────┐
│  LLM "knows" at token 0 whether reasoning will succeed             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Probing Accuracy    │  Before any CoT token is generated          │
│  ────────────────    │                                              │
│       76.4%          │  Olympiad dataset (Llama-3.1-8B)             │
│                      │                                              │
│  vs. BERT baseline   │  69.1% (no hidden state access)              │
│                      │                                              │
│  Gap = 7.3%          │  Internal representations encode more        │
│                      │  than what's visible in text                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Later Steps Don't Always Help
- For Olympiad and Cn-k12: prediction accuracy **doesn't improve** with more CoT tokens
- SVCCA analysis shows early representations are more similar to final representations when later steps don't help
- Suggests: when model already "knows" the answer early, CoT is potentially redundant

### Early Stopping Experiments
- Zero-shot early stopping reduces accuracy but still beats no-CoT
- Gap remains between early stopping and full CoT completion
- Potential for efficiency gains with proper training

## Critical Observations

### Evidence for Pre-Computation
1. Model representations encode outcome information before generation starts
2. This information is **not accessible through text alone** (BERT can't extract it)
3. Suggests some form of "pre-computation" or "planning" in forward pass

### Implications for CoT Understanding
- CoT success is partially **predetermined** before reasoning begins
- The verbalized reasoning may not be the actual computation producing the answer
- Supports thesis that CoT is more about structuring output than genuine deliberation

## Relevance to Thesis

**SUPPORTS** the thesis that LLMs don't reason in the way CoT suggests:

1. **Answer encoded before reasoning**: If the model "knows" whether it will succeed before generating CoT, the CoT isn't the mechanism producing the answer
2. **Hidden vs. expressed knowledge gap**: Model encodes more than it verbalizes, suggesting verbalized reasoning is a surface phenomenon
3. **Computational efficiency mystery**: Why generate 300+ tokens of "reasoning" if the answer is already determined at token 0?

This provides mechanistic evidence that CoT is **post-hoc rationalization** rather than genuine step-by-step reasoning.

## Limitations

- Limited to math reasoning tasks
- Zero-shot early stopping suboptimal; needs trained approach
- Can't distinguish between "knowing the answer" vs. "knowing if approach will work"

## Connections

- **Supports**: Paper #312 (Unfaithful CoT), Paper #309 (Entropy Dynamics)
- **Related**: Paper #305 (Effective Reasoning), Paper #308 (CoT Token Complexity)
- **Mechanism**: Provides evidence for why models can predict CoT success—the computation happens in the forward pass, not the sequential generation
