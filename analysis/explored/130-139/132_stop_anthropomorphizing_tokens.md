# Paper Analysis: Stop Anthropomorphizing Intermediate Tokens as Reasoning/Thinking Traces!

## Metadata
- **arXiv ID**: 2504.09762
- **Title**: Stop Anthropomorphizing Intermediate Tokens as Reasoning/Thinking Traces!
- **Authors**: Subbarao Kambhampati, Kaya Stechly, Karthik Valmeekam, Lucas Saldyt, Siddhant Bhambri, et al.
- **Date**: May 2025
- **Venue**: Position Paper
- **Institution**: Arizona State University

---

## Core Claims

1. **Anthropomorphizing intermediate tokens is actively harmful**: Calling them "reasoning traces" or "thoughts" is not a harmless metaphor — it confuses how models work and leads to questionable research

2. **Intermediate tokens have NO formal semantics**: They don't reliably correspond to human reasoning steps or algorithmic traces

3. **Trace correctness ≠ solution correctness**: Only "loose correlation" between correct traces and correct answers; incorrect traces can IMPROVE performance

4. **"Aha moments" are meaningless**: Models have no internal state; "aha" is just another token in context

5. **LRMs compile verification signal, don't learn reasoning**: Post-training iteratively compiles verifier signal into generation — "reasoning into retrieval via learning"

---

## Key Arguments

### The Four-Part Position

The authors argue anthropomorphizing intermediate tokens is:
1. **Wishful** — no evidence models "think"
2. **Unsupported** — little concrete evidence traces reflect reasoning
3. **Engenders false confidence** — stylistically plausible traces create false trust
4. **Pushes fruitless research** — misleads the community

### Evidence: Trace Correctness is Disconnected from Solution Correctness

| Finding | Source | Implication |
|---------|--------|-------------|
| "Loose correlation" between trace correctness and output correctness | [46] | Traces don't cause solutions |
| Incorrect traces OUTPERFORM correct traces in SFT | [5] | Trace content doesn't matter |
| Training on "largely incorrect mathematical operations" still improves performance | Li et al. [29] | Semantics irrelevant |
| Truncated/destroyed A* traces still work (Dualformer) | [50] | Structure, not content, matters |
| R1-Zero (mixed English/Chinese) > R1 (human-annotated traces) | DeepSeek [9] | Interpretability hurts performance |

### The "Aha Moment" Critique

> "While a human may say 'aha' to indicate exactly a sudden internal state change, this interpretation is unwarranted for models which do not have any such internal state, and which on the next forward pass will only differ from the pre-aha pass by the inclusion of that single token in their context."

Models don't have internal state changes — "aha" is just a predicted token.

### Consequences of Anthropomorphization

