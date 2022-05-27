```yaml
meta:
  type: 组件
  category: 其他
title: 返回顶部 BackTop
description: 可一键返回顶部的按钮。
```

@import ./__demo__/basic.md

@import ./__demo__/custom.md

## API


### `<back-top>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|visible-height|显示回到顶部按钮的触发滚动高度|`number`|`200`|
|target-container|滚动事件的监听容器|`string \| HTMLElement`|`-`|
|easing|滚动动画的缓动方式，可选值参考 [BTween](https://github.com/PengJiyuan/b-tween)|`string`|`'quartOut'`|
|duration|滚动动画的持续时间|`number`|`200`|


