<template>
  <div class="sd:w-160">
    <sd-radio-group v-model="mode" type="button" class="sd:mb-3">
      <sd-radio value="dynamic">dynamic rows</sd-radio>
      <sd-radio value="fixed">fixed rows</sd-radio>
    </sd-radio-group>

    <div class="sd:mb-3 sd:text-[var(--color-text-2)] sd:text-xs sd:leading-[1.5]">
      {{ helperText }}
    </div>

    <sd-list :virtualListProps="virtualListProps" :data="list">
      <template #item="{ item, index }">
        <sd-list-item :key="index">
          <sd-list-item-meta :title="item.title" :description="getDescription(item)">
            <template #avatar>
              <sd-avatar shape="square">{{ item.prefix }}</sd-avatar>
            </template>
          </sd-list-item-meta>
        </sd-list-item>
      </template>
    </sd-list>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  type ListItem = {
    key: string;
    prefix: string;
    title: string;
    shortDescription: string;
    longDescription: string;
  };

  const mode = ref<'dynamic' | 'fixed'>('dynamic');

  const helperText = computed(() => {
    return mode.value === 'dynamic'
      ? 'List defaults naturally fit variable-height content. This mode uses minItemSize: 72 so longer descriptions can grow.'
      : 'Use itemSize: 72 when every row should stay visually uniform and you do not need live height measurement.';
  });

  const virtualListProps = computed(() => {
    return mode.value === 'dynamic'
      ? { height: 520, minItemSize: 72 }
      : { height: 520, itemSize: 72 };
  });

  const getDescription = (item: ListItem) => {
    return mode.value === 'dynamic' ? item.longDescription : item.shortDescription;
  };

  const list: ListItem[] = Array(2400)
    .fill(null)
    .map((_, index) => {
      const prefix = `0${(index % 26) + 10}`.slice(-2);
      const shortDescription = `(${index}) Fixed rows keep the same visual rhythm.`;
      const longDescription = [
        `(${index}) Dynamic rows keep richer content readable without forcing every card to the same height.`,
        index % 3 === 0
          ? 'This item includes extra context to make the height difference obvious while scrolling.'
          : '',
        index % 5 === 0 ? 'It also simulates secondary metadata and longer summaries.' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return {
        key: `list-${index}`,
        prefix,
        title: `Virtual list item ${index}`,
        shortDescription,
        longDescription,
      };
    });
</script>
