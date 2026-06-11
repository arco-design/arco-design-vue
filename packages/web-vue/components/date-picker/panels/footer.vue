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
    <div v-if="$slots.btn || showConfirmBtn" :class="`${prefixCls}-footer-btn-wrapper`">
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

<script setup lang="ts">
  import Button from '../../button';
  import Link from '../../link';
  import useInjectDatePickerTransform from '../hooks/use-inject-datepicker-transform';

  defineOptions({ name: 'PanelFooter' });

  const props = defineProps({
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
  });

  const emit = defineEmits<{
    'today-btn-click': [];
    'confirm-btn-click': [];
  }>();

  const datePickerT = useInjectDatePickerTransform();

  const onTodayClick = () => {
    emit('today-btn-click');
  };
  const onConfirmBtnClick = () => {
    emit('confirm-btn-click');
  };
</script>
