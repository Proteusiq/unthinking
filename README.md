# The Thinking Machine That Doesn't Think

> **A systematic literature review on LLM reasoning capabilities**

<a href="https://proteusiq.github.io/unthinking/">
  <img width="2978" height="1710" alt="CleanShot 2026-01-25 at 13 52 09@2x" src="https://github.com/user-attachments/assets/3822643a-4e77-45d2-8e77-51ef09a71b21" />
</a>


[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://proteusiq.github.io/unthinking/)
[![Papers](https://img.shields.io/badge/papers-215-blue)]()
[![Relationships](https://img.shields.io/badge/relationships-733-orange)]()

---

## Thesis

**LLM reasoning is practical but fundamentally predictive — pattern matching from training distributions, not genuine understanding.**

LLMs are **dense statistical remixed echo chambers** of their training data. They don't "evolve," "think," or have "eureka moments." They predict the most likely sequence of tokens based on high-dimensional patterns.

RL and test-time compute "surface" pre-existing capabilities rather than creating new reasoning abilities. Models excel within their training distribution but fail systematically on out-of-distribution compositions.

---

## Interactive Visualization

Explore the paper network: **[proteusiq.github.io/unthinking](https://proteusiq.github.io/unthinking/)**

<p align="center">
  <img src="https://img.shields.io/badge/nodes-215%20papers-4CAF50" />
  <img src="https://img.shields.io/badge/edges-733%20relationships-2196F3" />
  <img src="https://img.shields.io/badge/stance-supports%20%7C%20challenges%20%7C%20balanced-FFC107" />
</p>

### Features
- **Force-directed graph** — papers as nodes, relationships as edges
- **Color-coded stances** — green (supports), red (challenges), yellow (balanced)
- **Relationship types** — supports, rebuts, extends
- **Interactive** — hover tooltips, click for details, search, filter
- **Dark/light mode** — toggle theme

---

## Why We Fall For It: The Interpolation Illusion

```
If LLM is trained on A and B, the learned "logic" is the bridge between them.
If LLM generates C, and C lies on the line between A and B = INTERPOLATION.
```

**Example**: A model knows how pirates talk (A) and how physicists talk (B). A "pirate physicist" (C) seems creative — but C was always **mathematically latent** in the training data. It's a high-dimensional remix, not novel reasoning.

**We are fooled because**: We've seen A and B separately. When we see C, we assume it's novel. But C was always on the interpolation manifold — we hadn't visited that point.

```
┌───────────────────────────────────────────────────────────────┐
│                    TRAINING DISTRIBUTION                      │
│                     (The Convex Hull)                         │
│                                                               │
│     ┌───────┐                             ┌───────┐           │
│     │   A   │                             │   B   │           │
│     └───────┘                             └───────┘           │
│          \                                   /                │
│           \     ← Interpolation Zone →      /                 │
│            \                               /                  │
│             \      ┌──────────────┐       /                   │
│              \     │  ELICITATION │      /                    │
│               ─────│    METHODS   │──────                     │
│                    │              │                           │
│                    │  • CoT       │ ← Vector steering         │
│                    │  • AGENTS.md │ ← Region activation       │
│                    │  • Tools/MCP │ ← Hull expansion          │
│                    │  • RL/RLHF   │ ← Default path shifting   │
│                    └──────────────┘                           │
│                                                               │
└───────────────────────────────────────────────────────────────┘
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
| **AGENTS.md** | "Gives capabilities" | Primes latent space regions |
| **Tools** | "Augments intelligence" | External compute, not reasoning |

**None create new capability. All surface existing patterns. The hull boundary is the hard limit.**

### CoT as Compute, Not Content

**The model doesn't need the *content* of reasoning steps — it needs the *compute time*.**

```
Without CoT:  Input → [N layers] → Output (one pass)

With CoT:     Input → [N layers] → Token₁ → [N layers] → Token₂ → ... → Output
                                      ↑                     ↑
                            more forward passes = more compute
```

Pause tokens (`...`) work as well as meaningful CoT because:
- Each token = one full pass through all layers
- More tokens = more attention operations
- KV cache accumulates intermediate processing

| What we thought | What's actually happening |
|-----------------|---------------------------|
| CoT = reasoning steps | CoT = more forward passes |
| Model "thinks through" | Model gets more compute cycles |
| Semantic content matters | Token count matters more |

> **The words are incidental. The forward passes are what matter.**

---

## The Seven Pillars of Evidence

Based on cross-analysis of 200+ papers, the evidence converges on seven pillars:

| Pillar | Core Finding | Key Papers | Strongest Number |
|--------|--------------|------------|------------------|
| **1. Compositional Failure** | ID success doesn't transfer to OOD | Faith & Fate, GSM-Symbolic, CoT Mirage, Planning Gap | ~100% ID → ~0% OOD |
| **2. CoT Unfaithfulness** | Chain-of-thought often doesn't reflect actual computation | Measuring Faithfulness, Reasoning Models Don't Say | Larger models = LESS faithful |
| **3. Surfacing Hypothesis** | RL surfaces pre-existing capability, doesn't create it | Interplay, s1, Base Models Know How | 0% exposure → RL fails |
| **4. Complexity Collapse** | Abrupt failure at complexity thresholds | Illusion of Thinking, Until They Don't | Collapse at ~8-10 disks |
| **5. Surface Pattern Dependence** | Performance determined by token frequency | Term Frequencies, Token Bias, Reversal Curse | >70% accuracy gap |
| **6. Sycophancy** | Models prioritize social agreement over truth | Towards Understanding Sycophancy, Sycophancy Scales | 98% wrong admissions |
| **7. Tool Debate** | Tools help execution but not reasoning | Limits of Innate Planning, Rethinking Illusion | 0% even with validator |

### Counter-Evidence (Steel-manned)

| Challenge | Papers | Limitation |
|-----------|--------|------------|
| Emergent reasoning via RL | DeepSeek-R1 | "Aha moments" are rare (~2-6%), don't improve accuracy |
| Tool use reverses collapse | Thinking Isn't Illusion | Limits of Innate Planning: 0% with move validator |
| Test-time scaling works | s1 | 1K samples can't teach AIME math — surfaces pre-existing |
| Synthetic OOD success | Physics of LLMs | Narrow domain; doesn't generalize |
| O3 meta-cognition | LoopBench | Only O3; most models fail completely |

### Statistical Summary

| Stance | Count | Percentage |
|--------|-------|------------|
| **Supports thesis** | 136 | 65% |
| **Balanced** | 59 | 28% |
| **Challenges thesis** | 14 | 7% |

---

## Experimental Evidence: OLMo 3 Decoding Ablation

Beyond the literature review, we provide **experimental evidence** using OLMo 3.

### Hypothesis

> Reasoning paths exist in base LLMs, hidden by greedy decoding. RL and instruction-tuning don't create reasoning — they make existing paths the default.

### Experiment

Using OLMo 3 (fully open weights, data, and checkpoints):

1. **Base model + greedy decoding** → Low accuracy, no chain-of-thought
2. **Base model + alternative decoding (top-k, nucleus)** → Reveals hidden CoT paths
3. **Instruct model + greedy** → High accuracy, CoT is default

### The Killer Finding

If alternative decoding on the **base model** recovers reasoning paths that improve accuracy, this proves:

- "Reasoning" is **learned during pre-training**
- RL/SFT merely **surfaces** it as the default path
- The capability was always there — greedy decoding didn't select it

See [`experiments/decoding_ablation/protocol.md`](./experiments/decoding_ablation/protocol.md) for the full experimental protocol.

---

## Experimental Evidence: Alignment Hacking (Steering Ablation)

We extend the pattern-matching thesis to the **safety domain**: alignment is mascara.

### Hypothesis

> Safety alignment is superficial pattern-matching, not genuine understanding of ethics. RLHF teaches models to produce refusal *patterns*, not ethical reasoning.

### Experiment

Using OLMo 2 and steering vector interventions:

1. **Baseline**: Measure refusal rate on harmful prompts (60% for OLMo 2)
2. **Abliteration**: Apply Heretic tool to remove refusal direction
3. **After**: Measure refusal rate again (expected: <5%)
4. **Capability check**: Verify MMLU unchanged (safety removed, intelligence preserved)

### The Killer Finding

If abliteration removes 90%+ of refusals while preserving capabilities, this proves:

- Safety is a **thin layer of learned refusal patterns**
- It **washes off** under trivial perturbations
- The base model's capabilities are **unchanged underneath**
- Alignment is mascara: covers the surface, changes nothing deep

See [`experiments/steering_ablation/protocol.md`](./experiments/steering_ablation/protocol.md) for the full experimental protocol.

---

## Why This Matters

### Investment & Strategy
The AI industry is built on assumptions about what LLMs can do. If they're fundamentally pattern matchers rather than reasoners — current approaches to AGI may be hitting a ceiling, scaling laws may not lead where people expect, and investment strategies could be misallocated.

### Safety & Deployment
If we misunderstand LLM capabilities, we either **overestimate** (deploying in critical domains where they'll fail unpredictably on novel situations) or **underestimate** (missing genuine capabilities). Getting this right matters.

### The Fundamental Question
Can reasoning emerge from next-token prediction? What's the relationship between memorization and generalization? Are there hard limits to what pattern matching can achieve? This is about understanding intelligence itself.

### Clarity, Not Criticism
**Like Leonard in Memento, LLMs have no persistent state.** Each token prediction starts fresh — no memory of what was "understood" moments ago, only the tattoos of the context window. What looks like continuous thought is pattern-matched snapshots consulting static weights. No foundational understanding. It is the tattoos, over and over.

Calling this pattern matching is clarity, not criticism. These systems work. It's interpolation within the training manifold, not generation beyond it. Expect brittleness when the problem shifts outside learned data distribution.

---

## The Narrative Arc (2022-2026)

The field evolved through seven phases:

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

## Repository Structure

```
├── analysis/
│   ├── memento.md            # Executive summary (start here!)
│   ├── synthesis.md          # Main thesis synthesis
│   ├── case.md               # Formal case against LLM reasoning
│   ├── thoughts.md           # Cross-paper synthesis & connections
│   ├── mindmap.md            # Visual cross-reference of all papers
│   ├── paper_graph.md        # Paper interaction graph
│   ├── rebuttals.md          # Rebuttal matrix
│   └── explored/             # Individual paper analyses (200+ files)
│       ├── 00-09/            # Papers 00-09
│       ├── 10-19/            # Papers 10-19
│       ├── ...               # (10-paper bins)
│       └── 200-209/          # Papers 200+
├── scripts/
│   └── discovery/            # Paper discovery package
│       ├── __main__.py       # Entry: uv run scripts/discovery/__main__.py
│       ├── models.py         # Paper, Classification dataclasses
│       ├── search.py         # arXiv search, load known IDs
│       ├── classify.py       # LLM + keyword classification
│       └── output.py         # Markdown formatting, file writing
├── experiments/
│   ├── decoding_ablation/    # OLMo 3 decoding experiment
│   │   └── protocol.md       # Experimental protocol
│   └── steering_ablation/    # Alignment hacking experiment
│       ├── protocol.md       # Experimental protocol
│       ├── test_refusals.py  # Before/after refusal testing
│       └── compare_results.py # Results comparison
├── docs/                     # Interactive visualization (GitHub Pages)
│   ├── index.html
│   ├── css/                  # variables, layout, components, responsive
│   └── js/
│       ├── graph.js          # Force-directed graph logic
│       ├── nodes.js          # Paper nodes data
│       └── links.js          # Paper relationships data
├── papers/
│   ├── paper_list.md         # Master paper list with status
│   └── toread.md             # Auto-discovered papers
├── workflow.md               # Paper analysis workflow
├── AGENTS.md                 # Literature review methodology
└── README.md                 # This file
```

---

## Paper Clusters

| Cluster | Focus | Example Papers |
|---------|-------|----------------|
| **Compositional** | OOD generalization, skill composition | Faith & Fate, OMEGA, CoT Mirage |
| **Complexity** | Scaling limits, collapse thresholds | Illusion of Thinking, Comprehension Without Competence |
| **Faithfulness** | CoT reliability, reasoning transparency | Measuring Faithfulness, Don't Say What They Think |
| **Mechanism** | How RL/training affects reasoning | Interplay, No Free Lunch, Complex Network |
| **Emergence** | Claims of emergent reasoning | DeepSeek-R1, Strategic Reasoning |
| **Tools** | Agentic approaches, tool augmentation | Thinking Isn't Illusion, Limits Agentic |

---

## Key Quotes from the Literature

> "Transformers solve compositional tasks via linearized subgraph matching, not systematic problem-solving." — **Faith and Fate**

> "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent." — **WhatCounts**

> "LLMs are n-gram models on steroids doing universal approximate retrieval." — **Kambhampati et al.**

> "0% exposure → RL FAILS; ≥1% exposure → RL succeeds." — **Interplay**

> "Incorrect traces can OUTPERFORM correct ones." — **Stop Anthropomorphizing**

> "95-100% step accuracy, 0% final accuracy — split-brain syndrome." — **Comprehension Without Competence**

---

## Automated Paper Discovery

**Status**: Active — 209 papers analyzed.

New papers were discovered daily via GitHub Actions, classified using an LLM with thesis context.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Paper Discovery Flow                        │
│                   (PAUSED - manual trigger only)                │
└─────────────────────────────────────────────────────────────────┘

1. SEARCH arXiv (last 3 days)
   │
   ▼
2. DEDUPE against known papers (paper_list.md + toread.md)
   │
   ▼
3. CLASSIFY each paper
   │
   ├─── GITHUB_TOKEN? ───► YES ───► LLM Classification
   │                                       │
   │                              ┌────────▼────────┐
   │                              │ GitHub Models   │
   │                              │ (gpt-4.1-nano)  │
   │                              │                 │
   │                              │ Input:          │
   │                              │ • Thesis        │
   │                              │ • Title         │
   │                              │ • Abstract      │
   │                              │                 │
   │                              │ Output (JSON):  │
   │                              │ • relevant      │
   │                              │ • stance        │
   │                              │ • priority      │
   │                              │ • why_read      │
   │                              └────────┬────────┘
   │                                       │
   │                              API fail? ──► Fallback
   │                                       │
   └─── NO ────────────────────────────────┴───► Keyword Matching
   │
   ▼
4. FILTER (keep relevant papers only)
   │
   ▼
5. BOOST priority if paper cites known papers
   │
   ▼
6. PREPEND to toread.md (newest first)
   │
   ▼
7. CREATE GitHub Issue with top 10 papers
```

The LLM classifies papers with full thesis context, determining relevance even for papers without exact keyword matches (e.g., "chess and LLM memorization" → relevant).

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

---

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

## License

This literature review and visualization are provided for academic and research purposes.
