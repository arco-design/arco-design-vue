<template>
  <div class="frame-bg">
    <div class="frame-body">
      <div class="frame-aside">
        <sd-steps :current="current" direction="vertical">
          <sd-step>Succeeded</sd-step>
          <sd-step>Processing</sd-step>
          <sd-step>Pending</sd-step>
        </sd-steps>
      </div>
      <div class="frame-main">
        <div class="main-content">The content of this step.</div>
        <div class="main-bottom">
          <sd-button :disabled="current === 1" @click="onPrev">
            <icon-left />
            Back
          </sd-button>
          <sd-button :disabled="current === 3" @click="onNext">
            Next
            <icon-right />
          </sd-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const current = ref(1);

  const onPrev = () => {
    current.value = Math.max(1, current.value - 1);
  };

  const onNext = () => {
    current.value = Math.min(3, current.value + 1);
  };
</script>

<style scoped lang="scss">
  .frame-bg {
    max-width: 780px;
    padding: 40px;
    background: var(--color-fill-2);
  }

  .frame-body {
    display: flex;
    background: var(--color-bg-2);
  }

  .frame-aside {
    height: 272px;
    padding: 24px;
    border-right: 1px solid var(--color-border);
  }

  .frame-main {
    width: 100%;
  }

  .main-content {
    line-height: 200px;
    text-align: center;
  }

  .main-bottom {
    display: flex;
    justify-content: center;

    button {
      margin: 0 20px;
    }
  }
</style>
