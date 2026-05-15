<template>
  <div
    id="image-demo-preview-popup-container"
    class="sd:relative sd:h-100 sd:w-full sd:overflow-hidden sd:bg-(--color-fill-2) sd:text-center sd:leading-100"
  >
    <sd-image
      width="200"
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      :preview-props="{
        popupContainer: '#image-demo-preview-popup-container',
        closable: false,
      }"
    />
  </div>
</template>
