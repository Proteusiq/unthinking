# Paper Analysis: The Illusion of Diminishing Returns

## Metadata
- **arXiv ID**: 2509.09677
- **Title**: The Illusion of Diminishing Returns: Measuring Long Horizon Execution in LLMs
- **Authors**: Akshit Sinha, Arvindh Arun, Shashwat Goel, Steffen Staab, Jonas Geiping
- **Affiliation**: Cambridge, Stuttgart, MPI, ELLIS Institute Tübingen
- **Date**: September 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **"Diminishing returns" on short benchmarks is an illusion** — small improvements compound exponentially for long tasks
2. **Execution alone is challenging** — even with plan and knowledge provided, LLMs fail on long horizons
3. **Self-conditioning effect**: Models become MORE likely to make mistakes when context contains prior errors
4. **Thinking models fix self-conditioning** — RL-trained thinking models don't degrade with prior errors
5. **GPT-5 executes 2176 steps** — massive gap to competitors (Claude-4: 432, Grok 4: 384)

---

## Methodology

### Key Distinction: Execution vs Planning vs Knowledge

- **Planning**: Deciding what steps to take
- **Knowledge**: Information about how to perform steps
- **Execution**: Actually carrying out the steps

**Critical design**: Authors ISOLATE execution by providing:
- Full knowledge (key-value dictionary in context)
- Full plan (keys provided each turn)
- Model only needs to EXECUTE (retrieve values, compute running sum)

### Task Design
- Dictionary of 5-letter words → integers [-99, 99]
- Initial state S₀ = 0
- Each turn: receive keys, look up values, add to running sum
- Vary: number of turns (1 to 100+) and turn complexity (keys per turn)

### Models Tested
- Qwen3: 4B, 8B, 14B, 32B
- Gemma3: 4B, 12B, 27B
- Frontier: GPT-5, Claude-4, Grok 4, Gemini 2.5 Pro, DeepSeek-R1, Kimi K2

---

## Key Evidence

### 1. Mathematical Analysis: Diminishing Returns Compound

**Proposition 1**: If step accuracy = p, task success at length H:
```
H_s(p) = ln(s) / ln(p)
```

| Step Accuracy | H₀.₅ (50% success) |
|--------------|-------------------|
| 90% | ~6 steps |
| 95% | ~13 steps |
| 99% | ~69 steps |
| **99.9%** | **~693 steps** |

**Key insight**: Horizon length grows HYPERBOLICALLY in high-accuracy regime

### 2. Execution Alone is Challenging

| Model | First-Step Accuracy | Steps to 50% Task Accuracy |
|-------|--------------------|-----------------------------|
| Qwen3-4B | ~85% | ~2 |
| Qwen3-8B | ~95% | ~5 |
| Qwen3-14B | ~98% | ~8 |
| Qwen3-32B | ~99% | ~15 |

**Critical finding**: Near-perfect first step, but rapid task accuracy decay!

### 3. The Self-Conditioning Effect

Experimental setup: Inject artificial error histories at different rates

| Induced Error Rate | Turn 100 Accuracy (Qwen3-32B) |
|--------------------|-------------------------------|
| 0% (healed) | ~90% |
| 25% | ~75% |
| 50% | ~60% |
| 100% | ~40% |

**Critical finding**: Errors beget errors! Models condition on their mistakes.

**Statistical significance**: p < 0.001 for error rate effect

### 4. Scaling Model Size Does NOT Fix Self-Conditioning

| Model | 0% Error History | 100% Error History |
|-------|------------------|-------------------|
| Qwen3-8B | ~80% | ~30% |
| Qwen3-32B | ~90% | ~40% |
| DeepSeek-V3 (670B) | ~95% | ~50% |
| Kimi K2 (1026B) | ~98% | ~55% |

**Critical**: Even frontier models degrade with self-conditioning!

### 5. Thinking Models Fix Self-Conditioning

| Model | 0% Error | 100% Error | Degradation |
|-------|----------|------------|-------------|
| Qwen3-32B (no thinking) | ~90% | ~40% | **-50%** |
| Qwen3-32B (thinking) | ~98% | ~97% | **-1%** |

**Critical**: Thinking ELIMINATES self-conditioning!

### 6. Single-Turn Execution Benchmark

**Without CoT**:
| Model | Max Steps (80% accuracy) |
|-------|-------------------------|
| Gemma3-27B | 3 |
| Qwen3-32B | 4 |
| DeepSeek-V3 | 6 |
| Kimi K2 | 6 |

