```yaml
meta:
  type: Arco Pro
title: Package build
description: Package code
```

*Auto translate by google.*

## Package and build

When the code is written, execute the following command to package the code

```bash
npm run build
```

This command calls the packaging command provided by vite. After the packaging is completed, a `dist` folder will be generated in the root directory, which is the code that can be used for deployment.

PS: Tips for reducing package size! ! !

Because in the Pro project, the displayed table component requires the vue compile function, so a version with a compiler is introduced.

If you don't need the Vue template compilation function, delete the corresponding business code, configure the specified Vue version, and build and package to reduce the package size.

If you need the ability to compile vue templates, you can configure it in the vite.config.prod.ts file (see below).

 ```ts
// config/vite.config.build.ts
import {defineConfig} from'vite';

export default defineConfig({
  mode:'production',
  ...
  resolve: {
    alias: [
      {
        find:'vue',
        replacement:'vue/dist/vue.esm-bundler.js', // need to compile tmp
      },
    ],
  },
});
```

For more specific configuration details, please refer to [vite](https://vitejs.dev/)[Official Website](https://vitejs.dev/).
