```yaml
meta:
  type: 组件
  category: 其他
title: 固钉 Affix
description: 将页面元素钉在可视范围。当内容区域比较长，需要滚动页面时，固钉可以将内容固定在屏幕上。常用于侧边菜单和按钮组合。
```

@import ./__demo__/basic.md

@import ./__demo__/top.md

@import ./__demo__/bottom.md

@import ./__demo__/fix-change.md

@import ./__demo__/container.md

## API


### `<affix>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|offset-top|距离窗口顶部达到指定偏移量后触发|`number`|`0`|
|offset-bottom|距离窗口底部达到指定偏移量后触发|`number`|`-`|
|target|滚动容器，默认是 `window`|`string \| HTMLElement \| Window`|`-`|
|target-container|`target`的外层滚动元素，默认是 `window`。`Affix `将会监听该元素的滚动事件，并实时更新固钉的位置。主要是为了解决 `target` 属性指定为非 `window` 元素时，如果外层元素滚动，可能会导致固钉跑出容器问题|`string \| HTMLElement \| Window`|`-`|
### `<affix>` Events

|事件名|描述|参数|
|---|---|---|
|change|固定状态发生改变时触发|fixed: `boolean`|
### `<affix>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|updatePosition|更新位置|-|-|


