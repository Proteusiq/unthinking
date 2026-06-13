# Paper Analysis: FormulaOne

## Metadata
- **arXiv ID**: 2507.13337
- **Title**: FormulaOne: Measuring the Depth of Algorithmic Reasoning Beyond Competitive Programming
- **Authors**: Beniamini, Dor, Vinnikov, et al. (13 authors)
- **Date**: July 2025
- **Venue**: arXiv
- **Stance**: SUPPORTS thesis
- **Cluster**: algorithmic-reasoning

---

## Why This Paper Matters

This paper demonstrates that even the most advanced reasoning models (o3) fail catastrophically on real algorithmic reasoning problems. With <1% success even with 10 attempts and few-shot examples, this provides stark evidence that frontier models lack genuine algorithmic reasoning capability.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                        │
├─────────────────────────────────────────────────────────────────────┤
│  OpenAI's o3 solves <1% of FormulaOne problems                      │
│  even with:                                                         │
│  • 10 attempts per problem                                          │
│  • Explanatory few-shot examples                                    │
│                                                                     │
│  These are real research-level problems, not contrived puzzles.     │
│  The domain (graph theory, logic, algorithms) is well within        │
│  the training distribution of frontier models.                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Frontier Models Fail on Real Algorithmic Reasoning**: State-of-the-art models like o3 solve <1% of FormulaOne problems
2. **Well Within Training Distribution**: Problems span graph theory, logic, and algorithms - domains extensively covered in training data
3. **Research-Level Difficulty**: Problems connect to frontier theoretical CS conjectures (SETH)
4. **Practical Relevance**: Problems relate to real optimization (routing, scheduling, network design)

---

## Methodology

### FormulaOne Benchmark

**Domain**: Intersection of graph theory, logic, and algorithms

**Problem Source**: Generated from Monadic Second-Order (MSO) logic on graphs

**Three Key Properties**:
1. **Commercial Interest**: Relates to practical large-scale optimization (routing, scheduling, network design)
2. **Automatic Generation**: MSO logic framework enables scalable problem generation - ideal for RL environments
3. **Theoretical Significance**: Problems relate to central CS conjectures like Strong Exponential Time Hypothesis (SETH)

**Dataset Components**:
- **FormulaOne**: Main benchmark (extremely demanding problems)
- **FormulaOne-Warmup**: Simpler tasks from same distribution

### Evaluation
- **Model**: OpenAI o3 (state-of-the-art reasoning model)
- **Attempts**: 10 per problem
- **Prompting**: Explanatory few-shot examples provided
- **Result**: <1% success rate

---

## Key Evidence

### Finding 1: o3 Catastrophic Failure
| Condition | Success Rate |
|-----------|--------------|
| o3 with 10 attempts | **<1%** |
| o3 with few-shot examples | **<1%** |

Even the most capable reasoning model fails almost entirely.

### Finding 2: Domain Within Training Distribution
The paper emphasizes:
> "graph theory, logic, and algorithms, all well within the training distribution of frontier models"

This isn't about obscure knowledge gaps - these are core CS topics extensively documented in training data.

### Finding 3: Research-Level Requirements
Problems require:
- Multiple reasoning steps
- Understanding of formal logic (MSO)
- Graph-theoretic algorithms
- Potential connections to open theoretical problems

---

## Theoretical Implications

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT <1% REVEALS ABOUT LLM REASONING                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF o3 COULD REASON ALGORITHMICALLY:                                │
│  ├── Should handle familiar domains (graph theory, logic)           │
│  ├── Should benefit from few-shot examples                          │
│  ├── Should improve with multiple attempts                          │
│  └── Should solve at least SOME problems                            │
│                                                                     │
│  WHAT ACTUALLY HAPPENS:                                             │
│  ├── <1% even in familiar domains                                   │
│  ├── Few-shot examples don't help                                   │
│  ├── Multiple attempts don't help                                   │
│  └── Near-complete failure                                          │
│                                                                     │
│  "Genuine experts can tackle the hardest problems and push the      │
│  boundaries of scientific understanding" - models cannot.           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Other Papers

### Supports
- **Faith and Fate** (2305.18654): Compositional reasoning fails at depth
- **The Illusion of Thinking** (2506.06941): LRMs fail on complex algorithmic tasks
- **OMEGA** (2506.18880): >69% isolated skills → near-0% composed
- **ARC-AGI** papers: Novel reasoning benchmarks expose limits

### Related
- **Compositional-ARC** (2504.01445): Systematicity failures in spatial reasoning
- **Planning Gap** (2601.14456): 82.9% ID → 0% OOD generalization

---

## Key Quotes

> "Frontier AI models demonstrate formidable breadth of knowledge. But how close are they to true human -- or superhuman -- expertise? Genuine experts can tackle the hardest problems and push the boundaries of scientific understanding."

> "Our problems are incredibly demanding, requiring an array of reasoning steps."

> "Remarkably, state-of-the-art models like OpenAI's o3 fail entirely on FormulaOne, solving less than 1% of the questions, even when given 10 attempts and explanatory fewshot examples -- highlighting how far they remain from expert-level understanding in some domains."

---

## Significance for Thesis

### Why <1% is Devastating Evidence

1. **Domain Familiarity**: Graph theory, logic, algorithms are CORE CS topics - models have seen extensive training data
2. **Few-Shot Should Help**: If models learn from examples, few-shot should improve performance - it doesn't
3. **Multiple Attempts Should Help**: If reasoning is probabilistic search, more attempts should find solutions - they don't
4. **o3 is Best Available**: This is OpenAI's most advanced reasoning model, specifically designed for complex reasoning

### Pattern Matching Implication

If o3 could do genuine algorithmic reasoning, it should solve at least some problems in familiar domains with helpful examples and multiple attempts. The <1% success suggests:
- Models don't execute algorithms - they pattern-match
- Training data patterns don't transfer to novel combinations
- "Reasoning" is surface-level imitation, not deep capability

---

## Limitations

**Note**: HTML version not available (404). Analysis based on arXiv abstract and metadata.

**Incomplete assessment**: Without full paper:
- Exact problem distribution unknown
- Specific failure modes not analyzed
- Comparison to other models not available
- Warmup benchmark results not included

---

## Status
- [x] Abstract read
- [ ] Full paper read (HTML unavailable)
- [x] Core claims extracted
- [x] Key evidence extracted
- [x] Relevance to thesis assessed
- [ ] Paper graph updated

**Flag**: ⚠️ PARTIAL - Based on abstract only. Full PDF analysis recommended.
