.PHONY: help corpus sync-counts check-counts galaxy galaxy-dev galaxy-build deploy-check db lookup check-dups

help:
	@echo "Unthinking — make targets"
	@echo
	@echo "  make corpus        rebuild analysis/index/corpus.json and copy to galaxy"
	@echo "  make sync-counts   rewrite all hardcoded paper counts from corpus.json"
	@echo "  make check-counts  read-only drift check (CI mode)"
	@echo "  make db            rebuild DuckDB for paper lookup"
	@echo "  make lookup Q=...  look up paper by arXiv ID or title"
	@echo "  make check-dups    find duplicates in toread.md and issues"
	@echo "  make galaxy-dev    start the galaxy dev server on :5173"
	@echo "  make galaxy-build  production-build the galaxy"
	@echo "  make galaxy        corpus + sync-counts + galaxy-build (full refresh)"
	@echo "  make deploy-check  verify everything before pushing"

# Re-extract the corpus index from analysis/explored/ and copy into the
# galaxy app's public/ so the bundled JSON stays in sync.
corpus:
	uv run python scripts/build_corpus_index.py
	cp analysis/index/corpus.json apps/galaxy/public/corpus.json
	uvx --with duckdb python scripts/build_papers_db.py

# Build DuckDB for fast paper lookup
db:
	uvx --with duckdb python scripts/build_papers_db.py

# Look up paper by arXiv ID or title search
# Usage: make lookup Q=2309.12288
#        make lookup Q="reversal curse"
lookup:
	@uvx --with duckdb python scripts/lookup_paper.py "$(Q)"

# Check toread.md and issues for papers already in corpus
check-dups:
	@uvx --with duckdb python scripts/check_all_duplicates.py

sync-counts:
	uv run python scripts/sync_counts.py

check-counts:
	uv run python scripts/sync_counts.py --check

galaxy-dev:
	cd apps/galaxy && npm run dev

galaxy-build:
	cd apps/galaxy && npm ci && npm run build

galaxy: corpus sync-counts galaxy-build

# Run the same checks CI does before pushing.
deploy-check:
	@diff -q analysis/index/corpus.json apps/galaxy/public/corpus.json > /dev/null \
		|| (echo "corpus drift — run 'make corpus'" && exit 1)
	uv run python scripts/sync_counts.py --check
	cd apps/galaxy && npx tsc --noEmit -p tsconfig.app.json
	cd apps/galaxy && npm run build > /dev/null
	@echo "✓ ready to push"
