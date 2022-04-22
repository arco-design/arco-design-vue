```yaml
changelog: true
```

## 2.25.0

`2022-04-22`

### 💎 Enhancement

- When closing with `esc`, only the topmost popup will be closed ([#1018](https://github.com/arco-design/arco-design-vue/pull/1018))


## 2.24.0

`2022-04-15`

### 🆕 Feature

- Add animation name attribute ([#985](https://github.com/arco-design/arco-design-vue/pull/985))

### 🐛 BugFix

- Fixed an issue where the body would not be locked in some cases ([#968](https://github.com/arco-design/arco-design-vue/pull/968))

### 💅 Style

- Fix the issue that the scroll bar flashes when the animation is in full screen ([#985](https://github.com/arco-design/arco-design-vue/pull/985))


## 2.23.0

`2022-04-08`

### 💎 Enhancement

- Fix the problem that the body is not locked when the scroll bar is floating ([#945](https://github.com/arco-design/arco-design-vue/pull/945))

### 💅 Style

- Fix the problem that title-align is left-aligned invalid in simple mode ([#945](https://github.com/arco-design/arco-design-vue/pull/945))


## 2.22.0

`2022-04-01`

### 🐛 BugFix

- Fix auto width and drag error when `align-center="false"` ([#918](https://github.com/arco-design/arco-design-vue/pull/918))


## 2.21.0

`2022-03-25`

### 🐛 BugFix

- Fix the bug that the enter key triggers modal display multiple times ([#860](https://github.com/arco-design/arco-design-vue/pull/860))


## 2.20.0

`2022-03-18`

### 🐛 BugFix

- Fixed `close` function returning wrong in create method ([#840](https://github.com/arco-design/arco-design-vue/pull/840))


## 2.19.0

`2022-03-11`

### 🆕 Feature

- Add `draggable` property to support draggable ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- Added `fullscreen` property to support full screen display ([#802](https://github.com/arco-design/arco-design-vue/pull/802))


## 2.18.0-beta.2

`2022-02-25`

### 💎 Enhancement

- Optimize click mask layer off ([#737](https://github.com/arco-design/arco-design-vue/pull/737))


## 2.17.0

`2022-02-11`

### 🆕 Feature

- Added `title-align` attribute ([#673](https://github.com/arco-design/arco-design-vue/pull/673))


## 2.16.0

`2022-01-21`

### 🆕 Feature

- Added `before-open` and `before-close` events ([#628](https://github.com/arco-design/arco-design-vue/pull/628))

### 🐛 BugFix

- Fix style file missing `<button>` component style reference ([#635](https://github.com/arco-design/arco-design-vue/pull/635))


## 2.15.0

`2022-01-14`

### 🆕 Feature

- Added `escToClose` property and enabled by default ([#577](https://github.com/arco-design/arco-design-vue/pull/577))


## 2.12.2

`2021-12-27`

### 🐛 BugFix

- Fix the problem of invalid modalStyle ([#459](https://github.com/arco-design/arco-design-vue/pull/459))
- Fix the problem that the flex layout causes vertical centering and incomplete display beyond the height ([#459](https://github.com/arco-design/arco-design-vue/pull/459))


## 2.12.0

`2021-12-24`

### ⚠️ Important Attention

- Modify the way the wrapper layer displays modal, and add the `width` and `top` attributes ([#454](https://github.com/arco-design/arco-design-vue/pull/454))

### 🐛 BugFix

- Fix the problem that the button content cannot be modified dynamically ([#453](https://github.com/arco-design/arco-design-vue/pull/453))


## 2.11.0

`2021-12-17`

### 🐛 BugFix

- Fix the problem that the `alignCenter` property does not take effect ([#384](https://github.com/arco-design/arco-design-vue/pull/384))
- The `alignCenter` property of the adjustment component defaults to `true` ([#384](https://github.com/arco-design/arco-design-vue/pull/384))


## 2.10.1

`2021-12-14`

### 🆎 TypeScript

- `ModalConfig` adds `simple` attribute annotation ([#389](https://github.com/arco-design/arco-design-vue/pull/389))


## 2.10.0

`2021-12-10`

### 💅 Style

- Fix the problem of modal information display mode error ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- The title bar close button is not displayed in simple mode ([#351](https://github.com/arco-design/arco-design-vue/pull/351))


## 2.7.0

`2021-11-26`

### 🆕 Feature

- Added `on-before-ok` and `on-before-cancel` property events ([#229](https://github.com/arco-design/arco-design-vue/pull/229))

### 🐛 BugFix

- Fix the issue of initial triggering of the `open` event ([#267](https://github.com/arco-design/arco-design-vue/pull/267))


## 2.4.0

`2021-11-17`

### 💎 Enhancement

- Manage the zIndex of the popup ([#167](https://github.com/arco-design/arco-design-vue/pull/167))


## 2.1.1

`2021-11-08`

### 🐛 BugFix

- Fix the problem that the `title` attribute does not take effect ([#116](https://github.com/arco-design/arco-design-vue/pull/116))


## 2.0.3

`2021-10-29`

### 🐛 BugFix

- Fix the problem of the wrong type of the main button ([#30](https://github.com/arco-design/arco-design-vue/pull/30))

