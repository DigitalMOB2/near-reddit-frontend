import {AuditOutlined, HomeOutlined, DiffOutlined, EditOutlined, IdcardOutlined, PlusCircleOutlined} from '@ant-design/icons';

import {config} from '../config';
import {Homepage} from './pages/Main/Homepage/Homepage';
import {Login} from './pages/Main/Login/Login';
import {LoginSider} from './pages/Main/Login/LoginSider';
import {NotFound} from './shared/components/NotFound/NotFound';

export const routes = [
    {
        name: 'Home',
        path: config.routes.homepage,
        component: Homepage,
        isInMenu: true,
        icon: HomeOutlined,
        exact: true,
        isHome: true,
        isPrivate: false
    },
    {
        name: 'Login',
        path: config.routes.login,
        component: Login,
        isInMenu: false,
        isPrivate: false,
        breadcrumb: true,
        sider: LoginSider
    },
    {
        name: 'Not found',
        path: '*',
        component: NotFound,
        isInMenu: false,
        isPrivate: false,
        sider: LoginSider
    }
];
