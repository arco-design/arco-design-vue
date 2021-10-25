<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-image`">
      <slot name="image">
        <img v-if="imgSrc" :src="imgSrc" :alt="description || 'empty'" />
        <icon-empty v-else />
      </slot>
    </div>
    <div :class="`${prefixCls}-description`">
      <slot>{{ description || t('empty.description') }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconEmpty from '../icon/icon-empty';
import { useI18n } from '../locale';

export default defineComponent({
  name: 'Empty',
  components: {
    IconEmpty,
  },
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
  },
  /**
   * @zh 图片/图标
   * @en Image/Icon
   * @slot image
   */
  setup() {
    const prefixCls = getPrefixCls('empty');
    const { t } = useI18n();

    return {
      prefixCls,
      t,
    };
  },
});
</script>
