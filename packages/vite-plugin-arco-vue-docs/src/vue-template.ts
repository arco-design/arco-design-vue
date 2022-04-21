/**
 * 获取Main组件的Vue代码
 */
import { I18nData } from './interface';
import { getTemplateString } from './utils';

export const getMainVue = ({
  html,
  imports,
  components,
  data,
}: {
  html: string;
  imports: string[];
  components: string[];
  data: Record<string, any>;
}) => `<template>
  <arco-article v-bind="data" :changelog="changelog">
    ${html}
  </arco-article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
${imports.join('\n')};

export default defineComponent({
  name: 'ArcoMain',
  components: { ${components.join(',')} },
  setup() {
    const { locale } = useI18n();
    const data = ${JSON.stringify(data)};
    const getMessage = (zh, en) => {
      return locale.value === 'zh-CN' ? zh : en;
    };
    const changelog = typeof _changelog === 'undefined' ? undefined : _changelog;

    return {
      locale,
      data,
      changelog,
      getMessage
    };
  }
});
</script>
`;

export const getDemoVue = ({
  id,
  virtualPath,
  title,
  description,
  code,
}: {
  id: string;
  virtualPath: string;
  title: I18nData;
  description: I18nData;
  code: string;
}) => `<template>
  <code-block id="${id}" :title="getMessage(${getTemplateString(
  title['zh-CN']
)}, ${getTemplateString(title['en-US'])})">
    <template v-if="locale === 'zh-CN'" #description>
      ${description['zh-CN'] ?? ''}
    </template>
    <template v-else #description>
      ${description['en-US'] ?? ''}
    </template>
    <cell-demo>
      <virtual-demo />
    </cell-demo>
    <cell-code>
      ${code}
    </cell-code>
  </code-block>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import VirtualDemo from '${virtualPath}';

export default defineComponent({
  name: 'ArcoDemo',
  components: { VirtualDemo },
  setup() {
    const { locale } = useI18n();
    const getMessage = (zh, en) => {
      return locale.value === 'zh-CN' ? zh : en;
    };

    return {
      locale,
      getMessage
    };
  }
});
</script>
`;
