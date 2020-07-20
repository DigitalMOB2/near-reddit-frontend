import React from 'react';
import {Col, Divider, Row} from 'antd';
import {useTranslation} from 'react-i18next';

export function Mint() {
    const {t} = useTranslation(['mint']);

    return <>
        <div>
            <h2 className={'text-center'}>
                {t('mint:welcome')}
            </h2>
            <Divider/>
        </div>
    </>
}
