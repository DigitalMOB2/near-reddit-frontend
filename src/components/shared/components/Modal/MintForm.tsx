import React, {useCallback} from "react";
import {Col, Divider, Form, Row, Input, Button} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconPlus from '../../assets/icon-plus-green.svg';
import iconPlusSubmit from '../../assets/icon-plus-submit.svg';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {useFetch} from '../../hooks/useFetch';
import {getBackendEndpoint} from '../../utilities/api';

export function MintForm() {
    const authCtx = useAuth();

    const {
        loading, post,
    } = useFetch({
        path: getBackendEndpoint('/mint'),
        load: false,
        modal: true
    });

    const cancel = () => {
        authCtx.setVisibleMintForm(false)
    };

    const onFinish = useCallback(async (values: any) => {
        post({'user_name': authCtx.state.customerName, 'value': values.amount})
            .then((response) => authCtx.setShouldGetBalance(true,true, response.data))
            .catch((error) => console.log(error));
    }, [authCtx.state.customerName, authCtx.setShouldGetBalance]);

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
                onFinish={onFinish}
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
                            style={{marginLeft: '69px', height: '40px', width: '140px', backgroundColor: '#90DE2E', borderColor: '#90DE2E'}}
                            loading={loading}
                    >
                        Mint tokens {!loading && <img src={iconPlusSubmit} alt={'arrow-right-submit'} className={'p-l-8'}/>}
                    </Button>
                </Form.Item>
            </Form>
        </div>

    </Col>
}
