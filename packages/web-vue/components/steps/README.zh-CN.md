```yaml
meta:
  type: 组件
  category: 导航
title: 步骤条 Steps
description: 明示任务流程和当前完成程度，引导用户按照步骤完成任务。
```

@import ./__demo__/basic.md

@import ./__demo__/description.md

@import ./__demo__/label-placement.md

@import ./__demo__/error.md

@import ./__demo__/icon.md

@import ./__demo__/line-less.md

@import ./__demo__/vertical.md

@import ./__demo__/arrow.md

@import ./__demo__/dot.md

@import ./__demo__/navigation.md

@import ./__demo__/changeable.md

## API


### `<steps>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|步骤条的类型|`'default' \| 'arrow' \| 'dot' \| 'navigation'`|`'default'`|
|direction|步骤条的显示方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|label-placement|标签描述文字放置的位置|`'horizontal' \| 'vertical'`|`'horizontal'`|
|current **(v-model)**|当前步骤数|`number`|`-`|
|default-current|默认的步骤数（非受控状态）|`number`|`1`|
|status|当前步骤的状态|`'wait' \| 'process' \| 'finish' \| 'error'`|`'process'`|
|line-less|是否使用无连接线样式|`boolean`|`false`|
|small|是否使用小型步骤条|`boolean`|`false`|
|changeable|是否可以点击切换|`boolean`|`false`|
### `<steps>` Events

|事件名|描述|参数|
|---|---|---|
|change|步骤数发生改变时触发|step: `number`<br>ev: `Event`|




### `<step>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|步骤的标题|`string`|`-`|
|description|步骤的描述信息|`string`|`-`|
|status|步骤的状态|`'wait' \| 'process' \| 'finish' \| 'error'`|`-`|
|disabled|是否禁用|`boolean`|`false`|
### `<step>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|node|节点|step: `number`<br>status: `string`|
|icon|图标|step: `number`<br>status: `string`|
|description|描述内容|-|


