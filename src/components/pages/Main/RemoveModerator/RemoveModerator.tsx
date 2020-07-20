import React from 'react';
import {Alert, Button, Divider, Form, Input} from 'antd';
import {LoadingOutlined} from '@ant-design/icons/lib';
import {useTranslation} from 'react-i18next';

import {layout, tailLayout} from './FormLayout';
import {useRemoveModeratorContext} from './RemoveModerator.context';
import {useRemoveModeratorHook} from './RemoveModerator.hook';

export function RemoveModerator() {
    const {t} = useTranslation(['removeModerator']);

    const { state: RemoveModeratorState, resetState } = useRemoveModeratorContext();
    const {
        error,
        loading,
        onFinish,
        initialValues,
    } = useRemoveModeratorHook();

    return <>
        <div>
            <h2 className={'text-center'}>
                {t('removeModerator:welcome')}
            </h2>
            <Divider/>
            {RemoveModeratorState.showForm && (<Form
                {...layout}
                name="basic"
                size="large"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Form.Item
                    label={t('removeModerator:label')}
                    name="username"
                    rules={[{ required: true, message: t('removeModerator:inputError')} ]}
                >
                    <Input placeholder={t('removeModerator:placeholder')} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        icon={loading && <LoadingOutlined />}
                    >
                        {t('removeModerator:submit')}
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
