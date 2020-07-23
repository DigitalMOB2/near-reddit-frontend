import React from "react";
import {Modal,  Row, Divider, Col, Drawer} from "antd";
import cs from 'classnames';
import numeral from 'numeral';

import iconOwner from '../../assets/icon-owner.svg';
import iconModerator from '../../assets/icon-moderator.svg';
import iconPeasant from '../../assets/icon-user.svg';
import iconArrowBlue from '../../assets/icon-arrow-blue.svg';
import iconPlus from '../../assets/icon-plus-green.svg';
import arrowUpGrey from '../../assets/arrow-up-grey.svg';

import s from '../../../App/app.module.css';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {EditUsers} from './EditUsers';
import {ShopItems} from './ShopItems';
import {TestTransactions} from './TestTransactions';
import {FakePosts} from './FakePosts';
import {TransferForm} from './TransferForm';
import {MintForm} from './MintForm';

export function UserModal() {
    const myElem = React.createRef<HTMLDivElement>();

    const authCtx = useAuth();

    const showTransferDrawer = () => {
        authCtx.setVisibleTransferForm(true);
    };

    const showMintDrawer = () => {
        authCtx.setVisibleMintForm(true);
    };

    const closeModal = () => {
        authCtx.setSpinning(true);
    }

    return (
        <Modal
            visible={authCtx.state.showModal}
            onCancel={() => authCtx.logout()}
            footer={null}
            width={1200}
            afterClose={() => closeModal()}
        >
            <Row className={cs([s.modalContainer])}>
                <Col style={{width: '368px'}}>
                    <div ref={myElem}/>
                    <div style={{padding: '20px'}}>
                        <Row>
                            <img src={authCtx.state.customerType === 'Owner' ?
                                iconOwner : authCtx.state.customerType === 'Moderator' ?
                                    iconModerator : iconPeasant} alt={authCtx.state.customerType}/>
                        </Row>

                        {authCtx.state.visibleTransferForm && <Drawer
                            height={380}
                            placement={'bottom'}
                            closable={false}
                            visible={authCtx.state.visibleTransferForm}
                            getContainer={() => myElem.current}
                            style={{ position: "relative", zIndex: 90, top: '474px'}}
                        >
                            {<TransferForm/>}
                        </Drawer>}

                        {authCtx.state.visibleMintForm && <Drawer
                            height={380}
                            placement={'bottom'}
                            closable={false}
                            visible={authCtx.state.visibleMintForm}
                            getContainer={() => myElem.current}
                            style={{ position: "relative", zIndex: 90, top: '474px'}}
                        >
                            {<MintForm/>}
                        </Drawer>}

                        <Row className={cs([s.modalTextTitle])}>
                            Hi {authCtx.state.customerName},
                        </Row>
                        <Row className={cs([s.modalSubText])}>
                            your account balance is ...
                        </Row>
                        <Row className={cs([s.modalTextBalance])}>
                            {numeral(authCtx.state.customerBalance).format('0,0.00')} <div className={cs([s.modalTokenName])}>REDD</div>
                        </Row>
                        <Divider />
                        <Row className={cs([s.loginUsersRow])} onClick={() => showTransferDrawer()}>
                            <img src={iconArrowBlue} alt={'arrow-blue'}/>
                            <Col className={cs([s.loginUserCol])}>
                                <Row className={cs([s.modalTransferRowText])}>
                                    Transfer tokens
                                </Row>
                            </Col>
                            <img src={arrowUpGrey} alt={'down'} className={cs([s.loginIconRight, 'p-t-14'])} style={{opacity: 0.4}}/>
                        </Row>

                        {authCtx.state.customerType !== 'Peasant' && <div>
                            <Divider/>
                            <Row className={cs([s.loginUsersRow])} onClick={() => showMintDrawer()}>
                                <img src={iconPlus} alt={'plus-green'}/>
                                <Col className={cs([s.loginUserCol])}>
                                    <Row className={cs([s.modalTransferRowText])}>
                                        Mint tokens
                                    </Row>
                                </Col>
                                <img src={arrowUpGrey} alt={'down'} className={cs([s.loginIconRight, 'p-t-14'])} style={{opacity: 0.4}}/>
                            </Row>
                        </div>}
                    </div>
                </Col>
                <Divider type={'vertical'} style={{height: '530px'}}/>
                {authCtx.state.customerType === 'Owner' && <EditUsers/>}
                {authCtx.state.customerType === 'Moderator' && <ShopItems/>}
                {authCtx.state.customerType === 'Peasant' && <ShopItems/>}
                <Divider type={'vertical'} style={{height: '530px'}}/>
                {authCtx.state.customerType === 'Owner' && <TestTransactions/>}
                {authCtx.state.customerType !== 'Owner' && <FakePosts/>}
            </Row>


        </Modal>
    );
};


