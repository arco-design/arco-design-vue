```yaml
title:
  zh-CN: 自定义
  en-US: Custom
```

## zh-CN

通过自定义参数以实现更多的水印效果。

---

## en-US

Customize the watermark.

---

```vue
<template>
  <a-form size="small" :model="form" auto-label-width>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item field="rotate" label="rotate">
          <a-slider v-model="form.rotate" :min="-180" :max="180" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="gap">
          <a-input-group>
            <a-input-number
              v-model="form.gap[0]"
              placeholder="gap[x]"
              :min="0"
            />
            <a-input-number
              v-model="form.gap[1]"
              placeholder="gap[y]"
              :min="0"
            />
          </a-input-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="offset">
          <a-input-group>
            <a-input-number v-model="form.offset[0]" placeholder="offsetLeft" />
            <a-input-number v-model="form.offset[1]" placeholder="offsetTop" />
          </a-input-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="fontSize">
          <a-input-number v-model="form.font.fontSize" mode="button" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="zIndex">
          <a-input-number v-model="form.zIndex" mode="button" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="repeat">
          <a-switch v-model="form.repeat" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="staggered">
          <a-switch v-model="form.staggered" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <a-watermark content="arco.design" v-bind="form">
    <div style="width: 100%; border: 1px solid #e5e6eb; box-sizing: border-box">
      <a-typography-title :heading="5"> Design system </a-typography-title>
      <a-typography>
        <a-typography-paragraph>
          A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process. The verb to design expresses the process of
          developing a design.
        </a-typography-paragraph>
        <a-typography-paragraph>
          A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process. The verb to design expresses the process of
          developing a design.
        </a-typography-paragraph>
      </a-typography>
      <img
        style="position: relative; z-index: 7"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp"
      />
    </div>
  </a-watermark>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      rotate: 0,
      gap: [50, 50],
      offset: [],
      font: { fontSize: 16 },
      zIndex: 6,
      repeat: true,
      staggered: true,
    });
    return {
      form,
    };
  },
};
</script>
```
