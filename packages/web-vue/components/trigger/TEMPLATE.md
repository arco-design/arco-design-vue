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

```ts
type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] };
```
