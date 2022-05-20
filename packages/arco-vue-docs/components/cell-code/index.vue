<template>
  <div :class="cls">
    <div class="cell-code-operation">
      <a-tooltip
        :content="showCode ? t('tooltip.collapse') : t('tooltip.expand')"
      >
        <a-button
          :class="[
            'cell-code-operation-btn',
            {
              ['cell-code-operation-btn-active']: showCode,
            },
          ]"
          shape="circle"
          size="small"
          @click="handleClick"
        >
          <icon-code />
        </a-button>
      </a-tooltip>
      <a-tooltip :content="t('tooltip.copy')">
        <a-button
          class="cell-code-operation-btn"
          shape="circle"
          size="small"
          @click="handleClickCopy"
        >
          <icon-copy />
        </a-button>
      </a-tooltip>
      <a-tooltip :content="t('tooltip.stackblitz')">
        <a-button
          class="cell-code-operation-btn"
          shape="circle"
          size="small"
          @click="handleClickStackblitz"
        >
          <icon-thunderbolt />
        </a-button>
      </a-tooltip>
      <a-tooltip :content="t('tooltip.codeSandbox')">
        <a-button
          class="cell-code-operation-btn"
          shape="circle"
          size="small"
          @click="handleClickCodeSandbox"
        >
          <icon-code-sandbox />
        </a-button>
      </a-tooltip>
    </div>
    <div ref="contentRef" class="cell-code-content" :style="style">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message } from '@web-vue/components/index';
import copy from '../../utils/clipboard';
import { openStackblitz } from '../../utils/code-stackblitz';
import { openCodeSandbox } from '../../utils/code-sandbox';

export default defineComponent({
  name: 'CellCode',
  setup() {
    const { t } = useI18n();
    const showCode = ref(false);
    const contentRef = ref<HTMLElement>();
    const contentHeight = ref<number>(0);

    onMounted(() => {
      if (contentRef.value) {
        const { height } = contentRef.value.getBoundingClientRect();
        contentHeight.value = height;
      }
    });

    const style = computed<CSSProperties>(() => {
      if (showCode.value) {
        const height = contentRef?.value?.firstElementChild?.clientHeight;
        return { height: height ? `${height}px` : 'auto' };
      }
      return { height: 0 };
    });

    const handleClick = () => {
      showCode.value = !showCode.value;
    };

    const handleClickCopy = () => {
      if (contentRef.value?.textContent) {
        copy(contentRef.value.textContent)
          .then(() => {
            Message.success('Copy Success!');
          })
          .catch(() => {
            Message.error('Copy Failed! Please try again.');
          });
      }
    };

    const handleClickStackblitz = () => {
      if (contentRef.value?.textContent) {
        openStackblitz(contentRef.value.textContent);
      }
    };

    const handleClickCodeSandbox = () => {
      if (contentRef.value?.textContent) {
        openCodeSandbox(contentRef.value.textContent);
      }
    };

    const cls = computed(() => ['cell-code']);
    return {
      cls,
      showCode,
      t,
      handleClick,
      handleClickCopy,
      handleClickStackblitz,
      handleClickCodeSandbox,
      contentRef,
      style,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
