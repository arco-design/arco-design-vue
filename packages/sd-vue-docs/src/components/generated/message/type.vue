<template>
  <div>
    <sd-space>
      <sd-button @click="() => Message.info('This is an info message!')">Info Message</sd-button>
      <sd-button @click="() => Message.success('This is a success message!')" status="success"
        >Success Message
      </sd-button>
      <sd-button @click="() => Message.warning('This is a warning message!')" status="warning"
        >Warning Message
      </sd-button>
      <sd-button @click="() => Message.error('This is an error message!')" status="danger"
        >Error Message</sd-button
      >
    </sd-space>
  </div>
  <div class="sd:mt-5">
    <sd-space>
      <sd-button @click="() => Message.normal('This is a normal message!')"
        >Normal Message</sd-button
      >
      <sd-button
        @click="
          () =>
            Message.normal({
              content: 'This is a normal message!',
              icon: renderIcon,
            })
        "
        >Normal Message With Icon
      </sd-button>
      <sd-button @click="() => Message.loading('This is a loading message!')" type="primary"
        >Loading Message
      </sd-button>
    </sd-space>
  </div>
</template>

<script setup lang="ts">
  import { h } from 'vue';

  import { Message } from '@sdata/web-vue';
  import { IconExclamationCircleFill } from '@sdata/web-vue/es/icon/index.js';

  const renderIcon = () => h(IconExclamationCircleFill);
</script>
