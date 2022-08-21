```yaml
title:
  zh-CN: 自定义字数限制
  en-US: Custom word limit
```

## zh-CN

通过 `max-limit` slot 来自定义字数限制的展示。

---

## en-US

Customize the display of the word limit through `word limit 'slot.

---

```vue
<template>
  <a-space direction="vertical" size="large" fill>
    <a-textarea
      placeholder="Please enter something"
      :max-length="10"
      show-word-limit
    >
      <template #word-limit="{ length, maxLength }">
        <a-tag bordered size="small" :color="length < maxLength ? 'arcoblue' : 'magenta'">
          {{ length }}/{{ maxLength }}
        </a-tag>
      </template>
    </a-textarea>
    <a-textarea
      class="custom-textarea"
      placeholder="Please enter something"
      default-value="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea."
      :max-length="280"
      show-word-limit
    >
      <template #word-limit="{ length, maxLength }">
        {{ length }}/{{ maxLength }}
      </template>
    </a-textarea>
  </a-space>
</template>

<style>
.custom-textarea {
  padding-bottom: 22px;
}

.custom-textarea textarea {
  resize: none;
}
</style>
```
