<template>
  <Form :model="form1" :style="{ width: '600px' }" @submit="handleSubmit">
    <FormItem field="name" label="Username">
      <Input v-model="form1.name" placeholder="please enter your username..." />
    </FormItem>
    <FormItem field="post" label="Post">
      <Input v-model="form1.post" placeholder="please enter your post..." />
    </FormItem>
    <FormItem field="isRead">
      <Checkbox v-model="form1.isRead"> I have read the manual </Checkbox>
    </FormItem>
    <FormItem>
      <Button html-type="submit">Submit</Button>
    </FormItem>
  </Form>

  <br />
  <br />
  <br />
  <Button @click="handleClick">Open Form Modal</Button>
  <Modal
    v-model:visible="visible"
    title="Modal Form"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <Form :model="form2">
      <FormItem field="name" label="Name">
        <Input v-model="form2.name" />
      </FormItem>
      <FormItem field="post" label="Post">
        <Select v-model="form2.post">
          <Option value="post1">Post1</Option>
          <Option value="post2">Post2</Option>
          <Option value="post3">Post3</Option>
          <Option value="post4">Post4</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { reactive, ref } from 'vue';
import {
  FormItem,
  Form,
  Option,
  Select,
  Modal,
  Button,
  Input,
  Checkbox,
} from '@web-vue/components';

export default {
  components: {
    FormItem,
    Form,
    Option,
    Select,
    Modal,
    Button,
    Input,
    Checkbox,
  },
  setup() {
    const form1 = reactive({
      name: '',
      post: '',
      isRead: false,
    });
    const handleSubmit = (data) => {
      console.log(data);
    };

    const visible = ref(false);
    const form2 = reactive({
      name: '',
      post: '',
    });

    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {
      console.log(form2);
      window.setTimeout(() => {
        done();
        // prevent close
        // done(false)
      }, 3000);
    };
    const handleCancel = () => {
      visible.value = false;
    };

    return {
      visible,
      form1,
      form2,
      handleClick,
      handleBeforeOk,
      handleCancel,
      handleSubmit,
    };
  },
};
</script>
