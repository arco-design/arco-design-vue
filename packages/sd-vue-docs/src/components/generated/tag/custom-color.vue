<template>
  <sd-space vertical :size="16">
    <!-- 自动文字颜色：深色背景显示白色文字，浅色背景自动生成深色文字 -->
    <sd-space wrap>
      <sd-tag v-for="(color, index) of darkColors" :key="index" :color="color" bordered>
        {{ color }}
      </sd-tag>
    </sd-space>
    <sd-space wrap>
      <sd-tag v-for="(color, index) of lightColors" :key="index" :color="color" bordered>
        {{ color }}
      </sd-tag>
    </sd-space>

    <sd-divider />

    <!-- 手动指定文字颜色 -->
    <sd-space wrap>
      <sd-tag color="#ff5722" text-color="#000000" bordered> textColor="#000000" </sd-tag>
      <sd-tag color="#ff5722" text-color="#FFFFFF" bordered> textColor="#FFFFFF" </sd-tag>
    </sd-space>

    <sd-divider />

    <!-- 调整背景透明度 -->
    <sd-space wrap>
      <sd-tag
        v-for="alpha in alphas"
        :key="alpha"
        color="#165dff"
        :background-alpha="alpha"
        bordered
      >
        alpha={{ alpha }}
      </sd-tag>
    </sd-space>
  </sd-space>
</template>

<script setup lang="ts">
  const darkColors = ['#f53f3f', '#7816ff', '#165dff', '#ff7d00', '#00b42a', '#b71de8'];
  const lightColors = ['#ffb400', '#0fc6c2', '#7bc616', '#ffb7c5', '#bfd4ff', '#e8b4fd'];
  const alphas = [0.1, 0.2, 0.4, 0.6, 0.8, 1.0];
</script>
