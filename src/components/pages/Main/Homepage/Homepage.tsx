import React from 'react';
import {Row} from 'antd';
import cs from 'classnames';
import s from '../../../App/app.module.css';

export function Homepage() {

    return <>
        <div className={cs([s.loginRightSideBox])}>
            <Row className={cs([s.loginRightSideTopText])}>
                The Great Reddit Scaling Bake-Off
            </Row>
            <Row className={cs([s.loginRightSideMiddleText])}>
                Reddit is inviting Ethereum scaling projects to show the community how your scaling solution can be used to bring Community Points to mainnet.
            </Row>
            <Row className={cs([s.loginRightSideBottomText])}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus diam suspendisse nulla imperdiet. Etiam integer suspendisse elementum malesuada accumsan.
            </Row>
        </div>
    </>
}
