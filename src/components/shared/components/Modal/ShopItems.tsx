import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Divider, Row, Spin, Switch} from 'antd';
import iconShop from '../../assets/icon-shop.svg';
import cs from 'classnames';
import numeral from 'numeral';
import {LoadingOutlined} from '@ant-design/icons';

import s from '../../../App/app.module.css';
import iconSilver from '../../assets/icon-silver-item.svg';
import iconGold from '../../assets/icon-gold-item.svg';
import iconPlatinum from '../../assets/icon-platinium-item.svg';
import iconBought from '../../assets/icon-bought.svg';
import {useFetch} from '../../hooks/useFetch';
import {getBackendEndpoint} from '../../utilities/api';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {config} from '../../../../config';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function ShopItems() {
    const [items, setItems] = useState([]);
    const authCtx = useAuth();

    const {
        loading, responseData,
    } = useFetch({
        path: getBackendEndpoint('/get_all_items'),
        load: true,
        modal: true
    });

    const {
        loading: loadingItems, getWithParams
    } = useFetch({
        path: getBackendEndpoint('/get_user_items'),
        load: true,
        modal: true
    });

    const {
        loading: loadingPurchase, post,
    } = useFetch({
        path: getBackendEndpoint('/purchase'),
        load: false,
        modal: true
    });

    useEffect(() => {
        if (!responseData) {
            return;
        }

        getWithParams({"user_name": authCtx.state.customerName}).then((response) => setItems(response.data))

        authCtx.setItems(responseData);

    }, [responseData, authCtx.state.customerName]);


    const purchase = useCallback(async (values: any) => {
        post({"user_name": authCtx.state.customerName, "item_name": values})
            .then((resp) => getWithParams({"user_name": authCtx.state.customerName})
                .then((response) => {
                    authCtx.setShouldGetBalance(true, true, resp.data)
                    setItems(response.data)
                })).catch((error) => console.log(error));
    }, [authCtx.state.customerName, authCtx.setShouldGetBalance]);

    return <Spin tip="Loading..." indicator={antIcon} spinning={loading || loadingItems || loadingPurchase}>
        <Col style={{width: '368px'}}>
        <div style={{padding: '20px'}}>
            <Row>
                <img src={iconShop} alt={'shop'}/>
            </Row>
            <Row className={cs([s.modalTextTitle])}>
                Shop for items
            </Row>
            <Divider/>
            {authCtx.state.items !== [] && authCtx.state.items.map((item: any, index: number) => {
                const isBought = items.map((i) => i.item_name).includes(item.item_name);
                return <div key={index}>
                    <Row className={cs([s.shopItemsRow])}>
                        <img src={item.item_name === config.itemTypes.silver ? iconSilver :
                            item.item_name === config.itemTypes.gold ? iconGold : iconPlatinum} alt={'silver'}/>
                        <Col className={cs([s.shopItemsCol])}>
                            <Row className={cs([s.loginUserRowText])}>
                                {item.item_name}
                            </Row>
                            <Row className={cs([s.loginUserRowSubText])}>
                                Buy for {numeral(item.price).format('0,0.00')} REDD
                            </Row>
                        </Col>
                        {isBought ? <Button className={cs([s.modalShopBuyButton])}
                                shape="round"
                                            disabled={true}

                        >
                            <img src={iconBought} alt={'icon'}/>
                        </Button>
                            :
                            <Button className={cs([s.modalShopBuyButton])}
                                    shape="round"
                                    onClick={() => purchase(item.item_name)}
                                    disabled={authCtx.state.customerBalance < item.price}
                            >
                                Buy
                            </Button>
                        }
                    </Row>
                    {authCtx.state.items.length === index + 1 ? null : <Divider/>}
                </div>
            })}
        </div>
    </Col>
    </Spin>
}
