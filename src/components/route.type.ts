export type RouteType = {
    name: string,
    path: string,
    role: string,
    component: Function,
    isInMenu: boolean,
    icon?: Function,
    breadcrumb?: Function,
    layout?: Function,
    sider?: Function,
    exact?: boolean,
    isHome?: boolean,
    isPrivate?: boolean,
    children: RouteType[]
};
