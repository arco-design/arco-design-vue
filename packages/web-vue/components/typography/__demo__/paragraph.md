```yaml
title:
  zh-CN: 段落
  en-US: Paragraph
```

## zh-CN

文本段落样式。

---

## en-US

Paragraph style.

---

```vue
<template>
  <a-typography>
    <a-typography-title :heading="5">Default</a-typography-title>
    <a-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </a-typography-paragraph>
    <a-typography-title :heading="5">Secondary</a-typography-title>
    <a-typography-paragraph type="secondary">
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </a-typography-paragraph>
    <a-typography-title :heading="5">Spacing default</a-typography-title>
    <a-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </a-typography-paragraph>
    <a-typography-title :heading="5">Spacing close</a-typography-title>
    <a-typography-paragraph type="secondary" spacing="close">
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.
    </a-typography-paragraph>
  </a-typography>
</template>
```
