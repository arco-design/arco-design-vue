import { ref, Ref } from 'vue';

// Refer to Element Plus
export function useCursor(
  input: Ref<HTMLInputElement | undefined>
): [() => void, () => void] {
  const selectionRef = ref<{
    selectionStart?: number;
    selectionEnd?: number;
    value?: string;
    beforeTxt?: string;
    afterTxt?: string;
  }>();

  function recordCursor() {
    if (!input.value) return;

    const { selectionStart, selectionEnd, value } = input.value;

    if (selectionStart == null || selectionEnd == null) return;

    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));

    selectionRef.value = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt,
    };
  }

  function setCursor() {
    if (!input.value || !selectionRef.value) return;

    const { value } = input.value;
    const { beforeTxt, afterTxt, selectionStart } = selectionRef.value;

    if (!beforeTxt || !afterTxt || !selectionStart) return;

    let startPos = value.length;

    if (value.endsWith(afterTxt)) {
      // get from after
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      // get from before
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }

    input.value.setSelectionRange(startPos, startPos);
  }

  return [recordCursor, setCursor];
}