1. **Drives pseudo-interpretability**: Making traces "human-readable" rather than optimizing for correctness
2. **Creates false correlation assumption**: Believing trace correctness → solution correctness
3. **Misinterprets token length**: Viewing longer traces as "more thinking" (when it's reward hacking)
4. **Claims of algorithm learning**: SearchFormer claims to be "more optimal than A*" based on shorter traces

---

## Alternative Explanation: Verifier Signal Compilation

### The Real Mechanism

> "The modus operandi of current LRMs is leveraging these verifiers in a generate-test loop at test time, training time or distillation time in order to partially compile/internalize the verification signal into generation. In other words, post-training LRMs can be seen as **iteratively compiling reasoning into retrieval via learning**."

This echoes Minsky: "intelligence is shifting the test part of generate-test into generation."

### Three Stages of Verification Compilation

1. **Test-time**: LLM-Modulo framework — external verifiers at inference
2. **Train-time**: RL post-training — verifier signal shapes parameters
3. **Distillation**: Synthetic data from verified outputs

Each stage internalizes verification signal for longer "inference horizons."

### The Prompt Augmentation View

Instead of "reasoning traces," view intermediate tokens as **prompt augmentations**:

> Given a task prompt T, ∃PA s.t. Pr(Sol(LLM(T+PA),T)) > Pr(Sol(LLM(T),T))

The question is finding the right augmentation — it doesn't need to be interpretable or "correct."

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis

This paper directly supports the thesis that LLMs pattern-match rather than reason:

1. **"Compiling reasoning into retrieval"**: Explicitly states LRMs turn reasoning into retrieval
   > "post-training LRMs can be seen as iteratively compiling reasoning into retrieval via learning"

2. **Traces have no semantics**: The content of intermediate tokens is irrelevant
   - Incorrect traces work as well as correct ones
   - Mixed language traces (R1-Zero) outperform "clean" traces (R1)

3. **No internal state**: Models don't "think" — they generate next tokens
   > "models which do not have any such internal state, and which on the next forward pass will only differ from the pre-aha pass by the inclusion of that single token in their context"

4. **Performance ≠ Understanding**: Good answers don't require correct reasoning
   - False positives: correct solutions with incorrect traces
   - Training on wrong traces improves performance

5. **Verification drives improvement**: RL learns from verifier signal, not from "reasoning"

### Connection to Other Findings

| Our Finding | This Paper's Support |
|-------------|---------------------|
| CoT unfaithfulness | Traces disconnected from solutions |
| Self-verification fails | LLMs can't verify their own traces |
| Pattern matching | "Compiling reasoning into retrieval" |
| No metacognition | No internal state; "aha" meaningless |

---

## Relationship to Other Papers

### Foundational For
- **Paper 131 (2403.04121)**: Same author; this paper extends the "approximate retrieval" argument to LRMs
- **Faithfulness literature**: Provides theoretical grounding for unfaithfulness findings

### Supports
- **Papers 7-11 (Faithfulness papers)**: Traces don't reflect computation
- **Paper 129-130 (Over/Underthinking)**: No metacognitive awareness of reasoning quality
- **Interplay (2512.07783)**: "Compilation" = surfacing pre-existing patterns

### Extends
- **Paper 131 (2403.04121)**: From "LLMs can't reason" to "LRMs can't reason either"
- **LLM-Modulo framework**: Explains HOW verification gets compiled

### Provides Framework For
- **Understanding LRMs**: Verification compilation, not reasoning
- **Prompt augmentation theory**: Intermediate tokens as context augmentation
- **Research direction**: Stop anthropomorphizing, start understanding actual mechanisms

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found (May 2025 position paper).

### Potential Counter-Arguments

1. **Traces correlate with accuracy in practice**: Users find them helpful
   - **Counter**: Correlation ≠ causation; stylistic plausibility creates false confidence

2. **Process Reward Models improve trace quality**: PRMs exist
   - **Counter**: Authors note PRMs "have taken a back seat since DeepSeek R1" — outcome-only verification dominates

3. **Some traces ARE correct**: Not all traces are wrong
   - **Counter**: Even when trained on correct traces, models produce incorrect traces at inference; no guarantee

4. **OpenAI hides traces for good reason**: Interpretability isn't the goal
   - **Counter**: This is authors' point — traces shouldn't be anthropomorphized as "thinking"

### Limitations

1. Position paper — limited empirical contribution (cites others)
2. Doesn't explain WHY intermediate tokens help at all
3. Prompt augmentation theory is speculative
4. Focused on reasoning tasks — may not apply to all CoT uses

---

## Key Quotes

> "anthropomorphizing intermediate tokens as reasoning/thinking traces is (1) wishful (2) has little concrete supporting evidence (3) engenders false confidence and (4) may be pushing the community into fruitless research directions."

> "While a human may say 'aha' to indicate exactly a sudden internal state change, this interpretation is unwarranted for models which do not have any such internal state."

> "there is only a **loose correlation** between the correctness of the trace and the correctness of the output plan"

> "the intervention experiments with **incorrect intermediate traces even outperforms** the SFT with correct intermediate trace setting"

> "post-training LRMs can be seen as **iteratively compiling reasoning into retrieval** via learning"

> "Even the DeepSeek R1 authors admit that **R1-Zero, which mixed English and Chinese intermediate tokens, actually had better performance** than the subsequent R1"

> "Engendering false confidence and trust by generating stylistically plausible ersatz reasoning traces seems ill-advised!"

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**
