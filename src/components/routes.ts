import {HomeOutlined} from '@ant-design/icons';

import {config} from '../config';
import {Homepage} from './pages/Main/Homepage/Homepage';
import {HomeSider} from './pages/Main/Homepage/HomeSider';
import {NotFound} from './shared/components/NotFound/NotFound';

export const routes = [
    {
        name: 'Home',
        path: config.routes.homepage,
        component: Homepage,
        isInMenu: false,
        icon: HomeOutlined,
        exact: true,
        isHome: true,
        isPrivate: false,
        sider: HomeSider,
        role: ['Owner', 'Moderator', 'User']
    },
    {
        name: 'Not found',
        path: '*',
        component: NotFound,
        isInMenu: false,
        isPrivate: false,
        sider: HomeSider,
        role: ['Owner', 'Moderator', 'User']
    }
];
