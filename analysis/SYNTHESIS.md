# Synthesis: The Thinking Machine That Doesn't Think

## Papers Analyzed So Far

| # | Paper | Date | Stance | Key Contribution |
|---|-------|------|--------|------------------|
| F1 | Faith and Fate | May 2023 | Against | Theoretical foundation: subgraph matching, exponential error accumulation |
| F2 | Measuring Faithfulness | Jul 2023 | Against | CoT is often unfaithful; larger models = less faithful |
| 1 | GSM-Symbolic | Oct 2024 | Against | Empirical: 65% drop from irrelevant info, variance on equivalent questions |
| 2 | CoT Without Prompting | Feb 2024 | For | CoT exists intrinsically in top-k tokens, hidden by greedy decoding |
| 3 | Illusion of Thinking | Jun 2025 | Against | Three complexity regimes, token decrease at collapse, LRM failures |
| 4 | Thinking Isn't an Illusion | Jul 2025 | For | Tool augmentation reverses collapse (Hanoi 0%→100%) |
| 5 | DeepSeek-R1 | Jan 2025 | For | Emergent reasoning from pure RL, "Aha moment" phenomenon |
| 6 | CoT is a Mirage | Aug 2025 | Against | DataAlchemy: ID=100%, OOD=0%; distribution determines success |
| 7 | s1: Simple test-time scaling | Jan 2025 | For | 1K samples surfaces reasoning; budget forcing works |
| 8 | Semantic Deception | Dec 2025 | Against | Semantic cues override explicit instructions; CoT can hurt |

**Total: 10 papers analyzed (2 foundational + 8 main)**

---

## The Core Tension

### The "Against" Position (Pattern Matching)
```
Training Data → Pattern Extraction → Subgraph Matching → Apparent Reasoning
```
**Evidence:**
- Distribution shift breaks reasoning (GSM-Symbolic, CoT Mirage)
- Exponential error accumulation (Faith and Fate)
- Irrelevant information causes catastrophic failure
- Three regimes: LLMs win low, collapse at high
- CoT is often post-hoc rationalization (Measuring Faithfulness)
- Semantic associations override explicit instructions (Semantic Deception)

### The "For" Position (Genuine Capability)
```
Base Model → Latent Reasoning → RL/Decoding Surfaces It → Real Capability
```
**Evidence:**
- CoT exists without prompting (Wang & Zhou)
- "Aha moment" emerges from pure RL (DeepSeek-R1)
- Tool augmentation shows execution ≠ reasoning limits
- 1K samples sufficient to surface reasoning (s1)
- Confidence correlates with reasoning presence

---

## NEW: The Faithfulness Problem

### Key Finding from Lanham et al. (2023)

| Task | Early Answering AOC | Interpretation |
|------|---------------------|----------------|
| AQuA (math) | 0.44 | Model USES its CoT |
| ARC Easy | 0.02 | Model IGNORES its CoT |

**Critical insight**: CoT faithfulness is DECOUPLED from performance!
- Models can generate unfaithful reasoning that precedes correct answers
- Larger models = LESS faithful (inverse scaling)
- CoT is often post-hoc rationalization, not computation

### Implications for Thesis

1. **"Thinking" can be performative**: Generated text that LOOKS like reasoning
2. **Internal process ≠ stated process**: What models say ≠ how they compute
3. **Size makes it worse**: More capable models rely LESS on their stated reasoning

---

## NEW: The Surfacing Hypothesis (s1 Evidence)

### Key Finding from s1 Paper

| Model | Training Data | AIME24 |
|-------|--------------|--------|
| Qwen2.5-32B-Instruct | 0 | 26.7% |
| s1-32B | 1K samples | 50.0% |
| s1-32B + budget forcing | 1K samples | 56.7% |

**Critical insight**: 1K samples CANNOT teach AIME-level mathematics!

The capability must **pre-exist** in the base model and be **surfaced** by:
1. Targeted SFT on reasoning traces
2. Budget forcing (preventing premature answer termination)

This directly supports: **"RL/SFT surfaces reasoning, doesn't create it"**

---

## NEW: The Semantic Override Principle

