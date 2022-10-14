<template>
  <div>
    <h3
      :style="{
        textAlign: 'center',
        color: theme === 'light' ? '#333' : '#fff',
      }"
    >
      {{ title }}
    </h3>
    <div className="color-palette-wrapper">
      <template v-for="item in palette" :key="item.index">
        <div
          className="color-palette-item"
          :style="item.style"
          :aria-label="item.colorString"
          @click="handleCopyColor(item.colorString)"
        >
          <div className="color-palette-item-left">
            <div className="color-name">{{ `${name}-${item.index + 1}` }}</div>
          </div>
          <span className="color-palette-value">{{ item.colorString }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { colord } from 'colord';
import { Message } from '@web-vue/components/index';
import clipboard from '../../utils/clipboard';

export default defineComponent({
  name: 'PaletteCard',
  props: {
    colors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    name: String,
    format: String,
    theme: String,
    title: String,
  },
  setup(props) {
    const palette = computed(() =>
      props.colors.map((c, index) => {
        const color = colord(c);
        const colorString =
          props.format === 'hex'
            ? color.toHex()
            : props.format === 'rgb'
            ? color.toRgbString()
            : color.toHslString();

        return {
          index,
          colorString,
          style: {
            backgroundColor: color.toHex(),
            color: color.isLight() ? '#000' : '#fff',
            fontWeight: index === 5 ? 'bold' : 400,
          },
        };
      })
    );

    const handleCopyColor = (text: string) => {
      if (text) {
        clipboard(text)
          .then(() => {
            Message.success(`Copy Success! ${text}`);
          })
          .catch(() => {
            Message.error('Copy Failed! Please try again.');
          });
      }
    };

    return {
      palette,
      handleCopyColor,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
