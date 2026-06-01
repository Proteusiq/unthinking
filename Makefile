.PHONY: help corpus galaxy galaxy-dev galaxy-build deploy-check

help:
	@echo "Unthinking — make targets"
	@echo
	@echo "  make corpus        rebuild analysis/index/corpus.json and copy to galaxy"
	@echo "  make galaxy-dev    start the galaxy dev server on :5173"
	@echo "  make galaxy-build  production-build the galaxy"
	@echo "  make galaxy        corpus + galaxy-build (full refresh)"
	@echo "  make deploy-check  verify everything before pushing"

# Re-extract the corpus index from analysis/explored/ and copy into the
# galaxy app's public/ so the bundled JSON stays in sync.
corpus:
	uv run python scripts/build_corpus_index.py
	cp analysis/index/corpus.json apps/galaxy/public/corpus.json

galaxy-dev:
	cd apps/galaxy && npm run dev

galaxy-build:
	cd apps/galaxy && npm ci && npm run build

galaxy: corpus galaxy-build

# Run the same checks CI does before pushing.
deploy-check:
	@diff -q analysis/index/corpus.json apps/galaxy/public/corpus.json > /dev/null \
		|| (echo "corpus drift — run 'make corpus'" && exit 1)
	cd apps/galaxy && npx tsc --noEmit -p tsconfig.app.json
	cd apps/galaxy && npm run build > /dev/null
	@echo "✓ ready to push"
