## zh-CN
```yaml
meta:
  type: 组件
  category: 其他
title: 触发器 Trigger
description: 用于对元素添加 hover, click, focus 等事件，并且弹出下拉框。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Other
title: Trigger
description: Used to add hover, click, focus and other events to the element, and pop up a dropdown.
```
---

@import ./__demo__/basic.md

@import ./__demo__/nest.md

@import ./__demo__/triggers.md

@import ./__demo__/align-point.md

@import ./__demo__/scroll.md

@import ./__demo__/arrow.md

@import ./__demo__/translate.md

## API

%%API(trigger.tsx)%%

## Type

```ts
type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] };
```

## zh-CN
## FAQ

### 关于弹出框的挂载位置

弹出框默认是挂载到 `body` 元素上的，如果想要修改挂载元素，可以使用 `popup-container` 属性进行指定，同时需要注意保证挂载元素的位置可以被准确定位到，一般可以为挂载元素增加 `position: relative` 样式。

在微前端项目中，需要保证子应用的挂载位置准确，可以将子应用的 `body` 样式添加 `position: relative`

### 滚动触发容器

组件默认仅监听了 `window` 的滚动事件，对于内部 `div` 的滚动没有进行监听，类似 `scroll-to-close` 功能也仅会对 `window` 滚动生效。可以通过开启 `update-at-scroll` 属性支持对父级 `div` 元素的滚动事件监听。

---

## en-US
## FAQ

### About the mount location of the pop-up box

The popup box is mounted on the `body` element by default. If you want to modify the mounted element, you can use the `popup-container` attribute to specify it. At the same time, you need to pay attention to ensure that the location of the mounted element can be accurately located. Generally, you can Add `position: relative` style for mount elements.

In the micro-frontend project, it is necessary to ensure that the mounting position of the sub-application is accurate, you can add `position: relative` to the `body` style of the sub-application

### scroll trigger container

By default, the component only listens to the scrolling event of `window`, and does not listen to the scrolling of the internal `div`, and the function similar to `scroll-to-close` will only take effect on the scrolling of `window`. You can support scroll event listening on the parent `div` element by enabling the `update-at-scroll` attribute.

---
