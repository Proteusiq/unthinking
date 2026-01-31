# The Thinking Machine That Doesn't Think

> **A systematic literature review on LLM reasoning capabilities**

<img width="2978" height="1710" alt="CleanShot 2026-01-25 at 13 52 09@2x" src="https://github.com/user-attachments/assets/3822643a-4e77-45d2-8e77-51ef09a71b21" />


[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://proteusiq.github.io/unthinking/)
[![Papers](https://img.shields.io/badge/papers-102-blue)]()
[![Relationships](https://img.shields.io/badge/relationships-144-orange)]()

## Thesis

**LLM reasoning is practical but fundamentally predictive - pattern matching from training distributions, not genuinely generative reasoning.**

RL and test-time compute "surface" pre-existing capabilities rather than creating new reasoning abilities. Models excel within their training distribution but fail systematically on out-of-distribution compositions.

---

## Interactive Visualization

Explore the paper network: **[proteusiq.github.io/unthinking](https://proteusiq.github.io/unthinking/)**

<p align="center">
  <img src="https://img.shields.io/badge/nodes-102%20papers-4CAF50" />
  <img src="https://img.shields.io/badge/edges-144%20relationships-2196F3" />
  <img src="https://img.shields.io/badge/stance-supports%20%7C%20challenges%20%7C%20balanced-FFC107" />
</p>

### Features
- **Force-directed graph** — papers as nodes, relationships as edges
- **Color-coded stances** — green (supports), red (challenges), yellow (balanced)
- **Relationship types** — supports, rebuts, extends
- **Interactive** — hover tooltips, click for details, search, filter
- **Dark/light mode** — toggle theme

---

## Key Findings

### Evidence Supporting the Thesis

| Finding | Papers | Key Evidence |
|---------|--------|--------------|
| **ID/OOD Gap** | Faith & Fate, CoT Mirage, Planning Gap | ~100% in-distribution → ~0% out-of-distribution |
| **Complexity Collapse** | Illusion of Thinking, Until They Don't | Abrupt failure at complexity thresholds (~8 disks Hanoi) |
| **CoT Unfaithfulness** | Measuring Faithfulness, Don't Say What They Think | 25-60% of CoT doesn't reflect actual computation |
| **RL Surfaces, Doesn't Create** | Interplay, No Free Lunch | 0% exposure → RL fails; RL amplifies existing patterns |
| **Compositional Failure** | OMEGA, Compositional-ARC | >69% isolated skills → near-0% when composed |

### Counter-Evidence (Steel-manned)

| Challenge | Papers | Limitation |
|-----------|--------|------------|
| Emergent reasoning via RL | DeepSeek-R1 | "Aha moments" are rare (~2-6%), don't improve accuracy |
| Tool use reverses collapse | Thinking Isn't Illusion | Move validator still yields 0% — planning is bottleneck |
| Test-time scaling works | s1 | 1K samples can't teach AIME math — surfaces pre-existing |

---

## Experimental Evidence: OLMo 3 Decoding Ablation

Beyond the literature review, we provide **original experimental evidence** using OLMo 3.

### Hypothesis

> Reasoning paths exist in base LLMs, hidden by greedy decoding. RL and instruction-tuning don't create reasoning — they make existing paths the default.

### Experiment

Using OLMo 3 (fully open weights, data, and checkpoints):

1. **Base model + greedy decoding** → Low accuracy, no chain-of-thought
2. **Base model + alternative decoding (top-k, nucleus)** → Reveals hidden CoT paths
3. **Instruct model + greedy** → High accuracy, CoT is default

### The Killer Finding

If alternative decoding on the **base model** recovers reasoning paths that improve accuracy, this proves:

- Reasoning is **learned during pre-training**
- RL/SFT merely **surfaces** it as the default path
- The capability was always there — greedy decoding just didn't select it

See [`experiments/decoding_ablation/protocol.md`](./experiments/decoding_ablation/protocol.md) for the full experimental protocol.

---

## Repository Structure

```
├── analysis/
│   ├── synthesis.md          # Main thesis synthesis
│   ├── paper_graph.md        # Paper interaction graph
│   ├── rebuttals.md          # Rebuttal matrix
│   └── explored/             # Individual paper analyses (97 files)
│       ├── 00-09/            # Papers 00-09
│       ├── 10-19/            # Papers 10-19
│       ├── ...               # (10-paper bins)
│       └── 90-99/            # Papers 90-99
├── scripts/
│   └── discovery/            # Paper discovery package
│       ├── __main__.py       # Entry: uv run scripts/discovery/__main__.py
│       ├── models.py         # Paper, Classification dataclasses
│       ├── search.py         # arXiv search, load known IDs
│       ├── classify.py       # LLM + keyword classification
│       └── output.py         # Markdown formatting, file writing
├── experiments/
│   └── decoding_ablation/    # OLMo 3 decoding experiment
│       └── protocol.md       # Experimental protocol
├── docs/                     # Interactive visualization (GitHub Pages)
│   ├── index.html
│   ├── css/                  # variables, layout, components, responsive
│   └── js/
│       ├── graph.js
│       └── data.js
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

## Automated Paper Discovery

New papers are discovered daily via GitHub Actions, classified using an LLM with thesis context.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Paper Discovery Flow                        │
│                   (runs daily at 8am UTC)                       │
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
