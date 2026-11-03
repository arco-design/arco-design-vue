import { nextTick, ref } from 'vue';
import { useInput } from '../use-input';

const createCompositionEvent = (
  type: CompositionEvent['type'],
  target: HTMLInputElement,
  data = ''
) =>
  ({
    type,
    data,
    target,
  }) as unknown as CompositionEvent;

const createInputEvent = (
  target: HTMLInputElement,
  isComposing: boolean
) =>
  ({
    type: 'input',
    target,
    isComposing,
  }) as unknown as InputEvent;

describe('useInput IME composition', () => {
  test('late compositionupdate after compositionend does not lock input', async () => {
    const modelValue = ref('');
    const emit = vi.fn();
    const input = document.createElement('input');
    document.body.appendChild(input);

    const { inputRef, isComposition, handleComposition, handleInput } =
      useInput({
        modelValue,
        emit: emit as any,
      });
    inputRef.value = input;

    handleComposition(createCompositionEvent('compositionstart', input, '生'));
    expect(isComposition.value).toBe(true);

    input.value = '生活';
    handleComposition(createCompositionEvent('compositionend', input, '生活'));
    expect(isComposition.value).toBe(false);
    expect(emit).toHaveBeenCalledWith('update:modelValue', '生活');
    emit.mockClear();

    // Browser may dispatch a late compositionupdate after compositionend.
    handleComposition(createCompositionEvent('compositionupdate', input, '活'));
    expect(isComposition.value).toBe(false);

    input.value = '生活A';
    handleInput(createInputEvent(input, false));
    await nextTick();

    expect(emit).toHaveBeenCalledWith('update:modelValue', '生活A');
    expect(emit).toHaveBeenCalledWith('input', '生活A', expect.any(Object));

    document.body.removeChild(input);
  });

  test('handleInput ignores events while native isComposing is true', async () => {
    const modelValue = ref('');
    const emit = vi.fn();
    const input = document.createElement('input');

    const { inputRef, handleInput } = useInput({
      modelValue,
      emit: emit as any,
    });
    inputRef.value = input;

    input.value = '生';
    handleInput(createInputEvent(input, true));
    await nextTick();

    expect(emit).not.toHaveBeenCalled();
  });
});
