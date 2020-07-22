import React from "react";
import {Col, Divider, Row, Switch} from 'antd';
import iconSettings from '../../assets/icon-settings.svg';
import cs from 'classnames';
import s from '../../../App/app.module.css';
import iconModerator from '../../assets/icon-moderator.svg';
import iconPeasant from '../../assets/icon-user.svg';

export function EditUsers() {
    const users: any = [
        {name: "Theresa Webb", type: "Owner"},
        {name: "Eleanor Pena", type: "Moderator"},
        {name: "Courtney Henry", type: "Peasant"},
        {name: "Leslie Alexander", type: "Peasant"},
        {name: "Devon Lane", type: "Peasant"},
    ];

    return <Col style={{width: '368px'}}>
        <div style={{padding: '20px'}}>
            <Row>
                <img src={iconSettings} alt={'settings'}/>
            </Row>
            <Row className={cs([s.modalTextTitle])}>
                Edit user permissions
            </Row>
            <Divider style={{margin: '18px 0'}}/>
            {users.filter((user: any) => user.type !== 'Owner').map((user: any, index: number) => {
                return <div key={index}>
                    <Row className={cs([s.loginUsersRow])}>
                        <img src={user.type === 'Moderator' ? iconModerator : iconPeasant} alt={user.type}/>
                        <Col className={cs([s.editUserCol])}>
                            <Row className={cs([s.loginUserRowText])}>
                                {user.name}
                            </Row>
                            <Row className={cs([s.loginUserRowSubText])}>
                                {user.type}
                            </Row>
                        </Col>
                        <Switch className={cs([s.modalMiddleSwitch])}
                                defaultChecked={user.type === 'Moderator'}
                                size="small"
                        />
                    </Row>
                    {users.length === index + 2 ? null : <Divider style={{margin: '22px 0'}}/>}
                </div>
            })}
        </div>
    </Col>
}
