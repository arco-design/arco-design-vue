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

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, useSlots } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import { isString } from '../_utils/is';
  import { hasPropOrSlot } from '../_utils/use-prop-or-slot';

  defineOptions({ name: 'Comment' });

  const props = defineProps({
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
      type: [String, Object] as PropType<
        'left' | 'right' | { datetime?: 'left' | 'right'; actions?: 'left' | 'right' }
      >,
      default: 'left',
    },
  });

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

  const slots = useSlots();

  const prefixCls = getPrefixCls('comment');

  const [hasAuthor, hasAvatar, hasContent, hasDatetime] = (
    ['author', 'avatar', 'content', 'datetime'] as const
  ).map((propName) => hasPropOrSlot(props, slots, propName));

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
</script>
