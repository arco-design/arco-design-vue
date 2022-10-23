```yaml
meta:
  type: 开发指南
title: 常见问题
description: 组件库使用中的常见问题解答
```

## 受控与非受控

Arco Design Vue 组件库中使用了 `受控` 的概念，正如其名，组件的显示状态将始终与传入值相同。我们推荐通过受控模式来使用输入组件。

这时可以通过 `双向绑定（v-model）` 或者 `change` 事件来修改 `model-value` 的值，来保证组件内部与外部的值相同。

在受控模式中，如果希望控制显示的值，可以使用 `change` 事件进行处理。

如果我们不希望控制组件的值，可以使用非受控模式，此时组件的值将维护在组件内部，可以通过 `default-value` 来设置初始值。非受控模式下可以通过 `change` 事件来获取组件的值。

特别注意：
`default-*` 类属性用来设置非受控模式下的初始值，不会影响后续的状态。此值与受控值同时使用时，受控值优先生效。


## 下拉菜单的滚动跟随

下拉菜单默认会跟随 window 滚动条的变化更新位置，如果将包含下拉菜单的组件放置在一个可滚动的容器中，会出现容器滚动时下拉菜单没有更新位置的问题，此时可以通过组件内部的 trigger 配置，将 `updateAtScroll`
设置为 `true` 开启滚动更新的支持。

如果项目内此场景较多，可以通过 [ConfigProvider](/vue/component/config-provider) 组件全局开启此属性。

## 虚拟列表的使用

支持设置虚拟列表的组件 [List](/vue/component/list) 、[Select](/vue/component/Select)、[Table](/vue/component/table)、[Tree](/vue/component/tree) 设置 `virtual-list-props` 开启虚拟列表功能。

虚拟列表元素的渲染分为 **元素高度固定**，**元素高度动态** 两种情况。

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|height|可视区域高度|`number \| string`|`-`||
|fixedSize| 列表内元素是否为固定大小（高度）|`boolean`|`false`|2.34.1|
|estimatedSize| 预估大小（高度）[当 `fixedSize` 为 `true` 时，此值无效]，如果它更接近平均大小，则滚动条长度看起来将更准确。建议分配自己计算的平均值。默认动态高度将使用首个 Section 的平均值|`number`|`-`|2.34.1|
|buffer|视口边界外提前挂载的元素数量。（`Section = buffer * 3`）默认值为 `10`（也就是 Section 默认为 30）, 建议根据列表视口的高度做调整，此值太大会影响性能。|`number`|`10`|2.34.1|
