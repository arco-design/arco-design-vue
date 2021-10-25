import { computed, ref } from 'vue';

type ImageLoadStatusType = 'beforeLoad' | 'loading' | 'error' | 'loaded';

export default function useImageLoadStatus(defaultValue?: ImageLoadStatusType) {
  const status = ref<ImageLoadStatusType>(defaultValue || 'beforeLoad');
  const isBeforeLoad = computed(() => status.value === 'beforeLoad');
  const isLoading = computed(() => status.value === 'loading');
  const isError = computed(() => status.value === 'error');
  const isLoaded = computed(() => status.value === 'loaded');

  return {
    status,
    isBeforeLoad,
    isLoading,
    isError,
    isLoaded,
    setLoadStatus: (newStatus: ImageLoadStatusType) => {
      status.value = newStatus;
    },
  };
}
