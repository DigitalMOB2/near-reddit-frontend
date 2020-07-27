import React, {useCallback} from "react";
import {Button, Col, Row} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconStarPost from '../../assets/icon-star-post.svg';
import iconFakePost from '../../assets/fake-post.svg';
import iconArrowStarSubmit from '../../assets/icon-star-submit.svg';
import {useFetch} from '../../hooks/useFetch';
import {getBackendEndpoint} from '../../utilities/api';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {config} from '../../../../config';

export function FakePosts() {
    const authCtx = useAuth();

    const {
        loading, error, post,
    } = useFetch({
        path: getBackendEndpoint('/transfer'),
        load: false,
    });

    const award = useCallback(async () => {
        post({'user_name1': authCtx.state.customerName, 'user_name2': config.userNames[4].value, 'value': 100})
            .then(() => {
                    authCtx.setShouldGetBalance(true)
                }).catch((error) => console.log(error));
    }, [authCtx.state.customerName, authCtx.setShouldGetBalance]);

    const isDisabled = () => {
        return authCtx.state.customerBalance < 100;
    }

    return <Col style={{width: '368px'}} className={cs([s.modalFakePostContainer])}>
        <div className={cs([s.modalFakePostTitleWrapper])}>
            <Row>
                <img src={iconStarPost} alt={'star'}/>
            </Row>

            <Row className={cs([s.modalTextTitle])}>
                Award post
            </Row>
        </div>
        <Row>
            <img src={iconFakePost} alt={'fake-post'} style={{width: '100%'}}/>
        </Row>
        <div className={cs([s.modalFakePostButtonWrapper])}>
            <Row>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{height: '40px', width: '160px', color: 'white', backgroundColor: isDisabled() ? '#B5ADAD' : '#147EFF'}}
                        onClick={() => award()}
                        loading={loading}
                        disabled={isDisabled()}
                >
                    Send award <img src={iconArrowStarSubmit} alt={'arrow-star-submit'} className={'p-l-8 p-b-4'}/>
                </Button>
            </Row>
            <Row className={cs([s.modalFakePostBottomText])}>
                The OP will receive 100.00 REDD
            </Row>
        </div>
    </Col>
}
