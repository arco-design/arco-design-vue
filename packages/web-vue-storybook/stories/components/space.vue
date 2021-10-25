<template>
  <Space>
    <template v-for="i in 10" :key="i">
      <template v-if="i === 2">
        <template v-for="k in 10" :key="k">
          <template v-if="k === 2">
            <div v-for="f in 10" :key="f">22{{ f }}</div>
          </template>
          <template v-else
            ><div>2{{ k }}</div></template
          >
        </template>
      </template>
      <template v-else
        ><div>{{ i }}</div></template
      >
    </template>
    {{ 222 }}
    <template v-if="true">
      <div>template 1</div>
      <div>template 2</div>
    </template>
  </Space>
</template>

<script>
import { Space } from '@web-vue/components';

export default {
  components: { Space },
};
</script>
