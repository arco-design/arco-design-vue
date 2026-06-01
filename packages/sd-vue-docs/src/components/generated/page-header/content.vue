<template>
  <div class="sd:p-7" :style="{ backgroundColor: `var(${getCssVarToken('--color-fill-2')})` }">
    <sd-page-header
      :style="{ backgroundColor: `var(${getCssVarToken('--color-bg-2')})` }"
      title="SD Design"
    >
      <template #breadcrumb>
        <sd-breadcrumb>
          <sd-breadcrumb-item>Home</sd-breadcrumb-item>
          <sd-breadcrumb-item>Channel</sd-breadcrumb-item>
          <sd-breadcrumb-item>News</sd-breadcrumb-item>
        </sd-breadcrumb>
      </template>
      <template #subtitle>
        <sd-space>
          <span>SD Design Vue</span>
          <sd-tag color="red" size="small">Default</sd-tag>
        </sd-space>
      </template>
      <template #extra>
        <sd-space>
          <sd-button>Cancel</sd-button>
          <sd-button type="primary">Save</sd-button>
        </sd-space>
      </template>
      <p> For other uses, see Design </p>
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
    </sd-page-header>
  </div>
</template>

<script setup>
  import { getCssVarToken } from '@sdata/web-vue';
</script>
