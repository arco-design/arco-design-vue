import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';

import ConfigProvider from '../../config-provider';
import JsonForm, { A2UI_0_8 } from '../index';

describe('JsonForm', () => {
  test('renders default schema and updates nested model', async () => {
    const model = {
      user: {
        name: '',
      },
    };

    const wrapper = mount(JsonForm, {
      props: {
        modelValue: model,
        schemas: [
          {
            field: 'user.name',
            label: '用户名',
            type: 'input',
            required: true,
          },
        ],
      },
    });

    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);

    await input.setValue('Alice');

    expect(model.user.name).toBe('Alice');
  });

  test('translates a2ui schema before rendering', async () => {
    const model = {
      form: {
        name: '',
        enabled: false,
        channels: [],
      },
    };

    const wrapper = mount(JsonForm, {
      props: {
        adapter: A2UI_0_8,
        modelValue: model,
        schemas: [
          {
            id: 'form-layout',
            component: {
              Row: {
                children: {
                  explicitList: ['name-input', 'enabled-switch', 'channel-select'],
                },
              },
            },
          },
          {
            id: 'name-input',
            component: {
              TextField: {
                label: {
                  literalString: '姓名',
                },
                text: {
                  path: '/form/name',
                },
              },
            },
          },
          {
            id: 'enabled-switch',
            component: {
              Switch: {
                label: {
                  literalString: '启用',
                },
                value: {
                  path: '/form/enabled',
                },
              },
            },
          },
          {
            id: 'channel-select',
            component: {
              Select: {
                label: {
                  literalString: '渠道',
                },
                value: {
                  path: '/form/channels',
                },
                options: [
                  { label: { literalString: '短信' }, value: 'sms' },
                  { label: { literalString: '邮件' }, value: 'email' },
                ],
                multiple: true,
              },
            },
          },
        ],
      },
    });

    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);

    await input.setValue('Bob');

    expect(model.form.name).toBe('Bob');
    expect(wrapper.find('.sd-switch').exists()).toBe(true);
    expect(wrapper.find('.sd-select').exists()).toBe(true);
  });

  test('reads custom components from config provider', async () => {
    const model = {
      script: '',
    };

    const FakeCodeEditor = defineComponent({
      name: 'FakeCodeEditor',
      props: {
        modelValue: String,
        language: String,
      },
      emits: ['update:modelValue'],
      template:
        '<button class="fake-code-editor" type="button" @click="$emit(\'update:modelValue\', \'const answer = 42;\')">{{ language }} {{ modelValue }}</button>',
    });

    const wrapper = mount(
      defineComponent({
        components: {
          ConfigProvider,
          JsonForm,
        },
        setup() {
          return {
            model,
            schemas: [
              {
                field: 'script',
                label: '脚本',
                type: 'codeEditor',
                componentProps: {
                  language: 'ts',
                },
              },
            ],
            jsonForm: {
              components: {
                codeEditor: FakeCodeEditor,
              },
            },
          };
        },
        template: `
          <sd-config-provider :json-form="jsonForm">
            <sd-json-form v-model="model" :schemas="schemas" />
          </sd-config-provider>
        `,
      }),
    );

    const editor = wrapper.find('.fake-code-editor');

    expect(editor.exists()).toBe(true);
    expect(editor.text()).toContain('ts');

    await editor.trigger('click');
    await nextTick();

    expect(model.script).toBe('const answer = 42;');
  });
});
