```yaml
meta:
  type: 组件
  category: 数据展示
title: 折叠面板 Collapse
description: 可以折叠 / 展开的内容区域。
```

@import ./__demo__/basic.md

@import ./__demo__/accordion.md

@import ./__demo__/border-less.md

@import ./__demo__/icon-position.md

## API


### `<collapse>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|active-key **(v-model)**|当前展开的面板的 `key`|`(string \| number)[]`|`-`|
|default-active-key|默认展开的面板的 `key` （非受控模式）|`(string \| number)[]`|`[]`|
|accordion|是否开启手风琴模式|`boolean`|`false`|
|expand-icon-position|展开图标显示的位置|`'left' \| 'right'`|`'left'`|
|bordered|是否显示边框|`boolean`|`true`|
### `<collapse>` Events

|事件名|描述|参数|
|---|---|---|
|change|展开的面板发生改变时触发|-|




### `<collapse-item>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|key|面板的 id，对应 `activeKey` 中的值|`string`|`-`|
|header|面板的标题|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|show-expand-icon|是否显示展开图标|`boolean`|`true`|
### `<collapse-item>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|header|面板的标题|-|


