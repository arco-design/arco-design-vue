import {
  CSSProperties,
  PropType,
  computed,
  defineComponent,
  onMounted,
  ref,
  shallowRef,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { WatermarkFont } from './interface';
import { useMutationObserver } from './hooks/use-mutation-observer';
import { useTheme } from './hooks/use-theme';
import { styleToString, canvasToGray } from './utils';
import { isArray } from '../_utils/is';

export default defineComponent({
  name: 'Watermark',
  props: {
    /**
     * @zh 水印文字内容
     * @en Watermark text content
     */
    content: {
      type: [String, Array] as PropType<string | string[]>,
    },
    /**
     * @zh 图片源，建议使用 2 倍或 3 倍图
     * @en Image watermark address
     */
    image: {
      type: String,
    },
    /**
     * @zh 水印宽度（默认为内容宽度）
     * @en Watermark width
     */
    width: {
      type: Number,
    },
    /**
     * @zh 水印高度（默认为内容高度）
     * @en Watermark height
     */
    height: {
      type: Number,
    },
    /**
     * @zh 水印间的间距
     * @en Watermark spacing
     */
    gap: {
      type: Array as unknown as PropType<[number, number]>,
      default: () => [90, 90],
    },
    /**
     * @zh 距离容器左上角的偏移量，默认为水印间距的一半
     * @en The offset from the upper left corner of the container, the default is half the watermark spacing
     * @defaultValue [gap[0]/2, gap[1]/2]
     */
    offset: {
      type: Array as unknown as PropType<[number, number]>,
    },
    /**
     * @zh 旋转角度
     * @en Watermark rotation angle
     */
    rotate: {
      type: Number,
      default: -22,
    },
    /**
     * @zh 水印字体样式，具体参数配置看 [WatermarkFont](#WatermarkFont)
     * @en Watermark font style, specific parameter configuration see [WatermarkFont](#WatermarkFont)
     */
    font: {
      type: Object as PropType<WatermarkFont>,
    },
    /**
     * @zh 水印层级
     * @en Watermark z-index
     */
    zIndex: {
      type: Number,
      default: 6,
    },
    /**
     * @zh 透明度
     * @en Watermark opacity
     */
    alpha: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 水印防篡改
     * @en Watermark anti-tampering
     */
    antiTamper: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 灰阶水印
     * @en Grayscale watermark
     */
    grayscale: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否重复水印
     * @en Whether to repeat the watermark
     */
    repeat: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否错开排列
     * @en Whether to stagger the arrangement layout
     */
    staggered: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    const { width, height, image, rotate, alpha, repeat, grayscale } =
      toRefs(props);
    const prefixCls = getPrefixCls('watermark');
    const ratio = window.devicePixelRatio || 1;
    const containerRef = shallowRef<HTMLDivElement>();
    const watermarkMap = ref(new Map<HTMLDivElement, HTMLDivElement>());

    // Text content and style related
    const fontSize = computed(() => props.font?.fontSize ?? 16);
    const fontWeight = computed(() => props.font?.fontWeight ?? 'normal');
    const fontStyle = computed(() => props.font?.fontStyle ?? 'normal');
    const fontFamily = computed(() => props.font?.fontFamily ?? 'sans-serif');
    const textAlign = computed(() => props.font?.textAlign ?? 'center');
    const contents = computed(() =>
      isArray(props.content) ? props.content : [props.content]
    );
    const color = computed(
      () =>
        props.font?.color ??
        (theme.value === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.15)')
    );

    // Watermark position related
    const gapX = computed(() => props.gap?.[0] ?? 90);
    const gapY = computed(() => props.gap?.[1] ?? 90);
    const gapXCenter = computed(() => gapX.value / 2);
    const gapYCenter = computed(() => gapY.value / 2);
    const offsetLeft = computed(() => props.offset?.[0] ?? gapXCenter.value);
    const offsetTop = computed(() => props.offset?.[1] ?? gapYCenter.value);
    const markStyle = computed(() => {
      const left = offsetLeft.value - gapXCenter.value;
      const top = offsetTop.value - gapYCenter.value;
      return {
        position: 'absolute',
        left: left > 0 ? `${left}px` : 0,
        top: top > 0 ? `${top}px` : 0,
        width: left > 0 ? `calc(100% - ${left}px)` : '100%',
        height: top > 0 ? `calc(100% - ${top}px)` : '100%',
        pointerEvents: 'none',
        backgroundRepeat: props.repeat ? 'repeat' : 'no-repeat',
        backgroundPosition: `${left > 0 ? 0 : left}px ${top > 0 ? 0 : top}px`,
        zIndex: props.zIndex ?? 6,
      } as CSSProperties;
    });
    const isStaggered = computed(() => props.repeat && props.staggered);

    const appendWatermark = (base64: string, width: number) => {
      if (containerRef.value) {
        const watermarkEle = watermarkMap.value.get(containerRef.value);

        if (watermarkEle) {
          if (containerRef.value.contains(watermarkEle)) {
            containerRef.value.removeChild(watermarkEle);
          }
          watermarkMap.value.delete(containerRef.value);
        }
        const newWatermarkEle = document.createElement('div');
        newWatermarkEle.setAttribute(
          'style',
          styleToString({
            ...markStyle.value,
            backgroundImage: `url('${base64}')`,
            backgroundSize: `${width}px`,
          })
        );
        containerRef.value?.append(newWatermarkEle);
        watermarkMap.value.set(containerRef.value, newWatermarkEle);
      }
    };

    const getMarkSize = (ctx: CanvasRenderingContext2D) => {
      let defaultWidth = 120;
      let defaultHeight = 28;
      if (!image.value && ctx.measureText) {
        ctx.font = `${fontSize.value}px ${fontFamily.value}`;
        const widths = contents.value.map(
          (item) => ctx.measureText(item!).width
        );
        defaultWidth = Math.ceil(Math.max(...widths));
        defaultHeight =
          fontSize.value * contents.value.length +
          (contents.value.length - 1) * 3;
      }
      return [
        width.value ?? defaultWidth,
        height.value ?? defaultHeight,
      ] as const;
    };

    const renderWatermark = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const [markWidth, markheight] = getMarkSize(ctx);
      const realMarkWidth = markWidth * ratio;
      const realMarkHeight = markheight * ratio;
      const canvasWidth = (gapX.value + markWidth) * ratio;
      const canvasHeight = (gapY.value + markheight) * ratio;
      const drawX = (gapX.value / 2) * ratio;
      const drawY = (gapY.value / 2) * ratio;
      const rotateX = canvasWidth / 2;
      const rotateY = canvasHeight / 2;
      const baseSize = isStaggered.value ? 2 : 1;
      const fillWidth = (gapX.value + markWidth) * baseSize;

      canvas.width = canvasWidth * baseSize;
      canvas.height = canvasHeight * baseSize;
      ctx.globalAlpha = alpha.value;
      ctx.save();
      ctx.translate(rotateX, rotateY);
      ctx.rotate((Math.PI / 180) * rotate.value);
      ctx.translate(-rotateX, -rotateY);

      const drawImage = () => {
        ctx.restore();
        if (isStaggered.value) {
          ctx.drawImage(
            canvas,
            0,
            0,
            canvasWidth,
            canvasHeight,
            canvasWidth,
            canvasHeight,
            canvasWidth,
            canvasHeight
          );
        }
        grayscale.value && canvasToGray(canvas);
        appendWatermark(canvas.toDataURL(), fillWidth);
      };

      if (image.value) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, drawX, drawY, realMarkWidth, realMarkHeight);
          drawImage();
        };
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image.value;
      } else {
        const mergedFontSize = Number(fontSize.value) * ratio;
        ctx.font = `${fontStyle.value} normal ${fontWeight.value} ${mergedFontSize}px/${markheight}px ${fontFamily.value}`;
        ctx.fillStyle = color.value;
        ctx.textAlign = textAlign.value;
        ctx.textBaseline = 'top';
        ctx.translate(realMarkWidth / 2, 0);
        contents.value?.forEach((item, index) => {
          ctx.fillText(
            item ?? '',
            drawX,
            drawY + index * (mergedFontSize + 3 * ratio)
          );
        });
        drawImage();
      }
    };

    const isWatermarkEle = (ele: any) =>
      Array.from(watermarkMap.value.values()).includes(ele);

    const handleMutations = (mutations: MutationRecord[]) => {
      if (!props.antiTamper) return;
      for (const mutation of mutations) {
        const isRemoved = Array.from(mutation.removedNodes).some((node) =>
          isWatermarkEle(node)
        );
        const isModified =
          mutation.type === 'attributes' && isWatermarkEle(mutation.target);

        if (isRemoved || isModified) {
          renderWatermark();
          break;
        }
      }
    };

    const { theme } = useTheme(renderWatermark);

    onMounted(() => {
      renderWatermark();
      useMutationObserver(containerRef.value, handleMutations, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    });

    watch(props, renderWatermark, { deep: true, flush: 'post' });

    return () => {
      return (
        <div
          ref={containerRef}
          class={prefixCls}
          style={{ position: 'relative', overflow: 'hidden' }}
          {...attrs}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
