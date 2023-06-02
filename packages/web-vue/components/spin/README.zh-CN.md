```yaml
meta:
  type: 组件
  category: 反馈
title: 加载中 Spin
description: 用于页面和区块的加载中状态 - 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
```

@import ./__demo__/basic.md

@import ./__demo__/size.md

@import ./__demo__/dot.md

@import ./__demo__/container.md

@import ./__demo__/tip.md

@import ./__demo__/icon.md

## API


### `<spin>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|size|尺寸|`number`|`-`|
|loading|是否为加载中状态（仅在容器模式下生效）|`boolean`|`false`|
|dot|是否使用点类型的动画|`boolean`|`false`|
|tip|提示内容|`string`|`-`|
|hide-icon|是否隐藏图标|`boolean`|`false`|
### `<spin>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|tip|自定义提示内容|-|
|element|自定义元素|-|
|icon|自定义图标（自动旋转）|-|


