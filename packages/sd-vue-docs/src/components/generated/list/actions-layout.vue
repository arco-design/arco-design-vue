<template>
  <sd-list
    class="list-demo-action-layout"
    :bordered="false"
    :data="dataSource"
    :pagination-props="paginationProps"
  >
    <template #item="{ item }">
      <sd-list-item class="list-demo-item" action-layout="vertical">
        <template #actions>
          <span><icon-heart />83</span>
          <span><icon-star />{{ item.index }}</span>
          <span><icon-message />Reply</span>
        </template>
        <template #extra>
          <div className="image-area">
            <img alt="sd-design" :src="item.imageSrc" />
          </div>
        </template>
        <sd-list-item-meta :title="item.title" :description="item.description">
          <template #avatar>
            <sd-avatar shape="square">
              <img alt="avatar" :src="item.avatar" />
            </sd-avatar>
          </template>
        </sd-list-item-meta>
      </sd-list-item>
    </template>
  </sd-list>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const names = ['Socrates', 'Balzac', 'Plato'];
  const avatarSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const dataSource = Array.from({ length: 15 }, (_, index) => {
    return {
      index: index,
      avatar: avatarSrc[index % avatarSrc.length],
      title: names[index % names.length],
      description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
      imageSrc: imageSrc[index % imageSrc.length],
    };
  });

  const paginationProps = reactive({
    defaultPageSize: 3,
    total: dataSource.length,
  });
</script>

<style scoped>
  .list-demo-action-layout .image-area {
    width: 183px;
    height: 119px;
    overflow: hidden;
    border-radius: 2px;
  }

  .list-demo-action-layout .list-demo-item {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-fill-3);
  }

  .list-demo-action-layout .image-area img {
    width: 100%;
  }

  .list-demo-action-layout .sd-list-item-action .sd-icon {
    margin: 0 4px;
  }
</style>
