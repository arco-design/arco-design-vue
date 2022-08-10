```yaml
meta:
  type: 组件
  category: 导航
title: 面包屑 Breadcrumb
description: 面包屑是辅助导航模式，用于识别页面在层次结构内的位置，并根据需要向上返回。
```

@import ./__demo__/basic.md

@import ./__demo__/separator.md

@import ./__demo__/size.md

@import ./__demo__/icon.md

@import ./__demo__/routes.md

@import ./__demo__/dropdown.md

@import ./__demo__/ellipsis.md

## API


### `<breadcrumb>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|max-count|最多展示的面包屑数量（0表示不限制）|`number`|`0`|
|routes|直接路径|`BreadcrumbRoute[]`|`-`|
|separator|分隔符文字|`string\|number`|`-`|
### `<breadcrumb>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|more-icon|自定义更多图标|-|
|item-render|routes 设置时生效，自定义渲染面包屑|route: `BreadcrumbRoute`<br>routes: `BreadcrumbRoute[]`<br>paths: `string[]`|
|separator|自定义分隔符|-|




### `<breadcrumb-item>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|separator|分隔符文字|`string\|number`|`-`|
|droplist|分隔符文字|`BreadcrumbRoute['children']`|`-`|
|dropdown-props|下拉菜单属性|`object`|`-`|
### `<breadcrumb-item>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|droplist|自定义下拉菜单|-|
|separator|自定义分隔符|-|




### BreadcrumbRoute

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|path|跳转路径 (`a`标签的`href`)|`string`|`-`|
|breadcrumbName|面包屑名称|`string`|`-`|
|children|下拉菜单展示项|`{    path: string;    breadcrumbName: string;  }[]`|`-`|



## Tips

同名的自定义插槽优先级是高于属性的

