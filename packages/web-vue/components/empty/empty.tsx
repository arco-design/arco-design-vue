import { defineComponent, inject } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconEmpty from '../icon/icon-empty';
import { useI18n } from '../locale';
import { configProviderInjectionKey } from '../config-provider/context';

export default defineComponent({
  name: 'Empty',
  props: {
    /**
     * @zh 描述内容
     * @en Description
     */
    description: String,
    /**
     * @zh 自定义图片的地址
     * @en The src of the Custom Image
     */
    imgSrc: String,
    /**
     * @zh 是否在 ConfigProvider 中使用
     * @en Whether to use in ConfigProvider
     * @version 2.47.0
     */
    inConfigProvider: {
      type: Boolean,
      default: false,
    },
  },
  /**
   * @zh 图片/图标
   * @en Image/Icon
   * @slot image
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('empty');
    const { t } = useI18n();
    const configCtx = inject(configProviderInjectionKey, undefined);

    return () => {
      if (
        !props.inConfigProvider &&
        configCtx?.slots.empty &&
        !(slots.image || props.imgSrc || props.description)
      ) {
        return configCtx.slots.empty({ component: 'empty' });
      }

      return (
        <div class={prefixCls}>
          <div class={`${prefixCls}-image`}>
            {slots.image?.() ??
              (props.imgSrc ? (
                <img src={props.imgSrc} alt={props.description || 'empty'} />
              ) : (
                <IconEmpty />
              ))}
          </div>
          <div class={`${prefixCls}-description`}>
            {slots.default?.() ?? (props.description || t('empty.description'))}
          </div>
        </div>
      );
    };
  },
});
