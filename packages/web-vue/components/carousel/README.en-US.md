```yaml
meta:
  type: Component
  category: Data Display
title: Carousel
description: Carousel is used to display multiple pictures, videos, or embedded frames and other content in a loop, and supports automatic playback or manual switching by the user.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/auto.md

@import ./__demo__/indicator.md

@import ./__demo__/direction.md

@import ./__demo__/card.md

@import ./__demo__/fade.md

## API


### `<carousel>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|current **(v-model)**|The index of current slide which starts from 1|`number`|`-`|
|default-current|Default index of current slide|`number`|`1`|
|auto-play|@en* Whether to automatically loop the display, or pass in `{ interval: the time interval for switching (default: 3000),<br>hoverToPause: whether to pause switching while hover (default: true) }` for configuration (object is supported from `2.14.0`)|`boolean \| CarouselAutoPlayConfig`|`false`|
|move-speed|The duration of the slide movement(ms)|`number`|`500`|
|animation-name|The animation of the slide movement|`'slide' \| 'fade' \| 'card'`|`'slide'`|
|trigger|How to trigger the slide switch, click/hover the indicator|`'click' \| 'hover'`|`'click'`|
|direction|The direction of the slide movement|`'horizontal' \| 'vertical'`|`'horizontal'`|
|show-arrow|When to show the arrow used to switch|`'always' \| 'hover' \| 'never'`|`'always'`|
|arrow-class|The additional css class to arrow used to switch|`string`|`''`|
|indicator-type|Type of indicator|`'line' \| 'dot' \| 'slider' \| 'never'`|`'dot'`|
|indicator-position|Position of indication|`'bottom' \| 'top' \| 'left' \| 'right' \| 'outer'`|`'bottom'`|
|indicator-class|The additional css class to indicator|`string`|`''`|
|transition-timing-function|How intermediate values are calculated for CSS properties being affected by a transition effect.<br>[transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)|`string`|`'cubic-bezier(0.34, 0.69, 0.1, 1)'`|
### `<carousel>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Callback when slide changes|index: `number`<br>prevIndex: `number`<br>isManual: `boolean`|


