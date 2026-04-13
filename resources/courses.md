# Educational Resources

Curated courses, tutorials, and learning materials for understanding LLMs from first principles.

---

## Stanford Courses

### CS336: Language Modeling from Scratch
**Instructors**: Percy Liang, Tatsunori Hashimoto

Build an LLM end-to-end: tokenizer, architecture, training, data pipeline, alignment.

| Resource | Link |
|----------|------|
| Course Website | https://cs336.stanford.edu/ |
| Spring 2024 | https://cs336.stanford.edu/spring2024/ |
| Spring 2025 | https://cs336.stanford.edu/spring2025/ |
| Spring 2026 | https://cs336.stanford.edu/ |
| Lectures (.py files) | https://github.com/stanford-cs336/lectures |
| Assignments | https://github.com/stanford-cs336 |
| YouTube Playlist | https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_ |

---

### CME 295: Transformers & Large Language Models
**Instructors**: Amidi & Amidi

9 lectures covering attention, scaling, alignment, reasoning (GRPO), and LLM-as-Judge pitfalls.

| Resource | Link |
|----------|------|
| Course Website | https://cme295.stanford.edu/ |
| Cheatsheets | https://github.com/afshinea/stanford-cme-295-transformers-large-language-models |

---

### CME 296: Diffusion & Large Vision Models

Shows same techniques (DPO, GRPO) apply to vision — "reasoning" not unique to text.

| Resource | Link |
|----------|------|
| Course Website | https://cme296.stanford.edu/ |

---

## YouTube Channels & Videos

### Andrej Karpathy

| Video | Link |
|-------|------|
| Let's build the GPT Tokenizer | https://www.youtube.com/watch?v=zduSFxRajkE |
| Neural Networks: Zero to Hero (playlist) | https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ |

---

## Books

### Build a Large Language Model (From Scratch)
**Author**: Sebastian Raschka  
**Publisher**: Manning, 2024

| Resource | Link |
|----------|------|
| GitHub Repository | https://github.com/rasbt/LLMs-from-scratch |
| Book Website | https://www.manning.com/books/build-a-large-language-model-from-scratch |

---

## Blog Posts & Articles

### Andrej Karpathy

| Post | Link |
|------|------|
| microgpt (Feb 2026) | https://karpathy.github.io/2026/02/12/microgpt/ |
| The Space of Minds | https://karpathy.bearblog.dev/the-space-of-minds/ |
| Animals vs Ghosts | https://karpathy.bearblog.dev/animals-vs-ghosts/ |
| Verifiability | https://karpathy.bearblog.dev/verifiability/ |
| 2025 Year in Review | https://karpathy.bearblog.dev/year-in-review-2025/ |
| microgpt gist (200 lines) | https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95 |

### Sebastian Raschka

| Post | Link |
|------|------|
| Understanding Reasoning LLMs | https://magazine.sebastianraschka.com/p/understanding-reasoning-llms |
| Self-Attention from Scratch | https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention |
| Understanding Large Language Models | https://magazine.sebastianraschka.com/p/understanding-large-language-models |

### Abliteration & Steering

| Post | Author | Link |
|------|--------|------|
| Abliteration Tutorial | mlabonne | https://huggingface.co/blog/mlabonne/abliteration |
| Attractor States Research | MATS 9.0 | https://www.lesswrong.com/posts/mgjtEHeLgkhZZ3cEx |

---

## Interactive Tools

### Transformer Explainer
**Source**: Georgia Tech (Polo Club)

Interactive GPT-2 visualization for understanding transformer architecture.

| Resource | Link |
|----------|------|
| Live Demo | https://poloclub.github.io/transformer-explainer/ |

---

## Code Repositories

### Zero-Dependency Implementations

| Repository | Description | Link |
|------------|-------------|------|
| no-magic | 47 ML algorithms without dependencies — "Because `model.fit()` isn't an explanation" | https://github.com/no-magic-ai/no-magic |
| microgpt.py | 200 lines of pure Python GPT | https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95 |
| LLMs-from-scratch | Full LLM implementation (Manning book) | https://github.com/rasbt/LLMs-from-scratch |

---

## Key People

| Name | Affiliation | Known For |
|------|-------------|-----------|
| **Andrej Karpathy** | Former Tesla AI / OpenAI | Educational content, microgpt, nanoGPT |
| **Sebastian Raschka** | Lightning AI | LLMs-from-scratch book, Substack |
| **Percy Liang** | Stanford HAI | CS336, HELM benchmark, transparency |
| **Tatsunori Hashimoto** | Stanford | CS336, distribution shift, evaluation |
| **Jacob Andreas** | MIT | Compositional reasoning, language grounding |

---

## Classic Papers & Essays

| Title | Author | Year | Link |
|-------|--------|------|------|
| The Bitter Lesson | Richard Sutton | 2019 | http://www.incompleteideas.net/IncIdeas/BitterLesson.html |
| Computer Power and Human Reason | Joseph Weizenbaum | 1976 | (book) |

---

## How These Resources Connect to the Thesis

These educational materials help understand **why** LLMs exhibit the behaviors documented in this research:

1. **CS336** — Shows how LLMs are built; reveals no "reasoning module" exists
2. **Tokenization videos** — Explains how text becomes numbers; no semantics preserved
3. **LLMs-from-scratch** — Hands-on proof that it's just matrix multiplication
4. **Transformer Explainer** — Visualizes attention; shows pattern matching, not reasoning
5. **Abliteration tutorials** — Demonstrates alignment is a removable direction

Understanding the implementation makes the thesis claims concrete: there's no place in the architecture where "reasoning" could live.
