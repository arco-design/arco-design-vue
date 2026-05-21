<script setup lang="ts">
  import { ref } from 'vue';

  import HomeShowcaseCard from './HomeShowcaseCard.vue';

  const pickerValue = ref(new Date());
  const serviceRate = ref(4);
  const deliveryRate = ref(5);
</script>

<template>
  <div class="components-showcase">
    <div class="components-showcase__desktop">
      <div class="components-showcase__track">
        <HomeShowcaseCard title="DatePicker" tag="高频" tone="brand">
          <sd-date-picker v-model="pickerValue" class="sd:w-full" />
          <sd-date-picker v-model="pickerValue" hide-trigger class="sd:w-full" />
        </HomeShowcaseCard>

        <HomeShowcaseCard title="ColorPicker" tag="主题" tone="success">
          <sd-color-picker default-value="#1476FF" hide-trigger show-preset show-history />
        </HomeShowcaseCard>

        <HomeShowcaseCard title="Collapse" tag="内容组织" tone="warning">
          <sd-collapse :default-active-key="['guide']" :bordered="false" class="sd:w-full">
            <sd-collapse-item header="快速开始" key="guide">
              组件、样式与文档结构可以按需组合，适合业务页、后台台账与配置面板。
            </sd-collapse-item>
            <sd-collapse-item header="主题与暗黑态" key="theme">
              文档站主题切换会直接联动组件暗黑模式，首页预览不是静态截图。
            </sd-collapse-item>
          </sd-collapse>
        </HomeShowcaseCard>

        <HomeShowcaseCard title="Rate" tag="反馈" tone="brand">
          <div class="components-showcase__rate-panel">
            <p class="components-showcase__rate-title">本次交付满意度</p>
            <sd-rate v-model="serviceRate" allow-half />
            <p class="components-showcase__rate-desc"
              >交互反馈即时可见，适合用于服务评价与体验打分。</p
            >
            <sd-space :size="16" align="center">
              <span class="components-showcase__rate-label">服务态度</span>
              <sd-rate v-model="deliveryRate" readonly />
            </sd-space>
          </div>
        </HomeShowcaseCard>
      </div>
    </div>

    <div class="components-showcase__mobile">
      <sd-carousel
        show-arrow="never"
        indicator-type="dot"
        :style="{ width: '100%', height: '390px' }"
      >
        <sd-carousel-item>
          <div class="components-showcase__slide">
            <HomeShowcaseCard title="DatePicker" tag="高频" tone="brand">
              <sd-date-picker default-value="2026-04-17" class="sd:w-full" />
            </HomeShowcaseCard>
          </div>
        </sd-carousel-item>
        <sd-carousel-item>
          <div class="components-showcase__slide">
            <HomeShowcaseCard title="ColorPicker" tag="主题" tone="success">
              <sd-space :size="24">
                <sd-color-picker default-value="#1476FF" hide-trigger show-preset show-history />
                <sd-color-picker default-value="#12D2AC" hide-trigger show-preset disabled />
              </sd-space>
            </HomeShowcaseCard>
          </div>
        </sd-carousel-item>
        <sd-carousel-item>
          <div class="components-showcase__slide">
            <HomeShowcaseCard title="Collapse" tag="内容组织" tone="warning">
              <sd-collapse :default-active-key="['guide']" :bordered="false" class="sd:w-full">
                <sd-collapse-item header="快速开始" key="guide">
                  组件、样式与文档结构可以按需组合，适合业务页、后台台账与配置面板。
                </sd-collapse-item>
                <sd-collapse-item header="主题与暗黑态" key="theme">
                  文档站主题切换会直接联动组件暗黑模式，首页预览不是静态截图。
                </sd-collapse-item>
              </sd-collapse>
            </HomeShowcaseCard>
          </div>
        </sd-carousel-item>
        <sd-carousel-item>
          <div class="components-showcase__slide">
            <HomeShowcaseCard title="Rate" tag="反馈" tone="brand">
              <div class="components-showcase__rate-panel">
                <p class="components-showcase__rate-title">方案推荐指数</p>
                <sd-rate :default-value="4" allow-half readonly />
                <p class="components-showcase__rate-desc"
                  >支持半星、只读与表单联动，能快速构建轻量评价流程。</p
                >
              </div>
            </HomeShowcaseCard>
          </div>
        </sd-carousel-item>
      </sd-carousel>
    </div>
  </div>
</template>

<style scoped>
  .components-showcase {
    min-width: 0;
  }

  .components-showcase__track {
    display: flex;
    gap: 1rem;
    max-width: min-content;
    padding-bottom: 0.5rem;
    overflow-x: auto;
    scrollbar-width: thin;
    margin-inline: auto;
  }

  .components-showcase__mobile {
    display: none;
  }

  .components-showcase__slide {
    padding: 0 0.5rem 1rem;
  }

  .components-showcase__rate-panel {
    display: grid;
    gap: 0.75rem;
    width: 100%;
  }

  .components-showcase__rate-title {
    margin: 0;
    color: var(--sl-color-text);
    font-weight: 600;
    font-size: 0.95rem;
  }

  .components-showcase__rate-desc {
    margin: 0;
    color: var(--sl-text-3);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .components-showcase__rate-label {
    color: var(--sl-text-2);
    font-size: 0.88rem;
  }
</style>
