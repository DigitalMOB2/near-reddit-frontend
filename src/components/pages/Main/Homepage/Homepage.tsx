import React from 'react';
import {Col, Divider, Row} from 'antd';
import {useTranslation} from 'react-i18next';

import systemSvg from './system.svg';

export function Homepage() {
    const {t} = useTranslation(['homepage']);

    return <>
        <div>
            <h2 className={'text-center'}>
                <img src={systemSvg} alt='System' width={40}/>
                {t('homepage:welcome')}
            </h2>
            <Divider/>
        </div>
    </>
}
