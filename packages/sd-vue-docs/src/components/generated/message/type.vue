<template>
  <div>
    <sd-space>
      <sd-button @click="() => this.$message.info('This is an info message!')"
        >Info Message</sd-button
      >
      <sd-button @click="() => this.$message.success('This is a success message!')" status="success"
        >Success Message
      </sd-button>
      <sd-button @click="() => this.$message.warning('This is a warning message!')" status="warning"
        >Warning Message
      </sd-button>
      <sd-button @click="() => this.$message.error('This is an error message!')" status="danger"
        >Error Message</sd-button
      >
    </sd-space>
  </div>
  <div class="sd:mt-5">
    <sd-space>
      <sd-button @click="() => this.$message.normal('This is a normal message!')"
        >Normal Message</sd-button
      >
      <sd-button
        @click="
          () =>
            this.$message.normal({
              content: 'This is a normal message!',
              icon: renderIcon,
            })
        "
        >Normal Message With Icon
      </sd-button>
      <sd-button @click="() => this.$message.loading('This is a loading message!')" status="primary"
        >Loading Message
      </sd-button>
    </sd-space>
  </div>
</template>

<script setup lang="ts">
  import { h } from 'vue';

  import { IconExclamationCircleFill } from '@sdata/web-vue/es/icon/index.js';

  const renderIcon = () => h(IconExclamationCircleFill);
</script>
