import { createApp, VNodeTypes } from 'vue';
import { EllipsisInternalConfig } from '../interface';

let ellipsisContainer: HTMLElement;

function styleToString(style: CSSStyleDeclaration) {
  const styleNames: string[] = Array.prototype.slice.apply(style);
  return styleNames
    .map((name) => `${name}: ${style.getPropertyValue(name)};`)
    .join('');
}

function pxToNumber(value: string | null): number {
  if (!value) return 0;

  const match = value.match(/^\d*(\.\d*)?/);

  return match ? Number(match[0]) : 0;
}

export default (
  originElement: HTMLElement,
  ellipsisConfig: EllipsisInternalConfig,
  operations: VNodeTypes | VNodeTypes[],
  fullText: string
) => {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement('div');
    document.body.appendChild(ellipsisContainer);
  }

  const { rows, suffix, ellipsisStr } = ellipsisConfig;

  const originStyle = window.getComputedStyle(originElement);
  const styleString = styleToString(originStyle);
  const lineHeight = pxToNumber(originStyle.lineHeight);
  const maxHeight = Math.round(
    lineHeight * rows +
      pxToNumber(originStyle.paddingTop) +
      pxToNumber(originStyle.paddingBottom)
  );

  ellipsisContainer.setAttribute('style', styleString);
  ellipsisContainer.setAttribute('aria-hidden', 'true');

  ellipsisContainer.style.height = 'auto';
  ellipsisContainer.style.minHeight = 'auto';
  ellipsisContainer.style.maxHeight = 'auto';
  ellipsisContainer.style.position = 'fixed';
  ellipsisContainer.style.left = '0';
  ellipsisContainer.style.top = '-99999999px';
  ellipsisContainer.style.zIndex = '-200';
  // fix issue#1961
  ellipsisContainer.style.whiteSpace = 'normal';

  const vm = createApp({
    render() {
      return <span>{operations}</span>;
    },
  });

  vm.mount(ellipsisContainer);

  const operationsChildNodes = Array.prototype.slice.apply(
    ellipsisContainer.childNodes[0].cloneNode(true).childNodes
  );

  vm.unmount();
  ellipsisContainer.innerHTML = '';

  // 省略号和后缀
  const ellipsisTextNode = document.createTextNode(`${ellipsisStr}${suffix}`);
  ellipsisContainer.appendChild(ellipsisTextNode);

  // 操作按钮
  operationsChildNodes.forEach((operationNode) => {
    ellipsisContainer.appendChild(operationNode);
  });

  // 内容
  const textNode = document.createTextNode(fullText);
  ellipsisContainer.insertBefore(textNode, ellipsisTextNode);

  function inRange() {
    return ellipsisContainer.offsetHeight <= maxHeight;
  }

  if (inRange()) {
    return {
      ellipsis: false,
      text: fullText,
    };
  }

  // 寻找最多的文字
  function measureText(
    textNode: Text,
    startLoc = 0,
    endLoc = fullText.length,
    lastSuccessLoc = 0
  ) {
    const midLoc = Math.floor((startLoc + endLoc) / 2);
    const currentText = fullText.slice(0, midLoc);
    textNode.textContent = currentText;

    if (startLoc >= endLoc - 1) {
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = fullText.slice(0, step);
        textNode.textContent = currentStepText;

        if (inRange() || !currentStepText) {
          return;
        }
      }
    }

    if (inRange()) {
      measureText(textNode, midLoc, endLoc, midLoc);
    } else {
      measureText(textNode, startLoc, midLoc, lastSuccessLoc);
    }
  }

  measureText(textNode);

  return {
    text: textNode.textContent,
    ellipsis: true,
  };
};
