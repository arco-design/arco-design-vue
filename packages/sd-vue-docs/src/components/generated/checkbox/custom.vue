<template>
  <sd-checkbox-group :default-value="['1']">
    <sd-checkbox value="1">
      <template #checkbox="{ checked }">
        <sd-tag :checked="checked" checkable>This is a tag checkbox 1</sd-tag>
      </template>
    </sd-checkbox>
    <sd-checkbox value="2">
      <template #checkbox="{ checked }">
        <sd-tag :checked="checked" checkable>This is a tag checkbox 2</sd-tag>
      </template>
    </sd-checkbox>
    <sd-checkbox value="3">
      <template #checkbox="{ checked }">
        <sd-tag :checked="checked" checkable>This is a tag checkbox 3</sd-tag>
      </template>
    </sd-checkbox>
  </sd-checkbox-group>

  <div class="sd:mt-5">
    <sd-checkbox-group :default-value="[1]">
      <template v-for="item in 2" :key="item">
        <sd-checkbox :value="item">
          <template #checkbox="{ checked }">
            <sd-space
              align="start"
              class="custom-checkbox-card"
              :class="{ 'custom-checkbox-card-checked': checked }"
            >
              <div className="custom-checkbox-card-mask">
                <div className="custom-checkbox-card-mask-dot" />
              </div>
              <div>
                <div className="custom-checkbox-card-title"> Checkbox Card {{ item }} </div>
                <sd-typography-text type="secondary"> this is a text </sd-typography-text>
              </div>
            </sd-space>
          </template>
        </sd-checkbox>
      </template>
    </sd-checkbox-group>
  </div>
</template>

<style scoped>
  .custom-checkbox-card {
    box-sizing: border-box;
    width: 250px;
    padding: 10px 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
  }

  .custom-checkbox-card-mask {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    border: 1px solid var(--color-border-2);
    border-radius: 2px;
  }

  .custom-checkbox-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  .custom-checkbox-card-title {
    margin-bottom: 8px;
    color: var(--color-text-1);
    font-weight: bold;
    font-size: 14px;
  }

  .custom-checkbox-card:hover,
  .custom-checkbox-card-checked,
  .custom-checkbox-card:hover .custom-checkbox-card-mask,
  .custom-checkbox-card-checked .custom-checkbox-card-mask {
    border-color: rgb(var(--primary-6));
  }

  .custom-checkbox-card-checked {
    background-color: var(--color-primary-light-1);
  }

  .custom-checkbox-card:hover .custom-checkbox-card-title,
  .custom-checkbox-card-checked .custom-checkbox-card-title {
    color: rgb(var(--primary-6));
  }

  .custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
    background-color: rgb(var(--primary-6));
  }
</style>
