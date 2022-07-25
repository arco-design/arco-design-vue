```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

水印作为容器，直接插入内容。

---

## en-US

The watermark acts as a container to insert content directly.

---

```vue
<template>
  <a-water-mark content="Arco Design">
    <a-typography :style="{ marginTop: '-40px' }">
      <a-typography-title>ArcoDesign</a-typography-title>
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
  </a-water-mark>
</template>
```
