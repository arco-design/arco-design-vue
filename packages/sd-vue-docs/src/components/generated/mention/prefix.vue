<template>
  <sd-space direction="vertical" size="large" class="sd:w-full">
    <sd-mention :data="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="input @" />
    <sd-mention
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      prefix="#"
      placeholder="input #"
    />
    <sd-mention
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      prefix="$"
      placeholder="input $"
    />
  </sd-space>
</template>
