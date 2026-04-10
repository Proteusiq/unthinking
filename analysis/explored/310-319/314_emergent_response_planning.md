# Paper Analysis: Emergent Response Planning in Large Language Models

## Metadata
- **arXiv ID**: 2502.06258
- **Title**: Emergent Response Planning in LLMs
- **Authors**: Zhichen Dong, Zhanhui Zhou, Zhixuan Liu, Chao Yang, Chaochao Lu (Shanghai Jiao Tong University)
- **Date**: February 2025
- **Venue**: ICML 2025

---

## Core Claims

1. **Emergent planning exists**: LLMs encode global response attributes (length, content, confidence) in prompt representations before generation.

2. **Simple probes extract planning**: MLP probes (1 hidden layer) can predict response attributes from prompt representations.

3. **Three-phase pattern**: Early planning → mid-focus → late refinement observed during generation.

4. **Gap between probed and verbalized**: Models encode richer planning information than they can self-report.

---

## Methodology

### Models
Llama-2-7B/13B/70B, Llama-3-8B/70B, Mistral-7B, Qwen2-7B (base + instruction-tuned)

### Probing
MLP probes (1 hidden layer) on prompt representations

### Attributes Tested
- **Structure**: Response length, reasoning steps
- **Content**: Character choices (story), multiple-choice answers
- **Behavior**: Answer confidence, factual consistency

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

---

## Key Evidence

| Finding | Quantitative | Context |
|---------|--------------|---------|
| Response length | Pearson r > 0.8 | Instruction-tuned models |
| Character choice | ~50% (4-class, 25% random) | Story generation |
| MC answers | ~35% (5-class, 20% random) | QA tasks |
| Self-estimation | Near random | Models can't verbalize planning |
| Cross-dataset transfer | Above random | General mechanisms |

### Scaling with Model Size
- Larger models within families show stronger planning capabilities
- 70B models consistently outperform 7B/8B models on all attributes
- Planning ability appears to scale with model capacity

---

## Relationship to Other Papers

### Supports
- **#313 Knowing Before Saying** (2505.24362): Both show pre-generation encoding of outcomes
- **#4 GSM8K Analysis**: Both reveal implicit planning mechanisms

### Related
- **#305 Effective Reasoning** (2509.19284): Both analyze generation dynamics
- **#309 Entropy Dynamics** (2602.01288): Both examine internal states during generation

---

## REBUTTALS

### This Paper Is Balanced Because
**Supports Thesis:**
- Models have implicit knowledge they can't express (gap between probed/verbalized)
- Planning is a form of pattern matching on expected outputs, not deliberative reasoning
- Three-phase pattern suggests: outline → fill in → adjust (template completion)

**Challenges Thesis:**
- Evidence of forward-looking computation beyond immediate next token
- Planning ability scales with model size (suggests genuine capability increase)
- Cross-dataset transfer suggests general planning mechanisms

### Limitations (Authors Acknowledge)
1. All experiments use greedy decoding (deterministic labels)
2. Planning under sampling/temperature settings unexplored
3. Correlation vs. causation: probes detect patterns but don't prove planning

---

## Key Quotes

> "LLMs, though trained to predict only the next token, exhibit emergent planning behaviors."

> "Models encode richer planning information than they can explicitly access during generation."

> "Simple MLP probes with hidden sizes as small as 32 or 128 perform nearly as well as larger ones, indicating that these planning signals are highly salient."

---

## Significance for Thesis

The paper shows LLMs encode global response attributes—but this may be **sophisticated pattern completion** rather than "reasoning." Models learn statistical regularities about how responses unfold given prompts, not explicit planning algorithms.

```
Training Objective:    Next token prediction only
Observed Behavior:     Global response attributes encoded before generation

This gap suggests emergent capabilities beyond training objective
```

**Stance**: BALANCED

Provides evidence for both sophisticated processing AND limitations. Planning exists but may be pattern matching on expected output structures, not deliberative reasoning. The gap between probed and verbalized knowledge supports the thesis.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
