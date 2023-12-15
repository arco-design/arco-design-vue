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

@import ./__demo__/validation2.md

@import ./__demo__/status.md

@import ./__demo__/dynamic.md

@import ./__demo__/disabled.md

@import ./__demo__/async.md

@import ./__demo__/custom.md

@import ./__demo__/scroll.md

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
此时，如果想要指定当前 `form-item` 对应的值为 `id: '2222'`，需要设置 `field="people.2.id"`，值中的分隔符需要使用 `.`。数组分割也可以使用 `[]`，例如 `field="people[2].id"`

### 关于在 label 插槽中使用可点击元素

表单组件的标题区域默认使用 `label` 元素包裹，会在点击时激活输入组件，如果在其中放入可以点击组件，会影响其正常功能。
此时可以使用 `label-component` 属性修改包裹元素为 `span` 解决这个问题。

---

## en-US
## FAQ

### About the `field` attribute of `form-item`
The value of the `field` attribute is the path string to get the corresponding value of the current `form-item`. Array division can also use `[]`, for example `field="people[2].id"`

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
At this point, if you want to specify the value corresponding to the current `form-item` as `id: '2222'`, you need to set `field="people.2.id"`, and the separator in the value needs to use `.`

### About using clickable elements in the label slot

The title area of the form component is wrapped with the `label` element by default, which will activate the input component when clicked. If you put a clickable component in it, it will affect its normal function.
At this point, you can use the `label-component` attribute to modify the wrapping element to `span` to solve this problem.

---
