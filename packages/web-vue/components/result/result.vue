<template>
  <div :class="prefixCls">
    <div
      :class="[
        `${prefixCls}-icon`,
        {
          [`${prefixCls}-icon-${status}`]: status,
          [`${prefixCls}-icon-custom`]: status === null,
        },
      ]"
    >
      <div :class="`${prefixCls}-icon-tip`">
        <slot name="icon">
          <icon-info v-if="status === 'info'" />
          <icon-check v-else-if="status === 'success'" />
          <icon-exclamation v-else-if="status === 'warning'" />
          <icon-close v-else-if="status === 'error'" />
          <result-forbidden v-else-if="status === '403'" />
          <result-not-found v-else-if="status === '404'" />
          <result-server-error v-else-if="status === '500'" />
        </slot>
      </div>
    </div>
    <div v-if="title || $slots.title" :class="`${prefixCls}-title`">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div v-if="subtitle || $slots.subtitle" :class="`${prefixCls}-subtitle`">
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </div>
    <div v-if="$slots.extra" :class="`${prefixCls}-extra`">
      <slot name="extra"></slot>
    </div>
    <div v-if="$slots.default" :class="`${prefixCls}-content`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconInfo from '../icon/icon-info';
import IconCheck from '../icon/icon-check';
import IconExclamation from '../icon/icon-exclamation';
import IconClose from '../icon/icon-close';
import ResultForbidden from './403';
import ResultNotFound from './404';
import ResultServerError from './500';

const RESULT_STATUS = [
  'info',
  'success',
  'warning',
  'error',
  '403',
  '404',
  '500',
  null,
] as const;

type ResultStatus = typeof RESULT_STATUS[number];

export default defineComponent({
  name: 'Result',
  components: {
    IconInfo,
    IconCheck,
    IconExclamation,
    IconClose,
    ResultForbidden,
    ResultNotFound,
    ResultServerError,
  },
  props: {
    /**
     * @zh 结果页显示的状态
     * @en The status displayed on the result page
     * @values 'info','success','warning','error','403','404','500', null
     */
    status: {
      type: String as PropType<ResultStatus>,
      default: 'info',
      validator: (value: any) => {
        return RESULT_STATUS.includes(value);
      },
    },
    /**
     * @zh 标题内容
     * @en Title
     */
    title: String,
    /**
     * @zh 子标题内容
     * @en Subtitle
     */
    subtitle: String,
  },
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   */
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 副标题
   * @en Subtitle
   * @slot subtitle
   */
  /**
   * @zh 操作区
   * @en Extra
   * @slot extra
   * @version 2.8.0
   */
  /**
   * @zh 默认插槽
   * @en Default
   * @slot default
   * @version 2.8.0
   */
  setup() {
    const prefixCls = getPrefixCls('result');

    return {
      prefixCls,
    };
  },
});
</script>
