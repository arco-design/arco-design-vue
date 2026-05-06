# Graph Report - graphify-input/architecture-docs (2026-05-06)

## Corpus Check

- Corpus is ~1,139 words - fits in a single context window. You may not need a graph.

## Summary

- 56 nodes · 72 edges · 8 communities (7 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]

## God Nodes (most connected - your core abstractions)

1. `packages/web-vue` - 23 edges
2. `packages/sd-vue-docs` - 22 edges
3. `dev flow` - 5 edges
4. `ES module build` - 5 edges
5. `docs:vendor` - 5 edges
6. `Vendor Bridge Layer` - 5 edges
7. `root package.json` - 4 edges
8. `Root Directory` - 3 edges
9. `Quality Gate (CI/Check)` - 3 edges
10. `UMD build` - 3 edges

## Surprising Connections (you probably didn't know these)

- `packages/web-vue` --publishes--> `dist artifacts` [EXTRACTED] graphify-input/architecture-docs/README.md → graphify-input/architecture-docs/ARCHITECTURE.md
- `packages/web-vue` --publishes--> `json metadata` [EXTRACTED] graphify-input/architecture-docs/README.md → graphify-input/architecture-docs/ARCHITECTURE.md
- `packages/sd-vue-docs` --serves as--> `site runtime` [EXTRACTED] graphify-input/architecture-docs/README.md → graphify-input/architecture-docs/ARCHITECTURE.md
- `packages/sd-vue-docs` --runs direct vendor sync through--> `docs:vendor:only` [EXTRACTED] graphify-input/architecture-docs/README.md → graphify-input/architecture-docs/sd-vue-docs-package.md
- `packages/sd-vue-docs` --starts dev server through--> `docs dev script` [EXTRACTED] graphify-input/architecture-docs/README.md → graphify-input/architecture-docs/sd-vue-docs-package.md

## Communities (8 total, 1 thin omitted)

### Community 0 - "Community 0"

Cohesion: 0.0 Nodes (17): scripts/build-dts.mjs, components/index.ts, dayjs, icongen script, jsongen script, packages/web-vue, sass, components/sd-vue.ts (+9 more)

### Community 1 - "Community 1"

Cohesion: 0.0 Nodes (11): Astro, @astrojs/vue, sd-vue-docs package manifest, MDX, packages/sd-vue-docs, sharp, Starlight, tailwindcss (+3 more)

### Community 2 - "Community 2"

Cohesion: 0.0 Nodes (10): build flow, dev flow, docs:prepare, es artifacts, icon generation, ES module build, Quality Gate (CI/Check), Root Directory (+2 more)

### Community 3 - "Community 3"

Cohesion: 0.0 Nodes (6): dist artifacts, declaration build, json metadata, metadata generation, style build, UMD build

### Community 4 - "Community 4"

Cohesion: 0.0 Nodes (4): docs build script, docs dev script, docs:vendor, docs:vendor:only

### Community 5 - "Community 5"

Cohesion: 0.0 Nodes (3): Arco Design, pnpm workspace, SD Design

### Community 6 - "Community 6"

Cohesion: 0.0 Nodes (3): import map, public/vendor, scripts/sync-vendor.mjs

## Knowledge Gaps

- **30 isolated node(s):** `Arco Design`, `pnpm workspace`, `web-vue package manifest`, `components/index.ts`, `components/sd-vue.ts` (+25 more) These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.
