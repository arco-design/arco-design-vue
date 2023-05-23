<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`">
      <slot
        name="title"
        :count-total="dataInfo.data.length"
        :count-selected="dataInfo.selected.length"
        :search-value="filter"
        :checked="checked"
        :indeterminate="indeterminate"
        :on-select-all-change="handleSelectAllChange"
        :on-clear="handleClear"
      >
        <span :class="`${prefixCls}-header-title`">
          <span
            v-if="allowClear || simple || !showSelectAll"
            :class="`${prefixCls}-header-title-simple`"
          >
            {{ title }}
          </span>
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
      </slot>
    </div>
    <div v-if="showSearch" :class="`${prefixCls}-search`">
      <input-search v-model="filter" @change="handleSearch" />
    </div>
    <div :class="`${prefixCls}-body`">
      <Scrollbar v-if="filteredData.length > 0">
        <slot
          :data="filteredData"
          :selected-keys="transferCtx?.selected"
          :on-select="transferCtx?.onSelect"
        >
          <list
            :class="`${prefixCls}-list`"
            :bordered="false"
            :scrollbar="false"
          >
            <transfer-list-item
              v-for="item of filteredData"
              :key="item.value"
              :type="type"
              :data="item"
              :simple="simple"
              :allow-clear="allowClear"
              :disabled="item.disabled"
            />
          </list>
        </slot>
      </Scrollbar>
      <Empty v-else :class="`${prefixCls}-empty`" />
    </div>
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
import Scrollbar from '../scrollbar';
import Empty from '../empty/empty';

export default defineComponent({
  name: 'TransferView',
  components: {
    Empty,
    Checkbox,
    IconHover,
    IconDelete,
    InputSearch: Input.Search,
    List,
    TransferListItem,
    Scrollbar,
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
    showSelectAll: Boolean,
    simple: Boolean,
  },
  emits: ['search'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('transfer-view');
    const filter = ref('');
    const transferCtx = inject(transferInjectionKey, undefined);
    const countSelected = computed(() => props.dataInfo.selected.length);
    const countRendered = computed(() => props.dataInfo.data.length);

    const checked = computed(
      () =>
        props.dataInfo.selected.length > 0 &&
        props.dataInfo.selected.length === props.dataInfo.allValidValues.length
    );
    const indeterminate = computed(
      () =>
        props.dataInfo.selected.length > 0 &&
        props.dataInfo.selected.length < props.dataInfo.allValidValues.length
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
      countSelected,
      countRendered,
      handleSelectAllChange,
      handleSearch,
      handleClear,
      transferCtx,
    };
  },
});
</script>
