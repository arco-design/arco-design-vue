```yaml
meta:
  type: Developer Guide
title: FAQ
description: Common Problem
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

If there are many such scenes in the project, you can enable this property globally through the `ConfigProvider` component.