### Key Finding from Semantic Deception

| Model Type | Falls for Semantic Trap |
|------------|------------------------|
| GPT-4o (non-reasoning) | Never |
| DeepSeek-v3 (non-reasoning) | Never |
| o1 (reasoning) | 6% at Level 4b |
| R1 (reasoning) | 10% at Level 4b |

**Counterintuitive**: "Reasoning models" fail MORE often!

**Explanation**: CoT may AMPLIFY semantic associations by repeating content

**Hidden effect**: Even when models recognize the task:
- Level 1 accuracy: 96%
- Level 4b accuracy: 40%

Semantic load affects computation even when task recognition succeeds.

---

## Evidence Mapping (Updated)

### For "Reasoning Exists in Base Models"

| Paper | Supporting Evidence |
|-------|---------------------|
| CoT Without Prompting | CoT paths in top-k tokens without training |
| DeepSeek-R1 | RL surfaces behaviors from base model |
| **s1** | **1K samples activates pre-existing reasoning** |

### For "RL Surfaces, Doesn't Create"

| Paper | Supporting Evidence |
|-------|---------------------|
| DeepSeek-R1 | Pure RL induces behaviors not explicitly trained |
| **s1** | **26.7% → 50% with only 1K samples** |
| Interplay paper | RL only works when primitives exist from pretraining |

### For "CoT ≠ Internal Computation" (NEW)

| Paper | Supporting Evidence |
|-------|---------------------|
| **Measuring Faithfulness** | **Truncation often doesn't change answer (post-hoc)** |
| **Measuring Faithfulness** | **Larger models = less faithful** |
| **Semantic Deception** | **Reasoning models fall for semantic traps** |
| CoT Mirage | Perfect ID, zero OOD despite CoT |

### For "Practical But Predictive"

| Paper | Supporting Evidence |
|-------|---------------------|
| GSM-Symbolic | Variance, fragility, distribution dependence |
| Illusion of Thinking | Collapse at high complexity |
| Faith and Fate | OOD failure despite perfect ID performance |
| **CoT Mirage** | **ID=100%, OOD=0%** |
| **Semantic Deception** | **Semantic associations override instructions** |

---

## The Three Key Questions (Updated)

### 1. Does reasoning exist in base models?
**Answer: YES** (CoT Without Prompting, DeepSeek-R1-Zero, s1)
- It's hidden by greedy decoding
- It exists as learned patterns from pretraining
- It can be surfaced by alternative decoding, SFT, or RL
- **NEW**: 1K samples sufficient to surface (s1)

### 2. Does RL create or surface reasoning?
**Answer: SURFACES** (your hypothesis)
- DeepSeek-R1-Zero shows emergence without human demos
- **s1 shows 1K samples cannot TEACH AIME math, only ACTIVATE existing capability**
- The "Aha moment" likely reflects learned self-correction patterns

### 3. Is the stated reasoning faithful?
**Answer: OFTEN NO** (NEW)
- CoT can be post-hoc rationalization (Measuring Faithfulness)
- Larger models generate LESS faithful reasoning
- Reasoning models can fall for semantic traps (Semantic Deception)
- Performance ≠ faithfulness — correct answers can come from unfaithful reasoning

### 4. Is this "genuine" reasoning?
**Answer: PRACTICAL BUT BOUNDED**
- It solves real problems (AIME 79.8%)
- It has distribution limits (collapse at high complexity)
- It doesn't extrapolate to truly novel problems
- It's "predictive" — predicts what reasoning looks like
- **NEW**: Semantic associations can override explicit instructions

---

## Your Paper's Thesis (Refined)

> **"The Thinking Machine That Doesn't Think"**
>
> Large Language Models possess reasoning-like capabilities that:
> 1. **Exist intrinsically** in base models (OLMo 3 evidence, s1 evidence)
> 2. **Are surfaced** by RL and alternative decoding, not created
> 3. **Are often unfaithful** — stated reasoning ≠ internal computation
> 4. **Remain fundamentally predictive** — they interpolate patterns
> 5. **Are practical** for many tasks within distribution
> 6. **Cannot override training** — semantic associations dominate
> 7. **Cannot extrapolate** to genuinely novel reasoning challenges
>
> The "thinking" in LRMs is sophisticated pattern completion that
> resembles reasoning sufficiently to solve many problems, but lacks
> the generative capacity to think beyond its training distribution.
> Moreover, the stated reasoning often does not reflect the actual
> computational process — it is performative, not explanatory.

