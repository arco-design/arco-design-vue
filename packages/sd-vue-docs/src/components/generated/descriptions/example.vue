<template>
  <sd-form :model="form" auto-label-width>
    <sd-form-item label="size">
      <sd-radio-group v-model="form.size" type="button" :options="sizeOptions" />
    </sd-form-item>

    <sd-form-item label="layout">
      <sd-radio-group v-model="form.layout" type="button" :options="layoutOptions" />
    </sd-form-item>

    <sd-form-item label="table-layout">
      <sd-radio-group v-model="form.tableLayout" type="button" :options="['auto', 'fixed']" />
    </sd-form-item>

    <sd-form-item label="column">
      <sd-radio-group v-model="form.column" type="button" :options="columnOptions" />
    </sd-form-item>

    <sd-form-item label="firstSpan">
      <sd-radio-group v-model="form.firstSpan" type="button" :options="firstSpanOptions" />
    </sd-form-item>
  </sd-form>
  <div class="sd:mt-5">
    <sd-descriptions
      title="Layout Example"
      :size="form.size"
      :column="form.column"
      :layout="form.layout"
      :table-layout="form.tableLayout"
      bordered
    >
      <sd-descriptions-item label="Item1" :span="form.firstSpan">
        <div
          >Span：{{ form.firstSpan }}
          <span v-if="form.firstSpan > form.column" class="sd:text-[red]">
            Exceeds Column, set to Column size
          </span>
        </div>
      </sd-descriptions-item>
      <sd-descriptions-item label="Item2" :span="2">Span：2</sd-descriptions-item>
      <sd-descriptions-item label="Item3" :span="3">Span：3</sd-descriptions-item>
      <sd-descriptions-item label="Item4" :span="2">Span：2</sd-descriptions-item>
      <sd-descriptions-item label="Item5" :span="1">Span：1</sd-descriptions-item>
      <sd-descriptions-item label="Item6" :span="1">Span：1</sd-descriptions-item>
    </sd-descriptions>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const form = reactive({
    size: 'medium',
    layout: 'horizontal',
    column: 4,
    tableLayout: 'auto',
    firstSpan: 2,
  });

  const layoutOptions = ['horizontal', 'inline-horizontal', 'vertical', 'inline-vertical'];
  const columnOptions = [1, 2, 3, 4, 5];
  const firstSpanOptions = [1, 2, 3, 4, 5];
  const sizeOptions = ['mini', 'small', 'medium', 'large'];
</script>
