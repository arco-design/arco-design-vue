```yaml
title:
  zh-CN: 组合示例
  en-US: Content
```

## zh-CN

页头的完整示例。

---

## en-US

A complete example of the header.

---

```vue
<template>
  <a-page-header title="ArcoDesign" subtitle="ArcoDesign Vue 2.0">
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Channel</a-breadcrumb-item>
        <a-breadcrumb-item>News</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <template #extra>
      <a-radio-group type="button">
        <a-radio value="mini">Mini</a-radio>
        <a-radio value="small">Small</a-radio>
        <a-radio value="large">Large</a-radio>
      </a-radio-group>
    </template>
    <p>
      For other uses, see Design
    </p>
    <p>
      A design is a plan or specification for the construction of an object or system or for the
      implementation of an activity or process, or the result of that plan or specification in the
      form of a prototype, product or process. The verb to design expresses the process of
      developing a design. In some cases, the direct construction of an object without an explicit
      prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be
      considered to be a design activity. The design usually has to satisfy certain goals and
      constraints, may take into account aesthetic, functional, economic, or socio-political
      considerations, and is expected to interact with a certain environment. Major examples of
      designs include architectural blueprints,engineering drawings, business processes, circuit
      diagrams, and sewing patterns.Major examples of designs include architectural
      blueprints,engineering drawings, business processes, circuit diagrams, and sewing patterns.
    </p>
  </a-page-header>
</template>

<script>
export default {
}
</script>
```
