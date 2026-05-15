<template>
  <sd-row>
    <sd-col :flex="1">
      <sd-countdown title="Countdown" :value="now + 1000 * 60 * 60 * 2" :now="now" />
    </sd-col>
    <sd-col :flex="1">
      <sd-countdown
        title="Milliseconds"
        :value="now + 1000 * 60 * 60 * 2"
        :now="now"
        format="HH:mm:ss.SSS"
      />
    </sd-col>
    <sd-col :flex="1">
      <sd-countdown
        title="Days"
        :value="now + 1000 * 60 * 60 * 24 * 4"
        :now="now"
        format="D 天 H 时 m 分 s 秒"
      />
    </sd-col>
  </sd-row>
  <sd-space direction="vertical" class="sd:mt-2.5">
    <sd-countdown
      title="Trigger on finish"
      :value="Date.now() + 5 * 1000"
      format="mm:ss.SSS"
      :now="Date.now()"
      :start="start"
      @finish="handleFinish"
    />
    <sd-button @click="start = true" type="primary">Start</sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { Message } from '@sdata/web-vue';

  const now = Date.now();
  const start = ref(false);

  const handleFinish = () => {
    Message.info('Finish');
  };
</script>
