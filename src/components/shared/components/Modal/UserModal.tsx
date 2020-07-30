import React, {useEffect} from "react";
import {Modal, Row, Divider, Col, Drawer, Spin, Button} from "antd";
import cs from 'classnames';
import numeral from 'numeral';
import {LoadingOutlined} from '@ant-design/icons';

import iconOwner from '../../assets/icon-owner.svg';
import iconModerator from '../../assets/icon-moderator.svg';
import iconPeasant from '../../assets/icon-user.svg';
import iconArrowBlue from '../../assets/icon-arrow-blue.svg';
import iconPlus from '../../assets/icon-plus-green.svg';
import arrowUpGrey from '../../assets/arrow-up-grey.svg';
import iconResponse from '../../assets/icon-response.svg';
import iconClose from '../../assets/icon-close.svg';
import iconCloseWhite from '../../assets/icon-close-white.svg';
import iconWarning from '../../assets/icon-warning.svg';

import s from '../../../App/app.module.css';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {EditUsers} from './EditUsers';
import {ShopItems} from './ShopItems';
import {TestTransactions} from './TestTransactions';
import {FakePosts} from './FakePosts';
import {TransferForm} from './TransferForm';
import {MintForm} from './MintForm';
import {config} from '../../../../config';
import {useFetch} from '../../hooks/useFetch';
import {getBackendEndpoint} from '../../utilities/api';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function UserModal() {
    const myElem = React.createRef<HTMLDivElement>();

    const authCtx = useAuth();

    const {
        loading, getWithParams
    } = useFetch({
        path: getBackendEndpoint('/get_balance'),
        load: false,
    });

    useEffect(() => {
        if (authCtx.state.shouldGetBalance) {
            getWithParams({"user_name": authCtx.state.customerName}).then((data: any) => {
                authCtx.setBalance(data.data);
            }).catch((err) => {
                authCtx.setShouldGetBalance(false, false, '')
            })
        }

    }, [authCtx.setBalance, authCtx.state.shouldGetBalance, authCtx.state.customerName]);

    const showTransferDrawer = () => {
        authCtx.setVisibleTransferForm(true);
    };

    const showMintDrawer = () => {
        authCtx.setVisibleMintForm(true);
    };

    const closeModal = () => {
        authCtx.setShouldGetUsers(true);
    }

    const handleCloseError = () => {
        authCtx.setShowError(false, '', true);
    }

    const handleCloseResponse = () => {
        authCtx.setShowResponse(false, '', '');
    }

    return (
        <Modal
            visible={authCtx.state.showModal}
            onCancel={() => authCtx.logout()}
            footer={null}
            width={1200}
            afterClose={() => closeModal()}
        >
            {authCtx.state.showError && (
                <div className={cs([s.alertErrorBanner])}>
                <img src={iconWarning} alt={'error'}/>
                <div className={cs([s.alertErrorBannerText])}>{authCtx.state.error}</div>
                <img src={iconCloseWhite} alt={'close-white'} style={{opacity: 0.4, cursor: 'pointer'}} onClick={handleCloseError}/>
                </div>
            )}
            {authCtx.state.showResponse && (
                <div className={cs([s.responseBanner])}>
                    <img src={iconResponse} alt={'response'}/>
                    <div className={cs([s.responseBannerText])}>Your last transaction can be reviewed on the NEAR Blockchain Explorer</div>
                    <Button type="primary"
                            className={cs([s.responseBannerButton])}
                            href={authCtx.state.link === '' ?
                                `https://explorer.testnet.near.org/transactions/${authCtx.state.response}`
                                :
                                `https://explorer.testnet.near.org/accounts/${config.contract}`
                            }
                            target={'_blank'}
                    >
                        <span style={{paddingTop: '5px'}}>Open Explorer</span>
                    </Button>
                    <img src={iconClose} alt={'close'} style={{opacity: 0.4, cursor: 'pointer'}} onClick={handleCloseResponse}/>
                </div>
            )}
            <Row className={cs([s.modalContainer])}>
                <Col style={{width: '368px'}}>
                    <div ref={myElem}/>
                    <div style={{padding: '20px'}}>
                        <Row>
                            <img src={authCtx.state.customerType === config.userTypes.owner ?
                                iconOwner : authCtx.state.customerType === config.userTypes.moderator ?
                                    iconModerator : iconPeasant} alt={authCtx.state.customerType}/>
                        </Row>

                        {authCtx.state.visibleTransferForm && <Drawer
                            height={380}
                            placement={'bottom'}
                            closable={false}
                            visible={authCtx.state.visibleTransferForm}
                            getContainer={() => myElem.current}
                            style={{ position: "relative", zIndex: 90, top: '474px'}}
                        >
                            {<TransferForm/>}
                        </Drawer>}

                        {authCtx.state.visibleMintForm && <Drawer
                            height={380}
                            placement={'bottom'}
                            closable={false}
                            visible={authCtx.state.visibleMintForm}
                            getContainer={() => myElem.current}
                            style={{ position: "relative", zIndex: 90, top: '474px'}}
                        >
                            {<MintForm/>}
                        </Drawer>}

                        <Row className={cs([s.modalTextTitle])}>
                            Hi {authCtx.state.customerName},
                        </Row>
                        <Row className={cs([s.modalSubText])}>
                            your account balance is ...
                        </Row>
                        <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
                            <Row className={cs([s.modalTextBalance])}>
                                {numeral(authCtx.state.customerBalance).format('0,0.00')} <div className={cs([s.modalTokenName])}>REDD</div>
                            </Row>
                        </Spin>
                        <Divider />
                        <Row className={cs([s.loginUsersRow])} onClick={() => showTransferDrawer()}>
                            <img src={iconArrowBlue} alt={'arrow-blue'}/>
                            <Col className={cs([s.loginUserCol])}>
                                <Row className={cs([s.modalTransferRowText])}>
                                    Transfer tokens
                                </Row>
                            </Col>
                            <img src={arrowUpGrey} alt={'down'} className={cs([s.loginIconRight, 'p-t-14'])} style={{opacity: 0.4}}/>
                        </Row>

                        {authCtx.state.customerType !== config.userTypes.user && <div>
                            <Divider/>
                            <Row className={cs([s.loginUsersRow])} onClick={() => showMintDrawer()}>
                                <img src={iconPlus} alt={'plus-green'}/>
                                <Col className={cs([s.loginUserCol])}>
                                    <Row className={cs([s.modalTransferRowText])}>
                                        Mint tokens
                                    </Row>
                                </Col>
                                <img src={arrowUpGrey} alt={'down'} className={cs([s.loginIconRight, 'p-t-14'])} style={{opacity: 0.4}}/>
                            </Row>
                        </div>}
                    </div>
                </Col>
                <Divider type={'vertical'} style={{height: '530px'}}/>
                {authCtx.state.customerType === config.userTypes.owner && <EditUsers/>}
                {authCtx.state.customerType === config.userTypes.moderator && <ShopItems/>}
                {authCtx.state.customerType === config.userTypes.user && <ShopItems/>}
                <Divider type={'vertical'} style={{height: '530px'}}/>
                {authCtx.state.customerType === config.userTypes.owner && <TestTransactions/>}
                {authCtx.state.customerType !== config.userTypes.owner && <FakePosts/>}
            </Row>


        </Modal>
    );
};


