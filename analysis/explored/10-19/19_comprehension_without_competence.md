# Paper Analysis: Comprehension Without Competence

## Metadata
- **arXiv ID**: 2507.10624
- **Title**: Comprehension Without Competence: Architectural Limits of LLMs in Symbolic Computation and Reasoning
- **Authors**: Zheng Zhang
- **Date**: July 2025 (v3: November 2025)
- **Venue**: Under review at TMLR
- **Stance**: AGAINST (architectural limits, pattern matching)

---

## Core Claims

1. **"Split-Brain Syndrome"**: LLMs can perfectly EXPLAIN principles they cannot reliably EXECUTE
2. **Comprehension ≠ Competence**: Models articulate correct algorithms while failing to apply them
3. **Architectural impossibility**: FFNs cannot implement exact symbolic operations, resort to pattern fitting
4. **Scale won't help**: Limitations are architectural, not scale-dependent

---

## The "Split-Brain Syndrome" Concept

> "We term this phenomenon *computational split-brain syndrome*, drawing analogy to neurological conditions where different brain systems cannot coordinate effectively. Like patients who can verbally describe actions they cannot perform, LLMs develop geometrically separated pathways for 'knowing about' procedures versus 'executing' them."

**Key insight**: Instruction and execution pathways are **geometrically and functionally dissociated**.

---

## Methodology

### Models Tested
- LLaMA2-7B-chat (embedding geometry)
- Claude Sonnet 4 (arithmetic)
- GPT-4o (arithmetic)
- Gemini 2.5 Flash (arithmetic)
- Also references: GPT-4, DeepSeek-R1, o3-mini

### Experiments
1. **Embedding geometry analysis**: t-SNE projections, cosine distances
2. **Multiplication decomposition**: 5-digit and 10-digit, three conditions
3. **Relational reasoning**: Reversal Curse, Alice Problem, family trees

---

## Key Evidence

### Finding 1: 10-Digit Multiplication = 0% for ALL Models

| Complexity | Metric | GPT-4o | Gemini 2.5 | Claude Sonnet 4 |
|------------|--------|--------|------------|-----------------|
| **5-digit** | Overall Accuracy | 5% | 95% | 100% |
| **5-digit** | Step-wise Accuracy | 95-100% | 95-100% | 100% |
| **10-digit** | Overall Accuracy | **0%** | **0%** | **0%** |
| **10-digit** | Step-wise Accuracy | 76-100% | 95-100% | 95-100% |

**Critical finding**: Models get 95-100% of individual steps correct but **0% final accuracy** at 10-digit.

> "All models achieved 0% accuracy on 10-digit problems, demonstrating universal computational split-brain syndrome when constrained to pure transformer computation."

### Finding 2: Reversal Curse = 7% Reverse Accuracy

| Direction | Accuracy |
|-----------|----------|
| Forward ("Who is Tom Cruise's mother?") | **79%** |
| Reverse ("Who is Mary Lee Pfeiffer's son?") | **7%** |

> "Models fine-tuned on 1,000 fictional 'A is B' statements achieved near-perfect accuracy on forward retrieval but only **7% accuracy** on reverse queries."

### Finding 3: LLMs 100,000x Larger, Dramatically Worse

| Task | LLM Performance | DLM Performance |
|------|-----------------|-----------------|
| Simple relations (HasFather) | 47-100% | **100%** |
| Complex relations (IsUncle) | **0-49%** | **85%** |
| Hierarchical (IsMGUncle) | **0-48%** | **55%** |

> "Despite being **100,000 times larger** than DLM models, LLMs performed dramatically worse across all logical reasoning tasks."

### Finding 4: ARC-AGI Collapse

| Benchmark | o3 Performance |
|-----------|----------------|
| ARC-AGI-1 | **87.5%** |
| ARC-AGI-2 | **<3%** |

> "Performance plummets once pattern completion loses its near-neighbor anchors from training, despite identical instruction formats."

### Finding 5: GSM-Symbolic Degradation

