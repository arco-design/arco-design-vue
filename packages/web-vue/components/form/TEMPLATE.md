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

## zh-CN
## FAQ

### 关于 `form-item` 的 `field` 属性
`field` 属性的值为获取当前 `form-item` 对应值的路径字符串。

例如传入 model 属性的数据结构为：
```ts
const data = reactive({
  name:'xiaoming',
  people:[
    {
      id:'1111'
    },
    {
      // bind this value
      id:'2222'
    }
  ]
})
```
此时，如果想要指定当前 `form-item` 对应的值为 `id: '2'`，需要设置 `field="people.2.id"`，值中的分隔符需要使用 `.`

---
## en-US
## FAQ

### About the `field` attribute of `form-item`
The value of the `field` attribute is the path string to get the corresponding value of the current `form-item`.

For example, the data structure passed into the model property is:
```ts
const data = reactive({
   name:'xiaoming',
   people:[
     {
       id:'1111'
     },
     {
       // bind this value
       id:'2222'
     }
   ]
})
````
At this point, if you want to specify the value corresponding to the current `form-item` as `id: '2'`, you need to set `field="people.2.id"`, and the separator in the value needs to use `.`

---
