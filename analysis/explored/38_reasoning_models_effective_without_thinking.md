# Paper Analysis: Reasoning Models Can Be Effective Without Thinking

## Metadata
- **arXiv ID**: 2504.09858
- **Title**: Reasoning Models Can Be Effective Without Thinking
- **Authors**: Wenjie Ma, Jingxuan He, Charlie Snell, Tyler Griggs, Sewon Min, Matei Zaharia
- **Date**: April 2025
- **Venue**: arXiv preprint
- **Institution**: UC Berkeley / Databricks

---

## Core Claims

1. **Explicit "thinking" is NOT necessary**: Bypassing the thinking process via simple prompting ("NoThinking") can be surprisingly effective

2. **NoThinking outperforms Thinking in low-budget settings**: With token constraints, NoThinking beats Thinking (e.g., 51.3 vs 28.9 on ACM 23 with 700 tokens)

3. **Parallel scaling with NoThinking is highly effective**: Generate N outputs independently, aggregate with verifiers or best-of-N — matches or exceeds Thinking with up to 9x lower latency

4. **pass@k improves more for NoThinking**: As k increases, NoThinking becomes more competitive with Thinking

---

## Methodology

### Model Tested
- **DeepSeek-R1-Distill-Qwen** (state-of-the-art reasoning model with explicit "thinking" traces)

### Two Conditions Compared
1. **Thinking**: Default behavior — generates lengthy CoT inside `<think>` tags before final answer
2. **NoThinking**: Bypasses thinking via prompting — prefills dummy "thinking box" (e.g., `<think>\n\n</think>`) and generates solution directly

### Benchmarks (7 Challenging Reasoning Tasks)
- Mathematical problem solving (AIME, MATH-500)
- Formal theorem proving
- Coding tasks (LiveCodeBench, Codeforces)

### Key Methodological Choices
- **Token budget control**: Compare Thinking vs NoThinking at same token count
- **Pass@k metric**: Probability of at least one correct answer in k attempts
- **Parallel scaling**: Generate N outputs, aggregate with verifiers or best-of-N

---

## Key Evidence

### Main Finding: NoThinking outperforms Thinking under token constraints

| Benchmark | Token Budget | NoThinking | Thinking |
|-----------|--------------|------------|----------|
| **ACM 23** | 700 tokens | **51.3** | 28.9 |

**Nearly 2x better with NoThinking** under token constraints.

### Token Efficiency
- NoThinking uses **2.0–5.1x fewer tokens** than Thinking
- At equivalent token budgets, NoThinking achieves equal or better performance

### Pass@k Performance
- NoThinking's advantage **increases as k increases**
- Higher k → more diverse outputs from NoThinking
- Performance gap narrows at high k, but NoThinking remains competitive

### Latency Comparison
- NoThinking + parallel scaling achieves:
  - **Comparable accuracy** to Thinking
  - With **up to 9x lower latency**
- Outperforms baselines with similar latency that use Thinking

---

## Critical Analysis: Relationship to Thesis

**Thesis**: LLM reasoning is practical but bounded by training distributions, not genuinely generative. RL/test-time compute "surfaces" pre-existing capability.

### How This Paper Could CHALLENGE the Thesis

1. **Implicit reasoning capability exists**: The model can reason without explicit CoT — suggests capability is encoded in weights, perhaps more robustly than "pattern matching" implies

2. **Parallel scaling works well**: Multiple independent samples + verification achieves strong results — the model can reliably produce correct answers

3. **Doesn't prove pattern matching**: The paper shows thinking isn't necessary, but doesn't directly show reasoning IS pattern matching

### Why This Paper SUPPORTS the Thesis

1. **"Thinking" is NOT causal for correctness**

   If bypassing the thinking process works just as well (or better), what was the "thinking" doing? This suggests:
   - Thinking tokens are NOT causal for correctness
   - The model already "knows" the answer (from training)
   - Extended thinking is exploration/sampling, not genuine computation

2. **Parallel sampling = search over learned patterns**

   The paper's best approach: generate many outputs, pick the best one with verifiers. This is:
   - Sampling from learned distribution
   - Filtering with external verification
   - Consistent with pattern matching + selection

3. **Low-budget advantage suggests retrieval, not computation**

   If NoThinking outperforms Thinking with limited tokens, the model isn't "computing" — it's retrieving answers quickly. Extended thinking adds noise in constrained settings.

4. **pass@k improvement = coverage, not reasoning**

   More samples = higher chance of hitting the right pattern. This is consistent with pattern matching (need many samples to cover distribution), not with genuine reasoning (would work reliably with k=1).

5. **Aligns with "Illusion of Insight" findings**

   "Aha moments" and extended thinking don't actually improve accuracy — this paper confirms that the thinking trace may be largely cosmetic.

6. **CoT Faithfulness Implications**

   If you can skip thinking and get correct answers, the thinking tokens were not reflecting necessary computation — supports unfaithfulness findings.

