import {routes} from '../../routes';

export enum RouteKeys {
    DEFAULT = 'default',
}

export const modules: any = {
    [RouteKeys.DEFAULT]: {
        key: RouteKeys.DEFAULT,
        routes: routes,
        name: 'Default'
    }
}
