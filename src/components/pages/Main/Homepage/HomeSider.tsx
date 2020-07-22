import React from 'react';
import cs from 'classnames';
import {Col, Divider, Layout, Row, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import s from '../../../App/app.module.css';
import logoSvg from '../../../shared/assets/icon-logo.svg';
import iconOwner from '../../../shared/assets/icon-owner.svg';
import iconModerator from '../../../shared/assets/icon-moderator.svg';
import iconPeasant from '../../../shared/assets/icon-user.svg';
import arrowRightGrey from '../../../shared/assets/arrow-right-grey.svg';
import {useAuth} from './Auth.context';

const {Sider} = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function HomeSider() {
    const authCtx = useAuth();

    const users: any = [
        {name: "Theresa Webb", type: "Owner", balance: "1,478,095.00"},
        {name: "Eleanor Pena", type: "Moderator", balance: "4,067.50"},
        {name: "Courtney Henry", type: "Peasant", balance: "0"},
        {name: "Leslie Alexander", type: "Peasant", balance: "10"},
        {name: "Devon Lane", type: "Peasant", balance: "20"},
    ];

    setTimeout(() => {
            if (authCtx.state.isSpinning) {
                authCtx.setSpinning(false);
            }
        },
        5000);

    return <Sider className={cs([s.loginSider])} width={480}>
        <Spin tip="Loading..." indicator={antIcon} spinning={authCtx.state.isSpinning}>
            <img src={logoSvg} alt={'logo'}/>
            <div className={cs([s.loginUpperText])}>
                <Row className={cs([s.loginStrangerText])}>
                    Welcome stranger,
                </Row>
                <Row className={cs([s.loginDestinyText])}>
                    Choose your destiny
                </Row>
                <Row className={cs([s.loginSignInAsText])}>
                    and sign in as ...
                </Row>
            </div>
            <div>
                <Divider/>
                {users.map((user: any, index: number) => {
                    return <div key={index}>
                        <Row className={cs([s.loginUsersRow])} onClick={() => authCtx.setUser(user)}>
                            <img
                                src={user.type === 'Owner' ? iconOwner : user.type === 'Moderator' ? iconModerator : iconPeasant}
                                alt={user.type}/>
                            <Col className={cs([s.loginUserCol])}>
                                <Row className={cs([s.loginUserRowText])}>
                                    {user.name}
                                </Row>
                                <Row className={cs([s.loginUserRowSubText])}>
                                    {user.type}
                                </Row>
                            </Col>
                            <img src={arrowRightGrey} className={cs([s.loginIconRight, 'p-t-14'])} alt={'arrow-grey'}/>
                        </Row>
                        {users.length === index + 1 ? null : <Divider/>}
                    </div>
                })}
            </div>
        </Spin>
    </Sider>;
}
