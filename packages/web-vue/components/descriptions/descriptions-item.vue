<template>
  <slot />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { DescriptionsContext, descriptionsInjectionKey } from './context';
import { useIndex } from '../_hooks/use-index';

export default defineComponent({
  name: 'DescriptionsItem',
  props: {
    /**
     * @zh 所占列数
     * @en number of columns
     * @version 2.18.0
     */
    span: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 标签
     * @en Label
     * @version 2.18.0
     */
    label: String,
  },
  /**
   * @zh 标签
   * @en Label
   * @slot label
   * @version 2.18.0
   */
  setup(props) {
    const { span } = toRefs(props);
    const prefixCls = getPrefixCls('descriptions');
    const descCtx = inject(descriptionsInjectionKey, {} as DescriptionsContext);
    const instance = getCurrentInstance();
    const itemRef = ref<HTMLElement>();

    const { computedIndex } = useIndex({
      itemRef,
      selector: `.${prefixCls}-item-value`,
      parentClassName: `${prefixCls}-table`,
    });

    const itemData = reactive({
      index: computedIndex,
      span,
    });

    if (instance?.uid) {
      descCtx.addItem?.(instance.uid, itemData);
    }

    const getItemRef = () => {
      const itemEle = (instance?.proxy?.$el as Node).parentElement;
      if (itemEle && itemEle !== itemRef.value) {
        itemRef.value = itemEle;
      }
    };

    onMounted(() => getItemRef());

    onUpdated(() => getItemRef());

    onBeforeUnmount(() => {
      if (instance?.uid) {
        descCtx.removeItem?.(instance.uid);
      }
    });

    return {
      prefixCls,
    };
  },
});
</script>
