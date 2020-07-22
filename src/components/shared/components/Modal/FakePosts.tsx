import React from "react";
import {Col, Row} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';

export function FakePosts() {
    return <Col style={{width: '368px'}}>
        <div className={cs([s.modalFakePostContainer])}>
            <Row className={cs([s.modalFakePostTitle])}>
                Post title
            </Row>
            <Row>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus diam suspendisse nulla imperdiet. Etiam integer suspendisse elementum malesuada.
            </Row>
        </div>
    </Col>
}
