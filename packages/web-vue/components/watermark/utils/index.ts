import { CSSProperties } from 'vue';

export function camelToKebab(camelCase: string): string {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function styleToString(style: CSSProperties): string {
  return Object.entries(style)
    .map(([key, value]) => `${camelToKebab(key)}:${value}`)
    .join(';');
}

export function canvasToGray(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = brightness;
    data[i + 1] = brightness;
    data[i + 2] = brightness;
  }
  ctx.putImageData(imageData, 0, 0);
}
