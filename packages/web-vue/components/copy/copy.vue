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

  import type { CopyComponentType, CopyProps } from './types';

  import { clipboard } from '../_utils/clipboard';
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
  const mergedTooltipProps = computed(() => ({
    ...props.tooltipProps,
    content: props.tooltipProps?.content ?? props.tooltip,
  }));

  async function handleCopy() {
    await clipboard(props.content);
    Message.success(props.successMessage);
    emit('copy', props.content);
  }
</script>
