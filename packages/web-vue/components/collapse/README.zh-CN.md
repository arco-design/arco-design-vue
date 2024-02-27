```yaml
meta:
  type: 组件
  category: 数据展示
title: 折叠面板 Collapse
description: 可以折叠 / 展开的内容区域。
```

@import ./__demo__/basic.md

@import ./__demo__/accordion.md

@import ./__demo__/nested.md

@import ./__demo__/border-less.md

@import ./__demo__/extra.md

@import ./__demo__/expand-icon.md

@import ./__demo__/custom.md

@import ./__demo__/icon-position.md

@import ./__demo__/destroy.md

## API


### `<collapse>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|active-key **(v-model)**|当前展开的面板的 `key`|`(string \| number)[]`|`-`||
|default-active-key|默认展开的面板的 `key` （非受控模式）|`(string \| number)[]`|`[]`||
|accordion|是否开启手风琴模式|`boolean`|`false`||
|show-expand-icon|是否显示展开图标|`boolean`|`-`|2.33.0|
|expand-icon-position|展开图标显示的位置|`'left' \| 'right'`|`'left'`||
|bordered|是否显示边框|`boolean`|`true`||
|destroy-on-hide|是否在隐藏时销毁内容|`boolean`|`false`|2.27.0|
### `<collapse>` Events

|事件名|描述|参数|
|---|---|---|
|change|展开的面板发生改变时触发|activeKey: `(string \| number)[]`<br>ev: `Event`|




### `<collapse-item>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|header|面板的标题|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|show-expand-icon|是否显示展开图标|`boolean`|`true`||
|destroy-on-hide|是否在隐藏时销毁内容|`boolean`|`false`|2.27.0|
### `<collapse-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|extra|额外内容|-||
|expand-icon|展开图标|active: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'`|2.33.0|
|header|面板的标题|-||



## FAQ

### `<CollapseItem>` 组件的 `key` 属性为必填
在 `<Collapse>` 组件中每个 `<CollapseItem>` 都需要指定唯一的 `key` 属性，`key` 对应 `activeKey` 中的值。

