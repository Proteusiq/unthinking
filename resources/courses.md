# Educational Resources

Curated courses, tutorials, and learning materials for understanding LLMs from first principles.

---

## Table of Contents

1. [Stanford Courses](#stanford-courses)
2. [Andrej Karpathy](#andrej-karpathy)
3. [Sebastian Raschka](#sebastian-raschka)
4. [Interactive Tools](#interactive-tools)
5. [Classic Papers & Essays](#classic-papers--essays)
6. [Connection to Thesis](#how-these-resources-connect-to-the-thesis)

---

## Stanford Courses

### CS336: Language Modeling from Scratch

**Instructors**: Percy Liang, Tatsunori Hashimoto  
**Units**: 5 credits (very implementation-heavy)  
**Philosophy**: "Drawing inspiration from operating systems courses that create an entire OS from scratch"

Build an LLM end-to-end: tokenizer, architecture, training, data pipeline, alignment.

| Resource | Link |
|----------|------|
| Course Website | https://cs336.stanford.edu/ |
| Spring 2024 | https://cs336.stanford.edu/spring2024/ |
| Spring 2025 | https://cs336.stanford.edu/spring2025/ |
| GitHub Organization | https://github.com/stanford-cs336 |
| Lectures (.py files) | https://github.com/stanford-cs336/lectures |

#### Syllabus (Spring 2026)

| # | Topic | Instructor |
|---|-------|------------|
| 1 | Overview, Tokenization | Percy |
| 2 | PyTorch (einops), Resource Accounting (FLOPs, memory) | Percy |
| 3 | Architectures, Hyperparameters | Tatsu |
| 4 | Attention Alternatives & Mixture of Experts | Tatsu |
| 5-6 | GPUs, TPUs, Kernels, Triton, XLA | Both |
| 7-8 | Parallelism | Both |
| 9, 11 | Scaling Laws | Tatsu |
| 10 | Inference | Percy |
| 12 | Evaluation | Percy |
| 13-14 | Data (sources, filtering, mixing, SFT) | Percy |
| 15-17 | Alignment (RLHF, DPO, RL algorithms, RL systems) | Both |

#### Assignments

| # | Title | What You Build | Repository |
|---|-------|----------------|------------|
| 1 | Basics | BPE Tokenizer, Transformer, AdamW optimizer | [![GitHub](https://img.shields.io/github/stars/stanford-cs336/assignment1-basics?style=flat&label=⭐)](https://github.com/stanford-cs336/assignment1-basics) |
| 2 | Systems | FlashAttention2 in Triton, distributed training | [![GitHub](https://img.shields.io/github/stars/stanford-cs336/assignment2-systems?style=flat&label=⭐)](https://github.com/stanford-cs336/assignment2-systems) |
| 3 | Scaling | Fit scaling laws, project model behavior | [![GitHub](https://img.shields.io/github/stars/stanford-cs336/assignment3-scaling?style=flat&label=⭐)](https://github.com/stanford-cs336/assignment3-scaling) |
| 4 | Data | Process Common Crawl, MinHash deduplication | [![GitHub](https://img.shields.io/github/stars/stanford-cs336/assignment4-data?style=flat&label=⭐)](https://github.com/stanford-cs336/assignment4-data) |
| 5 | Alignment | SFT, RL for reasoning, DPO safety | [![GitHub](https://img.shields.io/github/stars/stanford-cs336/assignment5-alignment?style=flat&label=⭐)](https://github.com/stanford-cs336/assignment5-alignment) |

#### Instructors

**Percy Liang** — [Website](https://cs.stanford.edu/~pliang/) | [GitHub](https://github.com/percyliang)
- Professor of CS (courtesy in Statistics), Stanford
- Director, Center for Research on Foundation Models (CRFM)
- Creator of HELM benchmark, Marin project, CodaLab
- PhD UC Berkeley (Michael Jordan, Dan Klein)
- Presidential Early Career Award (2019), IJCAI Computers and Thought Award (2016)

**Tatsunori Hashimoto** — [Website](https://thashim.github.io/)
- Assistant Professor of CS, Stanford
- Research: robustness, fairness, LLM evaluation
- Key papers: "Emergent abilities of LLMs", "AlpacaFarm", "Fairness Without Demographics"
- PhD MIT CSAIL (Tommi Jaakkola)

#### Related Stanford Courses

| Course | Title | Connection |
|--------|-------|------------|
| CS224N | NLP with Deep Learning | Prerequisite; broader NLP topics |
| CS229 | Machine Learning | ML foundations CS336 builds on |
| CS324 | Advances in Foundation Models | Ecosystem/policy; CS336 is implementation |

#### Major Projects from Instructors

| Project | Description | Link |
|---------|-------------|------|
| HELM | Holistic Evaluation of Language Models | https://crfm.stanford.edu/helm/ |
| Marin | Open foundation model development | https://marin.community/ |
| AlpacaFarm | RLHF simulation framework | [Paper](https://arxiv.org/abs/2305.14387) |
| CodaLab | Reproducible research platform | https://worksheets.codalab.org/ |

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

## Andrej Karpathy

**Background**: Stanford PhD, Former Director of AI at Tesla, OpenAI founding member  
**GitHub**: [@karpathy](https://github.com/karpathy) ![Followers](https://img.shields.io/github/followers/karpathy?style=flat&label=followers)  
**YouTube**: [@AndrejKarpathy](https://www.youtube.com/@AndrejKarpathy)  
**Twitter**: [@karpathy](https://x.com/karpathy)

### Key Concepts He's Coined

- **"Software 2.0"** — Neural networks as a new programming paradigm
- **"Vibe Coding"** — Programming via English prompts without looking at code
- **"Ghosts vs Animals"** — LLMs are fundamentally different from biological intelligence
- **"Jagged Intelligence"** — LLMs excel in some areas, fail surprisingly in others

### GitHub Repositories

#### Flagship Educational Repos

| Repository | Description |
|------------|-------------|
| [![nanoGPT](https://img.shields.io/github/stars/karpathy/nanoGPT?style=flat&label=nanoGPT)](https://github.com/karpathy/nanoGPT) | Simplest, fastest repo for training/finetuning GPTs |
| [![llm.c](https://img.shields.io/github/stars/karpathy/llm.c?style=flat&label=llm.c)](https://github.com/karpathy/llm.c) | LLM training in simple, raw C/CUDA |
| [![minGPT](https://img.shields.io/github/stars/karpathy/minGPT?style=flat&label=minGPT)](https://github.com/karpathy/minGPT) | Minimal PyTorch GPT implementation |
| [![nn-zero-to-hero](https://img.shields.io/github/stars/karpathy/nn-zero-to-hero?style=flat&label=nn-zero-to-hero)](https://github.com/karpathy/nn-zero-to-hero) | Neural Networks: Zero to Hero course materials |
| [![llama2.c](https://img.shields.io/github/stars/karpathy/llama2.c?style=flat&label=llama2.c)](https://github.com/karpathy/llama2.c) | Inference Llama 2 in one file of pure C |
| [![micrograd](https://img.shields.io/github/stars/karpathy/micrograd?style=flat&label=micrograd)](https://github.com/karpathy/micrograd) | Tiny autograd engine with PyTorch-like API |
| [![minbpe](https://img.shields.io/github/stars/karpathy/minbpe?style=flat&label=minbpe)](https://github.com/karpathy/minbpe) | Minimal BPE tokenizer |
| [![makemore](https://img.shields.io/github/stars/karpathy/makemore?style=flat&label=makemore)](https://github.com/karpathy/makemore) | Autoregressive character-level language model |
| [![build-nanogpt](https://img.shields.io/github/stars/karpathy/build-nanogpt?style=flat&label=build-nanogpt)](https://github.com/karpathy/build-nanogpt) | Video+code lecture on building nanoGPT |

#### Newer Repos (2025-2026)

| Repository | Description |
|------------|-------------|
| [![autoresearch](https://img.shields.io/github/stars/karpathy/autoresearch?style=flat&label=autoresearch)](https://github.com/karpathy/autoresearch) | AI agents running research automatically |
| [![nanochat](https://img.shields.io/github/stars/karpathy/nanochat?style=flat&label=nanochat)](https://github.com/karpathy/nanochat) | The best ChatGPT that $100 can buy |
| [![LLM101n](https://img.shields.io/github/stars/karpathy/LLM101n?style=flat&label=LLM101n)](https://github.com/karpathy/LLM101n) | Let's build a Storyteller (archived course) |
| [![llm-council](https://img.shields.io/github/stars/karpathy/llm-council?style=flat&label=llm-council)](https://github.com/karpathy/llm-council) | LLM Council answers your hardest questions |

### YouTube: Neural Networks: Zero to Hero

Complete course teaching neural networks from scratch:

| # | Video | Topic |
|---|-------|-------|
| 1 | The spelled-out intro to neural networks and backpropagation | Building micrograd |
| 2 | The spelled-out intro to language modeling | Building makemore |
| 3 | Building makemore Part 2 | MLPs |
| 4 | Building makemore Part 3 | Activations, Gradients, BatchNorm |
| 5 | Building makemore Part 4 | Becoming a Backprop Ninja |
| 6 | Building makemore Part 5 | Building a WaveNet |
| 7 | Let's build GPT | Full GPT from scratch, spelled out |
| 8 | Let's build the GPT Tokenizer | BPE tokenization |
| 9 | Let's reproduce GPT-2 (124M) | Full GPT-2 training |

**Playlist**: https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ

### Blog Posts

#### karpathy.github.io (Technical Blog)

| Date | Title | Must-Read |
|------|-------|-----------|
| Feb 2026 | [microgpt](https://karpathy.github.io/2026/02/12/microgpt/) | 200-line Python GPT |
| Apr 2019 | [A Recipe for Training Neural Networks](https://karpathy.github.io/2019/04/25/recipe/) | **ESSENTIAL** |
| May 2016 | [Deep RL: Pong from Pixels](https://karpathy.github.io/2016/05/31/rl/) | Policy gradients |
| May 2015 | [The Unreasonable Effectiveness of RNNs](https://karpathy.github.io/2015/05/21/rnn-effectiveness/) | **CLASSIC** |
| Mar 2022 | [Deep Neural Nets: 33 years ago and 33 years from now](https://karpathy.github.io/2022/03/14/lecun1989/) | LeCun 1989 repro |

#### karpathy.bearblog.dev (2024-2025)

| Date | Title |
|------|-------|
| Dec 2025 | [2025 LLM Year in Review](https://karpathy.bearblog.dev/year-in-review-2025/) |
| Nov 2025 | [The space of minds](https://karpathy.bearblog.dev/the-space-of-minds/) |
| Nov 2025 | [Verifiability](https://karpathy.bearblog.dev/verifiability/) |
| Oct 2025 | [Animals vs Ghosts](https://karpathy.bearblog.dev/animals-vs-ghosts/) |
| Apr 2025 | [Power to the people: How LLMs flip the script](https://karpathy.bearblog.dev/power-to-the-people/) |

#### Medium (Seminal Essays)

| Date | Title |
|------|-------|
| Nov 2017 | [Software 2.0](https://karpathy.medium.com/software-2-0-a64152b37c35) — **SEMINAL** |
| Dec 2016 | [Yes you should understand backprop](https://karpathy.medium.com/yes-you-should-understand-backprop-e2f06eab496b) |

### Talks & Interviews

| Event | Title | Link |
|-------|-------|------|
| Microsoft Build 2023 | State of GPT | [YouTube](https://www.youtube.com/watch?v=bZQun8Y4L2A) |
| Dwarkesh Patel | Full interview on AI progress | [Podcast](https://www.dwarkesh.com/p/andrej-karpathy) |
| Y Combinator 2024 | LLM Applications | [YouTube](https://www.youtube.com/watch?v=LCEmiRjPEtQ) |

### Learning Path (Recommended Order)

1. **Beginner**: [micrograd](https://github.com/karpathy/micrograd) + YouTube video
2. **Intermediate**: Work through [makemore](https://github.com/karpathy/makemore) series
3. **Advanced**: Build GPT with [nanoGPT](https://github.com/karpathy/nanoGPT) + video lecture
4. **Production**: Study [llm.c](https://github.com/karpathy/llm.c) for low-level understanding
5. **Theory**: Read "Recipe for Training Neural Networks" and "Unreasonable Effectiveness of RNNs"

---

## Sebastian Raschka

**Background**: AI Research Engineer, former Statistics Professor at UW-Madison  
**GitHub**: [@rasbt](https://github.com/rasbt) ![Followers](https://img.shields.io/github/followers/rasbt?style=flat&label=followers)  
**Substack**: [Ahead of AI](https://magazine.sebastianraschka.com/)  
**Website**: https://sebastianraschka.com  
**Twitter**: [@rasbt](https://twitter.com/rasbt)

### Books

#### Build a Large Language Model (From Scratch) — 2024

| Resource | Link |
|----------|------|
| GitHub | [![LLMs-from-scratch](https://img.shields.io/github/stars/rasbt/LLMs-from-scratch?style=flat&label=⭐)](https://github.com/rasbt/LLMs-from-scratch) |
| Manning | http://mng.bz/orYv |
| Amazon | https://amzn.to/4fqvn0D |
| Video Course (17h) | https://www.manning.com/livevideo/master-and-build-large-language-models |
| Free YouTube Playlist | https://www.youtube.com/playlist?list=PLTKMiZHVd_2IIEsoJrWACkIxLRdfMlw11 |

**Chapters**:
1. Understanding Large Language Models
2. Working with Text Data
3. Coding Attention Mechanisms
4. Implementing a GPT Model from Scratch
5. Pretraining on Unlabeled Data
6. Finetuning for Text Classification
7. Finetuning to Follow Instructions
- Appendix E: Parameter-efficient Finetuning with LoRA

#### Build a Reasoning Model (From Scratch) — 2025 (In Progress)

| Resource | Link |
|----------|------|
| GitHub | [![reasoning-from-scratch](https://img.shields.io/github/stars/rasbt/reasoning-from-scratch?style=flat&label=⭐)](https://github.com/rasbt/reasoning-from-scratch) |
| Manning | https://mng.bz/lZ5B |
| Amazon (pre-order) | https://amzn.to/4aAKiFY |

**Chapters**:
1. Understanding Reasoning Models
2. Generating Text with a Pre-trained LLM
3. Evaluating Reasoning Models
4. Improving Reasoning with Inference-Time Scaling
5. Inference-Time Scaling via Self-Refinement
6. Training Reasoning Models with Reinforcement Learning
7. Improving GRPO for Reinforcement Learning
8. Distilling Reasoning Models for Efficient Reasoning

#### Other Books

| Book | Year | Repository |
|------|------|------------|
| Machine Learning with PyTorch and Scikit-Learn | 2022 | [![GitHub](https://img.shields.io/github/stars/rasbt/machine-learning-book?style=flat&label=⭐)](https://github.com/rasbt/machine-learning-book) |
| Machine Learning Q and AI | 2024 | [![GitHub](https://img.shields.io/github/stars/rasbt/MachineLearning-QandAI-book?style=flat&label=⭐)](https://github.com/rasbt/MachineLearning-QandAI-book) |
| Python Machine Learning (1st ed) | 2015 | [![GitHub](https://img.shields.io/github/stars/rasbt/python-machine-learning-book?style=flat&label=⭐)](https://github.com/rasbt/python-machine-learning-book) |

### GitHub Repositories

| Repository | Description |
|------------|-------------|
| [![LLMs-from-scratch](https://img.shields.io/github/stars/rasbt/LLMs-from-scratch?style=flat&label=LLMs-from-scratch)](https://github.com/rasbt/LLMs-from-scratch) | Build ChatGPT-like LLM from scratch |
| [![deeplearning-models](https://img.shields.io/github/stars/rasbt/deeplearning-models?style=flat&label=deeplearning-models)](https://github.com/rasbt/deeplearning-models) | Deep learning architectures collection |
| [![mlxtend](https://img.shields.io/github/stars/rasbt/mlxtend?style=flat&label=mlxtend)](https://github.com/rasbt/mlxtend) | ML extension library |
| [![reasoning-from-scratch](https://img.shields.io/github/stars/rasbt/reasoning-from-scratch?style=flat&label=reasoning-from-scratch)](https://github.com/rasbt/reasoning-from-scratch) | Build reasoning LLM from scratch |
| [![LLM-workshop-2024](https://img.shields.io/github/stars/rasbt/LLM-workshop-2024?style=flat&label=LLM-workshop-2024)](https://github.com/rasbt/LLM-workshop-2024) | 4-hour LLM coding workshop |

### Substack: Ahead of AI (Top Articles)

| Date | Title |
|------|-------|
| Jul 2025 | [The Big LLM Architecture Comparison](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison) |
| Feb 2025 | [Understanding Reasoning LLMs](https://magazine.sebastianraschka.com/p/understanding-reasoning-llms) |
| Apr 2023 | [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models) |
| Nov 2024 | [Understanding Multimodal LLMs](https://magazine.sebastianraschka.com/p/understanding-multimodal-llms) |
| Aug 2025 | [From GPT-2 to gpt-oss](https://magazine.sebastianraschka.com/p/from-gpt-2-to-gpt-oss-analyzing-the) |
| Apr 2026 | [Components of A Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent) |
| Dec 2025 | [The State Of LLMs 2025](https://magazine.sebastianraschka.com/p/state-of-llms-2025) |
| Apr 2025 | [The State of RL for LLM Reasoning](https://magazine.sebastianraschka.com/p/the-state-of-llm-reasoning-model-training) |
| Jan 2024 | [Understanding and Coding Self-Attention](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention) |
| Aug 2024 | [Building LLMs from the Ground Up (3h Workshop)](https://magazine.sebastianraschka.com/p/building-llms-from-the-ground-up) |

### LLM Architecture Gallery

Interactive comparison of 50+ LLM architectures with diagrams and fact sheets.

| Resource | Link |
|----------|------|
| Live Gallery | https://sebastianraschka.com/llm-architecture-gallery/ |
| GitHub Data | [![GitHub](https://img.shields.io/github/stars/rasbt/llm-architecture-gallery?style=flat&label=⭐)](https://github.com/rasbt/llm-architecture-gallery) |
| Poster (Physical) | https://www.redbubble.com/i/poster/LLM-Architecture-Gallery-by-Ahead-of-AI/179274487/flk2 |
| Digital Download | https://rasbt.gumroad.com/l/llm-gallery |

### Learning Path (Recommended)

1. **Start**: [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models) (article)
2. **Build**: Work through [LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) book + code
3. **Deep Dive**: [Understanding and Coding Self-Attention](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention)
4. **Reasoning**: [Understanding Reasoning LLMs](https://magazine.sebastianraschka.com/p/understanding-reasoning-llms) + reasoning-from-scratch book
5. **Architecture**: Use the [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/) for comparison

---

## Interactive Tools

### Transformer Explainer
**Source**: Georgia Tech (Polo Club)

Interactive GPT-2 visualization for understanding transformer architecture.

| Resource | Link |
|----------|------|
| Live Demo | https://poloclub.github.io/transformer-explainer/ |

---

## Zero-Dependency Implementations

| Repository | Description |
|------------|-------------|
| [![no-magic](https://img.shields.io/github/stars/no-magic-ai/no-magic?style=flat&label=no-magic)](https://github.com/no-magic-ai/no-magic) | 47 ML algorithms — "Because `model.fit()` isn't an explanation" |
| [microgpt.py](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95) | 200 lines of pure Python GPT |
| [![micrograd](https://img.shields.io/github/stars/karpathy/micrograd?style=flat&label=micrograd)](https://github.com/karpathy/micrograd) | Tiny autograd engine |
| [![minbpe](https://img.shields.io/github/stars/karpathy/minbpe?style=flat&label=minbpe)](https://github.com/karpathy/minbpe) | Minimal BPE tokenizer |

---

## Classic Papers & Essays

| Title | Author | Year | Link |
|-------|--------|------|------|
| The Bitter Lesson | Richard Sutton | 2019 | http://www.incompleteideas.net/IncIdeas/BitterLesson.html |
| Software 2.0 | Andrej Karpathy | 2017 | https://karpathy.medium.com/software-2-0-a64152b37c35 |
| Attention Is All You Need | Vaswani et al. | 2017 | https://arxiv.org/abs/1706.03762 |
| Computer Power and Human Reason | Joseph Weizenbaum | 1976 | (book) |

---

## How These Resources Connect to the Thesis

These educational materials help understand **why** LLMs exhibit the behaviors documented in this research:

1. **CS336** — Shows how LLMs are built; reveals no "reasoning module" exists
2. **Karpathy's videos** — Explains tokenization, attention, training — all pattern matching
3. **LLMs-from-scratch** — Hands-on proof that it's just matrix multiplication
4. **Transformer Explainer** — Visualizes attention; shows pattern matching, not reasoning
5. **Abliteration tutorials** — Demonstrates alignment is a removable direction
6. **Raschka's reasoning book** — Even "reasoning" models are RL-shaped pattern matchers

Understanding the implementation makes the thesis claims concrete: **there's no place in the architecture where "reasoning" could live**.

---

## Quick Reference: Learning Paths

### Path 1: Absolute Beginner
1. Karpathy's micrograd video → understand backprop
2. Transformer Explainer → visualize attention
3. Raschka's "Understanding LLMs" article

### Path 2: Build Your Own LLM
1. Karpathy's "Let's build GPT" video
2. Raschka's LLMs-from-scratch book (full)
3. CS336 assignments (if you want Stanford-level rigor)

### Path 3: Understand Reasoning Models
1. Raschka's "Understanding Reasoning LLMs" article
2. Raschka's reasoning-from-scratch book
3. CS336 Assignment 5 (Alignment & RL)

### Path 4: Systems & Scale
1. Karpathy's llm.c repo
2. CS336 Assignment 2 (Systems)
3. CS336 lectures on parallelism, kernels, scaling laws
