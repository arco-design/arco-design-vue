<template>
  <div :class="prefixCls">
    <div v-if="hasAvatar" :class="`${prefixCls}-avatar`">
      <img v-if="avatar" :src="avatar" alt="comment-avatar" />
      <slot v-else name="avatar" />
    </div>
    <div :class="`${prefixCls}-inner`">
      <div :class="`${prefixCls}-inner-content`">
        <div
          v-if="hasAuthor || hasDatetime"
          :class="`${prefixCls}-title ${prefixCls}-title-align-${computedAlign.datetime}`"
        >
          <span v-if="hasAuthor" :class="`${prefixCls}-author`">
            <span v-if="author"> {{ author }} </span>
            <slot v-else name="author" />
          </span>
          <span v-if="hasDatetime" :class="`${prefixCls}-datetime`">
            <span v-if="datetime"> {{ datetime }} </span>
            <slot v-else name="datetime" />
          </span>
        </div>
        <div v-if="hasContent" :class="`${prefixCls}-content`">
          <span v-if="content"> {{ content }} </span>
          <slot v-else name="content" />
        </div>
        <div
          v-if="$slots.actions"
          :class="`${prefixCls}-actions ${prefixCls}-actions-align-${computedAlign.actions}`"
        >
          <slot name="actions" />
        </div>
      </div>
      <div v-if="$slots.default" :class="`${prefixCls}-inner-comment`">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { hasPropOrSlot } from '../_utils/use-prop-or-slot';
import { isString } from '../_utils/is';

export default defineComponent({
  name: 'Comment',
  props: {
    /**
     * @zh 作者名
     * @en Display as the comment author
     */
    author: {
      type: String,
    },
    /**
     * @zh 头像
     * @en Display as the comment avatar
     */
    avatar: {
      type: String,
    },
    /**
     * @zh 评论内容
     * @en The content of the comment
     */
    content: {
      type: String,
    },
    /**
     * @zh 时间描述
     * @en Display as the comment datetime
     */
    datetime: {
      type: String,
    },
    /**
     * @zh 靠左/靠右 展示 datetime 和 actions
     * @en Alignment of `datetime` and `actions`
     * @values 'left', 'right', { datetime?: "left" | "right"; actions?: "left" | "right" }
     * */
    align: {
      type: [String, Object],
      default: 'left',
    },
  },
  /**
   * @zh 头像
   * @en Avatar
   * @slot avatar
   */
  /**
   * @zh 作者
   * @en Author name
   * @slot author
   */
  /**
   * @zh 时间描述
   * @en Datetime info
   * @slot datetime
   */
  /**
   * @zh 评论内容
   * @en Comment content
   * @slot content
   */
  /**
   * @zh 操作列表
   * @en Action list
   * @slot actions
   */

  setup(props, { slots }) {
    const prefixCls = getPrefixCls('comment');

    const [hasAuthor, hasAvatar, hasContent, hasDatetime] = [
      'author',
      'avatar',
      'content',
      'datetime',
    ].map((propName) => hasPropOrSlot(props, slots, propName));

    const computedAlign = computed(() => {
      const { align } = props;
      return {
        ...(isString(align)
          ? {
              datetime: align,
              actions: align,
            }
          : align),
      };
    });

    return {
      prefixCls,
      hasAuthor,
      hasAvatar,
      hasContent,
      hasDatetime,
      computedAlign,
    };
  },
});
</script>
