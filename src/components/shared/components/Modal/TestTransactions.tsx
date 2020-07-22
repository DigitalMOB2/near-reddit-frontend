import React from "react";
import {Col, Row} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconTestTxs from '../../assets/icon-test-txs.svg';

export function TestTransactions() {
    return <Col style={{width: '368px'}}>
        <div className={cs([s.modalColRight])}>
            <Row className={cs([s.modalTextTitleRight])}>
                Test the scalability of transactions
            </Row>
            <Row style={{paddingTop: '37px'}}>
                <img src={iconTestTxs} alt={'test'}/>
            </Row>
        </div>
    </Col>
}
