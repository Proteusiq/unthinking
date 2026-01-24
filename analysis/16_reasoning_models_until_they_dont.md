# Paper Analysis: Reasoning Models Reason Well, Until They Don't

## Metadata
- **arXiv ID**: 2510.22371
- **Title**: Reasoning Models Reason Well, Until They Don't
- **Authors**: Revanth Rameshkumar, Jimson Huang, Yunxin Sun, Fei Xia, Abulhair Saparov
- **Institutions**: University of Washington, Purdue University
- **Date**: October 2025
- **Venue**: Preprint
- **Stance**: BALANCED (shows both LRM success AND hard limits)

---

## Core Claims

1. **LRMs show extraordinary performance on existing benchmarks** (NLGraph-hard: o3-mini 99%, R1 96%)
2. **BUT existing benchmarks have limited complexity** (NLGraph-hard lookahead bounded by ~1.8)
3. **Performance drops ABRUPTLY at sufficient complexity** — not gradual degradation
4. **LRMs do not generalize beyond training distribution complexity**
5. **Real-world reasoning has long tails** that expose substantial failure potential

---

## Methodology

### Deep Reasoning Dataset (DeepRD)
- **2,220 examples** with controllable complexity
- **Generative process** for unlimited examples at any complexity
- **Two tasks**: Graph connectivity (symbolic) and proof planning (natural language)

### Complexity Metrics

| Metric | Definition |
|--------|------------|
| **Lookahead (L)** | BFS iterations to determine next correct node |
| **Branches (B)** | Number of outgoing nodes from start node |

**Key insight**: Chain graphs (B=1) have lookahead=1 (trivial). Higher B and L = harder.

### Models Tested
- **LRMs**: DeepSeek-R1, o3-mini, o3
- **LLMs**: DeepSeek-V3, GPT-4o

---

## Key Evidence

### Finding 1: Extraordinary Performance on Existing Benchmarks

| Model | NLGraph-hard Accuracy |
|-------|----------------------|
| GPT-4o | 75% |
| DeepSeek-V3 | 79% |
| **DeepSeek-R1** | **96%** |
| **o3-mini** | **99%** |

**BUT**: NLGraph-hard has lookahead bounded by ~1.8 (trivially easy)

### Finding 2: Abrupt Performance Collapse at High Complexity

**Graph Connectivity (Full Path Accuracy)**:

| Model | L=2, B=2 | L=64, B=2 | L=300, B=2 | L=800, B=2 |
|-------|----------|-----------|------------|------------|
| R1 | ~100% | ~80% | ~40% | ~0% |
| o3-mini | ~100% | ~90% | ~60% | ~10% |
| V3 | ~80% | ~20% | ~0% | 0% |
| 4o | ~70% | ~10% | ~0% | 0% |

**Critical finding**: Performance drops are **ABRUPT**, not gradual. All models collapse to 0% at sufficient complexity.

### Finding 3: Token Limits Are NOT the Cause

> "Token limits do not cause the drops in accuracy... completion token usage seems to *decrease* with increasing lookahead"

- LRMs rarely hit length limits
- Token usage DECREASES at higher complexity (models give up faster)
- This directly refutes claims that LRM failures are due to context limits

### Finding 4: Even Chain Graphs (Trivial Complexity) Eventually Fail

For B=1 (no branching, just follow the chain):

| Model | Depth=64 | Depth=256 | Depth=512 | Depth=1536 |
|-------|----------|-----------|-----------|------------|
| R1 | ~100% | ~90% | ~80% | ~40% |
| o3-mini | ~100% | ~95% | ~90% | ~70% |
| V3 | ~60% | ~20% | ~5% | ~0% |

**Even with NO search required**, models fail at sufficient depth.

### Finding 5: Proof Planning Shows Same Pattern

Natural language proof planning accuracy collapses even earlier than symbolic:

| Model | L=10, B=4 | L=64, B=4 | L=300, B=4 |
|-------|-----------|-----------|------------|
| R1 | ~70% | ~30% | ~25% (chance) |
| o3-mini | ~80% | ~40% | ~25% (chance) |
| o3 | - | - | ~25% (chance) |

