import type { Ref } from 'vue';
import { onMounted, onUpdated, ref } from 'vue';

export const useIndex = (itemRef: Ref<HTMLElement | undefined>) => {
  const index = ref(-1);

  const getIndex = () => {
    if (itemRef.value) {
      const _index = Array.from(
        itemRef.value?.parentElement?.children ?? []
      ).indexOf(itemRef.value);
      if (_index !== index.value) {
        index.value = _index;
      }
    }
  };

  onMounted(() => getIndex());
  onUpdated(() => getIndex());

  return {
    index,
  };
};
