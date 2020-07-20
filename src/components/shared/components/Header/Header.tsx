import React from 'react';
import cs from 'classnames';
import {Button, Layout} from 'antd';
import {LogoutOutlined} from '@ant-design/icons/lib';

import s from '../../../App/app.module.css';
import {useAuth} from '../../../pages/Main/Login/Auth.context';
import {useHistory} from 'react-router-dom';
import {config} from '../../../../config';

const {Header: HeaderAntd} = Layout;

export function Header() {
    const authCtx = useAuth();
    const history = useHistory();

    const logout = () => {
        authCtx.logout();
        history.push(config.routes.login);
    }

    return <HeaderAntd className={cs(["p-l-30 flex flex-end flex-align-center", s.siteLayoutBackground])}>
        {
            authCtx.state.isLoggedIn && <Button icon={<LogoutOutlined />} onClick={() => logout()}>Logout</Button>}
    </HeaderAntd>
}