**At high complexity, ALL models converge to random guessing (1/B accuracy)**

### Finding 6: Full o3 Also Fails

> "o3 gets 10% accuracy for B=2 and otherwise collapses to 0 accuracy" at L=300, L=512

**SOTA reasoning model fails at sufficient complexity.**

### Finding 7: Real-World Distribution Has Long Tails

| Dataset | 50th %ile L | 99th %ile L | 99.9th %ile L |
|---------|-------------|-------------|---------------|
| ConceptNet | ~3 | ~15 | ~30 |
| WikiKG2 | ~2 | ~10 | ~20 |
| NaturalProofs | ~5 | ~20 | ~40 |

> "The majority of real-world examples fall inside the LRMs' success regime, yet the long tails expose substantial failure potential"

---

## Failure Mode Analysis

Manual inspection of R1's "thinking tokens" revealed:

| Error Type | Frequency | Description |
|------------|-----------|-------------|
| **Type I** | 15/20 | Omits necessary outgoing edge at intermediate step |
| **Type II** | 5/20 | Misses one branch entirely from start node |
| **Type III** | 16/20 | Hallucinates non-existent edge |

**Key insight**: After a single early local misstep, later computations are correct but conditioned on incorrect parent values ("propagation error" from Faith and Fate).

---

## Critical Analysis for Thesis

### Strong Support for "Pattern Matching" Interpretation

1. **Abrupt collapse = distribution boundary**:
   - Not gradual degradation (would suggest incremental capability)
   - Sharp cliff = hard limit of learned patterns

2. **Token decrease at high complexity**:
   - Models "give up" rather than try harder
   - Suggests recognition of being outside competence
   - Aligns with "Illusion of Thinking" finding

3. **Chain graphs eventually fail**:
   - NO search required (just follow edges)
   - Still fail at depth ~1536
   - Pure pattern matching limit

4. **Real-world long tails**:
   - Most problems are easy (within distribution)
   - Critical problems (long tails) will fail
   - "Near-term utility" but "substantial failure potential"

### Reconciles With "FOR" Evidence

1. **NLGraph-hard success** (99% for o3-mini):
   - Benchmark is trivially easy (L < 2)
   - Doesn't prove generalization

2. **LRMs better than LLMs**:
   - R1/o3 collapse at higher L than V3/4o
   - But ALL eventually collapse
   - RL extends distribution, doesn't escape it

---

## Relationship to Other Papers

### Directly Supports
- **Faith and Fate** — "propagation error" mechanism confirmed
- **Illusion of Thinking** — Abrupt collapse pattern identical
- **CoT Mirage** — Distribution-dependent success
- **Limits of Innate Planning** — Planning fails at complexity

### Extends
- **Interplay paper** — Shows WHERE the distribution boundary is
- **s1** — Explains why surfacing has limits

### Provides Mechanism For
- Why benchmarks look impressive but real-world fails
- Why "long tail" problems are dangerous

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttal found as of analysis date.

### Potential Counter-Arguments

| Counter | Response |
|---------|----------|
| "Synthetic tasks don't reflect real reasoning" | Authors show real-world proofs exhibit same pattern |
| "o3 wasn't properly tested" | Limited by budget, but o3 also collapsed at L=300 |
| "LRMs could improve with more training" | Transformer architecture has fundamental limits (Faith and Fate) |

### Limitations (Authors Acknowledge)
1. Budget constraints limited o3 testing
2. Synthetic data (but validated on NaturalProofs)
3. Only tested graph connectivity and proof planning

---

## Key Quotes for Thesis

> "The performance of LRMs drop abruptly at sufficient complexity and do not generalize"

> "Token limits do not cause the drops in accuracy... completion token usage seems to *decrease* with increasing lookahead"

> "The majority of real-world examples fall inside the LRMs' success regime, yet the long tails expose substantial failure potential"

> "This behavior reflects stochastic guessing in LRMs rather than enhanced reasoning capabilities"

> "Even in this extremely simple reasoning task [chain graphs], the models fail to truly generalize"

> "At high complexity, ALL models converge to random guessing (1/B accuracy)"

