import { createApp, VNodeTypes } from 'vue';

let container: HTMLDivElement | null;

export default function getInnerText(
  node: VNodeTypes | VNodeTypes[] | undefined
): string {
  if (!node) return '';

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  const vm = createApp({
    render() {
      return <div>{node}</div>;
    },
  });

  vm.mount(container);

  const text = container.innerText;
  vm.unmount();

  return text;
}
