import { defineComponent, PropType, VNodeTypes } from 'vue';

// 渲染函数允许不返回内容（例如 dateRender 在部分情况下返回 undefined）
export type RenderFunc = (
  props: Record<string, unknown>
) => VNodeTypes | undefined;

export default defineComponent({
  name: 'RenderFunction',
  props: {
    renderFunc: {
      type: Function as PropType<RenderFunc>,
      // 调用方通常用 v-if/v-else 保护，这里不再强制必填，
      // 否则 `:render-func="maybeUndefined"` 一律报类型错误
      default: undefined,
    },
  },
  render() {
    return this.renderFunc?.(this.$attrs);
  },
});
