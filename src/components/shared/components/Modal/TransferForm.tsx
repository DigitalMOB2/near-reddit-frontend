import React from "react";
import {Col, Divider, Form, Row, Input, Button} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconArrowBlue from '../../assets/icon-arrow-blue.svg';
import iconArrowRightSubmit from '../../assets/arrow-right-submit.svg';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';

export function TransferForm() {
    const authCtx = useAuth();

    const cancel = () => {
        authCtx.setVisibleTransferForm(false)
    };

    return <Col>
        <Divider style={{margin: 0}}/>
        <div style={{paddingLeft: '25px'}}>
            <img src={iconArrowBlue} alt={'arrow-blue'} className={'p-t-48'}/>
            <Row className={cs([s.drawerTransferRowText])}>
                Transfer tokens
            </Row>
            <Form
                name="normal_login"
                className="login-form"
                size={'middle'}
                initialValues={{amount: '', username: ''}}
            >
                <Form.Item
                    name="amount"
                    rules={[{required: true, message: 'Please input amount!'}]}
                >
                    <Input type={'number'} prefix="Amount you want to send"  suffix="REDD" />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input username!' }]}
                >
                    <Input
                        prefix="Recipient username"
                    />
                </Form.Item>
                <Form.Item>
                    <Button className="login-form-button"
                            type="primary"
                            style={{backgroundColor: '#453332', height: '40px', borderColor: '#453332'}}
                            onClick={() => cancel()}
                    >
                        Cancel
                    </Button>
                    <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{marginLeft: '63px', height: '40px', backgroundColor: '#147EFF'}}
                    >
                        Send tokens <img src={iconArrowRightSubmit} alt={'arrow-right-submit'} className={'p-l-8'}/>
                    </Button>
                </Form.Item>
            </Form>
        </div>

    </Col>
}
