import { RouteType } from '../../../route.type';

export function getParentItemByPath(path: string, routes: RouteType[], parent: RouteType | null = null) {
    for (let route of routes) {
        if (path === route.path) {
            return parent;
        }
        if (route.children) {
            parent = route;
            const result: RouteType | null = getParentItemByPath(path, route.children, parent);
            if (result) {
                return result;
            }
            parent = null;
        }
    }
}
