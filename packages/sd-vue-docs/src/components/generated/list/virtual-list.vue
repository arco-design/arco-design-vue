<template>
  <div :style="{ width: '640px' }">
    <sd-radio-group v-model="mode" type="button" :style="{ marginBottom: '12px' }">
      <sd-radio value="dynamic">dynamic rows</sd-radio>
      <sd-radio value="fixed">fixed rows</sd-radio>
    </sd-radio-group>

    <div :style="helperStyle">
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

<script>
  import { computed, ref } from 'vue';

  export default {
    setup() {
      const mode = ref('dynamic');

      const helperStyle = {
        marginBottom: '12px',
        color: 'var(--color-text-2)',
        fontSize: '12px',
        lineHeight: '1.5',
      };

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

      const getDescription = (item) => {
        return mode.value === 'dynamic' ? item.longDescription : item.shortDescription;
      };

      const list = Array(2400)
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
            prefix,
            title: `Virtual list item ${index}`,
            shortDescription,
            longDescription,
          };
        });

      return {
        mode,
        list,
        helperStyle,
        helperText,
        virtualListProps,
        getDescription,
      };
    },
  };
</script>
