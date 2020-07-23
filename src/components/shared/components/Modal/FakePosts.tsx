import React from "react";
import {Button, Col, Row} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconStarPost from '../../assets/icon-star-post.svg';
import iconFakePost from '../../assets/fake-post.svg';
import iconArrowStarSubmit from '../../assets/icon-star-submit.svg';

export function FakePosts() {
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
                        style={{height: '40px', backgroundColor: '#147EFF'}}
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
