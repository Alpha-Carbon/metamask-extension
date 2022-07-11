import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import copyToClipboard from 'copy-to-clipboard';
import { I18nContext } from '../../contexts/i18n';
import { getMostRecentOverviewPage } from '../../ducks/history/history';
import {
    getSelectedIdentity,
    getCurrentChainId,
    getShouldHideZeroBalanceTokens,
    getNetworkDropdownOpen,
    getDropdownSupportBridge,
} from '../../selectors/selectors';
import {
    bridgeSignPersonalMsg,
    bridgeSignPersonalMsgId,
    getSignature,
    connectWallet,
    getSourceChain,
    getPreloadChainOption,
    getChainConfig,
    configFormData,
    getToken,
    getInternalAddress,
    getTargetChain,
    showModal,
    showQrScanner,
    showNetworkDropdown,
    hideNetworkDropdown,
    supportBridgeDropdown,
    unsupportBridgeDropdown
} from '../../store/actions';
import {
    updateSendAsset,
    initializeSendState,
    updateSendAmount,
    updateRecipient,
    signTransaction,
} from '../../ducks/send';
import {
    TARGET_TOKEN,
    ETH_CHAIN,
    HISTORY_PATH,
    SUPPORT_BRIDGE_CHAIN_ID,
} from './bridge.constants'

import { ASSET_TYPES } from '../../../shared/constants/transaction';
import {
    CONFIRM_TRANSACTION_ROUTE
} from '../../helpers/constants/routes';
import { multiplyCurrencies } from '../../../shared/modules/conversion.utils';
import DropDownBridge from '../../components/ui/dropdown-bridge';
import { Tabs, Tab } from '../../components/ui/tabs';
import BackIcon from '../../components/ui/icon/back-icon.component';
import HistoryPrimaryGradientIcon from '../../components/ui/icon/history-gradient-icon.component';
import Button from '../../components/ui/button';
import QrCodeImg from '../../components/ui/qr-code-img';
import Tooltip from '../../components/ui/tooltip/tooltip';
import TextField from '../../components/ui/text-field';
import Copy from '../../components/ui/icon/copy-icon.component';
import EastIcon from '../../components/ui/icon/east-icon.component';
import { SECOND } from '../../../shared/constants/time';

//get token balance
import { isEqual } from 'lodash';
import { getTokens } from '../../ducks/metamask/metamask';
import { useTokenTracker } from '../../hooks/useTokenTracker';

//custom dropdown
import DropdownCustom from '../../components/ui/dropdown-custom';


function removeLeadingZeroes(str) {
    return str.replace(/^0*(?=\d)/u, '');
}

