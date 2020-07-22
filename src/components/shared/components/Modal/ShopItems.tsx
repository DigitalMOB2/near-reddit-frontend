import React from "react";
import {Button, Col, Divider, Row} from 'antd';
import iconShop from '../../assets/icon-shop.svg';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconSilver from '../../assets/icon-silver-item.svg';
import iconGold from '../../assets/icon-gold-item.svg';
import iconPlatinum from '../../assets/icon-platinium-item.svg';

export function ShopItems() {
    return <Col style={{width: '368px'}}>
        <div style={{padding: '20px'}}>
            <Row>
                <img src={iconShop} alt={'shop'}/>
            </Row>
            <Row className={cs([s.modalTextTitle])}>
                Shop for items
            </Row>
            <Divider/>
            <Row className={cs([s.shopItemsRow])}>
                <img src={iconSilver} alt={'silver'}/>
                <Col className={cs([s.shopItemsCol])}>
                    <Row className={cs([s.loginUserRowText])}>
                        Silver Award
                    </Row>
                    <Row className={cs([s.loginUserRowSubText])}>
                        Buy for 100.00 REDD
                    </Row>
                </Col>
                <Button className={cs([s.modalShopBuyButton])} style={{color: '#90DE2E', borderColor: '#90DE2E'}} shape="round">
                    Buy
                </Button>
            </Row>
            <Divider/>
            <Row className={cs([s.shopItemsRow])}>
                <img src={iconGold} alt={'silver'}/>
                <Col className={cs([s.shopItemsCol])}>
                    <Row className={cs([s.loginUserRowText])}>
                        Gold Award
                    </Row>
                    <Row className={cs([s.loginUserRowSubText])}>
                        Buy for 500.00 REDD
                    </Row>
                </Col>
                <Button className={cs([s.modalShopBuyButton])} style={{color: '#90DE2E', borderColor: '#90DE2E'}} shape="round">
                    Buy
                </Button>
            </Row>
            <Divider/>
            <Row className={cs([s.shopItemsRow])}>
                <img src={iconPlatinum} alt={'silver'}/>
                <Col className={cs([s.shopItemsCol])}>
                    <Row className={cs([s.loginUserRowText])}>
                        Platinum Award
                    </Row>
                    <Row className={cs([s.loginUserRowSubText])}>
                        Buy for 1800.00 REDD
                    </Row>
                </Col>
                <Button className={cs([s.modalShopBuyButton])} style={{color: '#90DE2E', borderColor: '#90DE2E'}} shape="round">
                    Buy
                </Button>
            </Row>
        </div>
    </Col>
}
