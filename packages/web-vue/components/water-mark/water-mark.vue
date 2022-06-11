<template>
  <div :class="`${prefixCls}-container`">
    <slot></slot>
    <div ref="waterMarkOdd" :class="prefixCls"></div>
    <div ref="waterMarkEven" :class="prefixCls"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'WaterMark',
  props: {
    /**
     * @zh 水印的内容
     * @en Watermark content
     */
    content: {
      type: String,
      required: true,
    },
    /**
     * @zh 水印的字体尺寸
     * @en Watermark font size
     * @defaultValue 16
     */
    fontSize: {
      type: Number,
      default: 16,
    },
    /**
     * @zh 水印的字体系列
     * @en Watermark font family
     */
    fontFamily: String,
    /**
     * @zh 水印的颜色
     * @en Watermark color
     * @defaultValue '#A9AEB8'
     */
    color: {
      type: String,
      default: '#A9AEB8',
    },
    /**
     * @zh 水印的不透明度
     * @en Watermark opacity
     * @defaultValue 0.25
     */
    opacity: {
      type: Number,
      default: 0.25,
    },
    /**
     * @zh 水印的旋转角度
     * @en Watermark rotation angle
     * @defaultValue -12
     */
    rotate: {
      type: Number,
      default: -12,
    },
    /**
     * @zh 水印的间隔
     * @en Watermark space
     * @defaultValue 45
     */
    space: {
      type: Number,
      default: 45,
    },
    /**
     * @zh 水印的层叠顺序
     * @en Watermark z-index
     */
    zIndex: Number,
  },
  setup(props) {
    const prefixCls = getPrefixCls('water-mark');
    const waterMarkOdd = ref<HTMLDivElement>();
    const waterMarkEven = ref<HTMLDivElement>();
    const canvas = document.createElement('canvas');
    watch([() => ({ ...props }), waterMarkOdd, waterMarkEven], () => {
      if (!waterMarkOdd.value || !waterMarkEven.value) return;

      const {
        content,
        fontSize,
        fontFamily = getComputedStyle(document.body).fontFamily,
        color,
        opacity,
        rotate,
        space,
        zIndex,
      } = props;

      // 无内容时移除水印（异常情况）
      if (!content) {
        waterMarkOdd.value.style.background = '';
        waterMarkOdd.value.style.zIndex = '';
        waterMarkEven.value.style.background = '';
        waterMarkEven.value.style.zIndex = '';
        return;
      }

      // 获取 canvas 上下文失败时移除水印（异常情况）
      let context = canvas.getContext('2d');
      if (!context) {
        waterMarkOdd.value.style.background = 'none';
        waterMarkOdd.value.style.zIndex = zIndex?.toString() || '';
        waterMarkEven.value.style.background = 'none';
        waterMarkEven.value.style.zIndex = zIndex?.toString() || '';
        return;
      }

      // 计算水印尺寸
      context.font = `${fontSize}px ${fontFamily}`;
      const textWidth = context.measureText(content).width;
      const textHeight = fontSize * 1.35;
      const rad = (rotate * Math.PI) / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      const newTextWidth =
        Math.abs(textWidth * cos) + Math.abs(textHeight * sin) + space * 2;
      const newTextHeight =
        Math.abs(textWidth * sin) + Math.abs(textHeight * cos) + space * 2;
      canvas.width = newTextWidth;
      canvas.height = newTextHeight * 2;

      // 绘制水印
      context = canvas.getContext('2d')!;
      context.font = `${fontSize}px ${fontFamily}`;
      context.translate(newTextWidth / 2, newTextHeight / 2);
      context.rotate(rad);
      context.fillStyle = color;
      context.globalAlpha = opacity;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(props.content, 0, 0);

      // 水印载入背景
      const waterMarkUrl = canvas.toDataURL('image/png');
      waterMarkOdd.value.style.background = `url(${waterMarkUrl}) ${-space}px ${-space}px repeat`;
      waterMarkOdd.value.style.zIndex = zIndex?.toString() || '';
      waterMarkEven.value.style.background = `url(${waterMarkUrl}) ${
        -space + newTextWidth / 2
      }px ${-space + newTextHeight}px repeat`;
      waterMarkEven.value.style.zIndex = zIndex?.toString() || '';
    });

    return {
      prefixCls,
      waterMarkOdd,
      waterMarkEven,
    };
  },
});
</script>
