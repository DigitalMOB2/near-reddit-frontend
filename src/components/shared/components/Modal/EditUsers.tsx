import React from "react";
import {Col, Divider, Row, Switch} from 'antd';
import {LoadingOutlined} from '@ant-design/icons/lib';

import iconSettings from '../../assets/icon-settings.svg';
import cs from 'classnames';
import s from '../../../App/app.module.css';
import iconModerator from '../../assets/icon-moderator.svg';
import iconPeasant from '../../assets/icon-user.svg';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {useFetch} from '../../hooks/useFetch';
import {getBackendEndpoint} from '../../utilities/api';
import {config} from '../../../../config';

export function EditUsers() {
    const authCtx = useAuth();

    const {
        loading, error, post: postAdd,
    } = useFetch({
        path: getBackendEndpoint('/add_moderator'),
        load: false,
    });

    const {
        loading: loadRemove, error: errorRemove, remove,
    } = useFetch({
        path: getBackendEndpoint('/remove_moderator'),
        load: false,
    });

    const {
        loading: loadingGet, error: errorGet, get, responseData,
    } = useFetch({
        path: getBackendEndpoint('/list_users'),
        load: false,
    });

    const updateUser = (name: string, type: string) => {
        if (type === 'moderator') {
            return remove({'user_name': name}).then(() => {
                get().then((data: any) => {
                    authCtx.setUsers(data.data);
                }).catch((err) => {
                    console.log(err)
                })
                }
            ).catch((error) => console.log(error));
        }

        postAdd({'user_name': name}).then(() => {
                get().then((data: any) => {
                    authCtx.setUsers(data.data);
                }).catch((err) => {
                    console.log(err)
                })
            }
        ).catch((error) => console.log(error));
    }

    return <Col style={{width: '368px', zIndex: 999}}>
        <div style={{padding: '20px'}}>
            <Row>
                <img src={iconSettings} alt={'settings'}/>
            </Row>
            <Row className={cs([s.modalTextTitle])}>
                Edit user permissions
            </Row>
            <Divider style={{margin: '18px 0'}}/>
            {authCtx.state.users !== [] && authCtx.state.users.filter((user: any) => user.user_type !== 'owner').map((user: any, index: number) => {
                return <div key={index} style={{height: '85px'}}>
                    <Row className={cs([s.loginUsersRow])}>
                        <img src={user.user_type === 'moderator' ? iconModerator : iconPeasant} alt={user.user_type}/>
                        <Col className={cs([s.editUserCol])}>
                            <Row className={cs([s.loginUserRowText])}>
                                {user.user_name}
                            </Row>
                            <Row className={cs([s.loginUserRowSubText])}>
                                {user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}
                            </Row>
                        </Col>
                        {loading || loadRemove || loadingGet ? <LoadingOutlined className={cs([s.modalMiddleSwitch])} style={{color: '#90DE2E'}}/>
                            :
                            <Switch className={cs([s.modalMiddleSwitch])}
                                    checked={user.user_type === config.userTypes.moderator}
                                    size="small"
                                    onChange={() => updateUser(user.user_name, user.user_type)}
                            />}
                    </Row>
                    {authCtx.state.users.length === index + 2 ? null : <Divider style={{margin: '22px 0'}}/>}
                </div>
            })}
        </div>
    </Col>
}
