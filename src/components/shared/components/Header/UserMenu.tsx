import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import React from 'react';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';

import {config} from '../../../../config';

type OptionsType = {
    logout: () => void
};

export function UserMenu(options: OptionsType) {
    return <Menu>
        <Menu.Item key="0">
            <UserOutlined/>
            <Link to={config.routes.users}>Users</Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="1">
            <LogoutOutlined/>
            <span onClick={options.logout}>Logout</span>
        </Menu.Item>
    </Menu>
};
