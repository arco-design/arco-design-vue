```yaml
meta:
  type: Arco Pro 最佳实践
title: npm 命令
description: package.json script 预置方便实用的命令
```

## 配置文件

```
├── README.md
├── config
│   ├── plugin  # vite插件
│   ├── vite.config.base.ts  # 基础环境配置
│   ├── vite.config.dev.ts  # 开发环境配置
│   ├── vite.config.prod.ts  # 生产环境配置
└── package.json
```

## 本地开发

```bash
npm run dev
```

调用的命令如下

```json
{
  "scripts": {
    "dev": "vite --config ./config/vite.config.dev.ts",
  }
}
```

## 构建生产

```bash
npm run build
```

调用的命令如下，可以根据实际需要，查阅[vite](https://vitejs.dev/)[官网](https://vitejs.dev/)，进行输出配置。

```json
{
  "scripts": {
    "build": "vue-tsc --noEmit && vite build --config ./config/vite.config.prod.ts",
  }
}
```
