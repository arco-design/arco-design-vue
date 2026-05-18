<template>
  <Tooltip v-bind="mergedTooltipProps">
    <component :is="renderComponent" v-bind="attrs" :class="componentClass" @click="handleCopy">
      <template #icon>
        <slot name="icon">
          <IconCopy />
        </slot>
      </template>
      <slot />
    </component>
  </Tooltip>
</template>

<script setup lang="ts">
  import { computed, useAttrs } from 'vue';

  import copy from 'copy-to-clipboard';

  import type { CopyComponentType, CopyProps } from './types';

  import { getPrefixCls } from '../_utils/global-config';
  import Button from '../button';
  import IconCopy from '../icon/icon-copy';
  import Link from '../link';
  import Message from '../message';
  import Tooltip from '../tooltip';

  defineOptions({
    name: 'Copy',
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<CopyProps>(), {
    content: '',
    tooltip: '复制',
    tooltipProps: undefined,
    clipboardProps: undefined,
    component: 'link',
    textInherit: true,
    successMessage: '复制成功',
  });

  const emit = defineEmits<{
    /**
     * @zh 复制成功后触发
     * @en Emitted after content is copied
     */
    copy: [value: string];
  }>();

  const attrs = useAttrs();
  const prefixCls = getPrefixCls('copy');
  const componentMap: Record<CopyComponentType, typeof Link | typeof Button> = {
    link: Link,
    button: Button,
  };

  const renderComponent = computed(() => componentMap[props.component]);
  const componentClass = computed(() => [
    prefixCls,
    { [`${prefixCls}-inherit`]: props.component === 'link' && props.textInherit },
  ]);
  const isDisabled = computed(() => {
    const disabled =
      (props as CopyProps & { disabled?: boolean | string }).disabled ?? attrs.disabled;

    return disabled === '' || disabled === true || disabled === 'true';
  });
  const mergedTooltipProps = computed(() => ({
    ...props.tooltipProps,
    content: props.tooltipProps?.content ?? props.tooltip,
  }));

  async function handleCopy() {
    if (isDisabled.value) {
      return;
    }

    await copy(props.content, props.clipboardProps);
    Message.success(props.successMessage);
    emit('copy', props.content);
  }
</script>
