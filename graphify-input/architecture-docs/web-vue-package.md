# web-vue package manifest summary

## Package identity

- package: @sdata/web-vue
- description: SD Design Vue: A Vue.js 3 UI Library
- publish outputs: es, dist, json
- primary module entry: es/index.js
- primary types entry: es/index.d.ts

## Key scripts

- dev -> vp run task:dev-component
- build -> build:component + build:style + build:dts + jsongen
- build:component -> task:build-component
- build:module -> task:build-module
- build:style -> task:build-style
- build:dts -> scripts/build-dts.mjs
- icongen -> gen:icons
- jsongen -> gen:web-types
- test -> vp test run

## Runtime dependencies

- vue
- dayjs
- compute-scroll-into-view
- scroll-into-view-if-needed
- resize-observer-polyfill

## Tooling dependencies

- vite
- vite-plus
- vitest
- vue-tsc
- sass
- @vitejs/plugin-vue
- @vitejs/plugin-vue-jsx

## Export surface

- exports root es entry
- exports icon es entry
- exports dist assets
- exports json metadata
- includes vetur metadata and web-types metadata
