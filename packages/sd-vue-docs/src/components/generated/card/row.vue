<template>
  <div class="sd:box-border sd:w-full sd:p-10 sd:bg-(--color-fill-2)">
    <sd-row :gutter="20" class="sd:mb-5">
      <sd-col :span="8">
        <sd-card title="SD Card" :bordered="false" class="sd:w-full">
          <template #extra>
            <sd-link>More</sd-link>
          </template>
          Card content
        </sd-card>
      </sd-col>
      <sd-col :span="8">
        <sd-card title="SD Card" :bordered="false" class="sd:w-full">
          <template #extra>
            <sd-link>More</sd-link>
          </template>
          Card content
        </sd-card>
      </sd-col>
      <sd-col :span="8">
        <sd-card title="SD Card" :bordered="false" class="sd:w-full">
          <template #extra>
            <sd-link>More</sd-link>
          </template>
          Card content
        </sd-card>
      </sd-col>
    </sd-row>
    <sd-row :gutter="20">
      <sd-col :span="16">
        <sd-card title="SD Card" :bordered="false" class="sd:w-full">
          <template #extra>
            <sd-link>More</sd-link>
          </template>
          Card content
        </sd-card>
      </sd-col>
      <sd-col :span="8">
        <sd-card title="SD Card" :bordered="false" class="sd:w-full">
          <template #extra>
            <sd-link>More</sd-link>
          </template>
          Card content
        </sd-card>
      </sd-col>
    </sd-row>
  </div>
</template>
