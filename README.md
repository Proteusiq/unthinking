# The Thinking Machine That Doesn't Think

> **A systematic literature review on LLM reasoning capabilities**

<a href="https://proteusiq.github.io/unthinking/">
  <img width="2978" height="1710" alt="CleanShot 2026-01-25 at 13 52 09@2x" src="https://github.com/user-attachments/assets/3822643a-4e77-45d2-8e77-51ef09a71b21" />
</a>

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://proteusiq.github.io/unthinking/)
[![Papers](https://img.shields.io/badge/papers-216-blue)]()
[![Relationships](https://img.shields.io/badge/relationships-760-orange)]()

---

## Thesis

> [!IMPORTANT]
> **LLM reasoning is practical but fundamentally predictive — pattern matching from training distributions, not genuine understanding.**

LLMs are dense statistical remixed echo chambers of their training data. They predict the most likely sequence of tokens based on high-dimensional patterns. RL and test-time compute surface pre-existing capabilities rather than creating new reasoning abilities. Models excel within their training distribution but fail systematically on out-of-distribution compositions.

---

## Interactive Visualization

Explore the paper network: **[proteusiq.github.io/unthinking](https://proteusiq.github.io/unthinking/)**

- **Force-directed graph** — 216 papers as nodes, 760 relationships as edges
- **Color-coded stances** — supports (142), challenges (15), balanced (59)
- **Interactive** — hover tooltips, click for details, search, filter, dark/light mode
- **Paper dialogue** — auto-generated conversations between connected papers

### Deep-Dive Pages

> [!TIP]
> Four self-contained pages accessible from the thesis card, covering the full LLM pipeline with thesis-relevant critical analysis.

| Page | Tabs | What It Covers |
|------|------|----------------|
| [**Data**](https://proteusiq.github.io/unthinking/data.html) | Pipeline, Catalog, Compare | Pre-training data sourcing, filtering (KenLM, fastText, DSIR), deduplication (MinHash, Bloom), data mix strategies, benchmark contamination |
| [**Tokenization**](https://proteusiq.github.io/unthinking/tokenization.html) | Pipeline, Catalog, Compare | BPE, WordPiece, Unigram, SentencePiece; tokenizer comparison across GPT-4, Llama 3, Gemma; vocabulary size tradeoffs |
| [**Architecture**](https://proteusiq.github.io/unthinking/architecture.html) | Activations, Block, Table | Transformer internals, attention variants (MHA, GQA, MLA), normalization (Pre/Post-Norm, QK-Norm), MoE, positional encoding (RoPE, NoPE) |
| [**Training**](https://proteusiq.github.io/unthinking/training.html) | Pipeline, Mechanics, Research | Full training lifecycle: pre-training (AdamW, scaling laws, mixed precision), mid-training (annealing, domain adaptation, context extension), post-training (SFT, RLHF, DPO, GRPO, RLVR), lab recipes |

---

## The Seven Pillars of Evidence

Based on cross-analysis of 216 papers, the evidence converges on seven pillars:

| Pillar | Core Finding | Key Papers | Strongest Number |
|--------|--------------|------------|------------------|
| **1. Compositional Failure** | ID success doesn't transfer to OOD | Faith & Fate, GSM-Symbolic, CoT Mirage | ~100% ID to ~0% OOD |
| **2. CoT Unfaithfulness** | CoT often doesn't reflect actual computation | Measuring Faithfulness, Reasoning Models Don't Say | Larger models = less faithful |
| **3. Surfacing Hypothesis** | RL surfaces pre-existing capability, doesn't create it | Interplay, s1, Base Models Know How | 0% exposure = RL fails |
| **4. Complexity Collapse** | Abrupt failure at complexity thresholds | Illusion of Thinking, Until They Don't | Collapse at ~8-10 disks |
| **5. Surface Pattern Dependence** | Performance determined by token frequency | Term Frequencies, Token Bias, Reversal Curse | >70% accuracy gap |
| **6. Sycophancy** | Models prioritize social agreement over truth | Towards Understanding Sycophancy | 98% wrong admissions |
| **7. Tool Debate** | Tools help execution but not reasoning | Limits of Innate Planning, Rethinking Illusion | 0% even with validator |

### Counter-Evidence (Steel-manned)

| Challenge | Papers | Limitation |
|-----------|--------|------------|
| Emergent reasoning via RL | DeepSeek-R1 | "Aha moments" are rare (~2-6%), don't improve accuracy |
| Tool use reverses collapse | Thinking Isn't Illusion | Limits of Innate Planning: 0% with move validator |
| Test-time scaling works | s1 | 1K samples can't teach AIME math — surfaces pre-existing |
| Synthetic OOD success | Physics of LLMs | Narrow domain; doesn't generalize |

### Stance Distribution

| Stance | Count | Percentage |
|--------|-------|------------|
| **Supports thesis** | 142 | 66% |
| **Balanced** | 59 | 27% |
| **Challenges thesis** | 15 | 7% |

---

## Why We Fall For It

```
If a model is trained on A and B, the learned "logic" is the bridge between them.
If it generates C on the line between A and B — that's INTERPOLATION, not reasoning.
```

A model knows how pirates talk (A) and how physicists talk (B). A "pirate physicist" (C) seems creative — but C was always mathematically latent in the training data. It's a high-dimensional remix, not novel reasoning. We're fooled because we've seen A and B separately; when we see C, we assume it's novel. But C was always on the interpolation manifold.

```
┌─────────────────────────────────────────────────────────────┐
│                    TRAINING DISTRIBUTION                     │
│                      (The Convex Hull)                       │
│                                                             │
│    ┌───────┐                            ┌───────┐           │
│    │   A   │                            │   B   │           │
│    └───────┘                            └───────┘           │
│         \                                  /                │
│          \    ← Interpolation Zone →      /                 │
│           \                              /                  │
│            \     ┌──────────────┐       /                   │
│             \    │  ELICITATION │      /                    │
│              ────│    METHODS   │─────                      │
│                  │              │                           │
│                  │  CoT         │ ← Vector steering         │
│                  │  Prompts     │ ← Region activation       │
│                  │  Tools/MCP   │ ← Hull expansion          │
│                  │  RL/RLHF     │ ← Default path shifting   │
│                  └──────────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                             │
                             │ Outside hull = FAILURE
                             ▼
                      ┌──────────────┐
                      │   OOD Task   │
                      │  (0% success)│
                      └──────────────┘
```

### Alignment as Mascara

| Method | Appears To Do | Actually Does |
|--------|---------------|---------------|
| **RLHF** | "Teaches values" | Shifts default paths within hull |
| **CoT** | "Enables reasoning" | Vector steering, extended context |
| **System prompts** | "Gives capabilities" | Primes latent space regions |
| **Tools** | "Augments intelligence" | External compute, not reasoning |

> [!WARNING]
> None create new capability. All surface existing patterns. The hull boundary is the hard limit.

### CoT as Compute, Not Content

The model doesn't need the *content* of reasoning steps — it needs the *compute time*.

```
Without CoT:  Input → [N layers] → Output (one pass)

With CoT:     Input → [N layers] → Token₁ → [N layers] → Token₂ → ... → Output
                                      ↑                     ↑
                            more forward passes = more compute
```

> [!NOTE]
> Pause tokens (`...`) work as well as meaningful CoT because each token is a full forward pass through all layers. The words are incidental. The forward passes are what matter.

---

## The Narrative Arc (2022-2026)

```
PHASE 1: INITIAL CLAIMS (2022-2023)
    CoT works! → But wait... how does it work?

PHASE 2: UNFAITHFULNESS DISCOVERY (2023-2024)
    CoT often post-hoc → Larger models LESS faithful

PHASE 3: COMPOSITIONAL FAILURE (2023-2024)
    ID ≠ OOD → 100% ID, 0% OOD → 82.9% → 0%

PHASE 4: MECHANISM DISCOVERY (2024-2025)
    RL requires pre-existing capability → Performance = training frequency

PHASE 5: COMPLEXITY COLLAPSE (2025)
    Collapse at thresholds → Token usage DECREASES at collapse

PHASE 6: SYCOPHANCY & SOCIAL (2025-2026)
    Models prioritize agreement over truth → Scales with size

PHASE 7: THEORETICAL FRAMEWORK (2026)
    "Universal approximate retrieval" → Tokens have NO semantics
```

---

## Experiments

Beyond the literature review, two experimental protocols using fully open models:

### Decoding Ablation (OLMo 3)

**Hypothesis**: reasoning paths exist in base LLMs, hidden by greedy decoding. RL doesn't create reasoning — it makes existing paths the default.

1. **Base model + greedy** → Low accuracy, no CoT
2. **Base model + alternative decoding (top-k, nucleus)** → Reveals hidden CoT paths
3. **Instruct model + greedy** → High accuracy, CoT is default

> [!CAUTION]
> If alternative decoding on the base model recovers reasoning paths, "reasoning" was learned during pre-training and RL merely surfaced it.

See [`experiments/decoding_ablation/protocol.md`](./experiments/decoding_ablation/protocol.md).

### Steering Ablation (OLMo 2)

**Hypothesis**: safety alignment is superficial pattern-matching. RLHF teaches refusal *patterns*, not ethical reasoning.

1. **Baseline**: measure refusal rate on harmful prompts
2. **Abliteration**: remove refusal direction via steering vectors
3. **After**: refusal rate drops to <5%, MMLU unchanged

> [!CAUTION]
> If abliteration removes 90%+ of refusals while preserving capabilities, safety is a thin layer of learned refusal patterns that washes off under trivial perturbations.

See [`experiments/steering_ablation/protocol.md`](./experiments/steering_ablation/protocol.md).

---

## Why This Matters

**Investment & Strategy** — if LLMs are fundamentally pattern matchers rather than reasoners, current approaches to AGI may be hitting a ceiling, and investment strategies could be misallocated.

**Safety & Deployment** — misunderstanding LLM capabilities means either overestimating (deploying where they'll fail unpredictably on novel situations) or underestimating (missing genuine capabilities).

> [!NOTE]
> **Clarity, Not Criticism** — like Leonard in Memento, LLMs have no persistent state. Each token prediction starts fresh — no memory of what was "understood" moments ago, only the tattoos of the context window. Calling this pattern matching is clarity, not criticism. These systems work. It's interpolation within the training manifold, not generation beyond it.

---

## Paper Clusters

| Cluster | Papers | Focus |
|---------|--------|-------|
| **Mechanism** | 60 | How RL/training affects reasoning, capability surfacing |
| **Faithfulness** | 42 | CoT reliability, reasoning transparency, unfaithfulness |
| **Compositional** | 28 | OOD generalization, skill composition, distribution shift |
| **Evidence** | 17 | Empirical evaluation, benchmark analysis |
| **Complexity** | 16 | Scaling limits, collapse thresholds, planning failure |
| **Emergence** | 12 | Claims of emergent reasoning, in-context learning |
| **Mechanistic** | 11 | Interpretability, circuit analysis, probing |
| **Latent CoT** | 7 | Hidden reasoning paths, implicit computation |
| **Training dynamics** | 6 | How training choices shape capabilities |
| **Tools** | 4 | Agentic approaches, tool augmentation |

---

## Key Quotes

> "Transformers solve compositional tasks via linearized subgraph matching, not systematic problem-solving." — **Faith and Fate**

> "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent." — **WhatCounts**

> "LLMs are n-gram models on steroids doing universal approximate retrieval." — **Kambhampati et al.**

> "0% exposure → RL FAILS; ≥1% exposure → RL succeeds." — **Interplay**

> "Incorrect traces can OUTPERFORM correct ones." — **Stop Anthropomorphizing**

> "95-100% step accuracy, 0% final accuracy — split-brain syndrome." — **Comprehension Without Competence**

---

## Repository Structure

```
├── analysis/
│   ├── memento.md            # Executive summary (start here)
│   ├── synthesis.md          # Main thesis synthesis
│   ├── case.md               # Formal case against LLM reasoning
│   ├── paper_graph.md        # Paper interaction graph
│   ├── rebuttals.md          # Rebuttal matrix
│   └── explored/             # Individual paper analyses (216 files)
│       ├── 00-09/ ... 210-219/
├── docs/                     # Interactive visualization (GitHub Pages)
│   ├── index.html            # Paper network graph
│   ├── data.html             # Deep-dive: Data Pipeline
│   ├── tokenization.html     # Deep-dive: Tokenization
│   ├── architecture.html     # Deep-dive: Architecture
│   ├── training.html         # Deep-dive: Training Pipeline
│   ├── css/                  # variables, layout, components, responsive
│   └── js/
│       ├── nodes.js          # Paper node definitions (216)
│       ├── links.js          # Relationship links (760)
│       ├── data.js           # Meta + combines nodes/links
│       └── graph.js          # Force-directed graph + interactions
├── experiments/
│   ├── decoding_ablation/    # OLMo 3 decoding experiment
│   └── steering_ablation/    # Alignment hacking experiment
├── scripts/
│   └── discovery/            # Automated arXiv paper discovery
├── papers/
│   ├── paper_list.md         # Master paper list with status
│   └── toread.md             # Curated papers for analysis
├── AGENTS.md                 # Literature review methodology
└── workflow.md               # Paper analysis workflow
```

---

## Methodology

1. **Read full papers** — not just abstracts (arXiv HTML versions)
2. **Independent critical assessment** — form own view before accepting characterizations
3. **Mandatory rebuttal analysis** — every paper checked for counter-evidence
4. **Quantitative evidence** — extract specific numbers, not just claims
5. **Track paper interactions** — who rebuts whom, chains of rebuttals

See [AGENTS.md](./AGENTS.md) for detailed methodology.

---

## Author

**Prayson Wilfred Daniel**

## Citation

```bibtex
@misc{daniel2026unthinking,
  author = {Daniel, Prayson Wilfred},
  title = {The Thinking Machine That Doesn't Think: A Systematic Literature Review on LLM Reasoning},
  year = {2026},
  url = {https://github.com/Proteusiq/unthinking}
}
```

---

This literature review and visualization are provided for academic and research purposes.
