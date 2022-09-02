export interface BreadcrumbRoute {
  /**
   * @zh 面包屑名称
   * @en Breadcrumb name
   */
  label: string;
  /**
   * @zh 跳转路径 (`a`标签的`href`)
   * @en Jump path (`a` tag `href` value)
   */
  path: string;
  /**
   * @zh 下拉菜单展示项
   * @en Dropdown menu items
   */
  children?: {
    label: string;
    path: string;
  }[];
}
