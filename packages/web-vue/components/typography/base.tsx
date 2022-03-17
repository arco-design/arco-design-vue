import {
  defineComponent,
  VNode,
  PropType,
  toRefs,
  computed,
  ref,
  Text,
  onUnmounted,
  VNodeTypes,
  watch,
  reactive,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isObject, isString, isUndefined } from '../_utils/is';
import { BaseProps, EllipsisConfig, EllipsisInternalConfig } from './interface';
import EditContent from './edit-content.vue';
import Operations from './operations.vue';
import ResizeObserver from '../_components/resize-observer';
import { omit } from '../_utils/omit';
import useMergeState from '../_hooks/use-merge-state';
import measure from './utils/measure';
import { clipboard } from '../_utils/clipboard';
import getInnerText from './utils/getInnerText';
import { caf, raf } from '../_utils/raf';
import Tooltip from '../tooltip';
import Popover from '../popover';

interface BaseInternalProps extends BaseProps {
  component: keyof HTMLElementTagNameMap;
}

function getClassNames(prefixCls: string, props: BaseInternalProps) {
  const { type, disabled } = props;
  const classNames = [];

  if (type) {
    classNames.push(`${prefixCls}-${type}`);
  }
  if (disabled) {
    classNames.push(`${prefixCls}-disabled`);
  }

  return classNames;
}

function getComponentTags<K extends keyof HTMLElementTagNameMap>(
  props: BaseInternalProps
): K[] {
  const { bold, mark, underline, delete: propDelete, code } = props;
  const componentTags = [];

  if (bold) {
    componentTags.push('b');
  }
  if (underline) {
    componentTags.push('u');
  }
  if (propDelete) {
    componentTags.push('del');
  }
  if (code) {
    componentTags.push('code');
  }
  if (mark) {
    componentTags.push('mark');
  }

  return componentTags as K[];
}

// 目前只能处理纯文字内容的编辑
function getEditText(children: VNode[]) {
  if (!children) return '';

  const res: string[] = [];
  children.some((child) => {
    if (child.type === Text && isString(child.children)) {
      res.push(String(child.children));
      return true;
    }
    return false;
  });

  return res.join('');
}

function Wrap(props: BaseInternalProps, children: VNodeTypes) {
  const { mark } = props;
  const componentTags = getComponentTags(props);

  let content: VNodeTypes = children;
  componentTags.forEach((Tag) => {
    const attrs =
      isObject(mark) && mark.color
        ? { style: { backgroundColor: mark.color } }
        : {};
    content = <Tag {...attrs}>{content}</Tag>;
  });

  return content;
}

function normalizeEllipsisConfig(
  config: EllipsisConfig
): EllipsisInternalConfig {
  const showTooltip = !!config.showTooltip;
  const TooltipComponent =
    isObject(config.showTooltip) && config.showTooltip.type === 'popover'
      ? Popover
      : Tooltip;
  const tooltipProps =
    (isObject(config.showTooltip) && config.showTooltip.props) || {};

  return {
    rows: 1,
    suffix: '',
    ellipsisStr: '...',
    expandable: false,
    ...omit(config, ['showTooltip']),
    showTooltip,
    TooltipComponent,
    tooltipProps,
  };
}

/**
 * @displayName Common
 * @noBrackets
 */
