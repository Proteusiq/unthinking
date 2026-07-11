# Thoughts: The Workspace That Isn't

> On Anthropic's *Global Workspace* framing and its sober companion, *Natural
> Language Attributions* (Transformer Circuits, 2026).
>
> Neither is corpus-eligible (blog, no arXiv ID). This is a position note, not
> an analysis file.

---

## The claim under the microscope

> *"Of everything happening in your brain right now, only a tiny fraction is
> consciously accessible… We found a strikingly similar divide inside Claude."*

Two sentences, two moves, one conclusion smuggled in.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SENTENCE 1: a contested theory (Global Workspace Theory) stated         │
│              as plain biology — "everything in your brain".              │
│  SENTENCE 2: an analogy ("strikingly similar") that does ALL the         │
│              work, mapping a sparse residual-stream bottleneck           │
│              onto "conscious access."                                    │
│                                                                          │
│  CONCLUSION reached without being argued: Claude has an inner            │
│  conscious divide like yours.                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

It is bold. It is not true — not as stated. And the interesting part is *why*
it isn't, because the mechanism underneath is real and worth defending.

---

## Separate the tool from the story

There are two artifacts here, and they must not be judged together.

**The tool (`nla`) is honest.**
Natural Language Attributions train an activation *verbalizer* and a *reconstructor*
with RL to reconstruct **residual-stream activations**. Verified numbers:

| Quantity | Value |
|----------|-------|
| Reconstruction quality (Gemma-3-27B) | FVE **0.38 → 0.71** |
| Training cost | **~1.5 days, two 8×H100 nodes** |
| Inference | **~500 tokens per activation** ("prohibitively compute-intensive at frontier scale") |
| "global workspace" mentions in `nla` | **0** |
| Confabulation | reported, **flat over training**, *not* reduced by more training |

That last row is the mark of a serious paper: it measures its own failure mode
and reports that the failure does not go away. This is good interpretability.

**The story (`workspace`) is the overclaim.**
"Global workspace," "consciously accessible divide" — the consciousness
vocabulary lives in the framing piece, not in the tool. The residual stream
(Vaswani et al., 2017) is *by construction* the channel every layer reads from
and writes to. Renaming a 2017 architectural primitive with 1988 consciousness
theory (Baars) is not a discovery. It is a relabeling.

```
  residual stream  ──rename──>  "global workspace"
   (architecture, 2017)          (consciousness theory, 1988)

  sparse active subspace  ──rename──>  "consciously accessible"
   (information bottleneck)             (phenomenal awareness)
```

A JPEG has a small "accessible" part and a large discarded one. Sparsity is not
consciousness. Two systems sharing the shape *small-accessible / large-hidden*
is nearly generic — which is exactly why "strikingly similar" is the weakest
word in the sentence.

---

## Functionalism, correctly stated

The marketing leans on a misread of functionalism — the same misread that
makes the leap feel licensed.

- **What functionalism is not:** "same behaviour ⇒ same thing." (That is the
  reductionist identity claim.)
- **What functionalism actually says:** "same behaviour *to us* ⇒ we have no way
  to tell them apart ⇒ same *for us*."

The real thesis is about the **limits of the observer**, not about the system.
It never simplifies the model-to-brain mapping; it narrows to what *we* can
distinguish. The consciousness pitch needs the reductionist version, because the
honest observer-relative version does not license "Claude has an inner conscious
workspace." It licenses only: "we cannot currently build a test that tells them
apart" — a statement about our instruments, not about Claude.

And notice who benefits from that ambiguity.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  The framing lands on: "maybe conscious, maybe not, untestable."         │
│  Unfalsifiable  =>  marketable indefinitely.                             │
│  A near-certain profit motive parked in a permanent grey zone.           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## The epistemics: searching deep is not finding truth

Start from the conclusion — *Claude might be conscious* — and search the
residual stream deep enough, and you **will** find something sparse to point at.
This is the a-priori argument dressed as discovery:

