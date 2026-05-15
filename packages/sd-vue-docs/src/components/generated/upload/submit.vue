<template>
  <div>
    <sd-upload action="/" :auto-upload="false" ref="uploadRef" @change="onChange" multiple>
      <template #upload-button>
        <sd-space>
          <sd-button> select file</sd-button>
          <sd-button type="primary" @click="submit"> start upload</sd-button>
          <sd-button type="primary" @click="submitOne"> only upload one </sd-button>
        </sd-space>
      </template>
    </sd-upload>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const uploadRef = ref();
  const files = ref([]);

  const submitOne = (e) => {
    e.stopPropagation();
    console.log(files.value);
    uploadRef.value.submit(files.value.find((x) => x.status === 'init'));
  };

  const submit = (e) => {
    e.stopPropagation();
    uploadRef.value.submit();
  };

  const onChange = (fileList) => {
    files.value = fileList;
  };
</script>
