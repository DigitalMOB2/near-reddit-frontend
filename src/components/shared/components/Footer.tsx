import React from 'react';
import {Layout} from 'antd';

const {Footer: FooterAntd} = Layout;

export function Footer() {
    return <FooterAntd style={{textAlign: 'center'}}>
        Digitalmob ©{new Date().getFullYear()}
    </FooterAntd>
}
