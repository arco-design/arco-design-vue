# `@arco-design/vite-plugin-arco-vue-docs`

Provides Markdown to Vue Component in Arco Vue Docs

## Usage

```tsx
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDocs from '@arco-design/vite-plugin-arco-vue-docs';

export default defineConfig({
  plugins: [vueDocs(), vue()],
});
```