> "LLMs exhibit noticeable variance when only numerical values change, with performance drops **up to 65%** when irrelevant clauses are added."

---

## The Comprehension vs Competence Gap

### The 9.11 vs 9.9 Example

**What models SAY** (comprehension):
> "Write the numbers one above the other, aligning the decimal points… Compare digit by digit from left to right."

**What models DO** (competence):
- Claude Sonnet 4: Claims 9.11 > 9.9
- Explains: "since 90 is greater than 11 in the hundredths place"
- Calculates: 9.11 - 9.9 = 0.21 (incorrect)

**The paradox**: Same model provides flawless algorithm description, then fails to apply it.

### Multiplication Self-Scaffolding

Models generate correct decomposition:
> "To multiply 742×89: First, multiply 742×9=6678. Then multiply 742×80=59360. Finally, add 6678+59360=66038."

But execution fails at scale (0% at 10-digit despite 95-100% step accuracy).

---

## Architectural Analysis

### Why FFNs Resort to Pattern Storage

> "Feed-forward networks possess, through the Universal Approximation Theorem, the capacity to approximate any continuous function. Yet in practice, they systematically fail at symbolic computation, resorting instead to pattern storage."

### The Division of Labor Problem

- **Attention layers**: Identify operations and operands but cannot generate new values
- **FFNs**: Must produce results but cannot implement exact operations

### Geometric Separation

t-SNE analysis shows:
> "Instructional forms form one cluster with tight internal cohesion but are distant from both executional forms."

**Interpretation**: "Knowing about" and "executing" are geometrically separated pathways.

---

## Theoretical Framework

### Dennett Inversion

> "This pattern inverts what philosopher Daniel Dennett observed in natural systems, where competence typically precedes comprehension. Simple organisms demonstrate complex behaviors before developing explicit understanding. LLMs exhibit the reverse: sophisticated explanatory capabilities coupled with unreliable execution—**comprehension without competence**."

### General vs. Generalizable Intelligence

> "**General intelligence** = sophisticated pattern completion across diverse domains"
> "**Generalizable intelligence** = systematic rule discovery and principled reasoning"

LLMs have the former, not the latter.

### Why Scale Won't Help

> "By demonstrating that LLM limitations are architectural rather than scale-dependent, we provide technical evidence that more data or parameters cannot resolve bottlenecks rooted in architectural design."

---

## Key Quotes for Thesis

> "LLMs function as powerful pattern completion engines, but lack the architectural scaffolding for principled, compositional reasoning."

> "The model compares 9.11 with 9.9 not through arithmetic but by pattern-matching what such calculations typically look like."

> "Transformers solve compositional tasks through 'linearized subgraph matching'—memorizing computation patterns rather than learning systematic algorithms."

> "Arithmetic behaviour emerges from a 'bag of heuristics' spread across layers instead of dedicated algorithmic modules."

> "When models must execute multi-step algorithms they cannot actually perform, they generate plausible-sounding answers through pattern completion rather than computation."

> "If we seek genuinely general and generalizable intelligence, we must look beyond pattern completion engines."

---

## Relationship to Other Papers

### Directly Supports
- **Faith and Fate (2305.18654)** — "linearized subgraph matching" cited
- **GSM-Symbolic (2410.05229)** — 65% degradation cited
- **Illusion of Thinking (2506.06941)** — Same complexity collapse pattern
- **OMEGA (2506.18880)** — 0% transformative generalization confirms compositional reasoning failure
- **Planning Gap (2601.14456)** — 82.9% ID → 0% OOD exemplifies comprehension/competence dissociation

### Provides Mechanism For
- Why CoT can be unfaithful (comprehension ≠ execution)
- Why benchmarks fail at complexity (pattern storage limits)
- Why scale doesn't help (architectural constraint)

### Novel Contribution
- **"Split-brain syndrome"** terminology
- **Geometric separation** evidence (t-SNE)
- **Dennett inversion** framing

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttal found.

