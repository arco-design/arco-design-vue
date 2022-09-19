```yaml
meta:
  type: 组件
  category: 通用
title: 排版 Typography
description: 用于展示标题、段落、文本内容。
```

@import ./__demo__/basic.md

@import ./__demo__/title.md

@import ./__demo__/text.md

@import ./__demo__/paragraph.md

@import ./__demo__/operations.md

@import ./__demo__/ellipsis.md

## API






### `Common` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|type|文本类型|`'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'`|`-`||
|bold|粗体|`boolean`|`false`||
|mark|添加标记样式|`boolean \| { color: string }`|`false`||
|underline|下划线样式|`boolean`|`false`||
|delete|删除线样式|`boolean`|`false`||
|code|代码块样式|`boolean`|`false`||
|disabled|禁用状态|`boolean`|`false`||
|editable|开启可编辑功能|`boolean`|`false`||
|editing **(v-model)**|是否在编辑状态|`boolean`|`-`||
|default-editing|默认的编辑状态|`boolean`|`false`||
|edit-text **(v-model)**|编辑的文字|`string`|`-`||
|copyable|开启复制功能|`boolean`|`false`||
|copy-text|复制的文字|`string`|`-`||
|copy-delay|复制成功后，复制按钮恢复到可点击状态的延迟时间，单位是毫秒|`number`|`3000`|2.16.0|
|ellipsis|自动溢出省略，具体参数配置看 [EllipsisConfig](#EllipsisConfig)|`boolean \| EllipsisConfig`|`false`||
|edit-tooltip-props|编辑按钮问题提示配置|`object`|`-`|2.32.0|
|copy-tooltip-props|拷贝按钮问题提示配置|`object`|`-`|2.32.0|
### `Common` Events

|事件名|描述|参数|
|---|---|---|
|edit-start|开始编辑|-|
|change|编辑内容变化|text: `string`|
|edit-end|编辑结束|-|
|copy|复制|text: `string`|
|ellipsis|省略变化事件|isEllipsis: `boolean`|
|expand|展开收起事件|expanded: `boolean`|
### `Common` Slots

|插槽名|描述|参数|
|---|:---:|---|
|expand-node|自定义展开和折叠按钮|expanded: `boolean`|
|copy-icon|自定义复制按钮图标|copied: `boolean`|
|copy-tooltip|自定义复制按钮的 tooltip 内容|copied: `boolean`|




### `<typography-title>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|heading|标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`|`'1' \| '2' \| '3' \| '4' \| '5' \| '6'`|`1`|




### `<typography-paragraph>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|blockquote|长引用|`boolean`|`false`|
|spacing|段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。|`'default' \| 'close'`|`'default'`|








### EllipsisConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|rows|显示省略的行数|`number`|`1`||
|expandable|是否支持展开/折叠|`boolean`|`false`||
|ellipsisStr|省略号|`string`|`'...'`||
|suffix|后缀|`string`|`-`||
|showTooltip|配置省略时的弹出框|`boolean    \| { type: 'tooltip' \| 'popover'; props: Record<string, any> }`|`false`||
|css|是否使用 CSS 省略（此模式暂不支持展开、自定义省略号和后缀）|`boolean`|`false`|2.37.0|


