import {routes} from '../../routes';

import {Header} from '../../shared/components/Header/Header';

export enum RouteKeys {
    DEFAULT = 'default',
}

export const modules: any = {
    [RouteKeys.DEFAULT]: {
        key: RouteKeys.DEFAULT,
        routes: routes,
        header: Header,
        name: 'Default'
    }
}