const Bridge = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const t = useContext(I18nContext);
    const mostRecentOverviewPage = useSelector(getMostRecentOverviewPage);
    //get selected address
    const selectedIdentity = useSelector(getSelectedIdentity);
    //get chainId
    const chainId = parseInt(useSelector(getCurrentChainId), 16);
    const { pathname } = location;

    const [chainOptions, setChainOptions] = useState([]);
    const [targetChain, setTargetChain] = useState([]);
    const [selectedTargetChain, setSelectedTargetChain] = useState('');
    const [internalAddress, setInternalAddress] = useState('');
    const [depositData, setDepostiData] = useState();
    const [token, setToken] = useState({});
    const [amountValue, setAmountValue] = useState('');
    const [amountInputValue, setAmountInputValue] = useState('0');
    const [selectedValue, setSelectedValue] = useState('');
    const [copied, setCopied] = useState(false);
    const [copyTimeOut, setCopyTimeOut] = useState('');
    const [selecedBalance, setSelectedBalance] = useState('0');
    const [ethAddress, setEthAddress] = useState('');

    //select withdraw content
    const [isWithdraw, setIsWithdraw] = useState(false);
    const networkDropdownOpen = useSelector(getNetworkDropdownOpen);
    const networkDropdownSupportBridge = useSelector(getDropdownSupportBridge);
    console.log(networkDropdownOpen, 'networkDropdownOpen');

    //tabs ref
    const withdrawRef = useRef(null);
    const depostiRef = useRef(null);

    //submit validate status
    const [amountIsValid, setAmountIsValid] = useState(false);
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    // get token balance
    const shouldHideZeroBalanceTokens = useSelector(
        getShouldHideZeroBalanceTokens,
    );
    const tokens = useSelector(getTokens, isEqual);
    const { loading, tokensWithBalances } = useTokenTracker(
        tokens,
        true,
        shouldHideZeroBalanceTokens,
    );

    useEffect(() => {
        (async () => {
            //get Signature 
            const params = await dispatch(getSignature(selectedIdentity.address));
            const msgId = await dispatch(bridgeSignPersonalMsgId(params, params.data));
            params.metamaskId = msgId;
            //get hash signature
            const hashSignature = await dispatch(bridgeSignPersonalMsg(params));
            //connect wallet
            await dispatch(connectWallet(selectedIdentity.address, hashSignature));
            //get source chain
            await dispatch(getSourceChain());
            //set source chain in state
            setChainOptions(await dispatch(getPreloadChainOption()));
            //get deposti data
            await dispatch(getChainConfig());
            setDepostiData(await dispatch(configFormData()));
            //get internal address
            setInternalAddress(await dispatch(getInternalAddress()));
            //get target chain
            setTargetChain(await dispatch(getTargetChain()));
        })();
    }, [])

    useEffect(() => {
        //get token balance total
        if (token.address) {
            let selectedToken = tokensWithBalances.find((tokenData) => {
                return tokenData.address === token.address
            });
            setSelectedBalance(selectedToken.string);
        }
    }, [depositData, token]);

    useEffect(() => {
        //submit validate status
        selectedValue !== '' ? setTokenIsValid(true) : setTokenIsValid(false);
    }, [selectedValue])

    useEffect(() => {
        //submit validate status
        Number(amountInputValue) > Number(selecedBalance) ? setAmountIsValid(false) : setAmountIsValid(true);
    }, [amountInputValue, selecedBalance])

    useEffect(() => {
        tokenIsValid && amountIsValid ? setSubmitDisabled(true) : setSubmitDisabled(false);
    }, [amountIsValid, tokenIsValid, submitDisabled])


    const handleChange = async (name, val) => {
        depositData[name] = val
        await dispatch(configFormData(depositData));
        if (name === 'symbol') {
            await dispatch(getChainConfig());
        }
        setToken(await dispatch(getToken()));
    }

    const amountChange = (value) => {
        const decimals = token.decimals;
        let decimalValue = value
        let newDecimalValue = decimalValue;
        if (decimals && decimalValue) {
            newDecimalValue = new BigNumber(decimalValue, 10).toFixed(decimals);
        }

        const multiplier = Math.pow(10, Number(decimals || 0));
        const hexValue = multiplyCurrencies(newDecimalValue || 0, multiplier, {
            multiplicandBase: 10,
            multiplierBase: 10,
            toNumericBase: 'hex',
        });
        setAmountValue(hexValue);
    }

    useEffect(() => {
        setCopyTimeOut(setTimeout(
            () => setCopied(false),
            SECOND * 3,
        ));
        copyToClipboard(internalAddress);
    }, [copied])

    const chainOption = () => {
        return (
            <DropDownBridge
                id=""
                options={chainOptions}
                selectedOption={selectedValue}
                onChange={async (value) => {
                    console.log(value, 'value');
                    const chainConfig = chainOptions.find(
                        (item) => item.value === value,
                    );

                    if (!chainConfig) {
                        return;
                    }
                    handleChange('symbol', chainConfig.meta.tokenCode);
                    setSelectedValue(value)
                }}
            />
        )
    }

    const tokenOption = () => {
        return (
            <>
                <div className="bridge-label">
                    {t('token')}
                </div>
                <DropdownCustom
                    options={TARGET_TOKEN}
                    // defaultOption={}
                    onChange={(value) => {
                        const chainConfig = chainOptions.find(
                            (item) => item.value === chainId + '|' + value,
                        );
                        console.log(chainConfig, 'chainConfig');
                        if (!chainConfig) {
                            return;
                        }
                        handleChange('symbol', chainConfig.meta.tokenCode);
                        setSelectedValue(value)
                    }}
                />
            </>
        )
    }

    const amountInput = () => {
        return (
            <>
                <div className="bridge-label mt-5">
                    {t('amount')}
                </div>
                <input
                    className="bridge-amount"
                    type="number"
                    placeholder='0'
                    value={amountInputValue}
                    onChange={(event) => {
                        let value = event.target.value;
                        if (value.length && value.length > 1) {
                            value = removeLeadingZeroes(value);
                        }
                        removeLeadingZeroes(value);
                        setAmountInputValue(value);
                        handleChange('amount', value);
                        amountChange(value);
                    }}
                    onBlur={(event) => {
                        if (event.target.value === '') {
                            setAmountInputValue('0');
                        }
                    }}
                    onFocus={(event) => {
                        if (event.target.value === '') {
                            setAmountInputValue('0');
                        }
                    }}
                />
            </>
        )
    }

    const depostiContent = () => {
        const isSelectedTarget = selectedTargetChain != '';
        //Mumbai Polygon Testnet 假裝是ETH
        const isSelectedETH = selectedTargetChain === ETH_CHAIN;
        return (
            <>
                <div className="bridge-label">
                    {t('targetChain')}
                </div>
                <DropdownCustom
                    className="target__chain"
                    options={targetChain}
                    // defaultOption={}
                    onChange={(value) => {
                        setSelectedTargetChain(value);
                    }}
                />
                {!isSelectedTarget && !isSelectedETH && (
                    null
                )}
                {/* choose eth status */}
                {isSelectedTarget && isSelectedETH && (
                    <div className="bridge-ETH-container">
                        {tokenOption()}
                        <div className="bridge-ETH-addressWrap">
                            <TextField
                                className={'bridge-ETH__address'}
                                key="bridge-ETH__address"
                                id="bridge-ETH__address"
                                value={ethAddress}
                                type={'text'}
                                fullWidth
                                label={t('walletAddress')}
                                onChange={(e) => {
                                    setEthAddress(e.target.value)
                                    const validate = ethers.utils.isAddress(e.target.value);
                                    console.log(validate, 'check is eth address');
                                }}
                            />
                            <button
                                className={classnames('bridge-ETH-addressWrap__action-icon', {
                                    'bridge-ETH-addressWrap__action-icon--erase': ethAddress,
                                    'bridge-ETH-addressWrap__action-icon--qrcode': !ethAddress,
                                })}
                                onClick={() => {
                                    if (ethAddress) {
                                        setEthAddress('');
                                    } else {
                                        dispatch(showQrScanner());
                                    }
                                }}
                            >

                            </button>
                        </div>
                        {amountInput()}
                        <div className="bridge-footer">
                            <Button
                                type={'primaryGradient'}
                                className={classnames(
                                    'page-container__footer-button',
                                )}
                                // disabled={disabled}
                                onClick={async () => {
                                    console.log('eth submit');
                                }}
                            >
                                {t('submit')}
                            </Button>
                        </div>
                    </div>
                )}
                {/* 選擇不是ＥＴＨ的狀態 */}
                {isSelectedTarget && !isSelectedETH && (
                    <>
                        <Tabs
                            defaultActiveTabName={'Transfer'}
                            tabsClassName="bridge__tabs"
                        >
                            <Tab
                                activeClassName="bridge__tab--active activity"
                                className="bridge__tab"
                                data-testid="bridge__transfer-tab"
                                name={t('transfer')}
                            >
                                <div className="bridge-label">
                                    {t('token')}
                                </div>
                                {/* <DropDownBridge
                                    id="bridge-dropdown-token"
                                    className="bridge-dropdown-token"
                                    options={chainOptions}
                                    selectedOption={''}
                                    onChange={async (value) => {
                                        console.log(value);
                                    }}
                                /> */}
                                <DropdownCustom
                                    options={TARGET_TOKEN}
                                    // defaultOption={}
                                    onChange={(value) => {
                                        const chainConfig = chainOptions.find(
                                            (item) => item.value === chainId + '|' + value,
                                        );
                                        console.log(chainConfig, 'chainConfig');
                                        if (!chainConfig) {
                                            return;
                                        }
                                        handleChange('symbol', chainConfig.meta.tokenCode);
                                        setSelectedValue(value)
                                    }}
                                />
                                {amountInput()}
                                <div className="bridge-footer">
                                    <Button
                                        type={'primaryGradient'}
                                        className={classnames(
                                            'page-container__footer-button',
                                        )}
                                        disabled={!submitDisabled}
                                        onClick={async () => {
                                            const address = internalAddress;
                                            const nickname = '';

                                            try {
                                                await dispatch(initializeSendState());
                                                await dispatch(
                                                    updateSendAsset({
                                                        type: ASSET_TYPES.TOKEN,
                                                        details: token,
                                                    }),
                                                );
                                                await dispatch(updateSendAmount(amountValue));
                                                await dispatch(updateRecipient({ address, nickname }));
                                                const promise = await dispatch(signTransaction());
                                                Promise.resolve(promise).then(() => {
                                                    history.push(CONFIRM_TRANSACTION_ROUTE);
                                                });
                                            } catch (err) {
                                                throw err;
                                            }
                                        }}
                                    >
                                        {t('submit')}
                                    </Button>
                                </div>
                            </Tab>
                            <Tab
                                activeClassName="bridge__tab--active"
                                className="bridge__tab"
                                data-testid="bridge__deposti-tab"
                                name={t('deposti')}
                            >
                                {/* qrcode 背景顏色 要去node module 更換成我們的顏色 */}
                                <QrCodeImg
                                    Qr={{
                                        data: internalAddress,
                                    }}
                                />
                                <div className="bridge-deposti-inputWrap">
                                    <Tooltip
                                        wrapperClassName="bridge-deposti-inputWrap__tooltip-wrapper"
                                        position="bottom"
                                        title={copied ? t('copiedExclamation') : t('copyToClipboard')}
                                    >
                                        <button
                                            className="bridge-deposti-inputWrap-copy"
                                            onClick={() => {
                                                setCopied(true);
                                            }}
                                        >
                                            <Copy size={20} color="#227BFF" />
                                        </button>
                                    </Tooltip>
                                    <TextField
                                        className={'bridge-deposti-internal__address'}
                                        key="bridge-deposti-internal__address"
                                        id="bridge-deposti-internal__address"
                                        value={internalAddress}
                                        type={'text'}
                                        fullWidth
                                        label={t('walletAddress')}
                                        inputProps={{ readOnly: true }}
                                    />
                                </div>
                            </Tab>
                        </Tabs>
                    </>
                )}
            </>
        )
    }

    const bridgeContent = () => {
        const supportChain = SUPPORT_BRIDGE_CHAIN_ID.includes(String(chainId));
        return (
            <Tabs
                defaultActiveTabName={t('deposti')}
                tabsClassName="bridge__tabs"
                onTabClick={(tabName) => {
                    console.log(tabName);
                    tabName === t('withdraw') ? setIsWithdraw(true) : setIsWithdraw(false);
                    if (!supportChain && tabName === t('withdraw')) {
                        depostiRef.current.click();
                        dispatch(supportBridgeDropdown());
                        dispatch(showNetworkDropdown());
                    }
                }}
            >
                <Tab
                    activeClassName="bridge__tab--active activity"
                    className="bridge__tab"
                    data-testid="bridge__deposti-tab"
                    name={t('deposti')}
                    ref={depostiRef}
                >
                    <div className="bridge-label">
                        {t('sourceChain')}
                    </div>
                    <DropdownCustom
                        options={chainOptions}
                        onChange={(value) => {
                            console.log(value, 'source chain value');
                        }}
                    />
                    <div className="bridge-label mt-5">
                        {t('targetChain')}
                    </div>
                    <DropdownCustom
                        options={targetChain}
                        onChange={(value) => {
                            console.log(value, 'target Chain value');
                        }}
                    />
                    <div className="bridge-only__USDT">
                        {t('onlyUSDT')}
                    </div>
                    <QrCodeImg
                        Qr={{
                            data: internalAddress,
                        }}
                    />
                    <div className="bridge-deposti-inputWrap">
                        <Tooltip
                            wrapperClassName="bridge-deposti-inputWrap__tooltip-wrapper"
                            position="bottom"
                            title={copied ? t('copiedExclamation') : t('copyToClipboard')}
                        >
                            <button
                                className="bridge-deposti-inputWrap-copy"
                                onClick={() => {
                                    setCopied(true);
                                }}
                            >
                                <Copy size={20} color="#227BFF" />
                            </button>
                        </Tooltip>
                        <TextField
                            className={'bridge-deposti-internal__address'}
                            key="bridge-deposti-internal__address"
                            id="bridge-deposti-internal__address"
                            value={internalAddress}
                            type={'text'}
                            fullWidth
                            // label={t('walletAddress')}
                            inputProps={{ readOnly: true }}
                        />
                    </div>
                </Tab>
                <Tab
                    activeClassName="bridge__tab--active"
                    className="bridge__tab"
                    data-testid="bridge__withdraw-tab"
                    name={t('withdraw')}
                    ref={withdrawRef}
                >
                    {isWithdraw && supportChain ?
                        <>
                            <div className="bridge-label">
                                {t('targetChain')}
                            </div>
                            <DropdownCustom
                                className="target__chain"
                                options={targetChain}
                                // defaultOption={}
                                onChange={(value) => {
                                    console.log(value, 'target value');
                                }}
                            />
                            <div className="bridge-label mt-5">
                                {t('token')}
                            </div>
                            <DropdownCustom
                                options={TARGET_TOKEN}
                                // defaultOption={}
                                onChange={(value) => {
                                    console.log(value, ' token value');
                                }}
                            />
                            <div className="bridge-ETH-addressWrap">
                                <TextField
                                    className={'bridge-ETH__address'}
                                    key="bridge-ETH__address"
                                    id="bridge-ETH__address"
                                    value={ethAddress}
                                    type={'text'}
                                    fullWidth
                                    label={t('recipientAddress')}
                                    onChange={(e) => {
                                        setEthAddress(e.target.value)
                                        const validate = ethers.utils.isAddress(e.target.value);
                                        console.log(validate, 'check is eth address');
                                    }}
                                />
                                <button
                                    className={classnames('bridge-ETH-addressWrap__action-icon', {
                                        'bridge-ETH-addressWrap__action-icon--erase': ethAddress,
                                        'bridge-ETH-addressWrap__action-icon--qrcode': !ethAddress,
                                    })}
                                    onClick={() => {
                                        if (ethAddress) {
                                            setEthAddress('');
                                        } else {
                                            dispatch(showQrScanner());
                                        }
                                    }}
                                >

                                </button>
                            </div>
                            {amountInput()}
                            <div className="bridge-footer">
                                <Button
                                    type={'primaryGradient'}
                                    className={classnames(
                                        'page-container__footer-button',
                                    )}
                                    disabled={!submitDisabled}
                                    onClick={async () => {
                                        const address = internalAddress;
                                        const nickname = '';

                                        try {
                                            await dispatch(initializeSendState());
                                            await dispatch(
                                                updateSendAsset({
                                                    type: ASSET_TYPES.TOKEN,
                                                    details: token,
                                                }),
                                            );
                                            await dispatch(updateSendAmount(amountValue));
                                            await dispatch(updateRecipient({ address, nickname }));
                                            const promise = await dispatch(signTransaction());
                                            Promise.resolve(promise).then(() => {
                                                history.push(CONFIRM_TRANSACTION_ROUTE);
                                            });
                                        } catch (err) {
                                            throw err;
                                        }
                                    }}
                                >
                                    {t('submit')}
                                </Button>
                            </div>
                        </>
                        :
                        <>
                            <p>'alert network change modal'</p>
                        </>
                    }
                </Tab>
            </Tabs>
        )
    }

    const historyContent = () => {
        return (
            <div className="bridge-history">
                <div className={classnames('bridge-history-list', {
                    // 'confirm':status,
                    'confirm': true,
                })}
                    onClick={() => {
                        dispatch(showModal({ name: 'BRIDGE_HISTORY' }))
                    }}
                >
                    <div className="bridge-history-list-info">
                        <div className="bridge-history-list-info-list">
                            <div className="bridge-history-list-info-list-time">
                                2022/06/13 14:37:12
                            </div>
                            <div className="bridge-history-list-info-list-chain">
                                <p>AminoX</p>
                                <EastIcon className="bridge-history-list-info-list-chain-arrow" width='13' height='9' color='#222222' opacity='1' />
                            </div>
                        </div>

                    </div>
                    <div className="bridge-history-list-detail">
                        <div>
                            <p className="bridge-history-list-detail-balance">100 USDT</p>
                            <p className="bridge-history-list-detail-chain">ETH Mainnet</p>
                        </div>
                        <div className={classnames('bridge-history-list-detail-status', {
                            // 'confirm':status,
                            'confirm': true,
                            // 'fail': true
                        })}>
                            confirmed
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderContent = () => {
        return (
            <Switch>
                <Route
                    exact
                    path="/bridge"
                    render={() => (
                        // default page
                        // depostiContent()
                        bridgeContent()
                    )}
                />
                <Route
                    exact
                    path="/bridge/history"
                    render={() => (
                        historyContent()
                    )}
                />
            </Switch>
        );
    }

    return (
        <div className="page-container bridge-container">
            <div className="bridge-header">
                <div className="bridge-header-back" onClick={() => {
                    history.goBack();
                }}>
                    <BackIcon />
                </div>
                <div className="bridge-header-title">{t('bridge')}</div>
                {pathname != HISTORY_PATH && (
                    <div className="bridge-header-history" onClick={() => {
                        history.push('/bridge/history')
                    }}>
                        <HistoryPrimaryGradientIcon />
                        <p className="ml-1">{t('history')}</p>
                    </div>
                )}
            </div>
            {renderContent()}
        </div>
    )
};

export default Bridge;