---

## Relationship to Other Papers

### Supports
- **Illusion of Insight (2601.00514)**: "Aha moments" don't improve accuracy; thinking is often unnecessary
- **Reasoning Beyond CoT (2601.08058)**: Reasoning mode can be triggered without explicit CoT
- **Illusions of Reflection (2510.18254)**: Reflection/thinking doesn't reliably improve answers

### Challenges
- **DeepSeek-R1 (2501.12948)**: Suggests extended thinking is valuable — this paper questions that
- **How LLMs Learn to Reason (2509.23629)**: "Concept web" theory assumes thinking traverses paths

### Provides Evidence For
- **Interplay (2512.07783)**: Capability is pre-existing; "thinking" just surfaces it
- **CoT Faithfulness papers**: CoT tokens may not reflect actual computation

---

## Limitations (Authors Acknowledge)

1. **Model-specific findings**: Only tested DeepSeek-R1-Distill-Qwen — generalization to other reasoning models (o1, Claude) not directly tested

2. **Requires verifiers for best results**: Parallel scaling works best with task-specific verifiers; for tasks without verifiers, relies on simpler heuristics

3. **Does not eliminate reasoning entirely**: NoThinking still uses a reasoning model — it just skips explicit thinking trace. Model's implicit capabilities (from training) still present

4. **Does not explain WHY it works**: Demonstrates effectiveness but doesn't provide mechanistic explanation for why skipping thinking doesn't hurt

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Task selection bias**: 7 benchmarks may not represent all reasoning scenarios — perhaps tasks requiring genuine multi-step OOD reasoning would show different results

2. **Verifiers do heavy lifting**: Best-of-N with verifiers offloads "correctness checking" to external tools — this is not pure model reasoning

3. **Implicit reasoning still happening**: The model may still be doing reasoning implicitly in its forward pass — just not verbalizing it

4. **Scale matters**: Results on distilled model may not apply to larger reasoning models

### Missing Tests

1. **Genuinely OOD tasks**: Would NoThinking work on OMEGA's transformative generalization? (Likely no)
2. **Compositional complexity**: Multi-step novel combinations beyond training
3. **Tasks without verifiers**: When you can't easily check answers externally
4. **Comparison with non-reasoning models**: Would base models with NoThinking approach work?

---

## Key Quotes

### On the core finding:
> "Bypassing the thinking process via simple prompting, denoted as NoThinking, can be **surprisingly effective**"

### On token efficiency:
> "When controlling for the number of tokens, **NoThinking outperforms Thinking** across a diverse set of seven challenging reasoning datasets"

### On the specific performance gap:
> "51.3 vs. 28.9 on ACM 23 with 700 tokens" — **nearly 2x better** with NoThinking under token constraints

### On scaling properties:
> "The performance of NoThinking becomes **more competitive with pass@k as k increases**"

### On practical implications:
> "Our method outperforms a range of baselines with similar latency using Thinking, and is **comparable to Thinking with significantly longer latency (up to 9x)**"

### On the broader message:
> "Our research encourages a **reconsideration of the necessity of lengthy thinking processes**"

---

## Status
- [x] Read full paper (via PDF extraction)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**

---

## Summary for Synthesis

**Verdict: BALANCED — Challenges "thinking" value but interpretation is nuanced**

### What This Paper Actually Shows:
1. Explicit thinking tokens are often unnecessary for correctness
2. NoThinking + parallel sampling matches or exceeds Thinking performance
3. Low-budget settings strongly favor NoThinking (51.3 vs 28.9)
4. Latency can be reduced up to 9x with parallel scaling
5. NoThinking uses 2.0–5.1x fewer tokens

### What This Paper Does NOT Show:
1. That reasoning doesn't happen (implicit reasoning may occur)
2. That this works on genuinely OOD tasks
3. Mechanistic explanation for why it works
4. Generalization beyond DeepSeek-R1-Distill-Qwen

### Critical Insight:
This paper undermines the "extended thinking = reasoning" narrative:
- If you can skip thinking and get the same (or better) results, the thinking tokens were not causal for correctness
- Either: (a) reasoning happens implicitly and thinking is just verbalization, OR (b) the model is retrieving answers from training patterns
- Both interpretations suggest thinking traces are not genuine "computation"

### Relationship to Thesis:
**Supports thesis interpretation** — the paper is consistent with:
- Reasoning capability is already in the model (from training)
- "Thinking" is exploration/sampling over learned patterns
- Parallel sampling + verification = search, not computation
- Extended CoT may be cosmetic rather than causal

However, the paper could also support "implicit reasoning" view — the model reasons without verbalizing it. The key question is whether this "implicit reasoning" generalizes OOD.

### Key Quote for Synthesis:
> "When controlling for the number of tokens, NoThinking outperforms Thinking"

If genuine multi-step computation were happening during thinking, more thinking tokens should help. They don't — at minimum, the thinking is inefficient; at maximum, it's not genuine computation.
