<template>
  <a :href="disabled ? undefined : href" :class="cls">
    <slot />
  </a>
</template>

<script lang="ts">
/**
 * @todo 添加单独icon支持
 */
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { Status, STATUSES } from '../_utils/constant';

export default defineComponent({
  name: 'Link',
  props: {
    /**
     * @zh 链接地址
     * @en Link address
     */
    href: String,
    /**
     * @zh 链接的状态
     * @en Link status
     * @values 'normal','warning','success','danger'
     */
    status: {
      type: String as PropType<Status>,
      default: 'normal',
      validator: (value: any) => {
        return STATUSES.includes(value);
      },
    },
    /**
     * @zh 链接是否禁用
     * @en Whether the link is disabled
     */
    disabled: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('link');

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-status-${props.status}`,
      {
        [`${prefixCls}-disabled`]: props.disabled,
      },
    ]);

    return {
      cls,
    };
  },
});
</script>
