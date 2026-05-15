<template>
  <sd-ellipsis :tooltip="{ position: 'bottom', mini: true }" class="sd:block sd:max-w-65">
    Hover the truncated content to show a custom tooltip body rendered by the tooltip slot.
    <template #tooltip>
      <div>
        <strong>Full content</strong>
        <div class="sd:mt-1">
          Hover the truncated content to show a custom tooltip body rendered by the tooltip slot.
        </div>
      </div>
    </template>
  </sd-ellipsis>
</template>
