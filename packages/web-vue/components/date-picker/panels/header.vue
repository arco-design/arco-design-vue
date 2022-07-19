<template>
  <div :class="`${prefixCls}-header`">
    <div :class="getIconClassName(showSuperPrev)" @click="onSuperPrev">
      <template v-if="showSuperPrev">
        <RenderFunction
          v-if="icons && icons.prevDouble"
          :render-func="icons && icons.prevDouble"
        />
        <IconDoubleLeft v-else />
      </template>
    </div>
    <div :class="getIconClassName(showPrev)" @click="onPrev">
      <template v-if="showPrev">
        <RenderFunction
          v-if="icons && icons.prev"
          :render-func="icons && icons.prev"
        />
        <IconLeft v-else />
      </template>
    </div>
    <div :class="`${prefixCls}-header-title`">
      <template v-if="onLabelClick && (year || month)">
        <span
          v-if="year"
          :class="`${prefixCls}-header-label`"
          @click="() => onLabelClick && onLabelClick('year')"
          >{{ year }}</span
        >
        <span v-if="year && month">-</span>
        <span
          v-if="month"
          :class="`${prefixCls}-header-label`"
          @click="() => onLabelClick && onLabelClick('month')"
          >{{ month }}</span
        >
      </template>
      <template v-else>{{ title }}</template>
    </div>
    <div :class="getIconClassName(showNext)" @click="onNext">
      <template v-if="showNext">
        <RenderFunction
          v-if="icons && icons.next"
          :render-func="icons && icons.next"
        />
        <IconRight v-else />
      </template>
    </div>
    <div :class="getIconClassName(showSuperNext)" @click="onSuperNext">
      <template v-if="showSuperNext">
        <RenderFunction
          v-if="icons && icons.nextDouble"
          :render-func="icons && icons.nextDouble"
        />
        <IconDoubleRight v-else />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Dayjs } from 'dayjs';
import { isFunction } from '../../_utils/is';
import IconLeft from '../../icon/icon-left';
import IconRight from '../../icon/icon-right';
import IconDoubleLeft from '../../icon/icon-double-left';
import IconDoubleRight from '../../icon/icon-double-right';
import { HeaderIcons, Mode } from '../interface';
import RenderFunction from '../../_components/render-function';

type ClickCallbackFunc = (payload: MouseEvent) => void;

export type HeaderLabelClickFunc = (label: 'year' | 'month') => void;

export default defineComponent({
  name: 'PanelHeader',
  components: {
    IconLeft,
    IconRight,
    IconDoubleLeft,
    IconDoubleRight,
    RenderFunction,
  },
  props: {
    prefixCls: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mode: {
      type: String as PropType<Mode>,
      default: 'date',
    },
    value: {
      type: Object as PropType<Dayjs>,
    },
    icons: {
      type: Object as PropType<HeaderIcons>,
    },
    onPrev: {
      type: Function as PropType<ClickCallbackFunc>,
    },
    onSuperPrev: {
      type: Function as PropType<ClickCallbackFunc>,
    },
    onNext: {
      type: Function as PropType<ClickCallbackFunc>,
    },
    onSuperNext: {
      type: Function as PropType<ClickCallbackFunc>,
    },
    onLabelClick: {
      type: Function as PropType<HeaderLabelClickFunc>,
    },
  },
  emits: ['label-click'],
  setup(props) {
    return {
      showPrev: computed(() => isFunction(props.onPrev)),
      showSuperPrev: computed(() => isFunction(props.onSuperPrev)),
      showNext: computed(() => isFunction(props.onNext)),
      showSuperNext: computed(() => isFunction(props.onSuperNext)),
      year: computed(() =>
        ['date', 'quarter', 'month', 'week'].includes(props.mode) && props.value
          ? props.value.format('YYYY')
          : ''
      ),
      month: computed(() =>
        ['date', 'week'].includes(props.mode) && props.value
          ? props.value.format('MM')
          : ''
      ),
      getIconClassName: (show?: boolean) => [
        `${props.prefixCls}-header-icon`,
        {
          [`${props.prefixCls}-header-icon-hidden`]: !show,
        },
      ],
    };
  },
});
</script>
