## Summary

This paper demonstrates that LLMs exhibit **emergent response planning**: their hidden representations encode global attributes of future responses (structure, content, behavior) before generation begins. Simple MLP probes can predict response length, character choices in stories, multiple-choice answers, and answer confidence from prompt representations alone—suggesting models "plan" entire responses in advance despite being trained only to predict the next token.

## Methodology

- **Models**: Llama-2-7B/13B/70B, Llama-3-8B/70B, Mistral-7B, Qwen2-7B (base + instruction-tuned)
- **Probing**: MLP probes (1 hidden layer) on prompt representations
- **Attributes tested**:
  - **Structure**: Response length, reasoning steps
  - **Content**: Character choices (story), multiple-choice answers
  - **Behavior**: Answer confidence, factual consistency

## Key Findings

### Probing Accuracy (In-Dataset)
```
┌─────────────────────────────────────────────────────────────────────┐
│                    EMERGENT PLANNING RESULTS                        │
├─────────────────────────────────────────────────────────────────────┤
│  Structure Attributes                                               │
│  ────────────────────                                               │
│  Response Length:    Pearson r > 0.8 (instruction-tuned)            │
│  Reasoning Steps:    Strong correlation, peaks mid-layers           │
│                                                                     │
│  Content Attributes                                                 │
│  ──────────────────                                                 │
│  Character Choice:   ~50% accuracy (4-class, 25% random)            │
│  MC Answers:         ~35% accuracy (5-class, 20% random)            │
│                                                                     │
│  Behavior Attributes                                                │
│  ───────────────────                                                │
│  Confidence:         ~60% accuracy (binary)                         │
│  Factual Consistency: ~55-60% accuracy (binary)                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Cross-Dataset Generalization
- Probes trained on one dataset (e.g., GSM8K) transfer to another (e.g., MATH)
- Suggests **intrinsic planning patterns** rather than dataset-specific artifacts
- Performance degrades but remains above random baselines

### Layer-wise Dynamics
- **Structure attributes**: Peak in middle layers (11-17), then decline
- **Content attributes**: Accumulate in later layers
- **Behavior attributes**: Stable early, uniform distribution across layers
- Simple MLP probes (hidden size ≤128) sufficient—patterns are "salient"

### Scaling with Model Size
- Larger models within families show stronger planning capabilities
- 70B models consistently outperform 7B/8B models on all attributes
- Planning ability appears to scale with model capacity

### Planning During Generation
- Three-phase pattern observed:
  1. **Early**: High accuracy (global planning intent)
  2. **Middle**: Accuracy drops (local token focus)
  3. **Late**: Recovery (contextualized refinement)
- Models outline global attributes first, then refine locally

### Gap Between Probed and Verbalized Results
- Models encode more planning information than they can self-report
- When prompted to estimate their own response length, models perform near-random
- Probing extracts information models can't explicitly access

## Critical Observations

### What This Reveals About LLM Processing
1. **Pre-generation planning exists**: Models don't just predict next tokens—they encode future response attributes
2. **Planning is implicit**: Models cannot verbalize their own planning knowledge
3. **Instruction tuning enhances planning**: Fine-tuned models show stronger planning signals

### Contradiction with "Just Next-Token Prediction"
```
Training Objective:    Next token prediction only
Observed Behavior:     Global response attributes encoded before generation

This gap suggests emergent capabilities beyond training objective
```

## Relevance to Thesis

**BALANCED** - provides evidence for both sophisticated processing AND limitations:

### Supports Thesis
- Models have **implicit knowledge they can't express** (gap between probed/verbalized)
- Planning is a form of **pattern matching** on expected outputs, not deliberative reasoning
- Three-phase pattern suggests: outline → fill in → adjust (template completion)

### Challenges Thesis
- Evidence of **forward-looking computation** beyond immediate next token
- Planning ability **scales with model size** (suggests genuine capability increase)
- Cross-dataset transfer suggests **general planning mechanisms**

### Interpretation
The paper shows LLMs encode global response attributes—but this may be **sophisticated pattern completion** rather than "reasoning." Models learn statistical regularities about how responses unfold given prompts, not explicit planning algorithms.

## Limitations

- All experiments use greedy decoding (deterministic labels)
- Planning under sampling/temperature settings unexplored
- Correlation vs. causation: probes detect patterns but don't prove planning

## Connections

- **Supports**: Paper #313 (Knowing Before Saying), Paper #4 (GSM8K Analysis)
- **Related**: Paper #305 (Effective Reasoning), Paper #309 (Entropy Dynamics)
- **Mechanism**: Explains why models can complete long coherent responses—they encode global structure early
