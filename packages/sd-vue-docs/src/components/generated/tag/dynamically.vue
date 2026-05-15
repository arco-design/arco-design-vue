<template>
  <sd-space wrap>
    <sd-tag
      v-for="(tag, index) of tags"
      :key="tag"
      :closable="index !== 0"
      @close="handleRemove(tag)"
    >
      {{ tag }}
    </sd-tag>

    <sd-input
      v-if="showInput"
      ref="inputRef"
      class="sd:w-22.5"
      size="mini"
      v-model.trim="inputVal"
      @keyup.enter="handleAdd"
      @blur="handleAdd"
    />
    <sd-tag
      v-else
      class="sd:w-[90px] sd:cursor-pointer sd:border sd:border-dashed sd:border-[var(--color-fill-3)] sd:bg-[var(--color-fill-2)]"
      @click="handleEdit"
    >
      <template #icon>
        <icon-plus />
      </template>
      Add Tag
    </sd-tag>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';

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
</script>
