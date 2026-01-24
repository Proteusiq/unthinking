# Paper Analysis: Thinking Isn't an Illusion

## Metadata
- **arXiv ID**: 2507.17699
- **Title**: Thinking Isn't an Illusion: Overcoming the Limitations of Reasoning Models via Tool Augmentations
- **Authors**: Song, Yue, Zhang (UC Berkeley, Northeastern)
- **Date**: July 2025
- **Stance**: FOR genuine reasoning (with tools)
- **Role**: Direct rebuttal to Apple's "Illusion of Thinking"

---

## Why This Paper Matters

This is the **primary rebuttal** to "The Illusion of Thinking." It argues that:
1. The failures Apple observed are **execution limits, not reasoning limits**
2. With proper tool augmentation, LRMs **consistently outperform** LLMs at all complexity levels
3. The "illusion" narrative is premature and misleading

---

## Core Claims

1. **Tool augmentation reverses the collapse** observed in Apple's benchmarks
2. **LRMs consistently outperform LLMs** when both have tool access
3. **Output length limitations** unfairly disadvantaged LRMs in original evaluation
4. **PoT (Program of Thought) is most effective** tool augmentation
5. **Some hard problems remain unsolved** even with tools (Checker Jumping)

---

## Methodology

### Same Benchmarks, Different Setup
Used Apple's exact puzzles but added tool augmentation:
- Tower of Hanoi
- Checker Jumping
- River Crossing
- Blocks World

### Tool Augmentations Tested
| Tool | Description |
|------|-------------|
| **Program of Thought (PoT)** | Generate Python code, execute externally |
| **Think-and-Execute** | LLM interprets its own pseudo-code |
| **Scratchpad** | External memory for intermediate states |

### Models Tested
| Model | Type | Output Limit |
|-------|------|--------------|
| DeepSeek-V3 | LLM | 8K |
| DeepSeek-R1 | LRM | 64K |
| Qwen 3 | LLM | 32K |
| Qwen 3 Thinking | LRM | 32K |

---

## Key Evidence

### Finding 1: PoT Reverses Collapse
| Task | Without Tools | With PoT (DeepSeek-R1) |
|------|---------------|------------------------|
| Hanoi N=13 | 0% | **100%** |
| River Crossing | ~0% | **80%** |
| Blocks World | ~20% | **100%** |

### Finding 2: LRMs Outperform LLMs with Tools
**River Crossing with PoT:**
| Model | N=3 | N=5 | N=7 | N=9 | N=11 | N=13 |
|-------|-----|-----|-----|-----|------|------|
| DeepSeek-V3 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| DeepSeek-R1 | **4/5** | **4/5** | **4/5** | **4/5** | **4/5** | **4/5** |

**Blocks World with PoT:**
| Model | N=3 | N=13 |
|-------|-----|------|
| DeepSeek-V3 | 1/5 | 1/5 |
| DeepSeek-R1 | **5/5** | **5/5** |

### Finding 3: Some Problems Remain Hard
Checker Jumping: **All models fail for N≥3** even with tools
- Suggests some genuinely hard reasoning problems exist
- Tool use helps execution, not all reasoning

### Finding 4: Tool Use Doesn't Increase Tokens
Counter to intuition, PoT often uses **fewer tokens** than direct prompting:
- More efficient problem representation
- Less "overthinking" behavior

---

## The Core Argument

### Apple's Implicit Assumption (They Challenge)
> "The benchmark evaluates reasoning on tasks such as Tower of Hanoi with up to 20 plates, which may require more than 10^6 reasoning steps, far exceeding the output token limits of most LLMs"

### Their Reframe
The "collapse" isn't a reasoning failure — it's an **output length artifact**.

**Analogy**: Asking a human to solve 20-disk Hanoi "in their head" without paper would also fail. That doesn't prove humans can't reason.

### What Tool Success Proves
If LRMs succeed with tools but fail without:
1. The reasoning capability exists
2. The bottleneck is execution/memory, not cognition
3. "Illusion" is wrong framing

---

## Limitations & Issues

### Methodological Concerns

1. **Different Comparison**
   - Apple tested reasoning directly
   - This tests reasoning + tool use
   - These are different capabilities

2. **Tool Quality Matters**
   - PoT success depends on code generation ability
   - Is code generation "reasoning"?

3. **Checker Jumping Still Fails**
   - Even with tools, some tasks remain unsolved
   - Supports Apple's claim for some domains

4. **Model Selection**
   - Only DeepSeek and Qwen tested
   - Missing o3-mini, Claude comparisons

### Interpretive Concerns

1. **What Is Being Measured?**
   - With PoT: Testing code generation + execution
   - Without tools: Testing raw reasoning
   - These probe different things

2. **Doesn't Refute Pattern Matching**
   - LRMs could still be pattern matching
   - Just better patterns for code generation
   - Execution offloaded to Python

3. **Real-World Relevance**
   - Tool-augmented LRMs are practical
   - But the theoretical question remains open

