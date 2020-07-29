import React, {useState} from 'react';
import {Button, Row} from 'antd';
import cs from 'classnames';
import s from '../../../App/app.module.css';

import iconTestTransactions from '../../../shared/assets/icon-test-login.svg';
import iconTransfer from '../../../shared/assets/icon-transfer-login.svg';
import iconMint from '../../../shared/assets/icon-mint-login.svg';
import iconSettings from '../../../shared/assets/icon-settings-login.svg';
import iconReward from '../../../shared/assets/icon-reward-login.svg';
import iconPurchase from '../../../shared/assets/icon-purchase-login.svg';

export function Homepage() {
    const [showTxButton, setShowTxButton] = useState(false);
    const [showTransferButton, setShowTransferButton] = useState(false);
    const [showMintButton, setShowMintButton] = useState(false);
    const [showSettingsButton, setShowSettingsButton] = useState(false);
    const [showRewardButton, setShowRewardButton] = useState(false);
    const [showPurchaseButton, setShowPurchaseButton] = useState(false);

    const showButton = (item: string) => {
        switch (item) {
            case 'tx': setShowTxButton(true); break;
            case 'transfer': setShowTransferButton(true); break;
            case 'mint': setShowMintButton(true); break;
            case 'settings': setShowSettingsButton(true); break;
            case 'reward': setShowRewardButton(true); break;
            case 'purchase': setShowPurchaseButton(true); break;
        }
    }

    const hideButton = (item: string) => {
        switch (item) {
            case 'tx': setShowTxButton(false); break;
            case 'transfer': setShowTransferButton(false); break;
            case 'mint': setShowMintButton(false); break;
            case 'settings': setShowSettingsButton(false); break;
            case 'reward': setShowRewardButton(false); break;
            case 'purchase': setShowPurchaseButton(false); break;
        }
    }

    return <>
        <div className={cs([s.loginRightSideBox])}>
            <Row className={cs([s.loginRightSideTopText])}>
                What is it?
            </Row>
            <Row className={cs([s.loginRightSideMiddleText])}>
                A scaling solution for the Reddit community using the NEAR blockchain technology.
            </Row>
            <Row className={cs([s.loginRightSideBottomText])}>
                Powered by a smart contract that respects the ERC20 standard, showcasing minting, burning, and transfer of tokens.
            </Row>
            <Row className={cs([s.loginSignOwnerText])}>
                Sign in as an Owner to ...
            </Row>
            <Row>
                <div className={cs([s.loginBoxs])} onMouseEnter={() => showButton('tx')} onMouseLeave={() => hideButton('tx')}>
                    <img src={iconTestTransactions} alt={'icon-test'} className={cs([s.loginBoxsIcon])}/>
                    <div className={cs([s.loginBoxsTitle])}>
                        Throughput
                    </div>
                    {showTxButton ?
                        <Button shape="round" className={cs([s.loginWatchVideoButton])}
                                href={'https://youtu.be/yNA93QZkBuc'} target={'_blank'}
                        >
                            Watch video
                        </Button>
                        :
                        <div className={cs([s.loginBoxsSubTitle])}>
                        Send thousands of transactions
                        </div>
                    }
                </div>
                <div className={cs([s.loginBoxs])} onMouseEnter={() => showButton('transfer')} onMouseLeave={() => hideButton('transfer')}>
                    <img src={iconTransfer} alt={'icon-test'} className={cs([s.loginBoxsIcon])}/>
                    <div className={cs([s.loginBoxsTitle])}>
                        Transfer
                    </div>
                    {showTransferButton ?
                        <Button shape="round" className={cs([s.loginWatchVideoButton])}
                                href={'https://youtu.be/hQvx8612QhE'} target={'_blank'}
                        >
                            Watch video
                        </Button>
                        :
                        <div className={cs([s.loginBoxsSubTitle])}>
                            Send tokens to other users
                        </div>
                    }
                </div>
                <div className={cs([s.loginBoxs])} onMouseEnter={() => showButton('mint')} onMouseLeave={() => hideButton('mint')}>
                    <img src={iconMint} alt={'icon-test'} className={cs([s.loginBoxsIcon])}/>
                    <div className={cs([s.loginBoxsTitle])}>
                        Mint
                    </div>
                    {showMintButton?
                        <Button shape="round" className={cs([s.loginWatchVideoButton])}
                                href={'https://youtu.be/Cm-eMpjeeYY'} target={'_blank'}
                        >
                            Watch video
                        </Button>
                        :
                        <div className={cs([s.loginBoxsSubTitle])}>
                            Create new tokens
                        </div>
                    }
                </div>
                <div className={cs([s.loginLastBox])} onMouseEnter={() => showButton('settings')} onMouseLeave={() => hideButton('settings')}>
                    <img src={iconSettings} alt={'icon-test'} className={cs([s.loginBoxsIcon])}/>
                    <div className={cs([s.loginBoxsTitle])}>
                        Permissions
                    </div>
                    {showSettingsButton?
                        <Button shape="round" className={cs([s.loginWatchVideoButton])}
                                href={'https://youtu.be/s7i40feEqGM'} target={'_blank'}
                        >
                            Watch video
                        </Button>
                        :
                        <div className={cs([s.loginBoxsSubTitle])}>
                            Grant or revoke moderator status
                        </div>
                    }
                </div>
            </Row>
            <Row className={cs([s.loginSignModeratorText])}>
                .. or sign in as a Moderator or Regular user to ...
            </Row>
            <Row>
                <div className={cs([s.loginBoxs])} onMouseEnter={() => showButton('reward')} onMouseLeave={() => hideButton('reward')}>
                    <img src={iconReward} alt={'icon-test'} className={cs([s.loginBoxsIcon])}/>
                    <div className={cs([s.loginBoxsTitle])}>
                        Reward
                    </div>
                    {showRewardButton?
                        <Button shape="round" className={cs([s.loginWatchVideoButton])}
                                href={'https://youtu.be/PYGrL8CnNC4'} target={'_blank'}
                        >
                            Watch video
                        </Button>
                        :
                        <div className={cs([s.loginBoxsSubTitle])}>
                            Send rewards to a post author
                        </div>
                    }
                </div>
                <div className={cs([s.loginLastBox])} onMouseEnter={() => showButton('purchase')} onMouseLeave={() => hideButton('purchase')}>
                    <img src={iconPurchase} alt={'icon-test'} className={cs([s.loginBoxsIcon])}/>
                    <div className={cs([s.loginBoxsTitle])}>
                        Purchase
                    </div>
                    {showPurchaseButton?
                        <Button shape="round" className={cs([s.loginWatchVideoButton])}
                                href={'https://youtu.be/qMTEZpqRfEQ'} target={'_blank'}
                        >
                            Watch video
                        </Button>
                        :
                        <div className={cs([s.loginBoxsSubTitle])}>
                            Burn tokens by purchasing items
                        </div>
                    }
                </div>
            </Row>
        </div>
    </>
}