**With Thinking**:
| Model | Max Steps (80% accuracy) |
|-------|-------------------------|
| Gemini 2.5 Pro | 120 |
| DeepSeek-R1 | 168 |
| Grok 4 | 384 |
| Claude-4 Sonnet | 432 |
| **GPT-5 ("Horizon")** | **2176** |

**GPT-5 is 5x ahead of next competitor!**

---

## Key Concept: Self-Conditioning

> "As models make mistakes, they become more likely to make more mistakes"

**Mechanism**: 
- Training = predict most likely next token given context
- Context with errors → higher probability of continuing errors
- Creates downward spiral over long horizons

**This is OPPOSITE to humans** who improve with practice!

**What fixes it**:
1. RL training (thinking models)
2. Removing prior history from context (context engineering)
3. NOT fixed by: model size alone, self-verification prompting

---

## Relationship to Other Papers

### Supports
- **Illusion of Thinking (2506.06941)**: Collapse at high complexity (execution failures)
- **Comprehension Without Competence (2507.10624)**: Execution vs comprehension distinction
- **Faith and Fate (2305.18654)**: Error accumulation mechanism
- **OMEGA (2506.18880)**: Self-conditioning parallels OMEGA's compositional failure; errors compound

### Challenges
- **Illusion of Thinking**: "Failures arise from execution, not inability to reason"
- Reframes the debate: not "can't think" but "can't execute long sequences"

### Partially Supports FOR Position
- **DeepSeek-R1**: Thinking models dramatically better
- **s1**: Sequential test-time compute helps
- But shows WHY thinking helps: fixes self-conditioning

### Extends
- Provides MECHANISM for why long tasks fail
- Shows scaling DOES help, but differently than expected
- Distinguishes long-context from self-conditioning

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (September 2025)
- No direct rebuttals found

### Potential Counter-Arguments

1. **"Task is too simple"**
   - Counter: Simplicity is the POINT — isolates execution
   - Counter: If models fail on simple task, complex tasks worse
   - Counter: Real-world agentic tasks require similar execution

2. **"GPT-5 shows problem is solved"**
   - Counter: 2176 steps is still finite
   - Counter: Real tasks may require 10,000+ steps
   - Counter: Self-conditioning still present in non-RL models

3. **"Just use tools"**
   - Counter: "Even calling the right tools requires reliable execution"
   - Counter: "Reasoning is often fuzzy and not always easy to implement as a tool"

### Limitations (Authors Acknowledge)
- Synthetic task may not transfer to real-world
- Only tested specific model families
- Temperature effects not fully explored

---

## Key Quotes

> "Failures of LLMs when simple tasks are made longer arise from mistakes in execution, rather than an inability to reason"

> "We posit that the eventual failures are in execution—as the task gets longer, the model is more likely to make a mistake in executing the plan"

> "The self-conditioning effect—models become more likely to make mistakes when the context contains their errors from prior turns"

> "Self-conditioning does not reduce by just scaling the model size"

> "Thinking mitigates self-conditioning, and also enables execution of much longer tasks"

> "This is in contrast to humans, who typically improve at executing a task with practice"

---

## Implications for the Literature Review Thesis

**Literature Review Thesis**: LLM reasoning is practical but fundamentally predictive (pattern matching from training distributions), not genuinely generative.

### This Paper is BALANCED — Provides Evidence for Both Sides

**For "Against" (Pattern Matching) Position**:
1. Execution alone is challenging — models fail even with plan+knowledge
2. Self-conditioning = pattern matching gone wrong
3. Errors compound exponentially
4. Non-RL models fundamentally limited

**For "For" (Genuine Capability) Position**:
1. Thinking models fix self-conditioning
2. Scaling model size helps (within non-thinking)
3. GPT-5 executes 2176 steps — massive improvement
4. "Not inability to reason, but execution failures"

### How to Integrate with Thesis

**Nuanced position**:
- Execution ≠ reasoning — failures don't prove "can't think"
- BUT: execution is REQUIRED for practical reasoning
- Self-conditioning = architectural/training limitation
- RL training (thinking) partially fixes, but not fully

**Key insight for paper**:
> "Even if planning and world knowledge are perfected, LLMs will still make mistakes in execution over a long-horizon"

This suggests:
- Base models have the knowledge (first step ~99%)
- Failure is in SEQUENTIAL APPLICATION
- This is consistent with "predictive but not generative"

### Reconciliation

The "Against" papers show LLMs fail at long tasks
→ This paper shows WHY: self-conditioning, not reasoning inability
→ Thinking models improve, but don't fully solve
→ The thesis: "practical but predictive" = can do short tasks, fails long ones

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
