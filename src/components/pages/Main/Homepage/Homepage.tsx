import React from 'react';
import {Col, Divider, Row} from 'antd';
import {useTranslation} from 'react-i18next';

export function Homepage() {
    const {t} = useTranslation(['homepage']);

    return <>
        <div>
            <h2 className={'text-center'}>
                {t('homepage:welcome')}
            </h2>
            <Divider/>
        </div>
    </>
}
