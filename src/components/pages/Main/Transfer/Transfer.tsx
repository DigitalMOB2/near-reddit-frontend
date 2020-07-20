import React from 'react';
import {Alert, Button, Divider, Form, Input} from 'antd';
import {LoadingOutlined} from '@ant-design/icons/lib';
import {useTranslation} from 'react-i18next';

import {useTransferContext} from './Transfer.context';
import {useTransferHook} from './Transfer.hook';
import {layout, tailLayout} from '../AddModerator/FormLayout';

export function Transfer() {
    const {t} = useTranslation(['transfer']);

    const { state: TransferState, resetState } = useTransferContext();
    const {
        error,
        loading,
        onFinish,
        initialValues,
    } = useTransferHook();

    return <>
        <div>
            <h2 className={'text-center'}>
                {t('transfer:welcome')}
            </h2>
            <Divider/>

            {TransferState.showForm && (<Form
                {...layout}
                name="basic"
                size="large"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Form.Item
                    label={t('transfer:userLabel')}
                    name="username"
                    rules={[{ required: true, message: t('transfer:userInputError')} ]}
                >
                    <Input placeholder={t('transfer:userPlaceholder')} />
                </Form.Item>

                <Form.Item
                    label={t('transfer:tokenNumberLabel')}
                    name="username"
                    rules={[{ required: true, message: t('transfer:tokenNumberInputError')} ]}
                >
                    <Input type={'number'} placeholder={t('transfer:tokenNumberPlaceholder')} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        icon={loading && <LoadingOutlined />}
                    >
                        {t('transfer:submit')}
                    </Button>
                </Form.Item>
            </Form>)}

            {error && (
                <Alert
                    message="Error"
                    description={error.message}
                    type="error"
                    showIcon
                />
            )}
        </div>
    </>
}