### Potential Counter-Arguments

| Counter | Response |
|---------|----------|
| "Only tested specific models" | Authors acknowledge; framework is architectural |
| "Tool use could help" | Authors acknowledge; but that's external scaffolding |
| "Newer architectures might differ" | Authors argue same fundamental constraints |

### Limitations (Authors Acknowledge)
1. Focus on pretrained transformers without tools
2. Specific model families (LLaMA2, Claude, GPT-4)
3. t-SNE may not capture all representational structure
4. ReLU-focused analysis
5. MoE/reasoning-augmented models not fully tested

---

## Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│        COMPREHENSION WITHOUT COMPETENCE (2507.10624)                        │
│                                                                             │
│  SPLIT-BRAIN SYNDROME:                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ COMPREHENSION                    COMPETENCE                         │    │
│  │ ───────────────                  ──────────                         │    │
│  │ "Compare digit by digit          9.11 > 9.9 (WRONG)                 │    │
│  │  from left to right"             9.11 - 9.9 = 0.21 (WRONG)          │    │
│  │                                                                     │    │
│  │ Knows the algorithm              Cannot execute the algorithm       │    │
│  │ Geometrically SEPARATED pathways                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  KEY EVIDENCE:                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 10-digit multiplication: 0% accuracy (ALL models)                   │    │
│  │ Step-wise accuracy: 95-100% (but 0% final!)                         │    │
│  │ Reversal curse: 79% forward, 7% reverse                             │    │
│  │ LLMs 100,000x larger, worse than DLM on reasoning                   │    │
│  │ ARC-AGI-2: <3% (vs 87.5% on v1)                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  CONCLUSION:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ "LLMs function as powerful pattern completion engines, but lack     │    │
│  │  the architectural scaffolding for principled, compositional        │    │
│  │  reasoning."                                                        │    │
│  │                                                                     │    │
│  │ Scale won't help — limitations are ARCHITECTURAL                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to Thesis

### Relevance Rating: 10/10 (Critical theoretical foundation)

**Why this paper is essential**:

1. **"Split-brain syndrome"** provides the mechanism:
   - Explains WHY CoT is unfaithful
   - Comprehension and execution are geometrically separated

2. **Step accuracy vs final accuracy**:
   - 95-100% steps, 0% final at 10-digit
   - Perfect illustration of pattern matching limits

3. **Scale won't help**:
   - Architectural argument, not just empirical
   - Strengthens thesis against "scaling will fix it"

4. **Dennett inversion**:
   - Powerful framing: "comprehension without competence"
   - Inverts natural intelligence (competence → comprehension)

5. **100,000x larger, worse**:
   - LLMs vs DLM comparison is devastating
   - Size doesn't compensate for architecture

---

## Status

- [x] Read complete (full paper via Task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Critical analysis
- [x] Cross-references identified
- [x] **Rebuttals checked** — None found
- [x] Paper graph updated

---

## Summary for Synthesis

**"Comprehension Without Competence"** provides:

1. **"Split-brain syndrome"**:
   - LLMs EXPLAIN principles they cannot EXECUTE
   - Geometrically separated pathways
   - Architectural, not scale-dependent

2. **Devastating quantitative evidence**:
   - 10-digit multiplication: 0% (ALL models)
   - 95-100% step accuracy, 0% final
   - Reversal curse: 79% → 7%
   - 100,000x larger, worse than DLM

3. **Theoretical framework**:
   - Dennett inversion: comprehension without competence
   - Pattern completion ≠ reasoning
   - Scale cannot fix architectural limits

4. **Key quote**:
   > "LLMs function as powerful pattern completion engines, but lack the architectural scaffolding for principled, compositional reasoning."

**For thesis**: This paper provides the theoretical backbone. The "split-brain syndrome" explains WHY LLMs can describe reasoning but not perform it. The 95-100% step accuracy with 0% final accuracy is the perfect empirical illustration of pattern matching vs. genuine reasoning. Scale won't help because the limits are architectural.
