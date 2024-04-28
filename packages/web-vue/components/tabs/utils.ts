import { CSSProperties } from 'vue';

export const getDiffRect = (node: HTMLElement, parentNode: HTMLElement) => {
  const nodeRect = node.getBoundingClientRect();
  const parentNodeRect = parentNode.getBoundingClientRect();

  return {
    left: nodeRect.left - parentNodeRect.left,
    top: nodeRect.top - parentNodeRect.top,
    right: nodeRect.right - parentNodeRect.right,
    bottom: nodeRect.bottom - parentNodeRect.bottom,
  };
};

export const getTabListStyle = ({
  direction,
  type,
  offset,
}: {
  direction: string;
  type: string;
  offset: number;
}): CSSProperties => {
  if (direction === 'vertical') {
    return { transform: `translateY(${-offset}px)` };
  }

  return { transform: `translateX(${-offset}px)` };
};

export const updateScrollOffset = (
  parentNode: HTMLElement,
  direction: 'horizontal' | 'vertical'
) => {
  const { scrollTop, scrollLeft } = parentNode;

  if (direction === 'horizontal' && scrollLeft) {
    parentNode.scrollTo({ left: -1 * scrollLeft });
  }
  if (direction === 'vertical' && scrollTop) {
    parentNode.scrollTo({ top: -1 * scrollTop });
  }
};
