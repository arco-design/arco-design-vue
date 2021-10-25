```yaml
title:
  zh-CN: 弹出位置
  en-US: Popup Position
```


## zh-CN

`popconfirm` 支持 12 个不同的方位。分别为：`上左` `上` `上右` `下左` `下` `下右` `左上` `左` `左下` `右上` `右` `右下`。

---

## en-US

`popconfirm` supports 12 different positions. They are: `upper left` `upper` `upper right` `lower left` `down` `lower right` `upper left` `left` `lower left` `upper right` `right` `lower right`.

---

```vue
<template>
  <div :style="{position: 'relative', width: '440px', height: '280px'}">
    <a-popconfirm content="This is a Popconfirm" position="tl">
      <a-button class="button" :style="{position: 'absolute',top:'0',left:'70px'}">TL</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="top">
      <a-button class="button" :style="{position: 'absolute',top:'0',left:'180px'}">TOP</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="tr">
      <a-button class="button" :style="{position: 'absolute',top:'0',left:'290px'}">TR</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="bl">
      <a-button class="button" :style="{position: 'absolute',top:'240px',left:'70px'}">BL</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="bottom">
      <a-button class="button" :style="{position: 'absolute',top:'240px',left:'180px'}">BOTTOM</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="br">
      <a-button class="button" :style="{position: 'absolute',top:'240px',left:'290px'}">BR</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="lt">
      <a-button class="button" :style="{position: 'absolute',top:'60px',left:'10px'}">LT</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="left">
      <a-button class="button" :style="{position: 'absolute',top:'120px',left:'10px'}">LEFT</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="lb">
      <a-button class="button" :style="{position: 'absolute',top:'180px',left:'10px'}">LB</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="rt">
      <a-button class="button" :style="{position: 'absolute',top:'60px',left:'350px'}">RT</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="right">
      <a-button class="button" :style="{position: 'absolute',top:'120px',left:'350px'}">RIGHT</a-button>
    </a-popconfirm>
    <a-popconfirm content="This is a Popconfirm" position="rb">
      <a-button class="button" :style="{position: 'absolute',top:'180px',left:'350px'}">RB</a-button>
    </a-popconfirm>
  </div>
</template>

<style scoped lang="less">
.button{
  width: 100px;
}
</style>
```
