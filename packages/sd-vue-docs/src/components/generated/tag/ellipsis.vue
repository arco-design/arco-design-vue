<template>
  <sd-space direction="vertical" class="sd:w-80">
    <sd-tag class="sd:w-full">
      这是一段较长的标签内容，用于演示默认单行省略能力，宽度受限时会自动截断并在悬浮后展示完整内容。
    </sd-tag>

    <sd-tag class="sd:w-full" :ellipsis="false">
      关闭 ellipsis 后，这段标签内容会按普通文本渲染，不再挂载省略组件。
    </sd-tag>

    <sd-tag
      class="sd:w-full"
      ellipsis-performant
      :ellipsis-line-clamp="2"
      ellipsis-expand-trigger="click"
    >
      这是一段更长的标签内容，用于演示高性能省略版本与多行点击展开。内容被截断时，可以按需激活完整的省略测量逻辑。
      <template #tooltip>
        <div class="sd:max-w-72">这里是自定义的标签省略提示内容。</div>
      </template>
    </sd-tag>
  </sd-space>
</template>
