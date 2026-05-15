<template>
  <sd-radio-group default-value="1">
    <sd-radio value="1">
      <template #radio="{ checked }">
        <sd-tag :checked="checked" checkable>This is a tag radio 1</sd-tag>
      </template>
    </sd-radio>
    <sd-radio value="2">
      <template #radio="{ checked }">
        <sd-tag :checked="checked" checkable>This is a tag radio 2</sd-tag>
      </template>
    </sd-radio>
    <sd-radio value="3">
      <template #radio="{ checked }">
        <sd-tag :checked="checked" checkable>This is a tag radio 3</sd-tag>
      </template>
    </sd-radio>
  </sd-radio-group>

  <div class="sd:mt-5">
    <sd-radio-group>
      <template v-for="item in 2" :key="item">
        <sd-radio :value="item">
          <template #radio="{ checked }">
            <sd-space
              align="start"
              class="custom-radio-card"
              :class="{ 'custom-radio-card-checked': checked }"
            >
              <div className="custom-radio-card-mask">
                <div className="custom-radio-card-mask-dot" />
              </div>
              <div>
                <div className="custom-radio-card-title"> radio Card {{ item }} </div>
                <sd-typography-text type="secondary"> this is a text </sd-typography-text>
              </div>
            </sd-space>
          </template>
        </sd-radio>
      </template>
    </sd-radio-group>
  </div>
</template>

<style scoped>
  .custom-radio-card {
    box-sizing: border-box;
    width: 250px;
    padding: 10px 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
  }

  .custom-radio-card-mask {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    border: 1px solid var(--color-border-2);
    border-radius: 100%;
  }

  .custom-radio-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
  }

  .custom-radio-card-title {
    margin-bottom: 8px;
    color: var(--color-text-1);
    font-weight: bold;
    font-size: 14px;
  }

  .custom-radio-card:hover,
  .custom-radio-card-checked,
  .custom-radio-card:hover .custom-radio-card-mask,
  .custom-radio-card-checked .custom-radio-card-mask {
    border-color: rgb(var(--primary-6));
  }

  .custom-radio-card-checked {
    background-color: var(--color-primary-light-1);
  }

  .custom-radio-card:hover .custom-radio-card-title,
  .custom-radio-card-checked .custom-radio-card-title {
    color: rgb(var(--primary-6));
  }

  .custom-radio-card-checked .custom-radio-card-mask-dot {
    background-color: rgb(var(--primary-6));
  }
</style>
