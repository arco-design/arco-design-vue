<template>
  <sd-form size="small" :model="form" auto-label-width>
    <sd-row :gutter="16">
      <sd-col :span="24">
        <sd-form-item field="rotate" label="rotate">
          <sd-slider v-model="form.rotate" :min="-180" :max="180" />
        </sd-form-item>
      </sd-col>
      <sd-col :span="12">
        <sd-form-item label="gap">
          <sd-input-group>
            <sd-input-number v-model="form.gap[0]" placeholder="gap[x]" :min="0" />
            <sd-input-number v-model="form.gap[1]" placeholder="gap[y]" :min="0" />
          </sd-input-group>
        </sd-form-item>
      </sd-col>
      <sd-col :span="12">
        <sd-form-item label="offset">
          <sd-input-group>
            <sd-input-number v-model="form.offset[0]" placeholder="offsetLeft" />
            <sd-input-number v-model="form.offset[1]" placeholder="offsetTop" />
          </sd-input-group>
        </sd-form-item>
      </sd-col>
      <sd-col :span="12">
        <sd-form-item label="fontSize">
          <sd-input-number v-model="form.font.fontSize" mode="button" />
        </sd-form-item>
      </sd-col>
      <sd-col :span="12">
        <sd-form-item label="zIndex">
          <sd-input-number v-model="form.zIndex" mode="button" />
        </sd-form-item>
      </sd-col>
      <sd-col :span="6">
        <sd-form-item label="repeat">
          <sd-switch v-model="form.repeat" />
        </sd-form-item>
      </sd-col>
      <sd-col :span="6">
        <sd-form-item label="staggered">
          <sd-switch v-model="form.staggered" />
        </sd-form-item>
      </sd-col>
    </sd-row>
  </sd-form>
  <sd-watermark content="sd.design" v-bind="form">
    <div class="sd:box-border sd:w-full sd:border sd:border-[#e5e6eb]">
      <sd-typography-title :heading="5"> Design system </sd-typography-title>
      <sd-typography>
        <sd-typography-paragraph>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design.
        </sd-typography-paragraph>
        <sd-typography-paragraph>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design.
        </sd-typography-paragraph>
      </sd-typography>
      <img
        alt="watermark demo"
        class="sd:relative sd:z-[7]"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp"
      />
    </div>
  </sd-watermark>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const form = reactive({
    rotate: 0,
    gap: [50, 50],
    offset: [],
    font: { fontSize: 16 },
    zIndex: 6,
    repeat: true,
    staggered: true,
  });
</script>
