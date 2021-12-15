```yaml
meta:
  type: 组件
  category: 反馈
title: 抽屉 Drawer
description: 触发命令后，从屏幕一侧滑出的抽屉式的面板。
```

@import ./__demo__/basic.md

@import ./__demo__/position.md

@import ./__demo__/nested.md


### `<drawer>` Props

| 参数名              | 描述                              |类型|默认值|
|------------------|---------------------------------|---|:---:|
| visible **(v-model)** | 抽屉是否可见                          |`boolean`|`false`|
| default-visible  | 抽屉默认是否可见（非受控模式）                 |`boolean`|`false`|
| placement        | 抽屉放置的位置                         |`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`|
| title            | 标题                              |`string`|`-`|
| mask             | 是否显示遮罩层                         |`boolean`|`true`|
| mask-closable    | 点击遮罩层是否可以关闭                     |`boolean`|`true`|
| closable         | 是否展示关闭按钮                        |`boolean`|`true`|
| ok-text          | 确认按钮的内容                         |`string`|`-`|
| cancel-text      | 取消按钮的内容                         |`string`|`-`|
| ok-loading       | 确认按钮是否为加载中状态                    |`boolean`|`false`|
| width            | 抽屉的宽度（仅在placement为right,left时可用） |`number`|`250`|
| height           | 抽屉的高度（仅在placement为top,bottom时可用） |`number`|`250`|
| popup-container  | 弹出框的挂载容器                        |`string \| HTMLElement \| null \| undefined`|`'body'`|
| drawer-style     | 抽屉的样式                           |`CSSProperties`|`-`|
| footer           | 是否展示底部内容                     |`boolean`|`true`|
### `<drawer>` Events

|事件名|描述|参数|
|---|---|---|
|ok|点击确定按钮时触发|-|
|cancel|点击取消、关闭按钮时触发|-|
|open|抽屉打开后（动画结束）触发|-|
|close|抽屉关闭后（动画结束）触发|-|
### `<drawer>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|
|footer|页脚|-|