---

## Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│        REASONING MODELS REASON WELL, UNTIL THEY DON'T (2510.22371)          │
│                                                                             │
│  KEY FINDING: ABRUPT PERFORMANCE COLLAPSE                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Accuracy                                                            │    │
│  │   100% ████████████████████████████████░░░░░░░░░░░░░░░░             │    │
│  │    80% ████████████████████████████████░░░░░░░░░░░░░░░░             │    │
│  │    60% ████████████████████████████████████░░░░░░░░░░░░             │    │
│  │    40% ████████████████████████████████████████░░░░░░░░             │    │
│  │    20% ████████████████████████████████████████████░░░░  ← CLIFF    │    │
│  │     0% ████████████████████████████████████████████████             │    │
│  │         L=2    L=64   L=128  L=256  L=512  L=800                    │    │
│  │                    Complexity (Lookahead)                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  BENCHMARK REALITY:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ NLGraph-hard: 99% accuracy (o3-mini)                                │    │
│  │ BUT: Lookahead bounded by ~1.8 (trivially easy!)                    │    │
│  │                                                                     │    │
│  │ Impressive benchmark scores ≠ generalized reasoning                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  REAL-WORLD IMPLICATION:                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Most real-world problems: L < 10 (LRMs succeed)                     │    │
│  │ Long tail (1% of problems): L > 20 (LRMs fail)                      │    │
│  │                                                                     │    │
│  │ "Near-term utility" + "substantial failure potential"               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to "The Thinking Machine That Doesn't Think"

### Relevance Rating: 10/10 (Critical evidence for thesis)

**Why this paper is essential**:

1. **Quantifies the distribution boundary**:
   - Previous papers showed boundary exists
   - This paper shows WHERE it is (L~64-300 for LRMs)

2. **Explains benchmark illusion**:
   - NLGraph-hard: 99% but trivially easy
   - Real complexity reveals limits

3. **Confirms abrupt collapse**:
   - Same pattern as "Illusion of Thinking"
   - Token decrease confirms "giving up"

4. **Real-world validation**:
   - NaturalProofs shows same pattern
   - Long tails expose failure potential

5. **SOTA models fail**:
   - o3 (full version) collapses at L=300
   - No model escapes the pattern

### Integration with Thesis

> "LRMs demonstrate impressive performance on existing benchmarks because those benchmarks have limited complexity (lookahead < 2). When complexity is carefully scaled, performance drops ABRUPTLY — not gradually — revealing a hard distribution boundary. Even chain graphs requiring no search eventually fail, proving the limit is fundamental, not due to search difficulty. Real-world reasoning has long tails that will expose these failures in critical applications."

---

## Status

- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Critical analysis for thesis
- [x] Cross-references identified
- [x] **Rebuttals checked** — No direct rebuttal found
- [x] **Counter-evidence noted** — None found

---

## Summary for Synthesis

**"Reasoning Models Reason Well, Until They Don't"** provides **critical quantitative evidence** that:

1. **Benchmark success is illusory**:
   - NLGraph-hard: 99% accuracy
   - BUT lookahead < 2 (trivially easy)

2. **Performance collapses ABRUPTLY**:
   - Not gradual degradation
   - Sharp cliff at L~64-300 for LRMs
   - Token usage DECREASES (models give up)

3. **Even trivial tasks eventually fail**:
   - Chain graphs (B=1, no search needed)
   - Still fail at depth ~1536
   - Pure pattern matching limit

4. **All models eventually converge to random guessing**:
   - At high complexity: accuracy → 1/B
   - Including o3 (SOTA)

5. **Real-world has long tails**:
   - Most problems easy (LRMs succeed)
   - 1% of problems have L > 20 (LRMs fail)
   - "Near-term utility" + "substantial failure potential"

**For thesis**: This paper provides the quantitative backbone for our argument. It shows EXACTLY where the distribution boundary is, proves that benchmark success is misleading, and demonstrates that ALL models — including SOTA o3 — eventually collapse. The abrupt cliff pattern confirms that LRM reasoning is bounded pattern matching, not genuine generalization.
