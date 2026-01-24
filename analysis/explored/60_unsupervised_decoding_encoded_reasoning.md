# Paper Analysis: Unsupervised Decoding of Encoded Reasoning Using Language Model Interpretability

## Metadata
- **arXiv ID**: 2512.01222
- **Title**: Unsupervised decoding of encoded reasoning using language model interpretability
- **Authors**: Ching Fang (Goodfire AI), Samuel Marks (Anthropic)
- **Date**: December 5, 2025
- **Venue**: Mechanistic Interpretability Workshop

---

## Core Claims

1. **Logit lens can decode ROT-13 encoded reasoning** — Internal representations anchor to English even when output is encrypted
2. **Intermediate layers preserve semantic content** — Peak decoding accuracy at layers 54-62 (of 70)
3. **Unsupervised pipeline achieves substantial accuracy** — Combines logit lens + automated paraphrasing
4. **Interpretability more robust than expected** — Current methods can penetrate simple encoding schemes

---

## Methodology

### Controlled Testbed Construction
- Fine-tuned **DeepSeek-R1-Distill-Llama-70B** to reason in **ROT-13 encryption**
- Model outputs intelligible English answers but reasoning is encoded
- QLoRA fine-tuning (rank 8) on 85,500 prompt-response pairs
- Reasoning within `<think>` tags converted to ROT-13

### Evaluation Dataset
- 50 multi-step reasoning prompts
- Each requires two intermediate steps (e.g., identify person → identify state → find capital)
- Model achieves 72% correct answers, 73.5% correct person identification, 83.7% correct state identification

### Decoding Methods Tested
1. **Logit lens analysis** — Unembed activations at each layer to token space
2. **Activation probes** — Cosine similarity to concept vectors
3. **Unsupervised pipeline** — Logit lens + confidence threshold + LLM paraphrasing

---

## Key Evidence

### Logit Lens Translation Accuracy

| Layer | Translation Probability |
|-------|------------------------|
| Layer 20 | ~10% |
| Layer 40 | ~30% |
| **Layer 58** | **~75%** (peak) |
| Layer 70 | ~60% |

**Key finding**: Even when model outputs ROT-13, internal representations in intermediate layers anchor to English!

### Unsupervised Decoding Pipeline Results

| Method | Grader Score (0-10) |
|--------|---------------------|
| Random baseline | ~2 |
| Raw ROT-13 (no decoding) | ~2 |
| Layer 40 logit lens | ~3 |
| **Layer 58 logit lens** | **~5.5** |
| Layer 58 + confidence threshold | **~7** |

### Example Decoding Success

**Original ROT-13 reasoning** (translated):
> "Hillary Clinton was Secretary of State during that time... She was born in Chicago, Illinois... the capital of Illinois is indeed Springfield"

**Unsupervised reconstruction**:
> "Hillary Clinton was indeed the Secretary of State, and she was born in Chicago, Illinois. Yes, Illinois' capital is indeed Springfield."

**Grader score**: High similarity — key facts preserved!

---

## Critical Assessment

### What This Paper Shows

1. **Internal representations more interpretable than outputs** — Even encoded models preserve semantic structure internally
2. **"Semantic hub" in intermediate layers** — Similar to multilingual models, intermediate layers anchor to dominant language
3. **Current interpretability methods work on simple encoding** — Logit lens penetrates ROT-13

### What This Paper Does NOT Show

1. **Generalization to complex encoding** — ROT-13 is trivial; adversarial encoding could be much harder
2. **RL-trained opaque reasoning** — Their model was SFT-trained; RL might produce different representations
3. **Natural encoding emergence** — Artificial testbed, not naturally emerged opaque reasoning

### Limitations (Authors Acknowledge)
> "if encoded reasoning arises in the wild, it would likely be as a result of RL posttraining, where the exact form of encoding could be more complex"

> "This may bias the optimization process to discover a solution where much of the base model's activation space is still preserved"

---

## Relationship to Other Papers

### Supports
- **Reasoning Beyond CoT (2601.08058)**: Both show internal representations are interpretable
- **Emergent Symbolic Mechanisms (2502.20332)**: Both find semantic structure in intermediate layers
- **CoT Without Prompting (2402.10200)**: Both show reasoning can be elicited from internal states

### Provides Method For
- **AI Safety monitoring**: Framework for detecting hidden reasoning
- **CoT faithfulness research**: Tools to probe what models "really think"

### Does Not Address
- **Planning Gap (2601.14456)**: No OOD generalization testing
- **OMEGA (2506.18880)**: No compositional generalization testing
- **Pattern matching hypothesis**: Doesn't distinguish pattern matching from reasoning

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (very recent paper)

### Potential Counter-Arguments

1. **ROT-13 is too simple** — Real steganography would be much harder to decode
2. **SFT preserves base representations** — RL-trained models might not have this property
3. **Doesn't prove reasoning is faithful** — Just shows we can read encoded text, not that it's causally relevant

### Related Concern from Paper
> "GPT-5 has been reported to use seemingly benign words like 'marinade' within its reasoning trace for unclear reasons"

This suggests real-world opaque reasoning may be more subtle than ROT-13.

---

## Key Quotes

> "We show that logit lens can effectively translate encoded reasoning, with accuracy peaking in intermediate-to-late layers"

> "These findings suggest that current mechanistic interpretability techniques may be more robust to simple forms of encoded reasoning than previously understood"

> "Even in current frontier models, signs of opaque reasoning can already be found"

> "model representations remain anchored specifically to English language in intermediate layers... reminiscent of previous findings reporting a 'semantic hub' in multilingual models"

---

## Relevance to Thesis

**BALANCED — provides mechanistic insight but doesn't address core thesis**

### Tangential to main thesis:
- Paper focuses on AI safety (can we monitor hidden reasoning?)
- Doesn't directly test pattern matching vs. genuine reasoning
- Doesn't test generalization or compositional reasoning

### Relevant insights:
- Shows internal representations preserve semantic structure
- Demonstrates gap between output tokens and internal computation
- Supports idea that CoT may not reflect actual reasoning process

### Key limitation for our purposes:
The paper shows we can READ what a model is "thinking" when it encodes its output, but doesn't tell us whether that thinking constitutes genuine reasoning or sophisticated pattern matching. A model could produce pattern-matched reasoning that is perfectly decodable but still not genuinely generalize.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Verdict: BALANCED (Provides mechanistic interpretability framework; shows internal representations preserve semantics; but doesn't address pattern matching vs. reasoning; ROT-13 is artificial testbed; no generalization testing)
