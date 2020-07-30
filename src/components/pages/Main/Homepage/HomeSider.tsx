import React, {useEffect, useState} from 'react';
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
import {useFetch} from '../../../shared/hooks/useFetch';
import {getBackendEndpoint} from '../../../shared/utilities/api';
import {config} from '../../../../config';

const {Sider} = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function HomeSider() {
    const authCtx = useAuth();

    const [load, setLoad] = useState(false);

    const {
        loading, get, responseData,
    } = useFetch({
        path: getBackendEndpoint('/list_users'),
        load: true,
        modal: false
    });

    useEffect(() => {
        setLoad(true);
        if (authCtx.state.shouldGetUsers) {
            get().then((data: any) => {
                authCtx.setUsers(data.data);
            }).catch((err) => {
                authCtx.setShouldGetUsers(false)
            })
        }

        if (!responseData) {
            return setLoad(false);
        }

        let item_order = ["owner","moderator","user"];

        let sorted = responseData.sort((a: any, b: any) => item_order.indexOf(a.user_type) - item_order.indexOf(b.user_type));

        authCtx.setUsers(sorted);

        setLoad(false);

    }, [responseData, authCtx.state.shouldGetUsers, load]);



    return <Sider className={cs([s.loginSider])} width={480}>
        <Spin tip="Loading..." indicator={antIcon} spinning={loading || load}>
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
                {authCtx.state.users && authCtx.state.users.map((user: any, index: number) => {
                    return <div key={index}>
                        <Row className={cs([s.loginUsersRow])} onClick={() => authCtx.setUser(user)}>
                            <img
                                src={user.user_type === config.userTypes.owner ? iconOwner :
                                    user.user_type === config.userTypes.moderator ? iconModerator : iconPeasant}
                                alt={user.user_type}/>
                            <Col className={cs([s.loginUserCol])}>
                                <Row className={cs([s.loginUserRowText])}>
                                    {user.user_name}
                                </Row>
                                <Row className={cs([s.loginUserRowSubText])}>
                                    {user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}
                                </Row>
                            </Col>
                            <img src={arrowRightGrey} className={cs([s.loginIconRight, 'p-t-14'])} alt={'arrow-grey'}/>
                        </Row>
                        {authCtx.state.users.length === index + 1 ? null : <Divider/>}
                    </div>
                })}
            </div>
        </Spin>
    </Sider>;
}
