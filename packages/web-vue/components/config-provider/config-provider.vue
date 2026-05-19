<template>
  <ThemeProvider :theme="theme" :theme-mode="themeMode" :global="global">
    <slot />
  </ThemeProvider>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, provide, reactive, toRefs, getCurrentInstance, watch } from 'vue';

  import { VirtualListProps } from '../_components/virtual-list/interface';
  import { Size } from '../_utils/constant';
  import { SDLang } from '../locale/interface';
  import { ConfigProviderDrawer, ConfigProviderModal, configProviderInjectionKey } from './context';
  import { SDThemeConfig, SDThemeMode, normalizeTheme } from './theme';
  import ThemeProvider from './theme-provider.vue';

  export default defineComponent({
    name: 'ConfigProvider',
    props: {
      /**
       * @zh 组件类名前缀
       * @en Component classname prefix
       */
      prefixCls: {
        type: String,
        default: 'sd',
      },
      /**
       * @zh 配置语言包
       * @en Configure language pack
       */
      locale: {
        type: Object as PropType<SDLang>,
      },
      /**
       * @zh 大小
       * @en Size
       * @version 2.14.0
       */
      size: {
        type: String as PropType<Size>,
      },
      /**
       * @zh 是否默认开启清除按钮
       * @en Whether to enable clear buttons by default
       */
      allowClear: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 是否默认开启搜索
       * @en Whether to enable search by default
       */
      allowSearch: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 下拉类组件默认虚拟滚动参数，仅对 Select、AutoComplete、Cascader、TreeSelect 等下拉组件生效
       * @en Default virtual list props for dropdown-like components such as Select, AutoComplete, Cascader, and TreeSelect
       */
      virtualListProps: {
        type: Object as PropType<VirtualListProps>,
      },
      /**
       * @zh 是否全局生效
       * @en Is global effect
       * @version 2.25.0
       */
      global: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 是否在容器滚动时更新弹出框的位置
       * @us Whether to update the position of the popup when the container is scrolled
       * @version 2.25.0
       */
      updateAtScroll: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 是否在滚动时关闭弹出框
       * @en Whether to close the popover when scrolling
       * @version 2.46.0
       */
      scrollToClose: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 是否交换时间
       * @en Whether to exchange time
       * @version 2.48.0
       */
      exchangeTime: {
        type: Boolean,
        default: true,
      },
      /**
       * @zh 视图的表现形式是从右开始向左结束
       * @en View starts from the right and ends on the left
       */
      rtl: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh Modal 组件默认配置
       * @en Default config for Modal
       */
      modal: {
        type: Object as PropType<ConfigProviderModal>,
      },
      /**
       * @zh Drawer 组件默认配置
       * @en Default config for Drawer
       */
      drawer: {
        type: Object as PropType<ConfigProviderDrawer>,
      },
      /**
       * @zh 主题配置对象
       * @en Runtime theme configuration object
       */
      theme: {
        type: Object as PropType<SDThemeConfig>,
      },
      /**
       * @zh 主题模式，可局部覆盖到当前 ConfigProvider 子树
       * @en Theme mode applied to the current ConfigProvider subtree
       */
      themeMode: {
        type: String as PropType<SDThemeMode>,
      },
    },
    /**
     * @zh 自定义空状态元素
     * @en Custom empty element
     * @slot empty
     * @binding {string} component
     * @version 2.28.0
     */
    /**
     * @zh 自定义加载中元素
     * @en Custom loading element
     * @slot loading
     * @version 2.28.0
     */
    setup(props, { slots }) {
      const {
        prefixCls,
        locale,
        size,
        allowClear,
        allowSearch,
        virtualListProps,
        updateAtScroll,
        scrollToClose,
        exchangeTime,
        rtl,
        modal,
        drawer,
      } = toRefs(props);

      const config = reactive({
        slots,
        prefixCls,
        locale,
        size,
        allowClear,
        allowSearch,
        virtualListProps,
        updateAtScroll,
        scrollToClose,
        exchangeTime,
        rtl,
        modal,
        drawer,
        theme: normalizeTheme(props.theme),
      });

      watch(
        () => props.theme,
        (themeConfig) => {
          config.theme = normalizeTheme(themeConfig);
        },
        {
          immediate: true,
          deep: true,
        },
      );

      if (props.global) {
        const instance = getCurrentInstance();
        if (instance) {
          instance.appContext.app.provide(configProviderInjectionKey, config);
        }
      } else {
        provide(configProviderInjectionKey, config);
      }

      return {};
    },
    components: {
      ThemeProvider,
    },
  });
</script>
