```yaml
meta:
  type: 组件
  category: 数据展示
title: 图片轮播 Carousel
description: 用于展示多张图片、视频或内嵌框架等内容的循环播放，支持系统自动播放或用户手动切换。
```

@import ./__demo__/basic.md

@import ./__demo__/auto.md

@import ./__demo__/indicator.md

@import ./__demo__/direction.md

@import ./__demo__/card.md

@import ./__demo__/fade.md

## API


### `<carousel>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|current **(v-model)**|当前展示索引|`number`|`-`|
|default-current|当前展示索引|`number`|`1`|
|auto-play|是否自动循环展示，或者传入 `{ interval: 自动切换的时间间隔(默认: 3000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }` 进行高级配置|`boolean \| CarouselAutoPlayConfig`|`false`|
|move-speed|幻灯片移动速率(ms)|`number`|`500`|
|animation-name|切换动画|`'slide' \| 'fade' \| 'card'`|`'slide'`|
|trigger|幻灯片切换触发方式, click/hover 指示器|`'click' \| 'hover'`|`'click'`|
|direction|幻灯片移动方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|show-arrow|切换箭头显示时机|`'always' \| 'hover' \| 'never'`|`'always'`|
|arrow-class|切换箭头样式|`string`|`''`|
|indicator-type|指示器类型，可为小方块和小圆点或不显示|`'line' \| 'dot' \| 'slider' \| 'never'`|`'dot'`|
|indicator-position|指示器位置|`'bottom' \| 'top' \| 'left' \| 'right' \| 'outer'`|`'bottom'`|
|indicator-class|指示器的样式|`string`|`''`|
|transition-timing-function|过渡速度曲线, 默认匀速 [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)|`string`|`'cubic-bezier(0.34, 0.69, 0.1, 1)'`|
### `<carousel>` Events

|事件名|描述|参数|
|---|---|---|
|change|幻灯片发生切换时的回调函数|index: `number`<br>prevIndex: `number`<br>isManual: `boolean`|


