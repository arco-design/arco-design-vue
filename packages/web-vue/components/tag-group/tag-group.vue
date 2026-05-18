<template>
  <DefineTagGroupItem v-slot="slotProps">
    <component
      :is="slotProps.measure ? 'span' : 'li'"
      :class="getItemWrapperClass(slotProps.option, slotProps.measure)"
      :style="getItemWrapperStyle(slotProps.option, slotProps.index, slotProps.measure)"
      :data-measure-item="slotProps.measure && !slotProps.option.isCounter ? 'true' : undefined"
      :data-hidden-count="
        slotProps.measure && slotProps.option.isCounter ? slotProps.hiddenCount : undefined
      "
    >
      <slot
        name="item"
        :data="slotProps.option.raw"
        :option="slotProps.option.raw"
        :label="resolveOptionLabel(slotProps.option)"
        :value="slotProps.option.value"
        :index="slotProps.index"
        :item-class="getItemContentClass(slotProps.option, slotProps.index)"
        :item-style="getItemContentStyle(slotProps.option, slotProps.index)"
        :is-overflow="isCompressedResponsiveItem(slotProps.index, slotProps.option.value)"
        :measure="Boolean(slotProps.measure)"
      >
        <Tag
          v-bind="slotProps.option.itemProps"
          :class="getItemContentClass(slotProps.option, slotProps.index)"
          :style="getItemContentStyle(slotProps.option, slotProps.index)"
          :visible="true"
          :nowrap="true"
        >
          <template v-if="$slots.label">
            <slot name="label" :data="slotProps.option.raw" :option="slotProps.option.raw" />
          </template>
          <Ellipsis
            v-else-if="isCompressedResponsiveItem(slotProps.index, slotProps.option.value)"
            :class="`${prefixCls}-item-ellipsis`"
          >
            {{ resolveOptionLabel(slotProps.option) }}
          </Ellipsis>
          <template v-else>
            {{ resolveOptionLabel(slotProps.option) }}
          </template>
        </Tag>
      </slot>
    </component>
  </DefineTagGroupItem>

  <DefineTagGroupCounter v-slot="slotProps">
    <component
      :is="slotProps.measure ? 'span' : 'li'"
      :class="getCounterWrapperClass(slotProps.measure)"
      :data-hidden-count="slotProps.hiddenCount"
    >
      <slot
        name="counter"
        :label="slotProps.option.label"
        :value="slotProps.option.value"
        :hidden-count="slotProps.hiddenCount"
        :measure="Boolean(slotProps.measure)"
        :counter-class="getCounterContentClass()"
      >
        <Tag
          v-bind="slotProps.option.itemProps"
          :class="getCounterContentClass()"
          :visible="true"
          :nowrap="true"
          :ellipsis="false"
        >
          {{ slotProps.option.label }}
        </Tag>
      </slot>
    </component>
  </DefineTagGroupCounter>

  <span :class="cls">
    <slot v-if="normalizedOptions.length === 0" />
    <template v-else>
      <ResizeObserver v-if="isResponsiveMaxCount" @resize="handleResize">
        <span :class="`${prefixCls}-resize-observer`" aria-hidden="true" />
      </ResizeObserver>

      <ul ref="innerRef" :class="`${prefixCls}-inner`">
        <ReuseTagGroupItem
          v-for="(option, index) in visibleOptions"
          :key="option.key"
          :option="option"
          :index="index"
          :hidden-count="0"
        />

        <Popover v-if="hiddenOptions.length > 0">
          <template #default>
            <ReuseTagGroupCounter
              :option="overflowOption"
              :index="visibleOptions.length"
              :hidden-count="hiddenOptions.length"
            />
          </template>
          <template #content>
            <ul :class="`${prefixCls}-popover`">
              <ReuseTagGroupItem
                v-for="(option, index) in hiddenOptions"
                :key="`hidden-${option.key}`"
                :option="option"
                :index="visibleOptions.length + index"
                :hidden-count="0"
              />
            </ul>
          </template>
        </Popover>
      </ul>

      <span
        v-if="isResponsiveMaxCount && normalizedOptions.length > 1"
        ref="measureRef"
        :class="`${prefixCls}-measure`"
        aria-hidden="true"
      >
        <ReuseTagGroupItem
          v-for="(option, index) in normalizedOptions"
          :key="`measure-${option.key}`"
          :option="option"
          :index="index"
          :hidden-count="0"
          :measure="true"
        />
        <ReuseTagGroupCounter
          v-for="counterOption in measureCounterOptions"
          :key="`counter-${counterOption.hiddenCount}`"
          :option="counterOption"
          :index="normalizedOptions.length"
          :hidden-count="counterOption.hiddenCount"
          :measure="true"
        />
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, useSlots, watch } from 'vue';
  import type { CSSProperties } from 'vue';

  import { createReusableTemplate } from '@vueuse/core';
  import { isFunction, isString } from 'es-toolkit';
  import { isNumber } from 'es-toolkit/compat';

  import type {
    TagGroupObjectOption,
    TagGroupOption,
    TagGroupOptionLabel,
    TagGroupProps,
  } from './interface';

  import ResizeObserver from '../_components/resize-observer';
  import { getPrefixCls } from '../_utils/global-config';
  import Ellipsis from '../ellipsis';
  import Popover from '../popover';
  import Tag from '../tag';

  defineOptions({
    name: 'TagGroup',
  });

  type NormalizedTagGroupOption = {
    key: string;
    label: string | number;
    value: string | number;
    raw: TagGroupObjectOption;
    itemProps: Record<string, unknown>;
    isCounter: boolean;
    hiddenCount: number;
  };

  interface TagGroupItemBindings {
    option: NormalizedTagGroupOption;
    index: number;
    hiddenCount: number;
    measure?: boolean;
  }

  type OptionFieldRecord = Record<string, unknown>;

  const OVERFLOW_COUNTER_VALUE = '__sd_tag_group_more__';

  const props = withDefaults(defineProps<TagGroupProps>(), {
    maxCount: 'responsive',
    options: () => [],
    fieldNames: () => ({}),
  });

  const slots = useSlots();
  const prefixCls = getPrefixCls('tag-group');
  const innerRef = ref<HTMLElement>();
  const measureRef = ref<HTMLElement>();
  const responsiveVisibleCount = ref<number | null>(null);
  const responsiveItemMaxWidth = ref(0);

  const [DefineTagGroupItem, ReuseTagGroupItem] = createReusableTemplate<TagGroupItemBindings>();
  const [DefineTagGroupCounter, ReuseTagGroupCounter] =
    createReusableTemplate<TagGroupItemBindings>();

  const isResponsiveMaxCount = computed(() => props.maxCount === 'responsive');
  const cls = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-responsive`]: isResponsiveMaxCount.value,
      [`${prefixCls}-empty`]: props.options.length === 0,
    },
  ]);

  function resolveOptionField<T extends keyof TagGroupObjectOption>(
    option: TagGroupObjectOption,
    field: string,
    fallbackField: T,
  ) {
    const optionRecord = option as OptionFieldRecord;
    return (optionRecord[field] ?? option[fallbackField]) as TagGroupObjectOption[T];
  }

  function normalizeItemProps(
    option: TagGroupObjectOption,
    labelField: string,
    valueField: string,
  ) {
    if (
      option.itemProps &&
      typeof option.itemProps === 'object' &&
      !Array.isArray(option.itemProps)
    ) {
      return option.itemProps;
    }

    return Object.fromEntries(
      Object.entries(option as OptionFieldRecord).filter(
        ([key]) => key !== labelField && key !== valueField && key !== 'itemProps',
      ),
    );
  }

  function normalizeOption(option: TagGroupOption, index: number): NormalizedTagGroupOption {
    const { label = 'label', value = 'value' } = props.fieldNames;

    if (isString(option) || isNumber(option)) {
      return {
        key: `${String(option)}-${index}`,
        label: option,
        value: option,
        raw: {
          label: option,
          value: option,
        },
        itemProps: {},
        isCounter: false,
        hiddenCount: 0,
      };
    }

    const normalizedLabel = resolveOptionField(option, label, 'label') as TagGroupOptionLabel;
    const normalizedValue = resolveOptionField(option, value, 'value') as string | number;

    return {
      key: `${String(normalizedValue)}-${index}`,
      label: isFunction(normalizedLabel) ? normalizedLabel() : normalizedLabel,
      value: normalizedValue,
      raw: {
        ...option,
        label: normalizedLabel,
        value: normalizedValue,
      },
      itemProps: normalizeItemProps(option, label, value),
      isCounter: false,
      hiddenCount: 0,
    };
  }

  function createOverflowOption(hiddenCount: number): NormalizedTagGroupOption {
    const label = `+${hiddenCount}`;

    return {
      key: `${OVERFLOW_COUNTER_VALUE}-${hiddenCount}`,
      label,
      value: `${OVERFLOW_COUNTER_VALUE}-${hiddenCount}`,
      raw: {
        label,
        value: `${OVERFLOW_COUNTER_VALUE}-${hiddenCount}`,
      },
      itemProps: {
        closable: false,
      },
      isCounter: true,
      hiddenCount,
    };
  }

  const normalizedOptions = computed(() =>
    props.options.map((option, index) => normalizeOption(option, index)),
  );

  const visibleCount = computed(() => {
    if (isResponsiveMaxCount.value) {
      if (!normalizedOptions.value.length) {
        return 0;
      }

      return Math.min(
        normalizedOptions.value.length,
        Math.max(1, responsiveVisibleCount.value ?? normalizedOptions.value.length),
      );
    }

    if (typeof props.maxCount === 'number' && props.maxCount > 0) {
      return Math.min(props.maxCount, normalizedOptions.value.length);
    }

    return normalizedOptions.value.length;
  });

  const visibleOptions = computed(() => normalizedOptions.value.slice(0, visibleCount.value));
  const hiddenOptions = computed(() => normalizedOptions.value.slice(visibleCount.value));
  const overflowOption = computed(() => createOverflowOption(hiddenOptions.value.length));
  const measureCounterOptions = computed(() =>
    Array.from({ length: Math.max(normalizedOptions.value.length - 1, 0) }, (_, index) =>
      createOverflowOption(index + 1),
    ),
  );

  function resolveOptionLabel(option: NormalizedTagGroupOption) {
    if (option.isCounter) {
      return option.label;
    }

    const label = option.raw.label;
    return isFunction(label) ? label() : option.label;
  }

  function getOuterWidth(element: HTMLElement | null | undefined) {
    if (!element) {
      return 0;
    }

    const style = window.getComputedStyle(element);
    const marginLeft = Number.parseFloat(style.marginLeft || '0') || 0;
    const marginRight = Number.parseFloat(style.marginRight || '0') || 0;

    return element.offsetWidth + marginLeft + marginRight;
  }

  function getCounterWidth(hiddenCount: number) {
    if (!measureRef.value || hiddenCount <= 0) {
      return 0;
    }

    const counterElement = measureRef.value.querySelector(
      `[data-hidden-count="${hiddenCount}"]`,
    ) as HTMLElement | null;

    return getOuterWidth(counterElement);
  }

  function setResponsiveState(visibleCount: number, itemMaxWidth = 0) {
    responsiveVisibleCount.value = visibleCount;
    responsiveItemMaxWidth.value = itemMaxWidth;
  }

  function findResponsiveState(totalItems: number, itemWidths: number[], availableWidth: number) {
    for (let candidate = totalItems; candidate >= 1; candidate -= 1) {
      const hiddenCount = totalItems - candidate;
      const counterWidth = getCounterWidth(hiddenCount);
      const visibleWidth = itemWidths.slice(0, candidate).reduce((sum, width) => sum + width, 0);

      if (hiddenCount === 0 && visibleWidth <= availableWidth) {
        return {
          visibleCount: candidate,
          itemMaxWidth: 0,
        };
      }

      if (hiddenCount > 0 && candidate > 1 && visibleWidth + counterWidth <= availableWidth) {
        return {
          visibleCount: candidate,
          itemMaxWidth: 0,
        };
      }

      if (hiddenCount > 0 && candidate === 1) {
        const leadItemWidth = Math.max(availableWidth - counterWidth, 0);
        if (leadItemWidth > 0) {
          return {
            visibleCount: 1,
            itemMaxWidth: leadItemWidth,
          };
        }
      }
    }

    return {
      visibleCount: 1,
      itemMaxWidth: Math.max(availableWidth - getCounterWidth(totalItems - 1), 0),
    };
  }

  function syncResponsiveItems() {
    if (!isResponsiveMaxCount.value) {
      responsiveVisibleCount.value = null;
      responsiveItemMaxWidth.value = 0;
      return;
    }

    const totalItems = normalizedOptions.value.length;
    if (totalItems <= 1) {
      setResponsiveState(totalItems);
      return;
    }

    const innerElement = innerRef.value;
    const measureElement = measureRef.value;

    if (!innerElement || !measureElement) {
      setResponsiveState(totalItems);
      return;
    }

    const availableWidth = Math.max(innerElement.clientWidth, 0);
    if (availableWidth <= 0) {
      setResponsiveState(1);
      return;
    }

    const measuredItems = Array.from(
      measureElement.querySelectorAll('[data-measure-item="true"]'),
    ) as HTMLElement[];
    const itemWidths = measuredItems.slice(0, totalItems).map(getOuterWidth);
    const responsiveState = findResponsiveState(totalItems, itemWidths, availableWidth);
    setResponsiveState(responsiveState.visibleCount, responsiveState.itemMaxWidth);
  }

  function handleResize() {
    nextTick(() => {
      syncResponsiveItems();
    });
  }

  function isCompressedResponsiveItem(index: number, value: string | number) {
    return (
      isResponsiveMaxCount.value &&
      !String(value).startsWith(OVERFLOW_COUNTER_VALUE) &&
      hiddenOptions.value.length > 0 &&
      index === 0 &&
      responsiveItemMaxWidth.value > 0
    );
  }

  function getItemWrapperClass(option: NormalizedTagGroupOption, measure?: boolean) {
    return [
      `${prefixCls}-item`,
      {
        [`${prefixCls}-item-measure`]: Boolean(measure),
      },
    ];
  }

  function getCounterWrapperClass(measure?: boolean) {
    return [
      `${prefixCls}-item`,
      `${prefixCls}-item-counter`,
      {
        [`${prefixCls}-item-measure`]: Boolean(measure),
      },
    ];
  }

  function getItemWrapperStyle(
    option: NormalizedTagGroupOption,
    index: number,
    measure?: boolean,
  ): CSSProperties | undefined {
    if (measure || !isCompressedResponsiveItem(index, option.value)) {
      return undefined;
    }

    return {
      maxWidth: `${responsiveItemMaxWidth.value}px`,
    };
  }

  function getItemContentClass(option: NormalizedTagGroupOption, index: number) {
    return [
      `${prefixCls}-item-content`,
      {
        [`${prefixCls}-item-content-overflow`]: isCompressedResponsiveItem(index, option.value),
      },
    ];
  }

  function getItemContentStyle(
    option: NormalizedTagGroupOption,
    index: number,
  ): CSSProperties | undefined {
    if (!isCompressedResponsiveItem(index, option.value)) {
      return undefined;
    }

    return {
      maxWidth: '100%',
    };
  }

  function getCounterContentClass() {
    return `${prefixCls}-counter-content`;
  }

  onMounted(() => {
    nextTick(() => {
      syncResponsiveItems();
    });
  });

  watch(
    [normalizedOptions, () => props.maxCount],
    () => {
      nextTick(() => {
        syncResponsiveItems();
      });
    },
    {
      deep: true,
    },
  );
</script>
