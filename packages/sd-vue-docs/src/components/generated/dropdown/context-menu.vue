<template>
  <sd-dropdown trigger="contextMenu" alignPoint class="sd:block">
    <div class="sd:flex sd:h-[300px] sd:items-center sd:justify-center sd:bg-[var(--color-fill-2)]">
      <div>Click Me</div>
    </div>
    <template #content>
      <sd-doption>Option 1</sd-doption>
      <sd-doption>Option 2</sd-doption>
      <sd-doption>Option 3</sd-doption>
    </template>
  </sd-dropdown>
</template>
