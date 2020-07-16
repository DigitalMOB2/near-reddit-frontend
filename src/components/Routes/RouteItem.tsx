import React, {useState} from 'react';
import {Layout, Button} from 'antd';
import cs from 'classnames';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

import {RouteType} from '../route.type';
import {Header} from '../shared/components/Header/Header';

import s from '../App/app.module.css';
import {Footer} from '../shared/components/Footer';

const {Content, Sider} = Layout;

function ContentContainer(props: any) {
    return <Content className={'p-30'}>
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

export function RouteItem({ route, routes, index }: PropType) {

    const [collapsed, setCollapsed] = useState(false);

    return <><div className="flex flex-row">
            {route.sider ? <route.sider/> :
                <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}
                       trigger={<Button>{collapsed ? <RightOutlined/> : <LeftOutlined/>}</Button>} width={260}>
                </Sider>
            }
        </div>
        <div className="flex flex-col w-100">
            <Header/>
            {route.layout ? <route.layout>
                <route.component/>
            </route.layout> : <ContentContainer>
                <route.component/>
            </ContentContainer>
            }
            <Footer />
        </div>
    </>
}
