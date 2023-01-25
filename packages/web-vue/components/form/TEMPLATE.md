## zh-CN
```yaml
meta:
  type: 组件
  category: 数据输入
title: 表单 Form
description: 具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Data Entry
title: Form
description: A form with data collection, verification and submission functions, including checkboxes, radio buttons, input boxes, drop-down selection boxes and other elements.
```
---

@import ./__demo__/basic.md

@import ./__demo__/layout.md

@import ./__demo__/extra.md

@import ./__demo__/nest.md

@import ./__demo__/grid.md

@import ./__demo__/auto-width.md

@import ./__demo__/validation.md

@import ./__demo__/status.md

@import ./__demo__/dynamic.md

@import ./__demo__/disabled.md

@import ./__demo__/async.md

@import ./__demo__/custom.md

## API

%%API(form.vue)%%

%%API(form-item.vue)%%

## Type

%%INTERFACE(interface.ts)%%

### useFormItem

```ts
const useFormItem = (data: {
  size?: Ref<Size | undefined>;
  disabled?: Ref<boolean>;
  error?: Ref<boolean>;
}) => {
  mergedSize:Ref<Size>;
  mergedDisabled:Ref<boolean>;
  mergedError:Ref<boolean>;
  feedback:Ref<string>;
  eventHandlers:Ref<FormItemEventHandler>;
}
```
