<template>
  <sd-affix :offsetTop="80">
    <sd-anchor class="sd:bg-(--color-bg-1)">
      <sd-anchor-link href="#basic">Basic</sd-anchor-link>
      <sd-anchor-link href="#line-less">LineLess Mode</sd-anchor-link>
      <sd-anchor-link href="#affix">
        Affix
        <template #sublist>
          <sd-anchor-link href="#boundary">Scroll Boundary</sd-anchor-link>
          <sd-anchor-link href="#hash">Hash mode</sd-anchor-link>
        </template>
      </sd-anchor-link>
    </sd-anchor>
  </sd-affix>
</template>
