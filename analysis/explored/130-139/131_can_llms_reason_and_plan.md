# Paper Analysis: Can Large Language Models Reason and Plan?

## Metadata
- **arXiv ID**: 2403.04121
- **Title**: Can Large Language Models Reason and Plan?
- **Authors**: Subbarao Kambhampati
- **Date**: March 2024
- **Venue**: Annals of The New York Academy of Sciences
- **Institution**: Arizona State University

---

## Core Claims

1. **LLMs are "n-gram models on steroids"**: Trained to predict token distributions, not to reason. GPT-3.5 is essentially a "3001-gram model of language."

2. **LLMs do "universal approximate retrieval," not reasoning**: They probabilistically reconstruct completions word by word — this is retrieval, not inference/search.

3. **Obfuscation destroys LLM "planning"**: When action/object names are obfuscated, GPT-4's planning performance "plummets precipitously" — proving it's pattern matching, not reasoning.

4. **Self-verification makes things WORSE**: LLMs hallucinate both false positives and false negatives when verifying their own solutions.

5. **Human-in-the-loop "improvements" are Clever Hans effects**: The human, not the LLM, is doing the reasoning; LLM just generates guesses.

6. **LLMs are valuable as knowledge sources, not reasoners**: Can extract planning knowledge (actions, preconditions) but cannot assemble it into executable plans.

---

## Methodology

### Experimental Approach
- Evaluated GPT-3, GPT-3.5, GPT-4 on International Planning Competition (IPC) domains
- Tested on Blocks World and other standard planning benchmarks
- **Key test**: Obfuscated action/object names to reduce effectiveness of approximate retrieval

### Key Distinction
- **Knowledge acquisition**: Extracting domain knowledge (actions, preconditions, effects)
- **Reasoning/Planning**: Assembling knowledge into executable plans with subgoal/resource interaction handling

---

## Key Evidence

### GPT-4 Planning Performance

| Condition | Accuracy |
|-----------|----------|
| Standard Blocks World | ~30% |
| **Obfuscated names** | **Plummets precipitously** |
| Off-the-shelf AI planners (obfuscated) | No trouble |

**Key insight**: Standard AI planners don't care about names — they work on structure. LLMs fail on obfuscation because they're pattern matching on names, not reasoning about structure.

### Self-Verification Studies

| Finding | Implication |
|---------|-------------|
| Self-critiquing performance **worsens** | LLMs can't verify their own solutions |
| Hallucinate false positives AND false negatives | No reliable self-correction |
| Plan verification study [10] | Self-verification fails |
| Constraint verification study [9] | Self-verification fails |

### The "Clever Hans" Problem

Human-in-the-loop prompting is susceptible to:
- Human steering LLM toward correct answer (even unintentionally)
- Credit belongs to human, not LLM
- Useless when human doesn't know the answer

---

## Key Theoretical Arguments

### LLMs as "External System 1"

Kambhampati's framework (Figure 1):
- **System 1** (Kahneman): Fast, intuitive, pattern-based
- **System 2**: Slow, deliberate, reasoning-based
- **LLMs**: Giant non-veridical memory = external System 1
- **NOT**: Capable of System 2 reasoning

### Why Fine-Tuning Doesn't Help

> "All that such fine tuning is doing is converting the planning task into a memory-based approximate retrieval (akin to the memorization/compilation from System 2 to System 1). It doesn't prove that LLMs are able to plan."

This is exactly the **surfacing hypothesis**: Fine-tuning/RL surfaces memorized patterns, doesn't create reasoning.

### The Boon and Bane of N-gram Models

> "The boon ('creativity') and bane ('hallucination') of LLMs is that n-gram models will naturally mix and match–and have almost as much trouble strictly memorizing as we do."

LLMs can't even guarantee memorization — they approximate. This makes them unreliable for reasoning tasks that require exactness.

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis

This paper is **foundational** for the thesis. Kambhampati articulates the core argument:

1. **LLMs = approximate retrieval**: 
   > "What LLMs are good at is a form of universal approximate retrieval... This means that LLMs can't even guarantee memorizing complete answers."

2. **Pattern matching, not reasoning**:
   > "Nothing in the training and use of LLMs would seem to suggest remotely that they can do any type of principled reasoning (which, as we know, often involves computationally hard inference/search)."

