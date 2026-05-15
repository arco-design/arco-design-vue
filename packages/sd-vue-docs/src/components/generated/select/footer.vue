<template>
  <sd-space>
    <sd-select
      :default-value="'Beijing'"
      class="sd:w-90"
      placeholder="Please select ..."
      allow-search
    >
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Wuhan</sd-option>
      <template #footer>
        <div class="sd:py-1.5 sd:text-center">
          <sd-button>Click Me</sd-button>
        </div>
      </template>
    </sd-select>
    <sd-select
      :default-value="'Beijing'"
      class="sd:w-90"
      placeholder="Please select ..."
      allow-search
      show-footer-on-empty
    >
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Wuhan</sd-option>
      <template #footer>
        <div class="sd:py-1.5 sd:text-center">
          <sd-button>Click Me</sd-button>
        </div>
      </template>
    </sd-select>
  </sd-space>
</template>
