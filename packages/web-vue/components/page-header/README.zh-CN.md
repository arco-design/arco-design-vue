```yaml
meta:
  type: 组件
  category: 导航
title: 页头 PageHeader
description: 页头位于页容器顶部，起到了内容概览和引导页级操作的作用。包括面包屑、标题等内容。
```

@import ./__demo__/basic.md

@import ./__demo__/breadcrumb.md

@import ./__demo__/transparent.md

@import ./__demo__/content.md

## API


### `<page-header>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|页头的主标题|`string`|`-`|
|subtitle|页头的次标题|`string`|`-`|
|show-back|是否显示返回按钮|`boolean`|`true`|
### `<page-header>` Events

|事件名|描述|参数|
|---|---|---|
|back|点击返回按钮时触发|event: `Event`|
### `<page-header>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|breadcrumb|面包屑|-||
|back-icon|返回按钮|-|2.36.0|
|title|主标题|-||
|subtitle|次标题|-||
|extra|额外的展示内容|-||


