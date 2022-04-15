<template>
  <div :class="prefixCls">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, reactive, toRefs } from 'vue';
import { Status, Size } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { ButtonTypes, BUTTON_TYPES } from './constants';
import { buttonGroupInjectionKey } from './context';

export default defineComponent({
  name: 'ButtonGroup',
  props: {
    /**
     * @zh 子按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。
     * @en Children button types are divided into five types: secondary, primary, dashed, outline and text.
     * @values 'secondary','primary','dashed','outline','text'
     */
    type: {
      type: String as PropType<ButtonTypes>,
      validator: (value: any) => {
        return BUTTON_TYPES.includes(value);
      },
    },
    /**
     * @zh 子按钮的状态
     * @en Children button state
     * @values 'normal','warning','success','danger'
     */
    status: {
      type: String as PropType<Status>,
    },
    /**
     * @zh 子按钮的尺寸
     * @en Children button size
     * @values 'mini','small','medium','large'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 全部子按钮是否禁用
     * @en All children whether the button is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { type, size, status, disabled } = toRefs(props);
    const prefixCls = getPrefixCls('btn-group');

    provide(
      buttonGroupInjectionKey,
      reactive({
        type,
        size,
        status,
        disabled,
      })
    );

    return {
      prefixCls,
    };
  },
});
</script>
