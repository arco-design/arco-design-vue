<template>
  <sd-textarea
    default-value="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea."
    auto-size
  />
  <sd-textarea
    default-value="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea."
    :auto-size="{
      minRows: 2,
      maxRows: 5,
    }"
    class="sd:mt-5"
  />
</template>
