export const docsSidebar = [
  {
    label: '开始使用',
    items: [
      {
        slug: 'index',
        label: '总览',
      },
      {
        slug: 'guides/dark',
        label: '暗黑模式',
      },
      {
        slug: 'guides/faq',
        label: '常见问题',
      },
      {
        slug: 'guides/start',
        label: '快速上手',
      },
      {
        slug: 'guides/theme',
        label: '定制主题',
      },
      {
        slug: 'guides/tailwind',
        label: 'Tailwind 搭配使用',
      },
      {
        slug: 'guides/theme-editor',
        label: '主题编辑器',
      },
      {
        label: '迁移文档',
        items: [
          {
            slug: 'guides/style-migration',
            label: '样式迁移手册',
          },
          {
            slug: 'guides/naive-ui-migration',
            label: 'Naive UI 迁移',
          },
        ],
      },
    ],
  },
  {
    label: 'AI 工具',
    items: [
      {
        slug: 'llms_txt',
        label: 'LLMs.txt',
      },
    ],
  },
  {
    label: '组件文档',
    items: [
      {
        slug: 'components',
        label: '组件总览',
      },
      {
        label: '通用',
        items: [
          {
            slug: 'components/button',
            label: '按钮 Button',
          },
          {
            slug: 'components/config-provider',
            label: '全局配置 ConfigProvider',
          },
          {
            slug: 'components/copy',
            label: '复制 Copy',
          },
          {
            slug: 'components/secret',
            label: '敏感信息 Secret',
          },
          {
            slug: 'components/theme-provider',
            label: '主题容器 ThemeProvider',
          },
          {
            slug: 'components/ellipsis',
            label: '文本省略 Ellipsis',
          },
          {
            slug: 'components/link',
            label: '链接 Link',
          },
          {
            slug: 'components/typography',
            label: '排版 Typography',
          },
        ],
      },
      {
        label: '布局',
        items: [
          {
            slug: 'components/divider',
            label: '分割线 Divider',
          },
          {
            slug: 'components/grid',
            label: '栅格 Grid',
          },
          {
            slug: 'components/layout',
            label: '布局 Layout',
          },
          {
            slug: 'components/space',
            label: '间距 Space',
          },
        ],
      },
      {
        label: '导航',
        items: [
          {
            slug: 'components/breadcrumb',
            label: '面包屑 Breadcrumb',
          },
          {
            slug: 'components/dropdown',
            label: '下拉菜单 Dropdown',
          },
          {
            slug: 'components/menu',
            label: '菜单 Menu',
          },
          {
            slug: 'components/page-header',
            label: '页头 PageHeader',
          },
          {
            slug: 'components/pagination',
            label: '分页 Pagination',
          },
          {
            slug: 'components/steps',
            label: '步骤条 Steps',
          },
        ],
      },
      {
        label: '数据展示',
        items: [
          {
            slug: 'components/avatar',
            label: '头像 Avatar',
          },
          {
            slug: 'components/badge',
            label: '徽标数 Badge',
          },
          {
            slug: 'components/calendar',
            label: '日历 Calendar',
          },
          {
            slug: 'components/card',
            label: '卡片 Card',
          },
          {
            slug: 'components/carousel',
            label: '图片轮播 Carousel',
          },
          {
            slug: 'components/collapse',
            label: '折叠面板 Collapse',
          },
          {
            slug: 'components/comment',
            label: '评论 Comment',
          },
          {
            slug: 'components/descriptions',
            label: '描述列表 Descriptions',
          },
          {
            slug: 'components/empty',
            label: '空状态 Empty',
          },
          {
            slug: 'components/image',
            label: '图片 Image',
          },
          {
            slug: 'components/cropper',
            label: '图片裁剪 Cropper',
          },
          {
            slug: 'components/list',
            label: '列表 List',
          },
          {
            slug: 'components/popover',
            label: '气泡卡片 Popover',
          },
          {
            slug: 'components/qr-code',
            label: '二维码 QrCode',
          },
          {
            slug: 'components/statistic',
            label: '数值显示 Statistic',
          },
          {
            slug: 'components/table',
            label: '表格 Table',
          },
          {
            slug: 'components/tabs',
            label: '标签页 Tabs',
          },
          {
            slug: 'components/tag',
            label: '标签 Tag',
          },
          {
            slug: 'components/tag-group',
            label: '标签组 TagGroup',
          },
          {
            slug: 'components/timeline',
            label: '时间轴 Timeline',
          },
          {
            slug: 'components/tooltip',
            label: '文字气泡 Tooltip',
          },
          {
            slug: 'components/tree',
            label: '树 Tree',
          },
        ],
      },
      {
        label: '反馈',
        items: [
          {
            slug: 'components/alert',
            label: '警告提示 Alert',
          },
          {
            slug: 'components/drawer',
            label: '抽屉 Drawer',
          },
          {
            slug: 'components/message',
            label: '全局提示 Message',
          },
          {
            slug: 'components/modal',
            label: 'Modal 对话框',
          },
          {
            slug: 'components/notification',
            label: '通知提醒框 Notification',
          },
          {
            slug: 'components/popconfirm',
            label: '气泡确认框 Popconfirm',
          },
          {
            slug: 'components/progress',
            label: '进度条 Progress',
          },
          {
            slug: 'components/result',
            label: '结果页 Result',
          },
          {
            slug: 'components/skeleton',
            label: '骨架屏 Skeleton',
          },
          {
            slug: 'components/spin',
            label: '加载中 Spin',
          },
          {
            slug: 'components/tour',
            label: '漫游式引导 Tour',
          },
        ],
      },
      {
        label: '其他',
        items: [
          {
            slug: 'components/affix',
            label: '固钉 Affix',
          },
          {
            slug: 'components/anchor',
            label: '锚点 Anchor',
          },
          {
            slug: 'components/auto-complete',
            label: '自动补全 AutoComplete',
          },
          {
            slug: 'components/back-top',
            label: '返回顶部 BackTop',
          },
          {
            slug: 'components/cascader',
            label: '级联选择 Cascader',
          },
          {
            slug: 'components/checkbox',
            label: '复选框 Checkbox',
          },
          {
            slug: 'components/color-picker',
            label: '颜色选择器 ColorPicker',
          },
          {
            slug: 'components/date-picker',
            label: '日期选择器 DatePicker',
          },
          {
            slug: 'components/form',
            label: '表单 Form',
          },
          {
            slug: 'components/json-form',
            label: 'JSON 表单 JsonForm',
          },
          {
            slug: 'components/input',
            label: '输入框 Input',
          },
          {
            slug: 'components/input-number',
            label: '数字输入框 InputNumber',
          },
          {
            slug: 'components/input-tag',
            label: '标签输入框 InputTag',
          },
          {
            slug: 'components/mention',
            label: '提及 Mention',
          },
          {
            slug: 'components/overflow-list',
            label: '折叠列表 OverflowList',
          },
          {
            slug: 'components/radio',
            label: '单选框 Radio',
          },
          {
            slug: 'components/rate',
            label: '评分 Rate',
          },
          {
            slug: 'components/resize-box',
            label: '伸缩框 ResizeBox',
          },
          {
            slug: 'components/scrollbar',
            label: '滚动条 Scrollbar',
          },
          {
            slug: 'components/select',
            label: '选择器 Select',
          },
          {
            slug: 'components/slider',
            label: '滑动输入条 Slider',
          },
          {
            slug: 'components/split',
            label: '面板分割 Split',
          },
          {
            slug: 'components/switch',
            label: '开关 Switch',
          },
          {
            slug: 'components/textarea',
            label: '文本域 Textarea',
          },
          {
            slug: 'components/time-picker',
            label: '时间选择器 TimePicker',
          },
          {
            slug: 'components/transfer',
            label: '数据穿梭框 Transfer',
          },
          {
            slug: 'components/tree-select',
            label: '树选择 TreeSelect',
          },
          {
            slug: 'components/trigger',
            label: '触发器 Trigger',
          },
          {
            slug: 'components/upload',
            label: '上传 Upload',
          },
          {
            slug: 'components/verification-code',
            label: '验证码输入 VerificationCode',
          },
          {
            slug: 'components/watermark',
            label: '水印 Watermark',
          },
        ],
      },
    ],
  },
];
