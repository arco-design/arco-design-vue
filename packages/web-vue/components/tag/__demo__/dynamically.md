```yaml
title:
  zh-CN: 动态编辑标签
  en-US: Dynamically Edit
```

## zh-CN

可动态添加和删除标签。

---

## en-US

Can add and delete tags dynamically.

---

```vue
<template>
  <a-space wrap>
    <a-tag
      v-for="(tag, index) of tags"
      :key="tag"
      :closable="index !== 0"
      @close="handleRemove(tag)"
    >
      {{ tag }}
    </a-tag>

    <a-input
      v-if="showInput"
      ref="inputRef"
      :style="{ width: '90px'}"
      size="mini"
      v-model.trim="inputVal"
      @keyup.enter="handleAdd"
      @blur="handleAdd"
    />
    <a-tag
      v-else
      :style="{
        width: '90px',
        backgroundColor: 'var(--color-fill-2)',
        border: '1px dashed var(--color-fill-3)',
        cursor: 'pointer',
      }"
      @click="handleEdit"
    >
      <template #icon>
        <icon-plus />
      </template>
      Add Tag
    </a-tag>
  </a-space>
</template>

<script>
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const tags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
    const inputRef = ref(null);
    const showInput = ref(false);
    const inputVal = ref('');

    const handleEdit = () => {
      showInput.value = true;

      nextTick(() => {
        if (inputRef.value) {
          inputRef.value.focus();
        }
      });
    };

    const handleAdd = () => {
      if (inputVal.value) {
        tags.value.push(inputVal.value);
        inputVal.value = '';
      }
      showInput.value = false;
    };

    const handleRemove = (key) => {
      tags.value = tags.value.filter((tag) => tag !== key);
    };

    return {
      tags,
      inputRef,
      showInput,
      inputVal,
      handleEdit,
      handleAdd,
      handleRemove,
    };
  },
};
</script>

```
