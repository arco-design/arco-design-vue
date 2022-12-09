```yaml
meta:
  type: Component
  category: Data Display
title: Avatar
description: Used as an avatar, it can be displayed in the form of pictures, icons or characters.
```

_Auto translate by google._

@import ./\_\_demo\_\_/basic.md

@import ./\_\_demo\_\_/size.md

@import ./\_\_demo\_\_/group.md

@import ./\_\_demo\_\_/icon.md

@import ./\_\_demo\_\_/fit.md

@import ./\_\_demo\_\_/image-url.md

## API

### `<avatar>` Props

| Attribute          | Description                                                                         | Type                   |  Default   |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------- | :--------: |
| shape              | The shape of the avatar, there are two kinds of circle (circle) and square (square) | `'circle' \| 'square'` | `'circle'` |
| size               | The size of the avatar, the unit is `px`. Use size `40px` in styles when not filled | `number`               |    `-`     |
| auto-fix-font-size | Whether to automatically adjust the font size according to the size of the avatar.  | `boolean`              |   `true`   |
| trigger-type       | Clickable avatar interaction type                                                   | `'mask' \| 'button'`   | `'button'` |
| trigger-icon-style | Interactive icon style                                                              | `CSSProperties`        |    `-`     |
| image-url          | Custom picture path, default rendering `img` label                                  | `string`               |    `-`     |

### `<avatar>` Events

| Event Name | Description                                                                           | Parameters       |
| ---------- | ------------------------------------------------------------------------------------- | ---------------- |
| click      | Callback when clicked                                                                 | ev: `MouseEvent` |
| error      | Callback for image loading failure. It only takes effect when `image-url` has a value | -                |
| load       | Callback for image loaded. It only takes effect when `image-url` has a value          | -                |

### `<avatar>` Slots

| Slot Name    | Description                        | Parameters       |
| ------------ | ---------------------------------- | ---------------- |
| trigger-icon | Clickable avatar interaction icon  | -                |
| error        | Content of picture loading failure | icon-image-close |
| loading      | Content of picture loaded          | icon-loading     |

### `<avatar-group>` Props

| Attribute                 | Description                                                                                                            | Type                   |  Default   | version |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------- | :--------: | :------ |
| shape                     | The shape of the avatar in the group, there are two kinds of circle (circle) and square (square)                       | `'circle' \| 'square'` | `'circle'` |         |
| size                      | The size of the avatar in the group, the unit is `px`                                                                  | `number`               |    `-`     |         |
| auto-fix-font-size        | Whether to automatically adjust the font size according to the size of the avatar.                                     | `boolean`              |   `true`   |         |
| max-count                 | The maximum number of avatars displayed in the avatar group. The excess avatars will be displayed in the form of `+x`. | `number`               |    `0`     |         |
| z-index-ascend            | The avatar `z-index` in the avatar group increases, and the default is decreasing.                                     | `boolean`              |  `false`   |         |
| max-style                 | Style for +x.                                                                                                          | `CSSProperties`        |    `-`     | 2.7.0   |
| max-popover-trigger-props | TriggerProps for popover around +x.                                                                                    | `TriggerProps`         |    `-`     | 2.7.0   |
