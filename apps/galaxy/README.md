# Unthinking - Paper Galaxy

Live: <https://proteusiq.github.io/unthinking/galaxy/>

A 3D semantic projection of the 389 paper analyses in this repo. Each star is
one paper. Color is the paper's stance on the thesis that LLM "reasoning" is
predictive completion. Size and pulse mark the heaviest pieces of evidence -
smoking-gun findings are the biggest, brightest stars.

Runs entirely in your browser. WebGPU required (Chrome, Edge, Brave, or Safari
Tech Preview).

## How it works

```
corpus.json (built by scripts/build_corpus_index.py from analysis/explored/)
    ↓
Browser loads it
    ↓
EmbeddingGemma 300m (ONNX, q4) on WebGPU embeds a rich paper summary
(title + cluster + stance + core finding + first quote)
    ↓
UMAP-js projects 768-dim embeddings → 3D coordinates, then a collision
relaxation pass separates overlapping planets
    ↓
Three.js renders. Smoking-gun papers become suns; the rest of the corpus
orbits them with paper-specific axes and speeds. Cosine similarity drives
search. Dragging one planet pins it in place, locally repels its neighbors,
and lets the orbit resume when released.
    ↓
Embeddings + positions persist to IndexedDB. Next visit is instant.
```

The cache key is a fingerprint of `corpus.json` content plus the model id.
Add a paper, rerun the index extractor - the fingerprint changes, the cache
busts, and the browser re-indexes on next visit.

## Develop

```bash
cd apps/galaxy
npm ci          # reproducible install from package-lock.json
npm run dev
```

Open the URL printed by Vite (usually <http://localhost:5173/>).
Use `npm install` instead of `npm ci` if you're adding or upgrading
dependencies.

## Build

```bash
cd apps/galaxy
npm run build
```

Output lands in `apps/galaxy/dist/`. The bundle is fully self-contained and
uses relative paths (`base: "./"`), so `dist/` works:

- opened directly as files (`open dist/index.html` on macOS)
- served by any static host (GitHub Pages, Netlify, Cloudflare Pages)
- served by plain `python -m http.server` inside `dist/`

## Deploy

Deployment is automatic via GitHub Pages. The
[`deploy-pages.yml`](../../.github/workflows/deploy-pages.yml) workflow runs on
every push to `main` that touches `apps/galaxy/**` (or `docs/**`). It builds the
app with `npm ci && npm run build`, drops `dist/` under `docs/galaxy/`, and
publishes the combined site to
<https://proteusiq.github.io/unthinking/galaxy/>.

To deploy elsewhere, point any static host at `apps/galaxy/dist/` after a local
`npm run build`. The bundle uses relative paths so it works under any subpath.

## Update the corpus

After running new paper analyses:

```bash
uv run python scripts/build_corpus_index.py
cp analysis/index/corpus.json apps/galaxy/public/corpus.json
cd apps/galaxy && npm ci && npm run build
```

The next time a visitor loads the page, the corpus fingerprint will have
changed and their browser will re-index. (~30-60s on WebGPU.)

## Trade-offs to know about

- **EmbeddingGemma is loaded as 4-bit quantized ONNX** for browser
  efficiency. q4 is small (~200 MB) and fast on WebGPU. There's a small
  accuracy loss vs fp32, but for 360-document corpus clustering it
  doesn't visibly change which papers are neighbors.
- **First visit is slow.** ~30-60 sec on WebGPU for the model download
  plus 360 embedding passes. Subsequent visits are near-instant (cache).
- **WebGPU is required** - we don't fall back to WASM. CPU inference
  would take 3-6 minutes per visit. Users without WebGPU see an explicit
  "browser not supported" message instead of a silent slog.

## Lineage

The visual scaffold - React Three Fiber scene, Bloom, Stars, OrbitControls,
the worker-based EmbeddingGemma loader, search-by-cosine - comes from
[webml-community/semantic-galaxy](https://huggingface.co/spaces/webml-community/semantic-galaxy)
by Xenova (Apache-2.0). Everything specific to this project - the
corpus-aware menu galaxy, variable star size by evidence weight, the
smoking-gun pulse, the quote ticker, the stance-encoded color system, the
paper-aware sidebar and info card, the URL state, the IndexedDB cache layer,
the WebGPU-only stance, the splash copy - is built on top.

Credits in full:

- [Semantic Galaxy](https://huggingface.co/spaces/webml-community/semantic-galaxy)
  by [Xenova](https://huggingface.co/Xenova) - base architecture.
- [EmbeddingGemma](https://huggingface.co/google/embeddinggemma-300m) - Google
  DeepMind.
- [Transformers.js](https://huggingface.co/docs/transformers.js),
  [Three.js](https://threejs.org/),
  [UMAP-js](https://github.com/PAIR-code/umap-js).
