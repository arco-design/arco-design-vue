<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`">
      <span :class="`${prefixCls}-header-title`">
        <template v-if="allowClear || simple">{{ title }}</template>
        <checkbox
          v-else
          :model-value="checked"
          :indeterminate="indeterminate"
          uninject-group-context
          @change="handleSelectAllChange"
        >
          {{ title }}
        </checkbox>
      </span>
      <icon-hover
        v-if="allowClear"
        :class="`${prefixCls}-header-clear-btn`"
        @click="handleClear"
      >
        <icon-delete />
      </icon-hover>
      <span v-else-if="!simple" :class="`${prefixCls}-header-count`">
        {{ dataInfo.selected.length }} / {{ dataInfo.data.length }}
      </span>
    </div>
    <div v-if="showSearch" :class="`${prefixCls}-search`">
      <input-search v-model="filter" @change="handleSearch" />
    </div>
    <list :class="`${prefixCls}-list`" :bordered="false">
      <transfer-list-item
        v-for="item of filteredData"
        :key="item.value"
        :type="type"
        :data="item"
        :simple="simple"
        :allow-clear="allowClear"
      />
    </list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Checkbox from '../checkbox';
import IconHover from '../_components/icon-hover.vue';
import IconDelete from '../icon/icon-delete';
import Input from '../input';
import List from '../list';
import TransferListItem from './transfer-list-item';
import { DataInfo, TransferItem } from './interface';
import { transferInjectionKey } from './context';

export default defineComponent({
  name: 'TransferView',
  components: {
    Checkbox,
    IconHover,
    IconDelete,
    InputSearch: Input.Search,
    List,
    TransferListItem,
  },
  props: {
    type: {
      type: String as PropType<'source' | 'target'>,
    },
    dataInfo: {
      type: Object as PropType<DataInfo>,
      required: true,
    },
    title: String,
    data: {
      type: Array as PropType<TransferItem[]>,
      required: true,
    },
    allowClear: Boolean,
    selected: {
      type: Array as PropType<string[]>,
      required: true,
    },
    showSearch: Boolean,
    simple: Boolean,
  },
  emits: ['search'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('transfer-view');
    const filter = ref('');
    const transferCtx = inject(transferInjectionKey, undefined);

    const checked = computed(
      () =>
        props.dataInfo.data.length > 0 &&
        props.dataInfo.selected.length === props.dataInfo.data.length
    );
    const indeterminate = computed(
      () =>
        props.dataInfo.selected.length > 0 &&
        props.dataInfo.selected.length < props.dataInfo.data.length
    );

    const handleSelectAllChange = (checked: boolean) => {
      if (checked) {
        transferCtx?.onSelect([
          ...props.selected,
          ...props.dataInfo.allValidValues,
        ]);
      } else {
        transferCtx?.onSelect(
          props.selected.filter(
            (value) => !props.dataInfo.allValidValues.includes(value)
          )
        );
      }
    };

    const filteredData = computed(() =>
      props.dataInfo.data.filter((item) => {
        if (filter.value) {
          return item.label.includes(filter.value);
        }
        return true;
      })
    );

    const handleSearch = (value: string) => {
      emit('search', value, props.type);
    };

    const handleClear = () => {
      transferCtx?.moveTo(props.dataInfo.allValidValues, 'source');
    };

    return {
      prefixCls,
      filteredData,
      filter,
      checked,
      indeterminate,
      handleSelectAllChange,
      handleSearch,
      handleClear,
    };
  },
});
</script>
