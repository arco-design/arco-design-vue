```yaml
title:
  zh-CN: 弹出位置
  en-US: Popup Position
```

## zh-CN

`Popover`支持 12 个不同的方位。分别为：`上左` `上` `上右` `下左` `下` `下右` `左上` `左` `左下` `右上` `右` `右下`。

---

## en-US

`Popover` supports 12 different positions. They are: `upper left` `upper` `upper right` `lower left` `down` `lower right` `upper left` `left` `lower left` `upper right` `right` `lower right`.

---

```vue
<template>
  <div :style="{position: 'relative', width: '440px', height: '280px'}">
    <a-popover position="tl">
      <a-button class="button" :style="{position: 'absolute',top:'0',left:'70px'}">TL</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="top">
      <a-button class="button" :style="{position: 'absolute',top:'0',left:'180px'}">TOP</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="tr">
      <a-button class="button" :style="{position: 'absolute',top:'0',left:'290px'}">TR</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="bl">
      <a-button class="button" :style="{position: 'absolute',top:'240px',left:'70px'}">BL</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="bottom">
      <a-button class="button" :style="{position: 'absolute',top:'240px',left:'180px'}">BOTTOM</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="br">
      <a-button class="button" :style="{position: 'absolute',top:'240px',left:'290px'}">BR</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="lt">
      <a-button class="button" :style="{position: 'absolute',top:'60px',left:'10px'}">LT</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="left">
      <a-button class="button" :style="{position: 'absolute',top:'120px',left:'10px'}">LEFT</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="lb">
      <a-button class="button" :style="{position: 'absolute',top:'180px',left:'10px'}">LB</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="rt">
      <a-button class="button" :style="{position: 'absolute',top:'60px',left:'350px'}">RT</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="right">
      <a-button class="button" :style="{position: 'absolute',top:'120px',left:'350px'}">RIGHT</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover position="rb">
      <a-button class="button" :style="{position: 'absolute',top:'180px',left:'350px'}">RB</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
  </div>
</template>

<style scoped lang="less">
.button{
  width: 100px;
}
</style>
```
