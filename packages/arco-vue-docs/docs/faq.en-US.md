```yaml
meta:
  type: Developer Guide
title: FAQ
description: Frequently Asked Questions in the Use of the Component Library
```

## Controlled and Uncontrolled

The concept of `controlled` is used in the Arco Design Vue component library, as the name suggests, the display state of the component will always be the same as the incoming value. We recommend using input components in controlled mode.

At this time, you can modify the value of `model-value` through `two-way binding (v-model)` or `change` event to ensure the same value inside and outside the component.

In controlled mode, if you want to control the displayed value, you can use the `change` event to handle it.

If we don't want to control the value of the component, we can use the uncontrolled mode, in which case the value of the component will be maintained inside the component, and the initial value can be set by `default-value`. In uncontrolled mode, you can get the value of the component through the `change` event.

pay attention:
The `default-*` class attributes are used to set initial values in uncontrolled mode and do not affect subsequent states. When this value and the controlled value are used at the same time, the controlled value takes precedence.


## Update At Scroll

By default, the drop-down menu will follow the change of the window scroll bar to update the position. If the component containing the drop-down menu is placed in a scrollable container, there will be a problem that the drop-down menu does not update the position when the container is scrolled. At this time, you can use the trigger inside the component. configuration, will `updateAtScroll`
Set to `true` to enable rolling update support.

If there are many such scenes in the project, you can enable this property globally through the [ConfigProvider](/vue/component/config-provider) component.

## The use of virtual lists

Components that support setting up virtual lists [List](/vue/component/list) 、[Select](/vue/component/Select)、[Table](/vue/component/table)、[Tree](/vue/component/tree) set `virtual-list-props` Enable the virtual list function.

The rendering of virtual list elements can be divided into two cases: **elements are highly fixed** and **elements are highly dynamic**.

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|height|Viewable area height|`number \| string`|`-`||
|fixedSize| Whether the elements in the list are of fixed size (height) |`boolean`|`false`|2.34.1|
|estimatedSize| Estimated size (height) [this value is not valid when `fixedSize` is `true`], and if it is closer to the average size, the scroll bar length will look more accurate. It is recommended to allocate the average calculated by yourself. The default dynamic height will use the average of the first Section |`number`|`-`|2.34.1|
|buffer| The number of elements mounted in advance outside the boundary of the viewport. (`Section = buffer * 3`) the default value is `10` (that is, Section defaults to 30). It is recommended to adjust the height of the list viewport. This value will affect performance. |`number`|`10`|2.34.1|
