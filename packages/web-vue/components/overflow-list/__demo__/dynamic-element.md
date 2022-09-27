```yaml
title:
  zh-CN: 动态元素
  en-US: Dynamic elements
```

## zh-CN

元素宽度或数量变化可自动处理显隐。

---

## en-US

Changes in the width or quantity of elements can be handled automatically.

---

```vue
<template>
  <a-form auto-label-width>
    <a-form-item label="Edit first tag">
      <a-input v-model="tags[0]" style="width: 200px"/>
    </a-form-item>
  </a-form>
  <a-slider v-model="width" :min="0" :max="800" />
  <div :style="{ maxWidth:`${width}px`, width: '100%', marginTop: '20px'}">
    <a-overflow-list :min="2">
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
      <a-tag
        v-for="(tag, index) of tags"
        color="arcoblue"
        :key="tag"
        :closable="index !== 0"
        @close="handleRemove(tag)"
      >
        {{ tag }}
      </a-tag>
    </a-overflow-list>
  </div>
</template>

<script>
import { computed, ref, nextTick } from 'vue';

export default {
  setup() {
    const width = ref(500);

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
      width,
      tags,
      inputRef,
      showInput,
      inputVal,
      handleEdit,
      handleAdd,
      handleRemove,
    }
  }
}
</script>
```
