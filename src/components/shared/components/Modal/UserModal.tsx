import React from "react";
import {Modal, Form, Row, Divider, Col, Collapse, Button, Input} from "antd";
import cs from 'classnames';

import iconOwner from '../../assets/icon-owner.svg';
import iconModerator from '../../assets/icon-moderator.svg';
import iconPeasant from '../../assets/icon-user.svg';
import iconArrowBlue from '../../assets/icon-arrow-blue.svg';
import iconPlus from '../../assets/icon-plus-green.svg';
import arrowUpGrey from '../../assets/arrow-up-grey.svg';

import { layout, tailLayout } from './FormLayout';
import s from '../../../App/app.module.css';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {EditUsers} from './EditUsers';
import {ShopItems} from './ShopItems';
import {TestTransactions} from './TestTransactions';
import {FakePosts} from './FakePosts';

const { Panel } = Collapse;

export function UserModal() {
    const authCtx = useAuth();

    const customExpandIcon = (props: any) =>{
        if (props.isActive) {
            return (
                <img src={arrowUpGrey} alt={'up'} style={{transform: 'rotate(180deg)', opacity: 0.4}}/>
            );
        } else {
            return (
                <img src={arrowUpGrey} alt={'down'} style={{opacity: 0.4}}/>
            );
        }
    }

    const customExpandIconMint = (props: any) => {
        if (props.isActive) {
            return (
                <img src={arrowUpGrey} alt={'up'} style={{transform: 'rotate(180deg)', opacity: 0.4}}/>
            );
        } else {
            return (
                <img src={arrowUpGrey} alt={'down'} style={{opacity: 0.4}}/>
            );
        }
    }

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
                    <div style={{padding: '20px'}}>
                        <Row>
                            <img src={authCtx.state.customerType === 'Owner' ?
                                iconOwner : authCtx.state.customerType === 'Moderator' ?
                                    iconModerator : iconPeasant} alt={authCtx.state.customerType}/>
                        </Row>
                        <Row className={cs([s.modalTextTitle])}>
                            Hi {authCtx.state.customerName},
                        </Row>
                        <Row className={cs([s.modalSubText])}>
                            your account balance is ...
                        </Row>
                        <Row className={cs([s.modalTextBalance])}>
                            {authCtx.state.customerBalance} <div className={cs([s.modalTokenName])}>REDD</div>
                        </Row>
                        <Divider />
                        <Row className={cs([s.loginUsersRow])}>
                            <Collapse bordered={false}
                                      expandIconPosition={'right'}
                                      expandIcon={(props) => customExpandIcon(props)}
                                      destroyInactivePanel={true}
                                      ghost={true}>
                                <Panel extra={<img src={iconArrowBlue} alt={'arrow-blue'}/>} header="Transfer tokens" key="1">
                                    <Form
                                        {...layout}
                                        name="basic"
                                        size="small"
                                    >
                                        <Form.Item
                                            label="User"
                                            name="user"
                                            rules={[{ required: true, message: 'Please input user!' }]}
                                        >
                                            <Input placeholder="User" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Tokens"
                                            name="tokens"
                                            rules={[{ required: true, message: 'Please input token amount!' }]}
                                        >
                                            <Input type="number" placeholder="Token amount" />
                                        </Form.Item>

                                        <Form.Item {...tailLayout}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Transfer
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Panel>
                            </Collapse>
                        </Row>
                        {authCtx.state.customerType !== 'Peasant' && <div>
                            <Divider/>
                            <Row className={cs([s.loginUsersRow])}>
                                <Collapse bordered={false}
                                          expandIconPosition={'right'}
                                          expandIcon={(props) => customExpandIconMint(props)}
                                          destroyInactivePanel={true}
                                          ghost={true}>
                                    <Panel extra={<img src={iconPlus} alt={'plus-green'}/>} header="Mint tokens" key="2">
                                        <Form
                                            {...layout}
                                            name="basic"
                                            size="small"
                                        >
                                            <Form.Item
                                                label="Tokens"
                                                name="tokens"
                                                rules={[{ required: true, message: 'Please input token amount!' }]}
                                            >
                                                <Input type="number" placeholder="Token amount" />
                                            </Form.Item>

                                            <Form.Item {...tailLayout}>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                >
                                                    Mint
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Panel>
                                </Collapse>
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


