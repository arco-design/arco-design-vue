# sd-vue-docs package manifest summary

## Package identity

- package: @sd-design/sd-vue-docs
- description: SD Design 文档站
- private package
- module type: module

## Key scripts

- dev -> docs:vendor + astro dev
- dev:serve -> astro dev
- build -> docs:vendor + astro build
- build:site -> astro build
- preview -> docs:vendor + astro preview
- docs:prepare -> pnpm --filter @sdata/web-vue run build:module
- docs:vendor -> docs:prepare + docs:vendor:only
- docs:vendor:only -> scripts/sync-vendor.mjs
- verify:theme-runtime -> scripts/verify-theme-runtime-paths.mjs

## Runtime dependencies

- astro
- @astrojs/starlight
- @astrojs/mdx
- @astrojs/vue
- @sdata/web-vue workspace dependency
- @vue/repl
- tailwindcss
- @tailwindcss/vite
- sharp
- vite
- vue

## Build characteristics

- docs package depends on web-vue module build before vendor sync
- docs package consumes workspace web-vue package directly
- docs package uses astro as both dev server and static site builder
