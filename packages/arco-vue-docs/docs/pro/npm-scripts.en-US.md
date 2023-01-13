```yaml
meta:
  type: Arco Pro
title: Npm Scripts
description: package.json script presets convenient and practical commands
```

*Auto translate by google.*

## Configuration file

```
├── README.md
├── config
│ ├── plugin  # vite plugin
│ ├── vite.config.base.ts  # Basic Environment Configuration
│ ├── vite.config.dev.ts # Development environment configuration
│ ├── vite.config.prod.ts # Production environment configuration
└── package.json
```

## Local development

```bash
npm run dev
```

The command invoked is as follows

```json
{
   "scripts": {
     "dev": "vite --config ./config/vite.config.dev.ts",
   }
}
```

## Build production

```bash
npm run build
```

The commands to be called are as follows. According to actual needs, please refer to [vite](https://vitejs.dev/)[Official Website](https://vitejs.dev/) for output configuration.

```json
{
   "scripts": {
     "build": "vue-tsc --noEmit && vite build --config ./config/vite.config.prod.ts",
   }
}
```
