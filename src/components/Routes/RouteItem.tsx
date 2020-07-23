import React from 'react';
import {Layout} from 'antd';
import cs from 'classnames';

import {RouteType} from '../route.type';

import s from '../App/app.module.css';
import {UserModal} from '../shared/components/Modal/UserModal';

const {Content} = Layout;

function ContentContainer(props: any) {
    return <Content>
        <div className={cs([s.siteLayoutBackground, s.container])}>
            {props.children}
        </div>
    </Content>
}

type PropType = {
    route: RouteType,
    routes: RouteType[],
    index: number
}

export function RouteItem({route, routes, index}: PropType) {

    return <>
        <div className="flex flex-row">
            <route.sider/>
        </div>

        <UserModal/>

        <div className="flex flex-col w-100">
            <ContentContainer>
                <route.component/>
            </ContentContainer>
        </div>
    </>
}
