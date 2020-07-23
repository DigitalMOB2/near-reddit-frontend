import React from 'react';
import {Drawer} from 'antd';
import cx from 'classnames';

import s from './style.module.css';

export const CustomDrawer = (props: any) => {
    console.log(props)
    return <Drawer
        className={cx([props.placement !== 'bottom' && s.drawerHeaderTitle, props.placement !== 'bottom' && s.drawerHeaderIcon])}
        style={{ position: "relative", zIndex: 90 }}
        headerStyle={{backgroundColor: props.placement !== 'bottom' ? `var(--purple)` : `var(--white)`, borderRadius: 0, borderBottom: 0}}
        bodyStyle={{backgroundColor: `var(--white)`, padding: props.noPadding ?  0 : '24px'}}
        title={props.title}
        placement={props.placement}
        closable={props.closable}
        onClose={props.onClose}
        visible={props.visible}
        getContainer={() => props.container}
    >
        {props.children}
    </Drawer>;
};


