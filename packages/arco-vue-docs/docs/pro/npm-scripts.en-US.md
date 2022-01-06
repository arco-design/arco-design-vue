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

The commands to be called are as follows. According to actual needs, please refer to [vite](https://www.vitejs.net/)[Official Website](https://www.vitejs.net/) for output configuration.

```json
{
   "scripts": {
     "dev": "vite --config ./config/vite.config.dev.ts",
   }
}
```
