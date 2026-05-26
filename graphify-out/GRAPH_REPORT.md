# Graph Report - graphify-input/architecture-docs  (2026-05-26)

## Corpus Check
- Corpus is ~1,139 words - fits in a single context window. You may not need a graph.

## Summary
- 12 nodes ¡¤ 13 edges ¡¤ 4 communities (3 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED ¡¤ 0% INFERRED ¡¤ 0% AMBIGUOUS
- Token cost: 0 input ¡¤ 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]

## God Nodes (most connected - your core abstractions)

## Surprising Connections (you probably didn't know these)
- `Root Directory` --schedules development and build tasks--> `@sdata/web-vue (Component Library)`  [EXTRACTED]
   ¡ú   _Bridges community 3 ¡ú community 0_
- `Root Directory` --schedules documentation tasks--> `@sd-design/sd-vue-docs (Documentation Site)`  [EXTRACTED]
   ¡ú   _Bridges community 3 ¡ú community 2_
- `@sdata/web-vue (Component Library)` --produces--> `Build Artifacts (es, dist, json)`  [EXTRACTED]
   ¡ú   _Bridges community 0 ¡ú community 1_
- `@sd-design/sd-vue-docs (Documentation Site)` --consumes via pnpm workspace dependency--> `@sdata/web-vue (Component Library)`  [EXTRACTED]
   ¡ú   _Bridges community 0 ¡ú community 2_
- `@sd-design/sd-vue-docs (Documentation Site)` --consumes browser-ready assets from--> `Public Vendor Resources`  [EXTRACTED]
   ¡ú   _Bridges community 2 ¡ú community 1_

## Communities (4 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.0
Nodes (4): build-dts.mjs, icongen, jsongen (Metadata Generator), @sdata/web-vue (Component Library)

### Community 1 - "Community 1"
Cohesion: 0.0
Nodes (3): Build Artifacts (es, dist, json), Public Vendor Resources, sync-vendor.mjs

### Community 2 - "Community 2"
Cohesion: 0.0
Nodes (3): Astro Runtime (Starlight + MDX), @sd-design/sd-vue-docs (Documentation Site), Theme Bridge System

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** ¡ª run `graphify query` to explore isolated nodes.