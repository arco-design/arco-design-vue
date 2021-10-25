```yaml
title:
  zh-CN: 滚动容器
  en-US: Container
```

## zh-CN

用 `target` 设置需要监听其滚动事件的元素，默认为 window。

`target` 指定为非 window 容器时，可能会出现 `target`外层元素滚动，固钉元素跑出滚动容器的问题。这个时候可以通过传入`targetContainer`传入`target`外层的滚动元素。`Affix`
会监听该元素的滚动事件来实时更新滚钉元素的位置。 当然您也可以在业务代码中自己监听target外层滚动元素的 `scroll` 事件，并调用 `updatePosition` 去更新固钉的位置。

---

## en-US

Use `target` to set the element whose scroll event needs to be listened to. Default is window.

When the `target` is specified as a non-window container, the outer element of the `target` may scroll, and the fixed
element may run out of the scroll container. You can pass in `targetContainer` to set the scroll element
outside `target`. `Affix` will monitor the scroll event of the element to update the position of the scroll nail element
in real time. You can also monitor the `scroll` event of the outer scroll element of the target in the business code,
and call `updatePosition` to update the position of the pin.

---

```vue

<template>
  <div
    style="height: 200px; overflow: auto"
    ref="containerRef"
  >
    <div style="height: 400px; background: #cccccc; overflow: hidden">
      <a-affix
        :offsetTop="20"
        :target="containerRef"
        style="margin: 40px"
      >
        <a-button type="primary">Affix in scrolling container</a-button>
      </a-affix>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const containerRef = ref();

    return {
      containerRef,
    };
  },
}
</script>
```
