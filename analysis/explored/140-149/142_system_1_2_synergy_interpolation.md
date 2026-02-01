# Paper Analysis: System 1&2 Synergy via Dynamic Model Interpolation

## Metadata
- **arXiv ID**: 2601.21414
- **Title**: System 1&2 Synergy via Dynamic Model Interpolation
- **Authors**: Chenxu Yang, Qingyi Si, Chong Tian, Xiyu Liu, Dingyu Yao, Chuanyu Qin, Zheng Lin, Weiping Wang, Jiaqi Wang
- **Date**: January 2026
- **Venue**: IJCAI 2026

---

## Core Claims (from Abstract)

1. **Output control is misaligned** — current approaches limit what models produce, but output length is a "symptom" not root cause
2. **Capability control is the right approach** — modulate HOW models think, not what they produce
3. **Linear interpolation between Instruct and Thinking checkpoints** yields a convex, monotonic Pareto frontier
4. **DAMI framework** dynamically estimates query-specific "Reasoning Intensity" λ(q) to configure cognitive depth
5. **Achieves higher accuracy than Thinking model while remaining efficient**

---

## Methodology

### Key Insight
Instead of training a unified System 1/System 2 model, interpolate between EXISTING checkpoints:
- **Instruct checkpoint** = System 1 (fast, intuitive)
- **Thinking checkpoint** = System 2 (slow, deliberative)

### DAMI (Dynamic Model Interpolation)
- Estimates query-specific λ(q) = "Reasoning Intensity"
- Interpolates model weights: θ = (1-λ)·θ_instruct + λ·θ_thinking
- Two methods:
  1. **Training-based**: Preference learning encoding accuracy + efficiency
  2. **Zero-shot**: Confidence-based method using inter-model cognitive discrepancy

### Key Finding
> "Linear interpolation yields a convex, monotonic Pareto frontier, underpinned by representation continuity and structural connectivity"

This means intermediate models along the interpolation path behave predictably.

---

## Relationship to Thesis

### BALANCED — provides mechanistic insights:

**SUPPORTS the thesis:**

1. **"Thinking" is not emergent** — it's interpolatable. If System 2 reasoning were a fundamentally different capability, linear interpolation shouldn't work smoothly.

2. **Reasoning intensity is adjustable** — this suggests "thinking" is more about resource allocation than qualitative capability difference

3. **Checkpoints share representations** — the fact that interpolation works implies Instruct and Thinking models use similar underlying representations, just weighted differently

4. **Output = symptom, not cause** — authors explicitly state output length is a symptom of cognitive configuration, supporting the view that longer CoT is format, not genuine reasoning

**CHALLENGES the thesis (weakly):**

1. **Thinking models do achieve higher accuracy** — there IS a real capability difference between System 1 and System 2
2. **Query-specific adaptation helps** — suggests some problems genuinely require more "reasoning"

### Key Mechanistic Insight

The success of linear interpolation suggests:
- Instruct and Thinking checkpoints are NOT fundamentally different architectures
- They're points on a CONTINUOUS capability manifold
- "Reasoning depth" is a quantitative parameter, not a qualitative capability

This is consistent with the thesis: **"thinking" = activating more of the same patterns**, not genuinely different reasoning.

---

## Relationship to Other Papers

### Supports
- **Paper 133** (Base Models Know How to Reason): Both show reasoning is latent, surfaced by configuration
- **Paper 135** (Demystifying Long CoT): Both analyze the System 1/System 2 dynamic
- **Paper 140** (Not All Code Is Equal): Both show capability is a continuous function of training/configuration

### Extends
- **Paper 129/130** (Over/Underthinking): DAMI could address the overthinking problem by dynamically adjusting λ
- **Interplay (2512.07783)**: Interpolation = another form of surfacing latent capability

### Provides Mechanism For
- Why "thinking" can be induced by prompting — it's activating points along the interpolation manifold
- Why overthinking happens — λ set too high for simple problems

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper: January 2026)

### Potential Counter-Arguments

1. **Linear interpolation may not scale** — works for small models, may break for larger ones
2. **Evaluation limited to math** — tested on mathematical reasoning benchmarks only
3. **Doesn't explain WHY interpolation works** — descriptive, not mechanistic
4. **May overfit to specific checkpoint pairs** — unclear if generalizes across model families

### Limitations (Implicit)
- Requires both Instruct and Thinking checkpoints
- Only tested on mathematical reasoning
- Confidence estimation may not generalize

---

## Key Quotes

1. **On output control**: "output length is merely a symptom of the model's cognitive configuration, not the root cause"

2. **On interpolation**: "linear interpolation yields a convex, monotonic Pareto frontier, underpinned by representation continuity and structural connectivity"

3. **On capability control**: "we shift the focus to capability control, which modulates how models think rather than what they produce"

---

## Critical Assessment

### What this paper shows:
1. System 1/System 2 can be interpolated linearly
2. Query-specific reasoning intensity improves efficiency
3. Output control (limiting tokens) is suboptimal
4. Representations are continuous between Instruct and Thinking

### Implications for the thesis:

**Supports the view that "thinking" is quantitative, not qualitative:**
- If reasoning were genuinely different from non-reasoning, interpolation shouldn't work smoothly
- The convex Pareto frontier suggests a single capability manifold, not distinct modes
- "Thinking" = more activation of existing patterns, not new capability

**Key insight**: The paper treats "reasoning depth" as a continuous parameter (λ), which implies reasoning is not a discrete capability but a matter of resource allocation within a unified representation space.

---

## Status
- [x] Abstract analyzed
- [x] Core claims extracted
- [ ] Full paper read (HTML unavailable, PDF binary)
- [x] Key methodology understood
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

**Note**: Full paper analysis limited by HTML unavailability. Analysis based on abstract + arXiv page.
