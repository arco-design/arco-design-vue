<template>
  <div
    id="image-demo-preview-popup-container"
    class="sd:relative sd:h-100 sd:w-full sd:overflow-hidden sd:bg-(--color-fill-2) sd:text-center sd:leading-100"
  >
    <sd-image
      width="200"
      src="https://picsum.photos/1000/1000"
      :preview-props="{
        popupContainer: '#image-demo-preview-popup-container',
        closable: false,
      }"
    />
  </div>
</template>
