## Summary

Graph of Thoughts (GoT) is an AAAI 2024 paper from ETH Zurich claiming to advance LLM reasoning beyond ToT. The headline claim—62% improvement over ToT in sorting—comes from applying **merge sort**, a classical algorithm, externally. The paper admits LLMs "are unable to sort a sequence of numbers correctly beyond a certain length." The improvements come from external algorithms and human-designed graph structures, not LLM reasoning.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: GoT's "reasoning" is in the FRAMEWORK, not the LLM   │
│                                                                     │
│  62% gain = merge sort algorithm, not LLM insight                  │
│  GoO (Graph of Operations) = PRE-CONSTRUCTED by humans             │
│  Authors admit: LLMs cannot sort beyond ~16-32 elements            │
│  ~75% accuracy ceiling on 128 numbers (should be 100%)             │
└─────────────────────────────────────────────────────────────────────┘
```

## Thesis Relevance: SUPPORTS

Despite framing as "advancing reasoning," GoT demonstrates LLM limitations:

1. **Authors admit LLMs can't sort**: "The considered LLMs are unable to sort a sequence of such numbers correctly beyond a certain length"
2. **Gains from merge sort**: The 62% improvement is from applying a classical algorithm externally
3. **GoO is pre-constructed**: The reasoning graph is designed by humans before execution
4. **Performance ceiling**: ~75% on 128 numbers—genuine reasoner would achieve 100%
5. **All tasks are algorithmic**: Sorting, set operations, keyword counting

## Methodology

**Tasks tested (all algorithmic):**
- Sorting 128 numbers: ~75% accuracy
- Set intersection: ~76% accuracy
- Set union: ~91% accuracy
- Keyword counting: ~95% accuracy

**GoT Framework:**
1. Human designs Graph of Operations (GoO) for task
2. Controller decomposes problem according to GoO
3. LLM processes sub-problems (small chunks)
4. External aggregation combines results

## Key Evidence

| Finding | Quantitative | Implication |
|---------|--------------|-------------|
| Sorting ceiling | ~75% on 128 numbers | Far below 100% expected from reasoner |
| Without scaffolding | ~15% (IO baseline) | LLMs fail without external structure |
| Cost reduction | >31% vs ToT | Efficiency from algorithm, not LLM |
| Max sortable length | ~16-32 by LLM alone | Fundamental capability limit |

## Key Quotes

> "The considered LLMs are unable to sort a sequence of such numbers correctly beyond a certain length."

> "GoO is a static structure that is constructed once, before the execution starts."

> "We select merge sort for its straightforward alignment with the graph structure of GoT."

## Connections to Other Papers

**Supports thesis alongside:**
- **#299 Tree of Thoughts** (2305.10601): ToT adds search; GoT adds aggregation
- **#1 Faith and Fate** (2305.18654): Both show decomposition helps but doesn't create reasoning
- **#2 Illusion of Thinking** (2506.06941): Both show complexity thresholds

## Limitations

- All tasks are well-defined algorithmic problems
- No tasks require discovering new patterns
- GoO must be human-designed per task
- Performance ceiling exists even with optimal scaffolding

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT GoT ACTUALLY DEMONSTRATES                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✓ External algorithms (merge sort) improve LLM outputs            │
│  ✓ Human-designed scaffolding helps on decomposable tasks          │
│  ✓ LLMs can process small chunks reliably                          │
│                                                                     │
│  ✗ LLMs can reason about complex problems                          │
│  ✗ LLMs can discover or construct reasoning graphs                 │
│  ✗ "Synergistic outcomes" emerge from LLM reasoning                │
│                                                                     │
│  The "reasoning" in Graph of Thoughts is in the FRAMEWORK,         │
│  not in the LLM.                                                   │
└─────────────────────────────────────────────────────────────────────┘
```
