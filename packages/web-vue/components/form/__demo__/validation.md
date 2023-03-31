```yaml
title:
  zh-CN: 验证表单
  en-US: Validation
```

## zh-CN

展示了表单校验的使用方法。

---

## en-US

Shows how to use form validation.

---

```vue
<template>
  <a-form ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
    <a-form-item field="size" label="Form Size" >
      <a-radio-group v-model="form.size" type="button">
        <a-radio value="mini">Mini</a-radio>
        <a-radio value="small">Small</a-radio>
        <a-radio value="medium">Medium</a-radio>
        <a-radio value="large">Large</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item field="name" label="Username"
                 :rules="[{required:true,message:'name is required'},{minLength:5,message:'must be greater than 5 characters'}]"
                 :validate-trigger="['change','input']"
    >
      <a-input v-model="form.name" placeholder="please enter your username..." />
    </a-form-item>
    <a-form-item field="age" label="Age"
                 :rules="[{required:true,message:'age is required'},{type:'number', max:200,message:'age is max than 200'}]"
    >
      <a-input-number v-model="form.age" placeholder="please enter your age..." />
    </a-form-item>
    <a-form-item field="section" label="Section" :rules="[{match:/section one/,message:'must select one'}]">
      <a-select v-model="form.section" placeholder="Please select ..." allow-clear>
        <a-option value="section one">Section One</a-option>
        <a-option value="section two">Section Two</a-option>
        <a-option value="section three">Section Three</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="province" label="Province" :rules="[{required:true,message:'province is required'}]">
      <a-cascader v-model="form.province" :options="options" placeholder="Please select ..." allow-clear />
    </a-form-item>
    <a-form-item field="options" label="Options"
                 :rules="[{type:'array',minLength:2,message:'must select greater than two options'}]"
    >
      <a-checkbox-group v-model="form.options">
        <a-checkbox value="option one">Section One</a-checkbox>
        <a-checkbox value="option two">Option Two</a-checkbox>
        <a-checkbox value="option three">Option Three</a-checkbox>
        <a-checkbox value="option four">Option Four</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item field="date" label="Date">
      <a-date-picker v-model="form.date" placeholder="Please select ..."/>
    </a-form-item>
    <a-form-item field="time" label="Time">
      <a-time-picker v-model="form.time" placeholder="Please select ..."/>
    </a-form-item>
    <a-form-item field="radio" label="Radio" :rules="[{match:/one/,message:'must select one'}]">
      <a-radio-group v-model="form.radio">
        <a-radio value="radio one">Radio One</a-radio>
        <a-radio value="radio two">Radio Two</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item field="slider" label="Slider" :rules="[{type:'number', min:5,message:'slider is min than 5'}]">
      <a-slider v-model="form.slider" :max="10" />
    </a-form-item>
    <a-form-item field="score" label="Score">
      <a-rate v-model="form.score" allow-clear />
    </a-form-item>
    <a-form-item field="switch" label="Switch" :rules="[{type:'boolean', true:true,message:'must be true'}]">
      <a-switch v-model="form.switch" />
    </a-form-item>
    <a-form-item field="multiSelect" label="Multiple Select">
      <a-select v-model="form.multiSelect" placeholder="Please select ..." multiple>
        <a-option value="section one">Section One</a-option>
        <a-option value="section two">Section Two</a-option>
        <a-option value="section three">Section Three</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="treeSelect" label="Tree Select">
      <a-tree-select :data="treeData" v-model="form.treeSelect" placeholder="Please select ..."/>
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit">Submit</a-button>
        <a-button @click="$refs.formRef.resetFields()">Reset</a-button>
      </a-space>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const handleSubmit = ({values, errors}) => {
      console.log('values:', values, '\nerrors:', errors)
    }

    const form = reactive({
      size: 'medium',
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
      treeSelect: ''
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
    ]

    return {
      form,
      options,
      treeData,
      handleSubmit
    }
  },
}
</script>
```
