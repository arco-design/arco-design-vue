<template>
  <sd-form ref="formRef" :size="form.size" :model="form" class="sd:w-150" @submit="handleSubmit">
    <sd-form-item field="size" label="Form Size">
      <sd-radio-group v-model="form.size" type="button">
        <sd-radio value="mini">Mini</sd-radio>
        <sd-radio value="small">Small</sd-radio>
        <sd-radio value="medium">Medium</sd-radio>
        <sd-radio value="large">Large</sd-radio>
      </sd-radio-group>
    </sd-form-item>
    <sd-form-item
      field="name"
      label="Username"
      :rules="[
        { required: true, message: 'name is required' },
        { minLength: 5, message: 'must be greater than 5 characters' },
      ]"
      :validate-trigger="['change', 'input']"
    >
      <sd-input v-model="form.name" placeholder="please enter your username..." />
    </sd-form-item>
    <sd-form-item
      field="age"
      label="Age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', max: 200, message: 'age is max than 200' },
      ]"
    >
      <sd-input-number v-model="form.age" placeholder="please enter your age..." />
    </sd-form-item>
    <sd-form-item
      field="section"
      label="Section"
      :rules="[{ match: /section one/, message: 'must select one' }]"
    >
      <sd-select v-model="form.section" placeholder="Please select ..." allow-clear>
        <sd-option value="section one">Section One</sd-option>
        <sd-option value="section two">Section Two</sd-option>
        <sd-option value="section three">Section Three</sd-option>
      </sd-select>
    </sd-form-item>
    <sd-form-item
      field="province"
      label="Province"
      :rules="[{ required: true, message: 'province is required' }]"
    >
      <sd-cascader
        v-model="form.province"
        :options="options"
        placeholder="Please select ..."
        allow-clear
      />
    </sd-form-item>
    <sd-form-item
      field="options"
      label="Options"
      :rules="[{ type: 'array', minLength: 2, message: 'must select greater than two options' }]"
    >
      <sd-checkbox-group v-model="form.options">
        <sd-checkbox value="option one">Section One</sd-checkbox>
        <sd-checkbox value="option two">Option Two</sd-checkbox>
        <sd-checkbox value="option three">Option Three</sd-checkbox>
        <sd-checkbox value="option four">Option Four</sd-checkbox>
      </sd-checkbox-group>
    </sd-form-item>
    <sd-form-item field="date" label="Date">
      <sd-date-picker v-model="form.date" placeholder="Please select ..." />
    </sd-form-item>
    <sd-form-item field="time" label="Time">
      <sd-time-picker v-model="form.time" placeholder="Please select ..." />
    </sd-form-item>
    <sd-form-item
      field="radio"
      label="Radio"
      :rules="[{ match: /one/, message: 'must select one' }]"
    >
      <sd-radio-group v-model="form.radio">
        <sd-radio value="radio one">Radio One</sd-radio>
        <sd-radio value="radio two">Radio Two</sd-radio>
      </sd-radio-group>
    </sd-form-item>
    <sd-form-item
      field="slider"
      label="Slider"
      :rules="[{ type: 'number', min: 5, message: 'slider is min than 5' }]"
    >
      <sd-slider v-model="form.slider" :max="10" />
    </sd-form-item>
    <sd-form-item field="score" label="Score">
      <sd-rate v-model="form.score" allow-clear />
    </sd-form-item>
    <sd-form-item
      field="switch"
      label="Switch"
      :rules="[{ type: 'boolean', true: true, message: 'must be true' }]"
    >
      <sd-switch v-model="form.switch" />
    </sd-form-item>
    <sd-form-item field="multiSelect" label="Multiple Select">
      <sd-select v-model="form.multiSelect" placeholder="Please select ..." multiple>
        <sd-option value="section one">Section One</sd-option>
        <sd-option value="section two">Section Two</sd-option>
        <sd-option value="section three">Section Three</sd-option>
      </sd-select>
    </sd-form-item>
    <sd-form-item field="treeSelect" label="Tree Select">
      <sd-tree-select :data="treeData" v-model="form.treeSelect" placeholder="Please select ..." />
    </sd-form-item>
    <sd-form-item>
      <sd-space>
        <sd-button html-type="submit">Submit</sd-button>
        <sd-button @click="formRef?.resetFields()">Reset</sd-button>
      </sd-space>
    </sd-form-item>
  </sd-form>
  {{ form }}
</template>

<script setup lang="ts">
  import type { FormInstance, Size, ValidatedError } from '@sdata/web-vue';

  import { reactive, ref } from 'vue';

  const handleSubmit = ({
    values,
    errors,
  }: {
    values: Record<string, unknown>;
    errors: Record<string, ValidatedError> | undefined;
  }) => {
    console.log('values:', values, '\nerrors:', errors);
  };

  const form = reactive({
    size: 'medium' as Size,
    name: '',
    age: undefined,
    section: '',
    province: 'haidian',
    options: [],
    date: '',
    time: '',
    radio: 'radio one',
    slider: 5,
    score: 5,
    switch: false,
    multiSelect: ['section one'],
    treeSelect: '',
  });
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'ChaoYang',
          children: [
            {
              value: 'datunli',
              label: 'Datunli',
            },
          ],
        },
        {
          value: 'haidian',
          label: 'Haidian',
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng',
        },
        {
          value: 'xicheng',
          label: 'XiCheng',
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];
  const treeData = [
    {
      key: 'node1',
      title: 'Node1',
      children: [
        {
          key: 'node2',
          title: 'Node2',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Node3',
      children: [
        {
          key: 'node4',
          title: 'Node4',
        },
        {
          key: 'node5',
          title: 'Node5',
        },
      ],
    },
  ];

  const formRef = ref<FormInstance | null>(null);
</script>
