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

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|max-count|Maximum number of breadcrumbs displayed (0 means no limit)|`number`|`0`||
|routes|Set routes|`BreadcrumbRoute[]`|`-`|2.36.0|
|separator|Delimiter text|`string\|number`|`-`|2.36.0|
|custom-url|Custom link address|`(paths: string[]) => string`|`-`|2.36.0|
### `<breadcrumb>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|more-icon|Custom more icon|-|2.36.0|
|item-render|Effective when setting routes, custom render breadcrumbs|route: `BreadcrumbRoute`<br>routes: `BreadcrumbRoute[]`<br>paths: `string[]`|2.36.0|
|separator|Custom separator|-||




### `<breadcrumb-item>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|separator|Delimiter text|`string\|number`|`-`|2.36.0|
|droplist|Dropdown content|`BreadcrumbRoute['children']`|`-`|2.36.0|
|dropdown-props|Dropdown props|`DropDownProps`|`-`|2.36.0|
### `<breadcrumb-item>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|droplist|Custom droplist|-|2.36.0|
|separator|Custom separator|-|2.36.0|




### BreadcrumbRoute

|Name|Description|Type|Default|
|---|---|---|:---:|
|label|Breadcrumb name|`string`|`-`|
|path|Jump path (`a` tag `href` value)|`string`|`-`|
|children|Dropdown menu items|`{    label: string;    path: string;  }[]`|`-`|



## Tips


The custom slot with the same name takes precedence over the attribute.
