<template>
  <sd-json-form v-model="formState" :adapter="A2UI_0_8" :schemas="schemas" />

  <sd-space wrap>
    <sd-tag color="blue">{{ formState.booking.name || '未填写姓名' }}</sd-tag>
    <sd-tag color="green">{{ formState.booking.time || '未选择时间' }}</sd-tag>
  </sd-space>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import { A2UI_0_8, type JsonFormA2UI_0_8ComponentNode } from '@sdata/web-vue';

  const formState = ref({
    booking: {
      name: '',
      advanced: false,
      contactType: 'email',
      email: '',
      phone: '',
      wechat: '',
      time: '',
    },
  });

  const schemas = computed<JsonFormA2UI_0_8ComponentNode[]>(() => {
    const isAdvanced = formState.value.booking.advanced;
    const contactType = formState.value.booking.contactType;

    return [
      {
        id: 'booking-name',
        component: {
          TextField: {
            label: {
              literalString: '预约人',
            },
            text: {
              path: '/booking/name',
            },
          },
        },
      },
      {
        id: 'booking-advanced',
        component: {
          CheckBox: {
            label: {
              literalString: '启用高级配置',
            },
            value: {
              path: '/booking/advanced',
            },
          },
        },
      },
      {
        id: 'booking-time',
        component: {
          DateTimeInput: {
            label: {
              literalString: '预约时间',
            },
            value: {
              path: '/booking/time',
            },
            enableDate: true,
            enableTime: true,
            disabled: !isAdvanced,
          },
        },
      },
      ...(isAdvanced
        ? [
            {
              id: 'booking-contact-type',
              component: {
                ChoicePicker: {
                  label: {
                    literalString: '通知方式',
                  },
                  selections: {
                    path: '/booking/contactType',
                  },
                  options: [
                    { label: { literalString: '邮件' }, value: 'email' },
                    { label: { literalString: '短信' }, value: 'sms' },
                    { label: { literalString: '企业微信' }, value: 'wechat' },
                  ],
                  maxAllowedSelections: 1,
                },
              },
            },
            ...(contactType === 'email'
              ? [
                  {
                    id: 'booking-email',
                    component: {
                      TextField: {
                        label: {
                          literalString: '邮箱地址',
                        },
                        text: {
                          path: '/booking/email',
                        },
                        placeholder: {
                          literalString: '例如：demo@example.com',
                        },
                      },
                    },
                  },
                ]
              : []),
            ...(contactType === 'sms'
              ? [
                  {
                    id: 'booking-phone',
                    component: {
                      TextField: {
                        label: {
                          literalString: '手机号码',
                        },
                        text: {
                          path: '/booking/phone',
                        },
                        placeholder: {
                          literalString: '例如：13800000000',
                        },
                      },
                    },
                  },
                ]
              : []),
            ...(contactType === 'wechat'
              ? [
                  {
                    id: 'booking-wechat',
                    component: {
                      TextField: {
                        label: {
                          literalString: '企业微信账号',
                        },
                        text: {
                          path: '/booking/wechat',
                        },
                        placeholder: {
                          literalString: '例如：zhangsan',
                        },
                      },
                    },
                  },
                ]
              : []),
          ]
        : []),
    ];
  });
</script>

<style scoped>
  :deep(.sd-space) {
    margin-top: 16px;
  }
</style>
