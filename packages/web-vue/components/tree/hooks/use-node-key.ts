import { getCurrentInstance, ref, onUpdated, Ref } from 'vue';
import { generateKey } from '../utils/tree-data';

export default function useNodeKey(): Ref<string> {
  const instance = getCurrentInstance();

  const getKey = () => (instance?.vnode.key ?? generateKey()) as string;

  const key = ref(getKey());

  onUpdated(() => {
    key.value = getKey();
  });

  return key;
}
