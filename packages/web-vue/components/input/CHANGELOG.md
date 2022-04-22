```yaml
changelog: true
```

## 2.23.0

`2022-04-08`

### 💎 Enhancement

- The `clear` event of the input class component will also trigger the `change` event ([#951](https://github.com/arco-design/arco-design-vue/pull/951))


## 2.18.0-beta.3

`2022-02-26`

### 💎 Enhancement

- modelValue support null ([#743](https://github.com/arco-design/arco-design-vue/pull/743))


## 2.17.0

`2022-02-11`

### 💎 Enhancement

- Increase the transparent transmission of some original attributes of the input element ([#664](https://github.com/arco-design/arco-design-vue/pull/664))


## 2.16.2

`2022-01-24`

### 💅 Style

- Fix `input-group` with rounded corners of input components ([#640](https://github.com/arco-design/arco-design-vue/pull/640))


## 2.16.0

`2022-01-21`

### 🆕 Feature

- The `<input-search>` component adds the ability to customize the content of the search button ([#625](https://github.com/arco-design/arco-design-vue/pull/625))

### 💅 Style

- Fix `<input-group>` component wrapping `<select>` component style issue ([#588](https://github.com/arco-design/arco-design-vue/pull/588))


## 2.15.0

`2022-01-14`

### 💅 Style

- Fix the problem of wrong background color in dark mode ([#560](https://github.com/arco-design/arco-design-vue/pull/560))


## 2.14.3

`2022-01-12`

### 🐛 BugFix

- Fix the problem that the input-search attribute is invalid in button mode ([#552](https://github.com/arco-design/arco-design-vue/pull/552))


## 2.14.2

`2022-01-10`

### 🐛 BugFix

- Fix the problem of wrong font color in disabled state in Safari browser ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.14.0

`2022-01-07`

### 🐛 BugFix

- Fix change event trigger issue ([#516](https://github.com/arco-design/arco-design-vue/pull/516))
- Fix the problem that the style setting is in the wrong position when there are front and rear tags ([#516](https://github.com/arco-design/arco-design-vue/pull/516))


## 2.12.0

`2021-12-24`

### ⚠️ Important Attention

- The change event is only triggered when the value changes ([#452](https://github.com/arco-design/arco-design-vue/pull/452))

### 🆕 Feature

- `max-length` adds `errorOnly` attribute and `word-slice` attribute ([#451](https://github.com/arco-design/arco-design-vue/pull/451))


## 2.7.0

`2021-11-26`

### 🐛 BugFix

- Fix the problem that the enter key of the numeric keyboard does not trigger `press-enter` ([#273](https://github.com/arco-design/arco-design-vue/pull/273))


## 2.1.0

`2021-11-05`

### 🆕 Feature

- Add `wordLength` prop ([#91](https://github.com/arco-design/arco-design-vue/pull/91))

### 🐛 BugFix

- Remove `preventDefault` of keyDown event ([#84](https://github.com/arco-design/arco-design-vue/pull/84))
- Fix the issue that the `a-input-number` component `model-value` does not take effect when the default value is 0 ([#75](https://github.com/arco-design/arco-design-vue/pull/75))
- Fix the problem that `input-search` and `input-password` do not support `slot` ([#63](https://github.com/arco-design/arco-design-vue/pull/63))
- Fix the problem that the cursor position is lost when `input-password` is switched to the visible state of the password ([#63](https://github.com/arco-design/arco-design-vue/pull/63))

### 💅 Style

- Modify the style of `clear-btn` to solve the problem that `select-view` may jitter ([#70](https://github.com/arco-design/arco-design-vue/pull/70))