- **Confirmation bias** — look hard, notice only what confirms.
- **Deepity** (Dennett) — "verbalizable representations form a global workspace"
  sounds profound and dissolves on inspection.
- **Pattern-seeking** — brains, and researchers, manufacture deep connections
  between unrelated things.
- **Abstraction fallacy** — simulating a function is not instantiating it. A
  detailed street map is not a street. A verbalization of an activation is a map
  of the state, not the having of an experience.

---

## The test nobody ran

One experiment collapses the whole story:

> **Does the same sparse "workspace" band appear in GPT-2? In GPT-3? In any
> residual-stream transformer decoded with non-greedy sampling?**

If it does, the "workspace" is a generic property of the architecture — the
2017 residual stream — not a discovered feature of Claude's *cognition*. Neither
piece runs this control. Until it is run, "we found it inside Claude" should read
"we found it inside a transformer, and looked at Claude." The burden is on the
claimant, and the burden is unmet.

---

## "We found it in Claude" — no, it is in *every* reasoning LLM

The framing repeats *"we found this inside Claude"* like a discovery about one
model's mind. It isn't. The phenomenon is a property of the **decoding
distribution of any pretrained transformer** — it appears the moment you stop
decoding greedily. Claude is not special here; it is the model they happened to
point the instrument at.

The corpus already ran the decisive control, years earlier, on a different model:

