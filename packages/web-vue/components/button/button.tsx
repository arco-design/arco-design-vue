import {
  defineComponent,
  computed,
  toRefs,
  inject,
  PropType,
  ref,
  watchEffect,
  VNode,
} from 'vue';
import { Status, Size } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { isString } from '../_utils/is';
import IconLoading from '../icon/icon-loading';
import { useSize } from '../_hooks/use-size';
import { useFormItem } from '../_hooks/use-form-item';
import { buttonGroupInjectionKey } from './context';
import { configProviderInjectionKey } from '../config-provider/context';
import useState from '../_hooks/use-state';
import { isText } from '../_utils/vue-utils';

const regexTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;

function processChildren(children?: VNode[]) {
  if (!children) {
    return null;
  }
  const childrenList: Array<VNode | string> = [];
  let isPrevChildPure = false;
  children.forEach((child) => {
    const isCurrentChildPure = isText(child, child.children);
    if (isCurrentChildPure && isPrevChildPure) {
      const lastIndex = childrenList.length - 1;
      const lastChild = childrenList[lastIndex];
      childrenList[lastIndex] = `${lastChild}${child.children}`;
    } else if (isCurrentChildPure && child.children) {
      childrenList.push(child.children as string);
    } else {
      childrenList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });
  return childrenList.map((child) =>
    typeof child === 'string' ? <span>{child}</span> : child
  );
}

export default defineComponent({
  name: 'Button',
  components: {
    IconLoading,
  },
  props: {
    /**
     * @zh 按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。
     * @en Button types are divided into five types: secondary, primary, dashed, outline and text.
     * @defaultValue 'secondary'
     */
    type: {
      type: String as PropType<
        'primary' | 'secondary' | 'outline' | 'dashed' | 'text'
      >,
    },
    /**
     * @zh 按钮的形状
     * @en Button shape
     */
    shape: {
      type: String as PropType<'square' | 'round' | 'circle'>,
    },
    /**
     * @zh 按钮的状态
     * @en Button state
     * @values 'normal','warning','success','danger'
     * @defaultValue 'normal'
     */
    status: {
      type: String as PropType<Status>,
    },
    /**
     * @zh 按钮的尺寸
     * @en Button size
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 图标位置
     * @en Icon location
     */
    iconPosition: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
    /**
     * @zh 按钮的宽度是否随容器自适应。
     * @en Whether the width of the button adapts to the container.
     */
    long: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 按钮是否为加载中状态
     * @en Whether the button is in the loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 当 loading 的时候，不改变按钮的宽度。
     * @en The width of the button remains unchanged on loading
     */
    loadingFixedWidth: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 按钮是否禁用
     * @en Whether the button is disabled
     * @defaultValue false
     */
    disabled: {
      type: Boolean,
    },
    /**
     * @zh 设置 `button` 的原生 `type` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     * @en Set the native `type` attribute of `button`, optional values refer to [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     */
    htmlType: {
      type: String,
      default: 'button',
    },
    /**
     * @zh 设置跳转链接。设置此属性时，按钮渲染为a标签。
     * @en Set up a jump link. When this property is set, the button is rendered as `<a>`
     */
    href: String,
  },
  emits: {
    /**
     * @zh 点击按钮时触发
     * @en Emitted when the button is clicked
     * @property {MouseEvent} ev
     */
    click: (ev: MouseEvent) => true,
  },
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   */
  /**
   * @zh 加载图标
   * @en Loading icon
   * @slot loading-icon
   */
  setup(props, { emit, slots }) {
    const { size, disabled, href } = toRefs(props);
    const prefixCls = getPrefixCls('btn');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const groupContext = inject(buttonGroupInjectionKey, undefined);
    const buttonRef = ref<HTMLElement | null>(null);
    const [isTwoCNChar, setIsTwoCNChar] = useState(false);
    const _size = computed(() => size.value ?? groupContext?.size);
    const _disabled = computed(() =>
      Boolean(disabled.value || groupContext?.disabled)
    );
    const { mergedSize: _mergedSize, mergedDisabled } = useFormItem({
      size: _size,
      disabled: _disabled,
    });
    const { mergedSize } = useSize(_mergedSize);

    watchEffect(() => {
      if (configCtx?.autoInsertSpaceInButton && buttonRef.value) {
        const { textContent } = buttonRef.value;
        if (textContent && regexTwoCNChar.test(textContent)) {
          if (!isTwoCNChar.value) {
            setIsTwoCNChar(true);
          }
        } else if (isTwoCNChar.value) {
          setIsTwoCNChar(false);
        }
      }
    });

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${props.type ?? groupContext?.type ?? 'secondary'}`,
      `${prefixCls}-shape-${props.shape ?? groupContext?.shape ?? 'square'}`,
      `${prefixCls}-size-${mergedSize.value}`,
      `${prefixCls}-status-${props.status ?? groupContext?.status ?? 'normal'}`,
      {
        [`${prefixCls}-long`]: props.long,
        [`${prefixCls}-loading`]: props.loading,
        [`${prefixCls}-loading-fixed-width`]: props.loadingFixedWidth,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
        [`${prefixCls}-link`]: isString(props.href),
        [`${prefixCls}-two-chinese-chars`]: isTwoCNChar.value,
        [`${prefixCls}-only-icon`]: slots.icon && !slots.default,
      },
    ]);

    const handleClick = (ev: MouseEvent) => {
      if (props.disabled || props.loading) {
        return;
      }
      emit('click', ev);
    };

    const renderIcon = () => {
      return (
        (props.loading || slots.icon) && (
          <span
            class={[
              `${prefixCls}-icon`,
              `${prefixCls}-icon-${props.iconPosition}`,
            ]}
          >
            {props.loading
              ? slots['loading-icon']?.() ?? <icon-loading spin />
              : slots.icon?.()}
          </span>
        )
      );
    };

    return () => {
      const TagName = href.value ? 'a' : 'button';
      const tagAttrs: Record<string, any> = {};
      if (href.value) {
        tagAttrs.href =
          mergedDisabled.value || props.loading ? undefined : href.value;
      } else {
        tagAttrs.type = props.htmlType;
        tagAttrs.disabled = mergedDisabled.value;
      }

      return (
        <TagName
          ref={buttonRef}
          class={cls.value}
          {...tagAttrs}
          onClick={handleClick}
        >
          {props.iconPosition === 'left' && renderIcon()}
          {processChildren(slots.default?.())}
          {props.iconPosition === 'right' && renderIcon()}
        </TagName>
      );
    };
  },
});
