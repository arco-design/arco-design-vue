```yaml
meta:
  type: Arco Pro 最佳实践
title: 布局
description: 页面通用布局
```

## 布局

目前提供的布局只有一套，应用到了所有路由页面上，包含侧边菜单栏，顶部通知栏，页脚和内容区域，其中侧边栏和顶部通知栏都是 fixed 的，方便用户在滚动的过程中关注到其他视图。

![](https://tech-proxy.bytedance.net/tos/images/1641466112408_333f8650461ca4d0b4335a690f6b9dcf)

此外，响应式的侧边栏会在窗口宽度小于 `1200px` 的时候，自动收缩如下：

![](https://tech-proxy.bytedance.net/tos/images/1641466111807_6637633aba239dedd237782d5ee06cc8)
