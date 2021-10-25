<template>
  <Typography>
    <RadioGroup v-model="heading">
      <Radio :key="1" :value="1">h1</Radio>
      <Radio :key="2" :value="2">h2</Radio>
      <Radio :key="3" :value="3">h3</Radio>
      <Radio :key="4" :value="4">h4</Radio>
      <Radio :key="5" :value="5">h5</Radio>
      <Radio :key="6" :value="6">h6</Radio>
    </RadioGroup>
    <br />
    <Checkbox v-model="bold">bold</Checkbox>
    <br />
    <Checkbox v-model="mark">mark</Checkbox>
    <br />

    <TypographyTitle :heading="heading" :bold="bold" :mark="mark">
      Typography Title {{ heading }}
    </TypographyTitle>
    <TypographyParagraph :bold="bold" :mark="mark">
      Typography Paragraph {{ heading }}
    </TypographyParagraph>
    <TypographyText :ellipsis="{ expandable: true }" :bold="bold" :mark="mark">
      <template #expand-node="{ expanded }">
        {{ expanded ? 'expanded' : 'collapsed' }}
      </template>
      {{ heading }}
      Typography Text Typography Text Typography Text Typography Text Typography
      Text Typography Text Typography Text Typography Text Typography Text
      Typography Text Typography Text Typography Text Typography Text Typography
      Text Typography Text Typography Text Typography Text Typography Text
      Typography Text Typography Text Typography Text Typography Text Typography
      Text Typography Text Typography Text Typography Text Typography Text
      Typography Text Typography Text Typography Text Typography Text Typography
      Text Typography Text Typography Text Typography Text Typography Text
      Typography Text Typography Text Typography Text Typography Text Typography
      Text Typography Text Typography Text Typography Text Typography Text
      Typography Text Typography Text Typography Text Typography Text Typography
      Text
    </TypographyText>
    <TypographyText :ellipsis="{ showTooltip: true }" :bold="bold" :mark="mark">
      Tooltip Tooltip Tooltip Tooltip Typography Text Tooltip Tooltip Tooltip
      Tooltip Tooltip Tooltip Tooltip Tooltip Typography Text Tooltip Tooltip
      Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Typography Text Tooltip
      Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Typography Text
      Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Typography
      Text Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip
      Typography Text
    </TypographyText>
    <br />
    <TypographyText copyable>copy me</TypographyText>
    <br />
    <TypographyText editable>edit me</TypographyText>
    <br />
    <TypographyText copyable>
      <template #copy-tooltip="{ copied }">
        {{ copied ? '我已经被复制啦' : '快来复制我吧' }}
      </template>
      <template #copy-icon="{ copied }">
        {{ copied ? '已复制' : '复制' }}
      </template>
      copy me
    </TypographyText>
    <br />
    <TypographyText editable>edit me</TypographyText>
  </Typography>
</template>
<script>
import { Typography, Radio, Checkbox } from '@web-vue/components';

export default {
  components: {
    Typography,
    TypographyTitle: Typography.Title,
    TypographyText: Typography.Text,
    TypographyParagraph: Typography.Paragraph,
    RadioGroup: Radio.Group,
    Radio,
    Checkbox,
  },
  data() {
    return {
      heading: 1,
      bold: false,
      mark: false,
    };
  },
};
</script>
