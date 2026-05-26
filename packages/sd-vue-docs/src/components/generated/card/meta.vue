<template>
  <sd-card hoverable class="sd:w-90">
    <template #cover>
      <div class="sd:h-51 sd:overflow-hidden">
        <img
          class="sd:w-full sd:-translate-y-5"
          alt="dessert"
          src="https://picsum.photos/1260/840"
        />
      </div>
    </template>
    <sd-card-meta title="Card Title">
      <template #description>
        Card content <br />
        Card content
      </template>
    </sd-card-meta>
  </sd-card>
</template>
