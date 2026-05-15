<template>
  <div>
    <sd-split
      class="sd:h-50 sd:w-full sd:min-w-125 sd:border sd:border-solid sd:border-(--color-border)"
    >
      <template #first>
        <sd-typography-paragraph>Left</sd-typography-paragraph>
      </template>
      <template #second>
        <div>
          <sd-split direction="vertical" class="sd:h-50">
            <template #first><sd-typography-paragraph>Top</sd-typography-paragraph></template>
            <template #second><sd-typography-paragraph>Bottom</sd-typography-paragraph></template>
          </sd-split>
        </div>
      </template>
    </sd-split>
  </div>
</template>