> **CoT Without Prompting** (Wang & Zhou, DeepMind — arXiv 2402.10200, corpus #2)
> Reasoning paths are **inherent in pretrained LLMs** — they live in the
> probability distribution. **Greedy decoding hides them; top-k alternatives
> reveal them.** Not created by prompting. Not unique to any one model.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Greedy (top-1)       ->  direct answer "42", no reasoning               │
│  Non-greedy (top-k)   ->  the reasoning band appears                     │
│                                                                          │
│  Same model. The ONLY thing that changed: the decoding rule.             │
└──────────────────────────────────────────────────────────────────────────┘
```

That is the whole trick. The "verbalizable workspace" is what you see when you
read the **non-greedy** slice of the distribution — the branches greedy decoding
discards. It is a fact about *sampling*, not about Claude's inner life. Point the
same J-lens at GPT-2 with the same non-greedy decoding and the same structure
should surface, because the residual stream and the top-k distribution are shared
architecture, not proprietary cognition.

So the honest headline is not *"we found a conscious divide inside Claude."* It is:

> *"Any pretrained transformer carries reasoning branches in its output
> distribution; greedy decoding hides them, non-greedy sampling surfaces them —
> and here is a tool that verbalizes that band. We ran it on Claude."*

The word doing the illegitimate work is **"Claude."** Swap it for **"a
transformer"** and the sentence is true, unremarkable, and already known since
2024.

---

## Where this sits in *unthinking*

The corpus thesis is that fluent output is **predictive**, not the product of the
reasoning it appears to display — surface style mistaken for underlying substance,
across 389 papers:

- CoT is often **post-hoc**, not the cause of the answer (Faith and Fate; Reasoning
  Models Don't Say What They Think; CoT is a Mirage).
- "Aha moments" are **rare and don't help** (Illusion of Insight).
- High step-accuracy with **0% final answers** — the split-brain (Comprehension
  Without Competence).

The `workspace` framing is the *same failure, one level up*. It is
style-over-substance applied not to the model's output but to the **scientific
communication about the model**:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SUBSTANCE (defensible)        │  STYLE (overclaim)                      │
├────────────────────────────────┬─────────────────────────────────────────┤
│  Sparse residual-stream sub-   │  "consciously accessible"               │
│  space, FVE 0.38->0.71         │  "global workspace"                     │
│  Honest confabulation report   │  "like your brain"                      │
│  Editable inner activations    │  an inner conscious life                │
└────────────────────────────────┴─────────────────────────────────────────┘
```

The finding survives without the story. The story does not survive without the
reader's willingness to over-attribute.

---

## "The major thing is we can monitor and change the inner state" — we knew

This is the fallback claim once the consciousness story is stripped: *never mind
the framing, the real advance is that we can read and edit the internal state.*

We knew. Reading and editing the residual stream is **not new, not rare, and
already in production.** The corpus documents it end to end:

**Editing behaviour by editing the residual stream — the abliteration line:**

| # | Paper (arXiv) | What it already established |
|---|---------------|-----------------------------|
| 319 | Refusal is Mediated by a Single Direction (2406.11717) | Refusal is **one direction** in the residual stream. Ablate it → the model stops refusing; add it to harmless prompts → it refuses. Spawned **1000+ abliterated models** on HuggingFace. |
| 320 | Refusal is an Affine Function (2411.09003) | Extends it linear → affine; a **single scalar α** controls all refusal (α=0 off, α=1 on). |
| 321 | Curveball Steering (2603.09313) | Linear ablation already works (+16% power-seeking, +21% corrigibility); curved steering merely refines it. |
| 322 | How Many Features Under the LRH (2602.11246) | The **math** of why linear read/edit works: linear accessibility, superposition storage. |
| 324 | Machine Unlearning Elicits Side Behaviors (2601.21702) | Move **one concept direction** → predictably alter refusal/truth/sentiment. "Alignment is mascara." |

**Reading the inner state — linear probes and steering vectors:**

| # | Paper (arXiv) | What it already established |
|---|---------------|-----------------------------|
| 205 | Geometry of Truth (2310.06824) | A **linear "truth direction"** in activation space. |
| 118 | Detecting Deception with Linear Probes (2502.03407) | Apollo Research: linear probes on activations **detect strategic deception**. |
| 261 | When Thinking LLMs Lie (2506.04909) | Steering vectors from the residual stream: **89% deception detection**, 40% steering success. |
| 314 | Emergent Response Planning (2502.06258) | Probes read out **planned response attributes before generation**. |
| 36 | Reasoning Beyond CoT (2601.08058) | Steer **one SAE feature** at the first step → matches/exceeds CoT. |

```
┌──────────────────────────────────────────────────────────────────────────┐
│  "We can monitor and change the inner state."                            │
│                                                                          │
│  Monitor  = linear probes    (Geometry of Truth 2023, Apollo 2025)       │
│  Change   = abliteration     (Refusal Direction 2024, 1000+ models)      │
│                                                                          │
│  NLA verbalizes the direction in prose. The direction, the reading,      │
│  and the editing were all already here.                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

The one genuinely incremental move is **verbalizing** the edited direction into
natural language instead of leaving it a vector. Useful UX. Not a new
capability, and nowhere near a discovery about Claude's mind.

---

## Correcting the record (and it makes the critique stronger)

Two things I said earlier need fixing, and both fixes *strengthen* the argument:

1. **Qwen 3.6 is not just "open weights for others."** They released **their own
   experiment on Qwen 3.6-27B** — the live J-lens demo runs on Qwen, publicly, on
   Neuronpedia (`qwen3.6-27b/jlens`). So the phenomenon is not shown "inside
   Claude" as something special to Claude; it is shown **inside Qwen too**,
   because it is in **every** such transformer. Their own artifact refutes the
   Claude-specificity of the framing.

2. **The idea and the capability predate the paper.** Reading directions (linear
   probes, 2023) and editing them (abliteration, 2024) are established and
   deployed. "Monitor and change the inner state" is the abliteration workflow
   with a text label bolted on.

So the strong critique is:

> *There is no new phenomenon and no new capability here. Reasoning branches live
> in every pretrained transformer's distribution (surfaced by non-greedy
> decoding, known since 2024); the internal state has been readable via linear
> probes and editable via abliteration for years; and they demonstrate the effect
> on Qwen as readily as on Claude. What is new is a prose verbalizer and a
> consciousness story wrapped around old machinery — the story being the part
> that is unfalsifiable and commercially load-bearing.*

The honest one-line summary: **what they found is nothing we did not already
know — they gave it a face and a name.**