export default defineComponent({
  name: 'TypographyBase',
  props: {
    component: {
      type: String as PropType<BaseInternalProps['component']>,
      required: true,
    },
    /**
     * @zh 文本类型
     * @en Text type
     */
    type: {
      type: String as PropType<
        'primary' | 'secondary' | 'success' | 'danger' | 'warning'
      >,
    },
    /**
     * @zh 粗体
     * @en Whether enable bold style
     */
    bold: {
      type: Boolean,
    },
    /**
     * @zh 添加标记样式
     * @en Mark style
     */
    mark: {
      type: [Boolean, Object] as PropType<boolean | { color: string }>,
      default: false,
    },
    /**
     * @zh 下划线样式
     * @en Whether enable underline style
     */
    underline: {
      type: Boolean,
    },
    /**
     * @zh 删除线样式
     * @en Whether enable delete style
     */
    delete: {
      type: Boolean,
    },
    /**
     * @zh 代码块样式
     * @en Whether enable code style
     */
    code: {
      type: Boolean,
    },
    /**
     * @zh 禁用状态
     * @en Whether disabled
     */
    disabled: {
      type: Boolean,
    },
    /**
     * @zh 开启可编辑功能
     * @en Whether it's editable
     */
    editable: {
      type: Boolean,
    },
    /**
     * @zh 是否在编辑状态
     * @en Whether it's editing
     * @vModel
     */
    editing: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认的编辑状态
     * @en Default editing state
     */
    defaultEditing: {
      type: Boolean,
    },
    /**
     * @zh 编辑的文字
     * @en Edit text
     * @vModel
     */
    editText: {
      type: String,
    },
    /**
     * @zh 开启复制功能
     * @en Whether turn on copy functionality
     */
    copyable: {
      type: Boolean,
    },
    /**
     * @zh 复制的文字
     * @en Copied text
     */
    copyText: {
      type: String,
    },
    /**
     * @zh 复制成功后，复制按钮恢复到可点击状态的延迟时间，单位是毫秒
     * @en After the copy is successful, the delay time for the copy button to return to the clickable state, in milliseconds
     * @version 2.16.0
     */
    copyDelay: {
      type: Number,
      default: 3000,
    },
    /**
     * @zh 自动溢出省略，具体参数配置看 [EllipsisConfig](#ellipsisconfig)
     * @en Automatic overflow omission, refer to [EllipsisConfig](#ellipsisconfig) for more information.
     */
    ellipsis: {
      type: [Boolean, Object] as PropType<boolean | EllipsisConfig>,
      default: false,
    },
  },
  emits: [
    /**
     * @zh 开始编辑
     * @en Edit start
     */
    'editStart',
    /**
     * @zh 编辑内容变化
     * @en Edit content change
     */
    'change',
    'update:editText',
    /**
     * @zh 编辑结束
     * @en Edit end
     * @param text {string} Edited text
     */
    'editEnd',
    'update:editing',
    /**
     * @zh 复制
     * @en Copy
     * @param text {string} Copied text
     */
    'copy',
    /**
     * @zh 省略变化事件
     * @en Ellipsis change
     * @param isEllipsis {boolean} Ellipsis state
     */
    'ellipsis',
    /**
     * @zh 展开收起事件
     * @en Expand collapse event
     * @param expanded {boolean} Expand state
     */
    'expand',
  ],
  /**
   * @zh 自定义复制按钮的 tooltip 内容
   * @en Customize the tooltip content of the copy button
   * @slot copy-tooltip
   * @binding {boolean} copied
   */
  /**
   * @zh 自定义复制按钮图标
   * @en Custom copy button icon
   * @slot copy-icon
   * @binding {boolean} copied
   */
  /**
   * @zh 自定义展开和折叠按钮
   * @en Custom expand button
   * @slot expand-node
   * @binding {boolean} expanded
   */
  setup(props: BaseInternalProps, { slots, emit }) {
    const {
      editing: propEditing,
      defaultEditing,
      ellipsis,
      copyable,
      editable,
      copyText,
      editText,
      copyDelay,
      component,
    } = toRefs(props);

    const prefixCls = getPrefixCls('typography');
    const classNames = computed(() => [
      prefixCls,
      ...getClassNames(prefixCls, props),
    ]);

    const wrapperRef = ref();
    const fullText = '';

    // for edit
    const [editing, setEditing] = useMergeState(
      defaultEditing.value,
      reactive({
        value: propEditing,
      })
    );
    const mergeEditing = computed(() => editable.value && editing.value);

    function onEditStart() {
      emit('update:editing', true);
      emit('editStart');
      setEditing(true);
    }

    function onEditChange(text: string) {
      emit('update:editText', text);
      emit('change', text);
    }

    function onEditEnd() {
      emit('update:editing', false);
      emit('editEnd');
      setEditing(false);
    }

    // for copy
    const isCopied = ref(false);
    let copyTimer: NodeJS.Timeout | null = null;

    function onCopyClick() {
      const text = !isUndefined(copyText?.value) ? copyText?.value : fullText;

      clipboard(text || '');

      isCopied.value = true;

      emit('copy', text);

      copyTimer = setTimeout(() => {
        isCopied.value = false;
      }, copyDelay.value);
    }

    onUnmounted(() => {
      copyTimer && clearTimeout(copyTimer);
      copyTimer = null;
    });

    // for ellipsis
    const isEllipsis = ref(false);
    const expanded = ref(false);
    const ellipsisText = ref('');
    const ellipsisConfig = computed<EllipsisInternalConfig>(() =>
      normalizeEllipsisConfig(
        (isObject(ellipsis?.value) && ellipsis?.value) || {}
      )
    );
    let rafId: number = null as any;

    function onExpandClick() {
      const newVal = !expanded.value;
      expanded.value = newVal;
      emit('expand', newVal);
    }

    function renderOperations(forceRenderExpand = false) {
      return (
        <Operations
          editable={editable.value}
          copyable={copyable.value}
          expandable={ellipsisConfig.value.expandable}
          isCopied={isCopied.value}
          isEllipsis={isEllipsis.value}
          expanded={expanded.value}
          forceRenderExpand={forceRenderExpand}
          onEdit={onEditStart}
          onCopy={onCopyClick}
          onExpand={onExpandClick}
          v-slots={{
            'copy-tooltip': slots['copy-tooltip'],
            'copy-icon': slots['copy-icon'],
            'expand-node': slots['expand-node'],
          }}
        />
      );
    }

    function calEllipsis() {
      if (!wrapperRef.value) return;

      const { ellipsis, text } = measure(
        wrapperRef.value,
        ellipsisConfig.value,
        renderOperations(!!ellipsisConfig.value.expandable),
        fullText
      );

      if (isEllipsis.value !== ellipsis) {
        isEllipsis.value = ellipsis;
        emit('ellipsis', ellipsis);
      }

      if (ellipsisText.value !== text) {
        ellipsisText.value = text || '';
      }
    }

    function resizeOnNextFrame() {
      const needCalEllipsis = !!ellipsis?.value && !expanded.value;
      if (!needCalEllipsis) return;

      caf(rafId);
      rafId = raf(() => {
        calEllipsis();
      });
    }

    onUnmounted(() => {
      caf(rafId);
    });

    watch(
      () => ellipsisConfig.value.rows,
      () => {
        resizeOnNextFrame();
      }
    );
    watch(ellipsis, (newVal) => {
      if (newVal) {
        resizeOnNextFrame();
      } else {
        isEllipsis.value = false;
      }
    });

    return () => {
      const children = slots.default?.() || [];
      const newFullText = getInnerText(children);
      if (newFullText !== fullText) {
        calEllipsis();
      }

      // 编辑中
      if (mergeEditing.value) {
        const _editText = editText.value ?? getEditText(children);

        return (
          <EditContent
            text={_editText}
            onChange={(text: string) => {
              if (text !== _editText) {
                onEditChange(text);
              }
            }}
            onEnd={onEditEnd}
          />
        );
      }

      const {
        suffix,
        ellipsisStr,
        showTooltip,
        tooltipProps,
        TooltipComponent,
      } = ellipsisConfig.value;
      const showEllipsis = isEllipsis.value && !expanded.value;
      const Content = Wrap(props, showEllipsis ? ellipsisText.value : children);
      const titleAttrs =
        showEllipsis && !showTooltip ? { title: fullText } : {};
      const Component = component.value;

      return (
        <ResizeObserver
          onResize={() => {
            resizeOnNextFrame();
          }}
        >
          <Component class={classNames.value} ref={wrapperRef} {...titleAttrs}>
            {showEllipsis && showTooltip ? (
              <TooltipComponent
                {...tooltipProps}
                v-slots={{
                  content: () => fullText,
                  default: () => [<span>{Content}</span>],
                }}
              />
            ) : (
              Content
            )}
            {showEllipsis ? ellipsisStr : null}
            {suffix}
            {renderOperations()}
          </Component>
        </ResizeObserver>
      );
    };
  },
});
