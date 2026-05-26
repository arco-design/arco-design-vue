<template>
  <div v-if="hasValue" :class="rootClass" :style="rootStyle">
    <div v-if="status !== 'active'" :class="`${prefixCls}-cover`">
      <RenderNode v-if="customStatusNode" :node="customStatusNode" />
      <slot v-else name="status" :status="status" :on-refresh="handleRefresh">
        <qr-code-status
          :prefix-cls="prefixCls"
          :status="status"
          :spin-props="spinProps"
          @refresh="handleRefresh"
        />
      </slot>
    </div>

    <canvas v-if="type === 'canvas'" ref="canvasRef" :class="`${prefixCls}-canvas`" />
    <div v-else :class="`${prefixCls}-svg`" v-html="svgMarkup" />

    <div v-if="hasIcon" :class="`${prefixCls}-icon`">
      <slot name="icon">
        <img v-if="icon" :src="icon" :alt="iconAlt" :style="iconStyle" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType, StyleValue, VNodeChild } from 'vue';
  import { computed, defineComponent, nextTick, ref, watch, useSlots } from 'vue';

  import QRCode from 'qrcode';

  import type { SpinProps } from '../spin';
  import type {
    QrCodeErrorLevel,
    QrCodeIconSize,
    QrCodeInactiveStatus,
    QrCodeStatusRenderInfo,
    QrCodeStatusType,
    QrCodeType,
    QrCodeValue,
  } from './types';

  import { getPrefixCls } from '../_utils/global-config';
  import QrCodeStatus from './qr-code-status.vue';

  const RenderNode = defineComponent({
    name: 'RenderNode',
    props: {
      node: {
        type: [Object, String, Number, Boolean, Array] as PropType<VNodeChild>,
        default: null,
      },
    },
    setup(renderProps) {
      return () => renderProps.node;
    },
  });

  const slots = useSlots();

  const props = defineProps({
    /**
     * @zh 扫描后的文本
     * @en Text encoded in the QR code
     */
    value: {
      type: [String, Array] as PropType<QrCodeValue>,
      required: false,
    },
    /**
     * @zh 渲染类型
     * @en Render type
     * @values 'canvas', 'svg'
     */
    type: {
      type: String as PropType<QrCodeType>,
      default: 'canvas',
    },
    /**
     * @zh 二维码中的图片地址
     * @en Image source rendered at the center of QR code
     */
    icon: {
      type: String,
      default: '',
    },
    /**
     * @zh 图片描述
     * @en Image alt text
     */
    iconAlt: {
      type: String,
      default: 'qr-code-icon',
    },
    /**
     * @zh 二维码尺寸
     * @en QR code size
     */
    size: {
      type: Number,
      default: 160,
    },
    /**
     * @zh 二维码中图片尺寸
     * @en Center image size
     */
    iconSize: {
      type: [Number, Object] as PropType<QrCodeIconSize>,
      default: 40,
    },
    /**
     * @zh 二维码前景色
     * @en Foreground color of QR code
     */
    color: {
      type: String,
      default: '#1D2129',
    },
    /**
     * @zh 二维码背景色
     * @en Background color of QR code
     */
    bgColor: {
      type: String,
      default: 'transparent',
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show border
     */
    bordered: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 二维码纠错等级
     * @en Error correction level
     * @values 'L', 'M', 'Q', 'H'
     */
    errorLevel: {
      type: String as PropType<QrCodeErrorLevel>,
      default: 'M',
    },
    /**
     * @zh 是否启用增强纠错（由底层库决定是否生效）
     * @en Whether to enable boost-level optimization
     */
    boostLevel: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 留白（安静区）大小
     * @en Margin size in module units
     */
    marginSize: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 二维码状态
     * @en QR code status
     * @values 'active', 'expired', 'loading', 'scanned'
     */
    status: {
      type: String as PropType<QrCodeStatusType>,
      default: 'active',
    },
    /**
     * @zh 自定义状态渲染
     * @en Custom status renderer
     */
    statusRender: {
      type: Function as PropType<(info: QrCodeStatusRenderInfo) => VNodeChild>,
      default: undefined,
    },
    /**
     * @zh 加载态 spin 参数
     * @en Spin props for loading status
     */
    spinProps: {
      type: Object as PropType<SpinProps>,
      default: undefined,
    },
  });

  const emit = defineEmits<{
    /**
     * @zh 点击刷新时触发
     * @en Triggered when refresh action is clicked
     */
    refresh: [];
  }>();

  defineSlots<{
    /**
     * @zh 自定义中心图标
     * @en Custom center icon
     */
    icon?: () => VNodeChild;
    /**
     * @zh 自定义状态覆盖层
     * @en Custom status overlay
     */
    status?: (props: QrCodeStatusRenderInfo) => VNodeChild;
  }>();

  const prefixCls = getPrefixCls('qr-code');
  const canvasRef = ref<HTMLCanvasElement>();
  const svgMarkup = ref('');

  const handleRefresh = () => {
    emit('refresh');
  };

  const mergedValue = computed(() => {
    if (Array.isArray(props.value)) {
      return props.value.join('\n');
    }

    return props.value ?? '';
  });

  const hasValue = computed(() => Boolean(mergedValue.value));
  const hasIcon = computed(() => Boolean(props.icon || slots.icon));
  const inactiveStatus = computed(() =>
    props.status === 'active' ? null : (props.status as QrCodeInactiveStatus),
  );
  const iconWidth = computed(() =>
    typeof props.iconSize === 'number' ? props.iconSize : props.iconSize.width,
  );
  const iconHeight = computed(() =>
    typeof props.iconSize === 'number' ? props.iconSize : props.iconSize.height,
  );
  const iconStyle = computed<StyleValue>(() => ({
    width: `${iconWidth.value}px`,
    height: `${iconHeight.value}px`,
  }));
  const customStatusNode = computed(() => {
    if (!inactiveStatus.value || !props.statusRender) {
      return null;
    }

    return props.statusRender({
      status: inactiveStatus.value,
      onRefresh: handleRefresh,
    });
  });
  const rootClass = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-borderless`]: !props.bordered,
      [`${prefixCls}-has-status`]: Boolean(inactiveStatus.value),
    },
  ]);
  const rootStyle = computed<StyleValue>(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
    backgroundColor: props.bgColor,
  }));
  const qrBgColor = computed(() => (props.bgColor === 'transparent' ? '#ffffff' : props.bgColor));
  const qrOptions = computed(() => ({
    errorCorrectionLevel: props.errorLevel,
    margin: props.marginSize,
    width: props.size,
    color: {
      dark: props.color,
      light: qrBgColor.value,
    },
  }));

  const renderCanvas = async () => {
    if (!canvasRef.value || !hasValue.value) {
      return;
    }

    try {
      await QRCode.toCanvas(canvasRef.value, mergedValue.value, { ...qrOptions.value });
    } catch {
      // noop
    }
  };

  const renderSvg = async () => {
    if (!hasValue.value) {
      svgMarkup.value = '';
      return;
    }

    try {
      svgMarkup.value = await QRCode.toString(mergedValue.value, {
        ...qrOptions.value,
        type: 'svg',
      });
    } catch {
      svgMarkup.value = '';
    }
  };

  const renderCode = async () => {
    if (!hasValue.value) {
      svgMarkup.value = '';
      return;
    }

    await nextTick();

    if (props.type === 'canvas') {
      await renderCanvas();
      return;
    }

    await renderSvg();
  };

  watch(
    () => [
      mergedValue.value,
      props.type,
      props.size,
      props.color,
      props.bgColor,
      props.errorLevel,
      props.marginSize,
      props.boostLevel,
    ],
    () => {
      void renderCode();
    },
    {
      immediate: true,
      flush: 'post',
    },
  );
</script>
