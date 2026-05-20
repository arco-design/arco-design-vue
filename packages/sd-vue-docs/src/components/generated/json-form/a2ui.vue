<template>
  <sd-json-form v-model="formState" :adapter="A2UI_0_8" :schemas="schemas" />

  <sd-space wrap>
    <sd-tag color="blue">{{ formState.booking.name || '未填写姓名' }}</sd-tag>
    <sd-tag color="green">{{ formState.booking.time || '未选择时间' }}</sd-tag>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { A2UI_0_8, type JsonFormA2UI_0_8ComponentNode } from '@sdata/web-vue';

  const formState = ref({
    booking: {
      name: '',
      channel: [],
      time: '',
    },
  });

  const schemas: JsonFormA2UI_0_8ComponentNode[] = [
    {
      id: 'booking-row',
      component: {
        Row: {
          children: {
            explicitList: ['booking-name', 'booking-time'],
          },
        },
      },
    },
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
        },
      },
    },
    {
      id: 'booking-channel',
      component: {
        MultipleChoice: {
          label: {
            literalString: '通知渠道',
          },
          selections: {
            path: '/booking/channel',
          },
          options: [
            { label: { literalString: '短信' }, value: 'sms' },
            { label: { literalString: '邮件' }, value: 'email' },
            { label: { literalString: '电话' }, value: 'phone' },
          ],
          maxAllowedSelections: 3,
        },
      },
    },
  ];
</script>

<style scoped>
  :deep(.sd-space) {
    margin-top: 16px;
  }
</style>
