## zh-CN
```yaml
meta:
  type: 组件
  category: 数据展示
title: 图片 Image
description: 展示和预览图片。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Data Display
title: Image
description: Used to show and preview pictures.
```
---

@import ./__demo__/basic.md

@import ./__demo__/caption.md

@import ./__demo__/extra.md

@import ./__demo__/error.md

@import ./__demo__/loader.md

@import ./__demo__/progressive-loader.md

@import ./__demo__/custom-preview-actions.md

@import ./__demo__/preview-group.md

@import ./__demo__/component-preview.md

@import ./__demo__/component-preview-group.md

@import ./__demo__/preview-popup-container.md

## API

%%API(image.vue)%%

%%API(preview.vue)%%

%%API(preview-group.vue)%%

%%API(preview-action.tsx)%%

## FAQ

## zh-CN
### 关于 `image-preview` 的属性说明

1. 键盘快捷键 `keyboard` 设置此属性为 `true` 后，将根据 `actions-layout` 操作项来启用相应的快捷键操作。
- `esc`: 关闭预览
- `left`: 切换至上一张图片
- `right`: 切换至下一张图片
- `up`: 放大图片
- `down`: 缩小图片
- `space`: 还原至原始大小

2. 默认缩放比例 `defaultScale` 此属性定义了默认的图片缩放比例。例如，当设置为 1.5 时，图片将默认放大到原始大小的 1.5 倍。

3. 滚动缩放速率 `zoomSate` 属性控制了在滚动操作时图片的缩放速率。以 1.3 为例，每次滚动操作都会使图片放大或缩小 1.3 倍。

---
## en-US
### Property Description for `image-preview`

**1. Keyboard Shortcuts - `keyboard`**
Setting this property to `true` enables corresponding keyboard shortcuts based on the `actions-layout` settings.

- `esc`: Close preview
- `left`: Switch to the previous image
- `right`: Switch to the next image
- `up`: Zoom in on the image
- `down`: Zoom out on the image
- `space`: Restore to original size

**2. Default Scaling - `defaultScale`**
This property defines the default scaling factor for images. For instance, when set to 1.5, images will be enlarged by 1.5 times their original size by default.

**3. Scroll Zoom Rate - `zoomSate`**
The `zoomSate` property controls the scaling rate of images during scrolling. Taking 1.3 as an example, each scrolling action will result in an image zoom-in or zoom-out by a factor of 1.3.

---
