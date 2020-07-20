import React from 'react';
import {Alert, Button, Divider, Form, Input} from 'antd';
import {LoadingOutlined} from '@ant-design/icons/lib';
import {useTranslation} from 'react-i18next';

import {layout, tailLayout} from './FormLayout';
import {useAddModeratorContext} from './AddModerator.context';
import {useAddModeratorHook} from './AddModerator.hook';

export function AddModerator() {
    const {t} = useTranslation(['addModerator']);

    const { state: addModeratorState, resetState } = useAddModeratorContext();
    const {
        error,
        loading,
        onFinish,
        initialValues,
    } = useAddModeratorHook();

    return <>
        <div>
            <h2 className={'text-center'}>
                {t('addModerator:welcome')}
            </h2>
            <Divider/>
            {addModeratorState.showForm && (<Form
                {...layout}
                name="basic"
                size="large"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Form.Item
                    label={t('addModerator:label')}
                    name="username"
                    rules={[{ required: true, message: t('addModerator:inputError')} ]}
                >
                    <Input placeholder={t('addModerator:placeholder')} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        icon={loading && <LoadingOutlined />}
                    >
                        {t('addModerator:submit')}
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
