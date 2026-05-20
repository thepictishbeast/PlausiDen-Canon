# PlausiDen-Canon Makefile.

.PHONY: help
help: ## Show this help.
	@printf '\n\033[1mPlausiDen-Canon — Makefile help\033[0m\n\n'
	@printf 'Canon is the root of the dependency DAG; deps are forbidden.\n'
	@printf 'See AGENTS.md + TOOLS.md for the canonical surface.\n\n'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_.-]+:.*?## / {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@printf '\n'

.PHONY: build
build: ## Build the workspace.
	cargo build --workspace

.PHONY: test
test: ## Run workspace tests.
	cargo test --workspace

.PHONY: docs
docs: ## Generate rustdoc for downstream consumers.
	cargo doc --workspace --no-deps

.PHONY: ci
ci: ## CI gate set.
	cargo fmt --all -- --check
	cargo clippy --workspace --all-targets -- -D warnings
	cargo test --workspace

.PHONY: clean
clean: ## Remove cargo build artifacts.
	cargo clean
