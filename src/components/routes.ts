import {HomeOutlined, UserAddOutlined, UserDeleteOutlined, TeamOutlined, UploadOutlined, DownloadOutlined} from '@ant-design/icons';

import {config} from '../config';
import {Homepage} from './pages/Main/Homepage/Homepage';
import {AddModerator} from './pages/Main/AddModerator/AddModerator';
import {RemoveModerator} from './pages/Main/RemoveModerator/RemoveModerator';
import {Purchase} from './pages/Main/Purchase/Purchase';
import {Mint} from './pages/Main/Mint/Mint';
import {Transfer} from './pages/Main/Transfer/Transfer';
import {Login} from './pages/Main/Login/Login';
import {LoginSider} from './pages/Main/Login/LoginSider';
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
        isPrivate: true,
        role: ['Owner', 'Moderator', 'User']
    },
    {
        name: 'Add Moderator',
        path: config.routes.addModerator,
        component: AddModerator,
        isInMenu: true,
        icon: UserAddOutlined,
        exact: true,
        isHome: true,
        isPrivate: true,
        role:  ['Owner']
    },
    {
        name: 'Remove Moderator',
        path: config.routes.removeModerator,
        component: RemoveModerator,
        isInMenu: true,
        icon: UserDeleteOutlined,
        exact: true,
        isHome: true,
        isPrivate: true,
        role: ['Owner']
    },
    {
        name: 'Transfer',
        path: config.routes.transfer,
        component: Transfer,
        isInMenu: true,
        icon: TeamOutlined,
        exact: true,
        isHome: true,
        isPrivate: true,
        role: ['Owner', 'Moderator', 'User']
    },
    {
        name: 'Mint',
        path: config.routes.mint,
        component: Mint,
        isInMenu: true,
        icon: UploadOutlined,
        exact: true,
        isHome: true,
        isPrivate: true,
        role: ['Owner', 'Moderator']
    },
    {
        name: 'Purchase',
        path: config.routes.purchase,
        component: Purchase,
        isInMenu: true,
        icon: DownloadOutlined,
        exact: true,
        isHome: true,
        isPrivate: true,
        role: ['Owner', 'Moderator', 'User']
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
