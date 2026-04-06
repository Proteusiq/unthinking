## Summary

Tree of Thoughts (ToT) is a NeurIPS 2023 paper from Princeton/DeepMind showing dramatic improvements on certain tasks (Game of 24: 4% → 74%). However, the authors explicitly frame LLMs as "System 1" (associative pattern matching) and ToT as external "System 2" search scaffolding. The improvements come from BFS/DFS search over candidate generations, not from improved reasoning.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: ToT SUPPORTS the pattern-matching thesis             │
│                                                                     │
│  Authors explicitly call LLM "System 1" (associative)              │
│  ToT adds classical search (BFS/DFS) on top                        │
│  60% of CoT samples fail at FIRST STEP (first 3 words!)            │
│  The bottleneck is GENERATION quality, not evaluation              │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

Despite being framed as enhancing "deliberate problem solving," ToT provides strong evidence for pattern matching:

1. **Authors agree**: They explicitly call LM "System 1" (associative) and propose ToT as external System 2
2. **Search ≠ Reasoning**: ToT is classical BFS/DFS with LM heuristics—same architecture as Deep Blue
3. **60% first-step failure**: The LM doesn't understand problems; it commits based on surface patterns
4. **Generation bottleneck**: GPT-4 gen + GPT-3.5 eval = 64%; GPT-3.5 gen + GPT-4 eval = 31%
5. **Performance ceiling**: 74% not 100% on well-defined Game of 24

## Methodology

**Three tasks tested:**
- Game of 24: Combinatorial arithmetic (4% → 74%)
- Creative Writing: Subjective evaluation by GPT-4
- Mini Crosswords: Constraint satisfaction (60% word completion)

**ToT Framework:**
1. Generate candidate "thoughts" (intermediate steps)
2. Evaluate candidates (sure/maybe/impossible)
3. Search via BFS or DFS with backtracking
4. Prune unpromising branches

## Key Evidence

| Finding | Quantitative | Implication |
|---------|--------------|-------------|
| CoT failure rate | 60% fail at first 3 words | LM doesn't understand problem structure |
| Generation dominates | GPT-4 gen >> GPT-3.5 gen | Quality of patterns matters most |
| Performance ceiling | 74% on Game of 24 | Genuine reasoner would approach 100% |
| Compute cost | 5-100× more tokens | Buying performance through search coverage |
| Marginal gain when CoT works | GSM8K: 86%→90%, StrategyQA: 82%→83% | ToT adds little when patterns suffice |

## Key Quotes

> "The simple associative token-level choices of LMs are also reminiscent of 'System 1', and thus might benefit from augmentation by a more deliberate 'System 2' planning process."

> "Notably, around 60% of CoT samples already failed the task after generating the first step, or equivalently, the first three words."

> "The game's bottleneck is thought generation" — quality of candidates matters more than evaluation

## Connections to Other Papers

**Supports thesis alongside:**
- **#295 Test-Time Compute Overestimation** (2603.15377): Both show search has limits
- **#296 RLVR Structural Convergence** (2602.11792): Both show models surface cached patterns
- **#298 Self-MoA** (2502.00674): Both show quality > diversity in sampling

**Same scaffolding approach:**
- **#208 Graph of Thoughts** (2308.09687): GoT extends ToT with graph structure

## Limitations

- Only three "relatively simple" tasks
- Task-specific engineering required for each domain
- 5-100× compute cost
- Model capability dependent (GPT-3.5+ToT = 19% vs GPT-4+ToT = 74%)

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT ToT ACTUALLY DEMONSTRATES                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✓ Explicit search improves performance on verifiable tasks        │
│  ✓ LMs can generate reasonable candidates (pattern completion)     │
│  ✓ LMs can provide rough heuristics (pattern recognition)          │
│  ✓ Backtracking fixes commitment errors (search, not reasoning)    │
│  ✓ Left-to-right decoding is fundamentally limited                 │
│                                                                     │
│  ✗ LMs can "think" or "reason" in any meaningful sense             │
│  ✗ ToT creates new reasoning capabilities                          │
│                                                                     │
│  ToT is evidence FOR the pattern-matching thesis, not against it.  │
└─────────────────────────────────────────────────────────────────────┘
```
