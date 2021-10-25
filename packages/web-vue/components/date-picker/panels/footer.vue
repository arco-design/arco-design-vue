<template>
  <div :class="`${prefixCls}-footer`">
    <div v-if="$slots.extra" :class="`${prefixCls}-footer-extra-wrapper`">
      <slot name="extra" />
    </div>
    <div v-if="showTodayBtn" :class="`${prefixCls}-footer-now-wrapper`">
      <Link @click="onTodayClick">
        {{ datePickerT('datePicker.today') }}
      </Link>
    </div>
    <div
      v-if="$slots.btn || showConfirmBtn"
      :class="`${prefixCls}-footer-btn-wrapper`"
    >
      <slot name="btn" />
      <Button
        v-if="showConfirmBtn"
        :class="`${prefixCls}-btn-confirm`"
        type="primary"
        size="mini"
        :disabled="confirmBtnDisabled"
        @click="onConfirmBtnClick"
      >
        {{ datePickerT('datePicker.ok') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Link from '../../link';
import Button from '../../button';
import useInjectDatePickerTransform from '../hooks/use-inject-datepicker-transform';

export default defineComponent({
  name: 'PanelFooter',
  components: {
    Link,
    Button,
  },
  props: {
    prefixCls: {
      type: String,
      required: true,
    },
    showTodayBtn: {
      type: Boolean,
    },
    showConfirmBtn: {
      type: Boolean,
    },
    confirmBtnDisabled: {
      type: Boolean,
    },
  },
  emits: ['today-btn-click', 'confirm-btn-click'],
  setup(_, { emit }) {
    const datePickerT = useInjectDatePickerTransform();
    return {
      datePickerT,
      onTodayClick: () => {
        emit('today-btn-click');
      },
      onConfirmBtnClick: () => {
        emit('confirm-btn-click');
      },
    };
  },
});
</script>
