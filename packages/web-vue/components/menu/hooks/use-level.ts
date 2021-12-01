import { computed, inject, provide, reactive, Ref, isRef } from 'vue';
import { LevelInjectionKey } from '../context';

export function provideLevel(level: Ref<number> | number) {
  const computedLevel = computed(() => (isRef(level) ? level.value : level));
  provide(
    LevelInjectionKey,
    reactive({
      level: computedLevel,
    })
  );
}

export default function useLevel(props?: { provideNextLevel?: boolean }) {
  const { provideNextLevel } = props || {};
  const levelContext = inject(LevelInjectionKey);
  const level = computed(() => levelContext?.level || 1);

  if (provideNextLevel) {
    const nextLevel = computed(() => level.value + 1);
    provideLevel(nextLevel);
  }

  return {
    level,
  };
}
