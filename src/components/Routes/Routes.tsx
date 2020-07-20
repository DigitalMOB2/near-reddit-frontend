import {Route, Switch} from 'react-router-dom';
import React, {useCallback} from 'react';

import {useApp} from '../App/App.context';
import {RouteType} from '../route.type';

import {RouteItem} from './RouteItem';
import {PrivateRoute} from '../shared/components/PrivateRoute/PrivateRoute';
import {modules} from '../pages/modules/config';
import {useAuth} from '../pages/Main/Login/Auth.context';

export function Routes() {
    const {state} = useApp();
    const authCtx = useAuth();

    const {routes} = modules[state.loadedModuleKey];

    const getCustomerType = useCallback(() => {
        if(authCtx.state.isLoggedIn) {
            return authCtx.getCustomerType();
        } else {
            return 'User'
        }
    }, [authCtx.state.customerType, authCtx.state.isLoggedIn]);

    return <div className="flex flex-row w-100"><Switch>
        {routes.filter((route: RouteType) => route.role.includes(getCustomerType())).map((route: RouteType, index: any) => {
            let CustomRoute: any = Route;

            if (route.isPrivate) {
                CustomRoute = PrivateRoute;
            }

            // @ts-ignore
            if (route.children) {
                return route.children.map((routeChild: RouteType, index: any) => <CustomRoute key={routeChild.path}
                                                                                              path={routeChild.path}
                                                                                              exact={routeChild.exact !== undefined ? routeChild.exact : false}>
                    <RouteItem
                        key={routeChild.path}
                        route={routeChild}
                        routes={routes}
                        index={index}
                    />
                </CustomRoute>);
            }

            return <CustomRoute key={route.path} path={route.path}
                                exact={route.exact !== undefined ? route.exact : false}>
                <RouteItem
                    key={route.path}
                    route={route}
                    routes={routes}
                    index={index}
                />
            </CustomRoute>
        })}
    </Switch>
    </div>;
}
