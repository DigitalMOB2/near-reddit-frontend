import React, {useCallback, useState} from 'react';
import cs from 'classnames';
import {Dropdown, Layout} from 'antd';
import {CaretDownFilled, CaretUpFilled} from '@ant-design/icons/lib';

import s from '../../../App/app.module.css';
import {UserMenu} from './UserMenu';
import {UserAvatar} from './UserAvatar';
import {useAuth} from '../../../pages/Main/Login/Auth.context';

const {Header: HeaderAntd} = Layout;

export function Header() {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const authCtx = useAuth();
    const getCustomer = useCallback(() => {
        if(authCtx.state.isLoggedIn) {
            return authCtx.getCustomerName();
        } else {
            return 'None'
        }
    }, [authCtx.state.customer]);

    return <HeaderAntd className={cs(["p-l-30 flex flex-end flex-align-center", s.siteLayoutBackground])}>
        {
            authCtx.state.isLoggedIn && <Dropdown overlay={<UserMenu logout={() => authCtx.logout()}/>} onVisibleChange={(isVisible) => {
            setDropdownVisible(isVisible);
        }}>
            <span>
                <UserAvatar/>
                <span className={'m-l-4 font-semi-b'}>
                    {getCustomer()}
                </span>
                { dropdownVisible ? <CaretUpFilled className='m-l-4'/> : <CaretDownFilled className='m-l-4'/>}
            </span>
        </Dropdown>}
    </HeaderAntd>
}
