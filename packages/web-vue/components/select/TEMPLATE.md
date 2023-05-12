## zh-CN

```yaml
meta:
  type: 组件
  category: 数据输入
title: 选择器 Select
description: 当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。
```

---

## en-US

```yaml
meta:
  type: Component
  category: Data Entry
title: Select
description: When users need to select one or more from a group of similar data, they can use the drop-down selector, click and select the corresponding item.
```

---

@import ./__demo__/basic.md

@import ./__demo__/clear.md

@import ./__demo__/multiple.md

@import ./__demo__/size.md

@import ./__demo__/loading.md

@import ./__demo__/header.md

@import ./__demo__/footer.md

@import ./__demo__/border.md

@import ./__demo__/create.md

@import ./__demo__/search.md

@import ./__demo__/scroll.md

@import ./__demo__/fallback.md

@import ./__demo__/remote.md

@import ./__demo__/group.md

@import ./__demo__/label.md

@import ./__demo__/linkage.md

@import ./__demo__/field-names.md

@import ./__demo__/virtual-list.md

## API

%%API(select.tsx)%%

%%API(option.vue)%%

%%API(optgroup.vue)%%

### Type

```ts
/**
 * @zh 选项
 * @en Option
 */
type Option = string | number | SelectOptionData | SelectOptionGroup;

/**
 * @zh 筛选
 * @en Filter
 */
type FilterOption = boolean | ((inputValue: string, option: SelectOptionData) => boolean);
```

%%INTERFACE(interface.ts)%%

%%INTERFACE(../_components/virtual-list-v2/interface.ts)%%


## zh-CN
## FAQ

### 使用 `Object` 格式作为选项的值
当使用 `Object` 格式作为选项的值时，需要通过 `value-key` 属性为选择器指定获取唯一标识的字段名，默认值为 `value`.

例如当我需要指定 `key` 为唯一标识时：
```vue
<template>
  <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select ..." value-key="key">
    <a-option v-for="item of data" :value="item" :label="item.label" />
  </a-select>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      key: 'extra1'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      key: 'extra2'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      key: 'extra3'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      key: 'extra4'
    }]

    return {
      value,
      data
    }
  },
}
</script>
```

---
## en-US
## FAQ

### Use `Object` format as option value
When using the `Object` format as the value of the option, you need to specify the field name to obtain the unique identifier for the selector through the `value-key` attribute, and the default value is `value`.

For example, when I need to specify `key` as a unique identifier:
```vue
<template>
  <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select ..." value-key="key">
    <a-option v-for="item of data" :value="item" :label="item.label" />
  </a-select>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      key: 'extra1'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      key: 'extra2'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      key: 'extra3'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      key: 'extra4'
    }]

    return {
      value,
      data
    }
  },
}
</script>
```

---
