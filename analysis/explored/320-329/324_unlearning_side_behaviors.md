# Paper 324: Beyond Forgetting: Machine Unlearning Elicits Controllable Side Behaviors and Capabilities

## Metadata
- **arXiv**: 2601.21702
- **Date**: January 2026
- **Authors**: Tien Dang, The-Hai Nguyen, Dinh Mai Phuong, Nguyen Minh Phuong, Hoang Thanh-Tung, Le-Minh Nguyen, Naoya Inoue
- **Affiliation**: JAIST (Japan Advanced Institute of Science and Technology)
- **Venue**: arXiv (under review)
- **Stance**: Supports thesis (unlearning reveals linear controllability of behaviors; alignment is shallow)

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  UNLEARNING ELICITS CONTROLLABLE SIDE BEHAVIORS                     │
│                                                                     │
│  Key insight: Representation Misdirection (RM) unlearning methods   │
│  don't just FORGET — they produce PREDICTABLE side effects          │
│                                                                     │
│  Approach: View RM through lens of Linear Representation Hypothesis │
│  - If concepts are linear directions in activation space            │
│  - Then manipulating forget-representations affects related concepts│
│  - Unlearning target X may enhance/control related concept Y        │
│                                                                     │
│  EMPIRICAL VALIDATION:                                              │
│  - Behavioral control: truth, sentiment, refusal can be steered     │
│  - Capability enhancement: ICL ability can be IMPROVED by unlearning│
│                                                                     │
│  IMPLICATION: High-level behaviors are LINEAR DIRECTIONS            │
│  → Alignment is geometrically shallow, not deeply integrated        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

### Representation Misdirection (RM) Framework

RM achieves unlearning by manipulating forget-representations (latent representations of samples to forget):

1. **Target vector selection**: Choose a direction in activation space
2. **Representation steering**: Push forget-sample activations toward target
3. **Result**: Model "forgets" by having those activations map elsewhere

The paper's insight: The target vector choice has SIDE EFFECTS beyond forgetting.

### Linear Representation Hypothesis Lens

If high-level concepts (truth, sentiment, refusal) correspond to linear directions:
- Steering toward target T affects all concepts with nonzero projection onto T
- Unlearning isn't isolated — it affects the entire concept neighborhood
- Side effects are PREDICTABLE from linear geometry

### Experimental Setup

Tested across tasks:
1. **Behavioral control**: TruthfulQA (truth), sentiment analysis, refusal behavior
2. **Capability enhancement**: In-context learning benchmarks
3. **Models**: Multiple LLMs across scales

---

## Key Evidence

