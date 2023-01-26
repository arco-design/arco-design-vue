<template>
  <div>
    <TypographyTitle>默认</TypographyTitle>
    <Space>
      <DatePicker />
      <RangePicker />
    </Space>
    <TypographyTitle>显示确认按钮</TypographyTitle>
    <p>
      <TypographyText>show-confirm-btn = true</TypographyText>
    </p>
    <Space>
      <DatePicker show-confirm-btn />
      <RangePicker show-confirm-btn />
    </Space>
    <p>
      <TypographyText>showTime 始终显示确认按钮</TypographyText>
    </p>
    <Space>
      <DatePicker show-time :show-confirm-btn="false" />
      <RangePicker show-time :show-confirm-btn="false" />
    </Space>
    <p>
      <TypographyText>disabled-time = false</TypographyText>
    </p>
    <Space>
      <DatePicker :disabled-time='false' />
      <RangePicker :disabled-time='false' />
    </Space>
  </div>
</template>

<script>
import { DatePicker, Typography, Space } from '@web-vue/components';

export default {
  components: {
    DatePicker,
    RangePicker: DatePicker.RangePicker,
    TypographyTitle: Typography.Title,
    TypographyText: Typography.Text,
    Space,
  },
};
</script>