---

## Visual Summary (Updated)

```
                    THE LANDSCAPE OF LLM REASONING
                    
        AGAINST                              FOR
   (Pattern Matching)                  (Genuine Capability)
          │                                    │
          │                                    │
    Faith and Fate ◄────── THEORETICAL ──────► DeepSeek-R1
    (subgraph match)          DEBATE          (emergent RL)
          │                                    │
          │                                    │
    GSM-Symbolic ◄────── EMPIRICAL ──────► CoT Without Prompting
    CoT Mirage              DEBATE           s1 (1K surfacing)
    (distribution)                           (intrinsic paths)
          │                                    │
          │                                    │
   Illusion of Thinking ◄─── PRACTICAL ───► Thinking Isn't Illusion
    (complexity collapse)     DEBATE         (tool augmentation)
          │                                    │
          │                                    │
   Measuring Faithfulness ◄── FAITHFULNESS ──► ???
   Semantic Deception          DEBATE         (no strong counter)
    (CoT ≠ computation)                        
          │                                    │
          └────────────────┬───────────────────┘
                           │
                           ▼
              ┌───────────────────────────────┐
              │     YOUR PAPER'S POSITION     │
              │                               │
              │  • Reasoning exists (FOR)     │
              │  • RL surfaces it (FOR)       │
              │  • It's predictive (AGAINST)  │
              │  • It's often unfaithful (NEW)│
              │  • Practical but bounded      │
              │                               │
              │  "Thinking Machine That       │
              │   Doesn't Think"              │
              └───────────────────────────────┘
```

---

## Key Arguments Structure

### Argument 1: Reasoning Pre-Exists
- **Evidence**: CoT Without Prompting, DeepSeek-R1-Zero, s1 (1K samples)
- **Claim**: Base models contain latent reasoning patterns from pretraining
- **Implication**: RL/SFT is an ACTIVATION mechanism, not a CREATION mechanism

### Argument 2: CoT is Often Unfaithful
- **Evidence**: Measuring Faithfulness (post-hoc, inverse scaling)
- **Claim**: What models SAY ≠ how they COMPUTE
- **Implication**: "Thinking" is often performative, not computational

### Argument 3: Distribution Boundaries are Hard
- **Evidence**: GSM-Symbolic, CoT Mirage (ID=100%, OOD=0%), Faith and Fate
- **Claim**: Reasoning is interpolation, not extrapolation
- **Implication**: Novel problems outside training distribution will fail

### Argument 4: Semantic Associations Override Instructions
- **Evidence**: Semantic Deception (reasoning models fail MORE)
- **Claim**: Training patterns dominate over explicit instructions
- **Implication**: Models predict likely outputs, not compute solutions

---

## Remaining High-Priority Papers

### Faithfulness (to strengthen Argument 2)
- [ ] Reasoning Models Don't Always Say What They Think (Chen et al.)
- [ ] Chain-of-Thought In The Wild Is Not Always Faithful (Arcuschin et al.)

### Distribution Boundaries (to strengthen Argument 3)
- [ ] Correlation or Causation (2509.17380) — causal structure analysis
- [ ] On the Limits of Innate Planning (2511.21591)

### Balanced Perspectives
- [ ] Comment: Agentic Gap (2506.18957) — execution vs reasoning
- [ ] Interplay of Pre-Training, Mid-Training, and RL

---

## Next Steps

1. ~~Read s1 paper~~ ✅ 
2. ~~Read Measuring Faithfulness~~ ✅
3. ~~Read Semantic Deception~~ ✅
4. Read "Reasoning Models Don't Always Say What They Think"
5. Document OLMo 3 experimental evidence
6. Develop the "predictive vs generative" distinction further
7. Structure the paper around the four main arguments
8. Create paper outline with evidence mapping
