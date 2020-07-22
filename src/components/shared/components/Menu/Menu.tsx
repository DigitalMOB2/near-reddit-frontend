import {Link, useLocation} from 'react-router-dom';
import React, {useCallback} from 'react';
import {Menu as MenuAntd} from 'antd';
import cs from 'classnames';

import {useApp} from '../../../App/App.context';
import {RouteType} from '../../../route.type';
import { getParentItemByPath } from './helper';
import {modules} from '../../../pages/modules/config';
import s from '../../../App/app.module.css';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';

const {SubMenu} = MenuAntd;

export function Menu() {
    const appCtx = useApp();
    const location = useLocation();
    const authCtx = useAuth();

    const getSearchQuery = useCallback(() => {
        const loadedModuleKey: string = appCtx.state.loadedModuleKey;

        return modules[loadedModuleKey].query;
    }, [appCtx.state.loadedModuleKey]);


    const {routes} = modules[appCtx.state.loadedModuleKey];

    const parentItem = getParentItemByPath(location.pathname, routes);

    const getCustomerType = useCallback(() => {
        if(authCtx.state.isLoggedIn) {
            return authCtx.getCustomerType();
        } else {
            return 'None'
        }
    }, [authCtx.state.customerType]);

    return <MenuAntd
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[parentItem?.name]}
                className={cs([s.menu, 'm-t-40'])}
                mode="inline"
                inlineIndent={17}
                selectedKeys={[location.pathname]}>
                    {routes.filter((route: RouteType) => route.isInMenu).filter((route: RouteType) => route.role.includes(getCustomerType())).map((route: RouteType) => {
                        return route.children ? <SubMenu
                                    className="font-semibold"
                                    key={route.name}
                                    title={<span>
                                    <route.icon className={'text-white'}/>
                                    <span className={'text-white'}>
                                        {route.name}
                                    </span>
                                </span>}
                                >
                                    {route.children.map((childRoute: RouteType) => (
                                            <MenuAntd.Item key={childRoute.path}>
                                                <childRoute.icon className={'text-white'}/>
                                                <span className={'text-white'}>{childRoute.name}</span>
                                                <Link to={childRoute.path}/>
                                            </MenuAntd.Item>
                                        )
                                    )}
                                </SubMenu> :
                                <MenuAntd.Item key={route.path}>
                                    <Link to={{
                                        pathname: route.path,
                                        search: getSearchQuery()
                                    }}>
                                        {route.icon && <route.icon className={'text-white'}/>}
                                        <span className={'menu-item-text'}>{route.name}</span>
                                    </Link>
                                </MenuAntd.Item>
                    })}
    </MenuAntd>
}
