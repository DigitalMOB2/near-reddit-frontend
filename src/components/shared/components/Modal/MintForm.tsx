import React from "react";
import {Col, Divider, Form, Row, Input, Button} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconPlus from '../../assets/icon-plus-green.svg';
import iconPlusSubmit from '../../assets/icon-plus-submit.svg';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';

export function MintForm() {
    const authCtx = useAuth();

    const cancel = () => {
        authCtx.setVisibleMintForm(false)
    };

    return <Col>
        <Divider style={{margin: 0}}/>
        <div style={{paddingLeft: '25px'}}>
            <img src={iconPlus} alt={'icon-plus'} className={'p-t-48'}/>
            <Row className={cs([s.drawerTransferRowText])}>
                Mint tokens
            </Row>
            <Form
                name="normal_login"
                className="login-form"
                size={'middle'}
                initialValues={{amount: ''}}
            >
                <Form.Item
                    name="amount"
                    rules={[{ required: true, message: 'Please input amount!' }]}
                >
                    <Input type={'number'} prefix="Amount you want to mint"  suffix="REDD" />
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
                            style={{marginLeft: '63px', height: '40px', backgroundColor: '#90DE2E', borderColor: '#90DE2E'}}
                    >
                        Mint tokens <img src={iconPlusSubmit} alt={'arrow-right-submit'} className={'p-l-8'}/>
                    </Button>
                </Form.Item>
            </Form>
        </div>

    </Col>
}
