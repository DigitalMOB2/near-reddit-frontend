import React from 'react';
import {Layout} from 'antd';
import {Link} from 'react-router-dom';
import cs from 'classnames';

import {RouteType} from '../route.type';

import {Header} from '../shared/components/Header/Header';
import {Menu} from '../shared/components/Menu/Menu';
import s from '../App/app.module.css';
import {Footer} from '../shared/components/Footer';
import {AccountInfo} from '../shared/components/Sider/AccountInfo';
import logoSvg from '../shared/assets/near_logo_white.svg';

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

    return <><div className="flex flex-row">
            {route.sider ? <route.sider/> :
                <Sider className={cs([s.sider])} width={260}>
                    <Link to={'/'}>
                        <img src={logoSvg} alt={'logo'}/>
                    </Link>
                    <AccountInfo/>
                    <Menu/>
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
