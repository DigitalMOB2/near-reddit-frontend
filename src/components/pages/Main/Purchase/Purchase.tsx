import React from 'react';
import {Col, Divider, Row} from 'antd';
import {useTranslation} from 'react-i18next';

export function Purchase() {
    const {t} = useTranslation(['purchase']);

    return <>
        <div>
            <h2 className={'text-center'}>
                {t('purchase:welcome')}
            </h2>
            <Divider/>
        </div>
    </>
}
