<template>
  <sd-dropdown>
    <sd-button>Click Me</sd-button>
    <template #content>
      <sd-doption>Option 1</sd-doption>
      <sd-dsubmenu value="option-1">
        <template #default>Option 2</template>
        <template #content>
          <sd-doption>Option 2-1</sd-doption>
          <sd-dsubmenu value="option-2-2" trigger="hover">
            <template #default>Option 2-2</template>
            <template #content>
              <sd-doption>Option 2-1</sd-doption>
              <sd-doption>Option 2-2</sd-doption>
              <sd-doption>Option 2-3</sd-doption>
            </template>
            <template #footer>
              <div class="sd:p-1.5 sd:text-center">
                <sd-button>Click</sd-button>
              </div>
            </template>
          </sd-dsubmenu>
          <sd-doption>Option 2-3</sd-doption>
        </template>
      </sd-dsubmenu>
      <sd-doption>Option 3</sd-doption>
    </template>
  </sd-dropdown>
</template>
