<template>
  <sd-space direction="vertical" class="sd:w-80">
    <sd-link href="#" class="sd:w-full">
      这是一段较长的链接文案，用于演示默认单行省略能力，宽度受限时会自动截断并在悬浮后展示完整内容。
    </sd-link>

    <sd-link href="#" class="sd:w-full" :ellipsis-line-clamp="2" ellipsis-expand-trigger="click">
      这是一段更长的链接文案，用于演示多行省略与点击展开。内容被截断时，会保留链接交互，并支持通过
      tooltip 插槽展示自定义提示信息。
      <template #tooltip>
        <div class="sd:max-w-72">点击链接正文可以展开完整内容，这里是自定义的省略提示。</div>
      </template>
    </sd-link>
  </sd-space>
</template>
