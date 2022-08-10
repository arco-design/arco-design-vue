```yaml
meta:
  type: Component
  category: Navigation
title: Breadcrumb
description: Breadcrumb is an auxiliary navigation mode used to identify the position of the page within the hierarchy and return upwards as needed.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/separator.md

@import ./__demo__/size.md

@import ./__demo__/icon.md

@import ./__demo__/routes.md

@import ./__demo__/dropdown.md

@import ./__demo__/ellipsis.md

## API


### `<breadcrumb>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|max-count|Maximum number of breadcrumbs displayed (0 means no limit)|`number`|`0`|
|routes|Set routes|`BreadcrumbRoute[]`|`-`|
|separator|Delimiter text|`string\|number`|`-`|
### `<breadcrumb>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|more-icon|Custom more icon|-|
|item-render|Effective when setting routes, custom render breadcrumbs|route: `BreadcrumbRoute`<br>routes: `BreadcrumbRoute[]`<br>paths: `string[]`|
|separator|Custom separator|-|




### `<breadcrumb-item>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|separator|Delimiter text|`string\|number`|`-`|
|droplist|Delimiter text|`BreadcrumbRoute['children']`|`-`|
|dropdown-props|Dropdown props|`object`|`-`|
### `<breadcrumb-item>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|droplist|Custom droplist|-|
|separator|Custom separator|-|




### BreadcrumbRoute

|Name|Description|Type|Default|
|---|---|---|:---:|
|path|Jump path (`a` tag `href` value)|`string`|`-`|
|breadcrumbName|Breadcrumb name|`string`|`-`|
|children|Dropdown menu items|`{    path: string;    breadcrumbName: string;  }[]`|`-`|



## Tips


The custom slot with the same name takes precedence over the attribute.
