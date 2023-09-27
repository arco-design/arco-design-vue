<template>
  <footer class="arco-site-footer">
    <div class="arco-site-footer-main">
      <div class="arco-site-footer-content">
        <div class="arco-site-footer-logo">
          <logo />
        </div>
        <div class="arco-site-relevant">
          <div
            v-for="(group, index) of relevant"
            :key="index"
            class="arco-site-relevant-group"
          >
            <div class="arco-site-relevant-title">
              {{ t(`footer.${group.title}`) }}
              <icon-down />
            </div>
            <ul class="arco-site-relevant-list">
              <li
                v-for="(item, itemIndex) of group.list"
                :key="itemIndex"
                class="arco-site-relevant-item"
              >
                <a v-if="item.link" :href="item.link">
                  {{ t(`footer.${item.text}`) }}
                </a>
                <span v-else @click="toBeOpen">
                  {{ t(`footer.${item.text}`) }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="arco-site-footer-bottom">
        <div class="arco-site-footer-bottom-left">
          <a class="arco-site-footer-btn" href="/">
            <span class="arco-site-footer-icon">
              <span class="arco-site-footer-icon-gray">
                <icon-arco />
              </span>
              <span class="arco-site-footer-icon-color">
                <icon-arco-color />
              </span>
            </span>
            Powered by ArcoDesign
          </a>
          <div class="arco-site-footer-copyright">
            <span>UED-火山引擎 & 架构前端 </span>
            <span>ⓒ Copyright ByteDance 2019-{{ latestYear }}</span>
          </div>
        </div>
        <div class="arco-site-footer-bottom-right">
          <a target="_blank" rel="noreferrer" href="https://beian.miit.gov.cn/">
            京ICP备19059916号-18
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message } from '@web-vue/components/index';
import joinChat from '../../utils/join-chart';
import IconArco from '../../assets/footer/arco.svg';
import IconArcoColor from '../../assets/footer/arco-color.svg';
import Logo from '../logo/index.vue';

export default defineComponent({
  name: 'ArcoFooter',
  components: {
    IconArco,
    IconArcoColor,
    Logo,
  },
  setup() {
    const { t } = useI18n();

    const relevant = [
      {
        title: 'design',
        list: [
          {
            text: 'spec',
            link: '/docs/spec/introduce',
          },
          {
            text: 'principle',
            link: '/docs/spec/philosophy',
          },
        ],
      },
      {
        title: 'component',
        list: [
          // {
          //   text: 'overview',
          //   link: '/vue/components/overview',
          // },
          {
            text: 'start',
            link: '/vue/docs/start',
          },
          {
            text: 'changelog',
            link: '/vue/docs/changelog',
          },
        ],
      },
      {
        title: 'ecosystem',
        list: [
          {
            text: 'designLab',
            link: '/themes/stores',
          },
          {
            text: 'material',
            link: '/material',
          },
          {
            text: 'pro',
            link: '/pro',
          },
        ],
      },
      {
        title: 'resource',
        list: [
          {
            text: 'componentFigma',
            link: 'https://www.figma.com/file/M66cTiLXHa4SVyZIlfY5Pb/arco-Design-System?node-id=7945%3A44563',
          },
          {
            text: 'iconFigma',
            link: 'https://www.figma.com/file/1ohmb16op4ogbI09ojLR5W/Arco-Design-IconsFigma',
          },
        ],
      },
      // {
      //   title: 'about',
      //   list: [
      //     {
      //       text: 'dashboard',
      //       link: '/dashboard',
      //     },
      //   ],
      // },
    ];

    const toBeOpen = () => {
      Message.info('Opening soon');
    };

    const latestYear = new Date().getFullYear();

    return {
      t,
      relevant,
      toBeOpen,
      joinChat,
      latestYear,
    };
  },
});
</script>

<style lang="less" src="./style.less" />
