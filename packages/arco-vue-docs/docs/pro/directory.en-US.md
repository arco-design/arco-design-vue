```yaml
meta:
  type: Arco Pro
title: Directory Structure
description: The organizational structure of the project file.
```

*Auto translate by google.*

## Content

```
├── README.md
├── package.json
├── index.html
├── src
│   ├── api # Request interface
│   ├── assets # Static resources
│         └── style # Global style
│   ├── components # General business components
│   ├── config # Global configuration (including echarts theme)
│         └── settings.json # Configuration file
│   ├── directive # Instruction set (if necessary, you can add it yourself)
│   ├── filters # filter (if necessary, you can add it yourself)
│   ├── hooks # global hooks
│   ├── layout # Layout
│   ├── locale # Internationalized language pack
│   ├── mock # Mock data
│   ├── views # Page template
|   |—— router # Routing configuration
│   ├── store # State management center
│   ├── types # Typescript types
│   └── utils # Tool library
│   └── App.vue # View entrance
│   └── main.ts # Entry file
└── tsconfig.json
```

ps: [Filter description](https://v3-migration.vuejs.org/breaking-changes/filters.html)
