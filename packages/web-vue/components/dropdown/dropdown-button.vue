<template>
  <ButtonGroup>
    <Button
      :size="size"
      :type="type"
      :disabled="disabled"
      v-bind="buttonProps"
      @click="handleClick"
    >
      <slot />
    </Button>
    <Dropdown position="br">
      <Button :size="size" :type="type" :disabled="disabled">
        <template #icon>
          <slot name="icon">
            <IconMore />
          </slot>
        </template>
      </Button>
      <template #content>
        <slot name="content" />
      </template>
    </Dropdown>
  </ButtonGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IconMore from '../icon/icon-more';
import Button, { ButtonGroup } from '../button';
import Dropdown from './dropdown.vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'DropdownButton',
  components: {
    IconMore,
    Button,
    ButtonGroup,
    Dropdown,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    size: {
      type: String,
    },
    buttonProps: {
      type: Object,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('dropdown');

    const handleClick = (ev: Event) => {
      emit('click', ev);
    };

    return {
      prefixCls,
      handleClick,
    };
  },
});
</script>