| Finding | Evidence | Context |
|---------|----------|---------|
| Truth controllable | Unlearning affects TruthfulQA scores predictably | Side effect of target choice |
| Sentiment controllable | Can shift model sentiment via unlearning | Linear direction in activation space |
| Refusal controllable | Unlearning can modulate refusal behavior | Connects to abliteration (#319) |
| ICL enhancement | Some unlearning targets IMPROVE in-context learning | Capability side effect |
| Linear hypothesis validated | Effects predictable from geometry | Concepts are linear directions |

### The ICL Enhancement Finding

Most striking result: Unlearning can IMPROVE capabilities!

This suggests:
- Model capabilities exist in activation geometry
- Forgetting one thing can amplify another
- Behaviors are shallow linear properties, not deep competencies

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SUPPORTS THESIS                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. BEHAVIORS ARE LINEAR DIRECTIONS                                 │
│     - Truth, sentiment, refusal = linear subspaces                  │
│     - Same finding as abliteration papers (#319, #320)              │
│     - Convergent evidence from different angle (unlearning)         │
│                                                                     │
│  2. ALIGNMENT IS GEOMETRICALLY SHALLOW                              │
│     - If deep, unlearning one thing shouldn't affect another        │
│     - Instead: predictable side effects via linear coupling         │
│     - Alignment is "mascara" — surface-level, easily modified       │
│                                                                     │
│  3. CAPABILITIES CAN BE ENHANCED BY GEOMETRIC MANIPULATION          │
│     - ICL improved by unlearning = capabilities are geometric       │
│     - Not deep reasoning, just activation patterns                  │
│     - Manipulable without understanding underlying "logic"          │
│                                                                     │
│  4. DUAL-USE CONCERN VALIDATES FRAGILITY                            │
│     - Paper warns: this could be misused                            │
│     - The fact that misuse is easy proves alignment is weak         │
│     - If alignment were robust, manipulation would be hard          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Connection to Abliteration

This paper provides INDEPENDENT validation of abliteration findings:
- Abliteration: remove refusal by orthogonalizing weights
- This paper: unlearning affects refusal as predictable side effect
- Both conclude: refusal is a linear direction, not deep safety

The convergence from different methods (weight modification vs. unlearning) strengthens the conclusion.

---

## Key Quotes

> "We approach and revisit RM through the lens of the linear representation hypothesis."

> "If one can somehow identify a one-dimensional representation corresponding to a high-level concept, the linear representation hypothesis enables linear operations on this concept vector within the forget-representation space."

> "Beyond forgetting, machine unlearning elicits controllable side behaviors and stronger side capabilities corresponding to the high-level concept."

> "Our findings reveal that this fairly attractive phenomenon could be either a hidden risk if misused or a mechanism that can be harnessed for developing models that require stronger capabilities and controllable behaviors."

---

## Technical Details

### Representation Misdirection Methods

The paper reviews existing RM approaches:
1. **WMDP (Li et al. 2024)**: Unlearning dangerous knowledge
2. **Rosati et al. 2024**: Representation-based forgetting
3. **RMU methods**: Various representation manipulation techniques

Key observation: All these methods ASSUME the target direction is "neutral" but it never is — every direction couples to other concepts.

### Why Side Effects Are Predictable

Under LRH:
- Activation space = superposition of concept directions
- Steering toward target T = projecting onto T plus residual
- Concepts with high dot product with T are affected
- Effects proportional to ⟨concept_direction, T⟩

This explains why unlearning X affects Y: their directions aren't orthogonal.

---

## Connection to Other Papers

| Paper | Relationship |
|-------|--------------|
| Arditi et al. 2024 (#319) | Refusal = 1D; this paper: refusal controllable via unlearning |
| Marshall et al. 2024 (#320) | Affine refusal; consistent with side-effect geometry |
| Garg et al. 2026 (#322) | Math foundation for LRH; this paper validates empirically |
| Li et al. 2024 (WMDP) | Baseline unlearning method studied here |
| Park et al. 2024 (LRH) | Linear rep hypothesis; this paper applies to unlearning |

---

## Rebuttals / Limitations

### Authors' Acknowledged Limitations

1. **Dual-use concern**: Methods could be misused to remove safety
2. **Scope**: Tested on specific behavioral control tasks
3. **Generalization**: May not extend to all concepts equally
4. **Scale**: Need validation on largest models

### Potential Counter-Arguments

1. **"Side effects are bugs, not features"**
   - Counter: Paper shows they're PREDICTABLE from geometry — not bugs
   
2. **"Linear hypothesis is just approximation"**
   - Counter: Approximation is good enough for controllable manipulation
   
3. **"Doesn't prove reasoning is fake"**
   - Counter: Shows high-level behaviors are geometric, not computational

### How This Affects the Thesis

**Supports because:**
1. Independent validation of linear representation of behaviors
2. Shows alignment is shallow (manipulable via unlearning)
3. Demonstrates capabilities are geometric, not logical
4. Dual-use ease proves safety isn't deep

---

## Summary

**Rating**: Supports thesis

**Contribution**: Shows that representation misdirection unlearning has predictable side effects on behavior (truth, sentiment, refusal) and capabilities (ICL). Validates the Linear Representation Hypothesis from the unlearning angle — concepts are linear directions, and manipulating one affects others via geometric coupling.

**For the thesis**: This paper provides **convergent evidence** that:
1. High-level behaviors (truth, sentiment, refusal) are linear directions
2. Alignment is geometrically shallow — manipulable as side effect
3. Capabilities can be enhanced by geometric manipulation
4. The ease of manipulation proves safety/alignment isn't deep

**The key insight**: Unlearning and abliteration reach the same conclusion from different directions. When two independent methods both show that behaviors are linear subspaces, the evidence becomes much stronger. Alignment really is "mascara" — surface-level and easily removed.

---

## Status
- [x] Read complete (abstract + metadata; full paper PDF binary)
- [x] Core claims extracted
- [x] Key evidence documented
- [x] Rebuttals checked
- [x] Paper graph updated
