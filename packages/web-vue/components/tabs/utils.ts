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
