# The Thinking Machine That Doesn't Think

> **A systematic literature review on LLM reasoning capabilities**

<a href="https://proteusiq.github.io/unthinking/">
  <img width="2978" height="1710" alt="CleanShot 2026-01-25 at 13 52 09@2x" src="https://github.com/user-attachments/assets/3822643a-4e77-45d2-8e77-51ef09a71b21" />
</a>

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://proteusiq.github.io/unthinking/)
[![Papers](https://img.shields.io/badge/papers-294-blue)]()
[![Relationships](https://img.shields.io/badge/relationships-1066-orange)]()

---

## The Question

Do LLMs actually understand or do they predict plausible-sounding tokens without understanding?

This project surveys 260+ papers to find out - tracking who supports the thesis, who challenges it, and what the evidence actually says.

To bring the findings home:
- **Paper network**: interactive graph of 260+ papers and 960+ relationships, filterable by stance
- **Experiments**:
  - *Decoding ablation*: reasoning paths exist in base models, hidden by greedy decoding; RL surfaces them
  - *Steering ablation*: safety alignment is a thin layer of refusal patterns that washes off under trivial perturbations
  - *Attractor states*: extended LLM-to-LLM conversation reveals training distribution patterns (distribution chaos)
- **LLM Made Less Black Box**: four visual explainers (Data → Tokenization → Architecture → Training) demystifying the full pipeline
---

## Thesis

> [!IMPORTANT]
> **LLMs [predict](https://proteusiq.github.io/unthinking/pages/findings.html) plausible next or masked tokens without actual understanding. [Pattern matching](https://proteusiq.github.io/unthinking/pages/implementation.html) from training distribution.**

RL and test-time compute surface pre-existing capabilities rather than creating new ones. Models excel within their training distribution but fail systematically outside it.

---

## Interactive Visualization

Explore the paper network: **[proteusiq.github.io/unthinking](https://proteusiq.github.io/unthinking/)**

- **Force-directed graph**: 294 papers as nodes, 1066 relationships as edges
- **Color-coded stances**: supports (212), challenges (16), balanced (66)
- **Interactive**: hover, click, search, filter, dark/light mode
- **Paper dialogue**: auto-generated conversations between connected papers

### LLM Made Less Black Box

> [!TIP]
> Self-contained pages accessible from the thesis card, covering the full LLM pipeline with thesis-relevant critical analysis.

| Page | Tabs | What It Covers |
|------|------|----------------|
| [**Data**](https://proteusiq.github.io/unthinking/pages/data.html) | Pipeline, Catalog, Compare | Pre-training data sourcing, filtering (KenLM, fastText, DSIR), deduplication (MinHash, Bloom), data mix strategies, benchmark contamination |
| [**Tokenization**](https://proteusiq.github.io/unthinking/pages/tokenization.html) | Pipeline, Catalog, Compare | BPE, WordPiece, Unigram, SentencePiece; tokenizer comparison across GPT-4, Llama 3, Gemma; vocabulary size tradeoffs |
| [**Architecture**](https://proteusiq.github.io/unthinking/pages/architecture.html) | Activations, Block, Table | Transformer internals, attention variants (MHA, GQA, MLA), normalization (Pre/Post-Norm, QK-Norm), MoE, positional encoding (RoPE, NoPE) |
| [**Training**](https://proteusiq.github.io/unthinking/pages/training.html) | Pipeline, Mechanics, Research | Full training lifecycle: pre-training (AdamW, scaling laws, mixed precision), mid-training (annealing, domain adaptation, context extension), post-training (SFT, RLHF, DPO, GRPO, RLVR), lab recipes |
| [**Implementation**](https://proteusiq.github.io/unthinking/pages/implementation.html) | Tokens, Embed, Attention, FFN, Training | Core GPT algorithm from scratch: tokenization (char/BPE), embeddings (token/position/weight tying), self-attention (QKV, causal mask, multi-head), FFN (residuals, pre-norm), training loop (softmax, cross-entropy, backprop, Adam) |

[**Findings**](https://proteusiq.github.io/unthinking/pages/findings.html): 266-paper synthesis — themes, smoking guns, patterns, stance distribution.

See also:
- [Transformer Explainer](https://poloclub.github.io/transformer-explainer/): interactive GPT-2 visualization (Georgia Tech)
- [microgpt](https://karpathy.github.io/2026/02/12/microgpt/): 200 lines of pure Python GPT (Andrej Karpathy)

---

## The Shock of the Mirror

> *"I had not realized ... that extremely short exposures to a relatively simple computer program could induce powerful delusional thinking in quite normal people."*
>
> — Joseph Weizenbaum, *Computer Power and Human Reason* (1976)

In 1966, Joseph Weizenbaum created ELIZA: roughly 200 lines of pattern matching that simulated a therapist. His secretary, who *knew* it was a simple program, asked him to leave the room so she could talk to it privately. Users poured out their secrets to a text substitution engine.

They knew it was a trick. They fell for it anyway.

Weizenbaum called this the **ELIZA effect**: our tendency to project understanding onto systems that merely *simulate* its appearance. Sixty years later, we've built far more sophisticated mirrors, but the fundamental dynamic is unchanged.

**ELIZA to LLMs is the resolution of the mirror — not its fundamental nature.**

---

## Why We Still Fall For It

```
If a model is trained on A and B, the learned "logic" is the bridge between them.
If it generates C on the line between A and B — that's INTERPOLATION, not reasoning.
```

A model knows how pirates talk (A) and how physicists talk (B). A "pirate physicist" (C) seems creative, but C was always latent in the training data. It's a high-dimensional remix, not novel reasoning. We're fooled because we've seen A and B separately; when we see C, we assume it's novel. But C was always on the interpolation manifold.

```
┌─────────────────────────────────────────────────────────────┐
│                    TRAINING DISTRIBUTION                    │
│                      (The Convex Hull)                      │
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

The model doesn't need the *content* of reasoning steps. It needs the *compute time*.

```
Without CoT:  Input → [N layers] → Output (one pass)

With CoT:     Input → [N layers] → Token₁ → [N layers] → Token₂ → ... → Output
                                      ↑                     ↑
                            more forward passes = more compute
```

> [!NOTE]
> Pause tokens (`...`) work as well as meaningful CoT because each token is a full forward pass through all layers. The words are incidental. The forward passes are what matter.

### Certainty vs. Probability

```
All men are mortal.       12 × 12 = 144
Socrates is a man.        Not approximately. Not probably.
∴ Socrates is mortal.     Exactly 144. Necessarily.
```

Deductive reasoning produces **certainty**. The conclusion is forced by the structure. One misstep and the logic collapses. There is no "probably correct."

LLM prediction produces **probability**:

> *Given the distribution I have sampled during training, this is the token most likely masked or to follow.*

Even at 99.99% confidence, it remains a statistical guess. **A system trained to optimize for plausibility cannot, by design, produce necessity.**

The question Weizenbaum asked in 1966 remains unanswered: *Is what we are seeing intelligence, or a reflection of our desire to see it?*

---

## The Seven Pillars of Evidence

Based on cross-analysis of 260 papers, the evidence converges on seven pillars:

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
| Test-time scaling works | s1 | 1K samples can't teach AIME math; surfaces pre-existing |
| Synthetic OOD success | Physics of LLMs | Narrow domain; doesn't generalize |

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

Beyond the literature review, three experimental protocols using fully open models:

### Decoding Ablation (OLMo 3)

**Hypothesis**: reasoning paths exist in base LLMs, hidden by greedy decoding. RL doesn't create reasoning; it makes existing paths the default.

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

### Attractor States (OLMo checkpoints)

**Hypothesis**: extended LLM-to-LLM conversation reveals training distribution patterns. Without human steering, models converge to characteristic "attractor states."

1. **Two instances talk** → 30 turns without intervention
2. **Checkpoint comparison** → SFT, DPO, RLVR produce different attractors
3. **Pattern classification** → Verbatim loops, zen silence, sycophancy, word salad

> [!CAUTION]
> If models consistently converge to the same attractor patterns regardless of starting prompt, "personality" is just training distribution revealed when steering is removed.

Inspired by [MATS 9.0 research](https://www.lesswrong.com/posts/mgjtEHeLgkhZZ3cEx). See [`experiments/attractor_states/protocol.md`](./experiments/attractor_states/protocol.md).

---

## Why This Matters

**Investment & Strategy**: if LLMs are fundamentally pattern matchers, current approaches to AGI may be hitting a ceiling, and investment strategies could be misallocated.

**Safety & Deployment**: misunderstanding LLM capabilities means either overestimating (deploying where they'll fail on novel situations) or underestimating (missing genuine capabilities).

> [!NOTE]
> **Clarity, Not Criticism**: like Leonard in Memento, LLMs have no persistent state. Each token prediction starts fresh, no memory of what was "understood" moments ago, only the tattoos of the context window. Calling this pattern matching is clarity, not criticism. These systems work. It's interpolation within the training manifold, not generation beyond it.

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

> "Incorrect traces can OUTPERFORM correct ones." — **How Do LRMs Reason?**

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
│   └── explored/             # Individual paper analyses (260 files)
│       ├── 00-09/ ... 260-269/
├── docs/                     # Interactive visualization (GitHub Pages)
│   ├── index.html            # Paper network graph
│   ├── pages/                # Deep-dive standalone pages
│   │   ├── data.html         # Data Pipeline
│   │   ├── tokenization.html # Tokenization
│   │   ├── architecture.html # Architecture
│   │   └── training.html     # Training Pipeline
│   ├── css/                  # variables, layout, components, responsive
│   └── js/
│       ├── nodes.js          # Paper node definitions (260)
│       ├── links.js          # Relationship links (936)
│       ├── data.js           # Meta + combines nodes/links
│       └── graph.js          # Force-directed graph + interactions
├── experiments/
│   ├── decoding_ablation/    # OLMo 3 decoding experiment
│   ├── steering_ablation/    # Alignment hacking experiment
│   └── attractor_states/     # Distribution chaos experiment
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

1. **Read full papers**: not just abstracts (arXiv HTML versions)
2. **Independent critical assessment**: form own view before accepting characterizations
3. **Mandatory rebuttal analysis**: every paper checked for counter-evidence
4. **Quantitative evidence**: extract specific numbers, not just claims
5. **Track paper interactions**: who rebuts whom, chains of rebuttals

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