3. **Obfuscation test proves pattern matching**:
   > "One way of checking this for planning tasks is to reduce the effectiveness of approximate retrieval by obfuscating the names of the actions and objects in the planning problem. When we did this... GPT4's empirical performance plummeted precipitously."

4. **Self-improvement is illusory**:
   > "Two recent studies from my lab... seem to throw cold water on this optimism by showing that with 'self-verification' performance actually worsens."

5. **LLM-Modulo framework**:
   > "LLMs can be gainfully leveraged... in conjunction with either model-based verifiers or expert humans in the loop."

   This aligns with the thesis: LLMs are useful for pattern retrieval, not for reasoning.

### Key Quote (Summary)

> "Nothing that I have read, verified, or done gives me any compelling reason to believe that LLMs do reasoning/planning, as normally understood. What they do instead, armed with web-scale training, is a form of **universal approximate retrieval**, which, as I have argued, can sometimes be mistaken for reasoning capabilities."

---

## Relationship to Other Papers

### Foundational For
- **Entire thesis**: This is the theoretical foundation for "pattern matching, not reasoning"
- **Paper 03 (Illusion of Thinking)**: Kambhampati's framework predicts the collapse findings
- **Papers 129-130 (Over/Underthinking)**: No metacognitive awareness = no self-regulation

### Supports
- **Planning Gap (2601.14456)**: 82.9% ID → 0% OOD confirms obfuscation findings
- **OMEGA (2506.18880)**: Compositional failure confirms assembly problem
- **Faith and Fate (2305.18654)**: "Linearized subgraph matching" is his "approximate retrieval"
- **Self-correction failures**: Multiple papers confirm self-verification worsens performance

### Provides Framework For
- **LLM-Modulo**: LLMs as idea generators + external verifiers
- **Surfacing hypothesis**: Fine-tuning = memory compilation, not reasoning creation
- **System 1/2 distinction**: LLMs = external System 1

### Cited By / Builds On
- **Illusion of Thinking (2506.06941)**: Tests Kambhampati's claims empirically
- **Alice in Wonderland (2406.02061)**: Simple tasks showing breakdown
- **All subsequent planning/reasoning papers**

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- **Illusion of Illusion (2506.09250)**: Argues token limits, not reasoning limits (weak challenge)
- **Physics of LLMs 2.1 (2407.20311)**: Shows some OOD generalization in narrow domains

### Potential Counter-Arguments

1. **LLMs improve with scale**: GPT-4 better than GPT-3
   - **Kambhampati's counter**: Still fails on obfuscation; improvement is better retrieval, not reasoning

2. **o1/reasoning models are different**: Extended thinking changes the game
   - **Counter**: Papers 129-130 show o1 has no metacognitive awareness

3. **Fine-tuning enables reasoning**: Specialized training helps
   - **Kambhampati's counter**: Fine-tuning = memorization compilation, not reasoning

4. **LLM-Modulo proves LLMs can reason with help**: 
   - **Counter**: The VERIFIER is reasoning; LLM is just generating guesses

### Limitations

1. Focus on planning/reasoning — may not apply to all tasks
2. Written before o1/reasoning models — doesn't address extended thinking directly
3. Theoretical argument — relies on empirical work from his lab

---

## Key Quotes

> "LLMs are perhaps best seen as **giant non-veridical memories** akin to an external System 1 for us all."

> "Nothing in the training and use of LLMs would seem to suggest remotely that they can do any type of **principled reasoning** (which, as we know, often involves computationally hard inference/search)."

> "What LLMs are good at is a form of **universal approximate retrieval**."

> "The boon ('creativity') and bane ('hallucination') of LLMs is that n-gram models will **naturally mix and match**."

> "When we [obfuscated names], GPT4's empirical performance **plummeted precipitously**, despite the fact that none of the standard off-the-shelf AI planners have any trouble with such obfuscation."

> "Two recent studies from my lab... seem to throw cold water on this optimism by showing that with **'self-verification' performance actually worsens**."

> "Nothing that I have read, verified, or done gives me any compelling reason to believe that LLMs do reasoning/planning, as normally understood."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**
