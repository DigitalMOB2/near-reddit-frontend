import React, {useCallback} from 'react';
import {Col, Row} from 'antd';
import {useTranslation} from 'react-i18next';
import arrowRight from '../../assets/icon-arrow-right.svg';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';

export function AccountInfo() {
    const {t} = useTranslation(['homepage']);
    const authCtx = useAuth();

    const getCustomerName = useCallback(() => {
        if(authCtx.state.isLoggedIn) {
            return authCtx.getCustomerName();
        } else {
            return 'None'
        }
    }, [authCtx.state.customerName]);

    const getCustomerType = useCallback(() => {
        if(authCtx.state.isLoggedIn) {
            return authCtx.getCustomerType();
        } else {
            return 'None'
        }
    }, [authCtx.state.customerType]);

    return <>
        <div className={'text-white m-t-40 p-r-20'}>
            <Row className={'m-b-20'}>
                <Col span={8}>Account</Col>
                <Col span={8}><img src={arrowRight} alt={'arrowRight'} width={20}/></Col>
                <Col span={8}>{getCustomerName()}</Col>
            </Row>
            <Row className={'m-b-20'}>
                <Col span={8}>Type</Col>
                <Col span={8}><img src={arrowRight} alt={'arrowRight'} width={20}/></Col>
                <Col span={8}>{getCustomerType()}</Col>
            </Row>
            <Row className={'m-b-20'}>
                <Col span={8}>Balance</Col>
                <Col span={8}><img src={arrowRight} alt={'arrowRight'} width={20}/></Col>
                <Col span={8}>1000000</Col>
            </Row>
        </div>
    </>
}
