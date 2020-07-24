import React, {useCallback} from "react";
import {Col, Divider, Form, Row, Input, Button, AutoComplete} from 'antd';
import cs from 'classnames';

import s from '../../../App/app.module.css';
import iconArrowBlue from '../../assets/icon-arrow-blue.svg';
import iconArrowRightSubmit from '../../assets/arrow-right-submit.svg';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {useFetch} from '../../hooks/useFetch';
import {getBackendEndpoint} from '../../utilities/api';
import {config} from '../../../../config';

export function TransferForm() {
    const authCtx = useAuth();

    const {
        loading, error, post,
    } = useFetch({
        path: getBackendEndpoint('/transfer'),
        load: false,
    });

    const cancel = () => {
        authCtx.setVisibleTransferForm(false)
    };


    const onFinish = useCallback(async (values: any) => {
        post({'user_name1': authCtx.state.customerName, 'user_name2': values.username, 'value': values.amount})
            .then(() => authCtx.setShouldGetBalance(true)).catch((error) => console.log(error));
    }, [authCtx.state.customerName, authCtx.setShouldGetBalance]);


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
                onFinish={onFinish}
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
                    <AutoComplete
                        options={config.userNames}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        children={<Input prefix="Recipient username"/>}
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
