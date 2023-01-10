```yaml
meta:
  type: Component
  category: Data Entry
title: Slider
description: Sliding input device, showing current value and selectable range.
```

_Auto translate by google._

@import ./\_\_demo\_\_/basic.md

@import ./\_\_demo\_\_/disabled.md

@import ./\_\_demo\_\_/step.md

@import ./\_\_demo\_\_/marks.md

@import ./\_\_demo\_\_/range.md

@import ./\_\_demo\_\_/input.md

@import ./\_\_demo\_\_/vertical.md

@import ./\_\_demo\_\_/tooltip.md

@import ./\_\_demo\_\_/show-tooltip.md

## API

### `<slider>` Props

| Attribute                 | Description                        | Type                         |    Default     |
| ------------------------- | ---------------------------------- | ---------------------------- | :------------: |
| model-value **(v-model)** | Value                              | `number \| [number, number]` |      `-`       |
| default-value             | Default value (uncontrolled state) | `number \| [number, number]` |      `0`       |
| step                      | Sliding step                       | `number`                     |      `1`       |
| min                       | Minimum sliding range              | `number`                     |      `0`       |
| marks                     | Set the displayed label            | `Record<number, string>`     |      `-`       |
| max                       | Maximum sliding range              | `number`                     |     `100`      |
| direction                 | The direction of the slider        | `Direction`                  | `'horizontal'` |
| disabled                  | Whether to disable                 | `boolean`                    |    `false`     |
| show-ticks                | Whether to show ticks              | `boolean`                    |    `false`     |
| show-input                | Whether to show the input          | `boolean`                    |    `false`     |
| show-tooltip              | Whether to show the tooltip        | `boolean`                    |     `true`     |
| range                     | Whether to use range selection     | `boolean`                    |    `false`     |

### `<slider>` Events

| Event Name | Description                    | Parameters                          |
| ---------- | ------------------------------ | ----------------------------------- |
| change     | Trigger when the value changes | value: `number \| [number, number]` |
