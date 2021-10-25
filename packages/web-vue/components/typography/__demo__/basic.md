```yaml
title:
  zh-CN: 组合使用
  en-US: Basic
```

## zh-CN

排版组件用于展示标题、段落、文本内容，这里展示了排版的组合使用。

---

## en-US

Display headings, paragraphs, and text content.

---

```vue
<template>
  <a-typography :style="{ marginTop: '-40px' }">
    <a-typography-title>
      Design system
    </a-typography-title>
    <a-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.
    </a-typography-paragraph>
    <a-typography-paragraph>
      In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered <a-typography-text bold>to be a design activity.</a-typography-text>
    </a-typography-paragraph>
    <a-typography-title :heading="2">ArcoDesign</a-typography-title>
    <a-typography-paragraph>
      The ArcoDesign component library defines a set of default particle variables, and a custom theme is to <a-typography-text mark>customize</a-typography-text> and <a-typography-text underline>overwrite</a-typography-text> this variable list.
    </a-typography-paragraph>
    <a-typography-paragraph blockquote>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a <a-typography-text code>prototype</a-typography-text>, <a-typography-text code>product</a-typography-text> or <a-typography-text code>process</a-typography-text>. The verb to design expresses the process of developing a design.
    </a-typography-paragraph>
    <a-typography-paragraph mark underline delete>A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.</a-typography-paragraph>
    <a-typography-paragraph>
      <ul>
        <li>
          Architectural blueprints
          <ul>
            <li>Architectural blueprints</li>
          </ul>
        </li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ul>
    </a-typography-paragraph>
    <a-typography-paragraph>
      <ol>
        <li>Architectural blueprints</li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ol>
    </a-typography-paragraph>
  </a-typography>
</template>
```

