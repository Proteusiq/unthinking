## Summary

This paper reveals that RLVR (Reinforcement Learning with Verifiable Rewards) induces a distinctive behavioral signature: prompts seen during training produce rigid, structurally converged reasoning trajectories, while unseen prompts retain diversity. This structural convergence is so reliable it enables black-box membership inference—a detector (Min-kNN Distance) can identify whether a model was trained on specific prompts just by measuring completion diversity.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: RLVR causes "recall not reason" behavior             │
│                                                                     │
│  Unseen prompt:  32 completions → diverse reasoning paths          │
│  Seen prompt:    32 completions → 2-4 rigid structural modes       │
│                                                                     │
│  The model doesn't reason through seen problems—                   │
│  it retrieves cached solution structures.                          │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

This paper provides direct mechanistic evidence that RLVR-trained reasoning models recall rather than reason. The structural convergence phenomenon demonstrates that:

1. **Solution retrieval, not derivation**: For seen prompts, the model produces the same 2-4 reasoning structures regardless of temperature, suggesting memorized templates rather than fresh reasoning
2. **Symbolic reasoning segments freeze first**: The convergence concentrates on algebraic/logical steps—precisely the components that would require genuine reasoning
3. **Diversity = novelty**: The retention of diversity for unseen prompts indicates the model *can* reason variably, but chooses memorized paths when available

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT RLVR TRAINING DOES TO REASONING                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Before RLVR:  Problem → Multiple reasoning paths → Answer         │
│                         (genuine exploration)                       │
│                                                                     │
│  After RLVR:   Problem → 2-4 cached structures → Answer            │
│                         (template retrieval)                        │
│                                                                     │
│  The chain-of-thought becomes a retrieval index,                   │
│  not a derivation trace.                                           │
└─────────────────────────────────────────────────────────────────────┘
```

## Methodology

**Experimental Design:**
- Trained Qwen-2.5-7B-Base with DAPO and GRPO algorithms for 200 rollout steps
- Analyzed checkpoints throughout training to track diversity collapse
- Sampled 32 completions per prompt across 300 training/unseen prompts
- Tested on open-source RLVR models: SimpleRL-32B, DAPO-Qwen-32B, JustRL-DeepSeek-1.5B, Open-Reasoner-Zero-7B

**Diversity Metrics (all three show collapse):**
- Lexical: Expectation-adjusted distinct n-grams (EAD)
- Logical: NLI-based entailment/contradiction rates
- Semantic: Embedding cosine similarity

**Detection Method:**
- Min-kNN Distance: Sample 32 completions, compute pairwise edit distances, average k smallest
- Black-box: No access to token probabilities or reference models needed
- AUC = 0.70 average across 8 RLVR models (vs 0.53 for baselines)

## Key Evidence

| Finding | Quantitative Result |
|---------|---------------------|
| Structural collapse | Seen prompts cluster into 2-4 modes; unseen retain 8-16+ |
| Symbolic logic freezes first | Logic 3-grams increase 5.5x during training (856→4673) |
| Detection reliability | AUC 0.70-0.80 across model scales (1.5B to 32B) |
| Paraphrasing robust | AUC drops only 0.72→0.71 with GPT-4o paraphrases |
| Cross-domain | Works on both math (AUC 0.80) and code (AUC 0.69) |

**Most damaging finding**: Hierarchical clustering of 3-grams shows that symbolic reasoning components (the actual mathematical derivations) converge into rigid patterns far faster than boilerplate phrases. The model memorizes the *reasoning steps themselves*, not just problem templates.

## Key Quotes

> "RLVR induces a systematic convergence in reasoning trajectories: prompts seen during RL training yield increasingly similar generations, while unseen prompts retain high variability."

> "We observe that symbolic logic fragments increase rapidly over the course of RLVR training, while restatement and boilerplate patterns exhibit slower growth."

> "Training prompts have a higher proportion of clusters with fewer reasoning structures, while unseen prompts retain more diverse reasoning paths."

> "The signal exploited by Min-kNN Distance is not tied to surface-level prompt forms, but instead reflects a structural collapse in reasoning induced by RLVR."

## Connections to Other Papers

**Directly Supports:**
- **#294 Surface Heuristics Override Constraints** (2603.29025): Both show heuristic/cached patterns dominate over genuine reasoning. This paper explains the mechanism—RLVR bakes in solution templates.
- **#295 Test-Time Compute Overestimation** (2603.15377): Explains why more compute can hurt—it selects among memorized structures, not exploring new reasoning paths.
- **#3 GSM-Symbolic** (2410.05229): Structural convergence explains brittleness to symbolic variations—model retrieves templates that fail on novel symbol combinations.
- **#10 Illusion of Insight** (2601.00514): Provides mechanism for why reasoning models lack genuine insight—they retrieve cached derivations.
- **#8 Measuring Faithfulness** (2307.13702): If reasoning is template retrieval, CoT faithfulness is illusory—the "reasoning" is post-hoc rationalization of memorized paths.

**Methodological Connection:**
- **#291 Benchmark Leakage Trap** (2602.13626): Both address contamination detection, but this paper targets RLVR-specific signals.

## Limitations

1. **Detection threshold unclear**: AUC measures ranking, not absolute membership determination
2. **Distillation complicates picture**: Distilled models show partial convergence (AUC 0.76), suggesting structural patterns transfer
3. **Code reasoning harder to detect**: AUC 0.69 vs 0.80 for math, possibly due to code's higher natural diversity
4. **Authors don't claim no reasoning**: Paper frames as contamination detection, not reasoning critique

## Rebuttals

**Potential counter-argument**: The paper shows models *can* reason diversely on unseen prompts, suggesting RLVR doesn't destroy reasoning capability.

**Response**: This actually strengthens the thesis—the capability exists but is bypassed when retrieval is available. The model chooses the path of least resistance (cached solutions) over genuine derivation.

## Implications for Thesis

This paper provides a mechanistic smoking gun for the "pattern matching over reasoning" thesis:

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE RLVR PARADOX                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  RLVR improves benchmark scores precisely because it               │
│  replaces reasoning with retrieval.                                │
│                                                                     │
│  Higher accuracy on training distribution                          │
│  = Deeper memorization of solution structures                      │
│  = Less genuine reasoning capability                               │
│                                                                     │
│  The benchmark becomes a contamination measure,                    │
│  not a reasoning measure.                                          │
└─────────────────────────────────────────────────────────────────────┘
```

The convergence into 2-4 structural modes per problem is particularly telling—this is exactly what we'd expect if the model is retrieving from a finite set of memorized solution templates rather than deriving solutions algorithmically.