4. **Cherry-Picking Tasks?**
   - Hanoi is perfect for recursive code
   - Some tasks inherently tool-friendly

---

## The Deeper Philosophical Question

### What Counts as "Reasoning"?
| View | Implication |
|------|-------------|
| Pure mental computation | Apple's benchmark is fair; LRMs fail |
| Reasoning with tools | This paper is fair; LRMs succeed |
| Neither is "true" reasoning | Both papers miss the point |

### The Authors' Position
> "These findings challenge the recent narrative that reasoning is an illusion"

But do they? Or do they show LRMs are good at **generating correct programs** for well-defined puzzles?

---

## Graph Links to Other Papers

### Papers This CHALLENGES
| Paper | Challenge |
|-------|-----------|
| **Illusion of Thinking** (Apple) | Direct rebuttal — tool use reverses collapse |
| **Faith and Fate** | Execution limits, not reasoning limits |
| **GSM-Symbolic** | Tool augmentation would likely help |

### Papers This ALIGNS WITH
| Paper | Alignment |
|-------|-----------|
| **Comment: Agentic Gap** (2506.18957) | Same argument — execution bottleneck |
| **CoT Without Prompting** | Reasoning exists, needs surfacing |
| **DeepSeek-R1** | LRMs have genuine capabilities |

### Papers That COMPLICATE This
| Paper | Complication |
|-------|--------------|
| **Faithfulness papers** | Even with tools, reasoning may be unfaithful |
| **Semantic Deception** | Surface patterns still mislead |
| **Limits of Agentic Frameworks** | Even with environment access, some tasks fail |

---

## Key Quotes

> "With proper tool use, LRMs consistently outperform their non-reasoning counterparts across all levels of task complexity."

> "The underperformance of LRMs on hard tasks may not reflect a fundamental reasoning deficiency, but rather an artifact of the limited output window."

> "Some hard problems remain unsolved even with tool use."

---

## Interaction Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                 THE ILLUSION OF THINKING (Apple)                         │
│                                                                          │
│  Claims: LRMs collapse at high complexity, pattern matching not reasoning│
└──────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ directly
                                   │ rebuts
                                   ▼
┌──────────────────────────────────────────────────────────────────────────┐
│              THINKING ISN'T AN ILLUSION (July 2025)                      │
│                    Song et al. · UC Berkeley                             │
│                                                                          │
│  Counter-claims:                                                         │
│  • Tool augmentation reverses collapse                                   │
│  • LRMs outperform LLMs with tool access                                 │
│  • Failure was execution limit, not reasoning limit                      │
│                                                                          │
│  Evidence:                                                               │
│  • Hanoi N=13: 0% → 100% with PoT                                        │
│  • River Crossing: DeepSeek-R1 80% with tools                            │
│  • Blocks World: 100% accuracy with PoT                                  │
│                                                                          │
│  Concession:                                                             │
│  • Checker Jumping still fails (genuinely hard)                          │
└──────────────────────────────────────────────────────────────────────────┘
                   │                        │
                   │ supports               │ raises question
                   ▼                        ▼
    ┌──────────────────────────┐  ┌─────────────────────────────┐
    │ • Comment: Agentic Gap   │  │ What is being measured?     │
    │ • CoT Without Prompting  │  │                             │
    │                          │  │ With tools: code generation │
    │ Same core argument:      │  │ Without: raw reasoning      │
    │ execution ≠ reasoning    │  │                             │
    └──────────────────────────┘  │ Different capabilities?     │
                                  └─────────────────────────────┘
```

---

## Relevance to "Thinking Machine That Doesn't Think"

### The Key Tension for Your Paper
| Apple Says | This Paper Says |
|------------|-----------------|
| LRMs don't reason | LRMs reason but need tools to execute |
| Collapse proves pattern matching | Collapse proves execution limits |
| "Illusion" | "Real capability" |

### For Your Thesis
This paper complicates the simple "illusion" narrative:
1. If tool use fixes the problem, what was the problem?
2. Is code generation a form of reasoning?
3. Does practical success matter more than theoretical purity?

### Your Position Could Be
> "LRMs can generate correct solutions (especially as code) but this is sophisticated pattern completion, not general reasoning. Tools offload execution, not cognition."

---

## Critical Assessment

### What This Paper Gets Right
1. Apple's evaluation had limitations (token budget)
2. Tool-augmented LRMs are practically useful
3. Some tasks (Hanoi) are perfectly suited for code

### What This Paper Doesn't Prove
1. That LRMs "reason" in a deep sense
2. That the pattern-matching hypothesis is wrong
3. That tool success = reasoning capability

### The Honest Conclusion
Both papers are partially right:
- **Apple**: Raw LRMs have fundamental limits
- **This paper**: Tool-augmented LRMs are powerful
- **Neither proves**: Whether genuine reasoning occurs

---

## Status
- [x] Read
- [x] Analyzed
- [x] Graph links identified
- [x] Interaction diagram created
- [x] Critical assessment complete
