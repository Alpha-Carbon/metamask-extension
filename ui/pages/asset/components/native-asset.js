import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { getAccountLink } from '@metamask/etherscan-link';
import TransactionList from '../../../components/app/transaction-list';
// import { EthOverview } from '../../../components/app/wallet-overview';
import {
  getSelectedIdentity,
  // getCurrentChainId,
  getRpcPrefsForCurrentProvider,
  // getSelectedAddress,
  getSelectedAccount,
  getNativeCurrencyImage,
} from '../../../selectors/selectors';
import { showModal } from '../../../store/actions';
import { DEFAULT_ROUTE, SEND_ROUTE } from '../../../helpers/constants/routes';
// import { getURLHostName } from '../../../helpers/utils/util';
import {
  // useNewMetricEvent,
  useMetricEvent,
} from '../../../hooks/useMetricEvent';
import { I18nContext } from '../../../contexts/i18n';
import ActCoinIcon from '../../../components/ui/icon/act-coin-icon.component';
import ReceiveIcon from '../../../components/ui/icon/receive-icon.component';
import SendIcon from '../../../components/ui/icon/send-icon.component';
import UserPreferencedCurrencyDisplay from '../../../components/app/user-preferenced-currency-display';
import { PRIMARY } from '../../../helpers/constants/common';
// import AssetOptions from './asset-options';
import AssetNavigation from './asset-navigation';
import Identicon from '../../../../ui/components/ui/identicon'

export default function NativeAsset({ nativeCurrency }) {
  const selectedAccountName = useSelector(
    (state) => getSelectedIdentity(state).name,
  );
  const dispatch = useDispatch();
  const t = useContext(I18nContext);
  // const chainId = useSelector(getCurrentChainId);
  const rpcPrefs = useSelector(getRpcPrefsForCurrentProvider);
  // const address = useSelector(getSelectedAddress);
  const history = useHistory();
  // const accountLink = getAccountLink(address, chainId, rpcPrefs);
  const selectedAccount = useSelector(getSelectedAccount);
  const { balance } = selectedAccount;
  const primaryTokenImage = useSelector(getNativeCurrencyImage);

  // const blockExplorerLinkClickedEvent = useNewMetricEvent({
  //   category: 'Navigation',
  //   event: 'Clicked Block Explorer Link',
  //   properties: {
  //     link_type: 'Account Tracker',
  //     action: 'Asset Options',
  //     block_explorer_domain: getURLHostName(accountLink),
  //   },
  // });

  const sendEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Send: TACT',
    },
  });
  console.log(nativeCurrency, 'nativeCurrency');
  return (
    <>
      <AssetNavigation
        accountName={selectedAccountName}
        assetName={nativeCurrency}
        onBack={() => history.push(DEFAULT_ROUTE)}
        isEthNetwork={!rpcPrefs.blockExplorerUrl}
      // optionsButton={
      //   <AssetOptions
      //     isNativeAsset
      //     onClickBlockExplorer={() => {
      //       blockExplorerLinkClickedEvent();
      //       global.platform.openTab({
      //         url: accountLink,
      //       });
      //     }}
      //     onViewAccountDetails={() => {
      //       dispatch(showModal({ name: 'ACCOUNT_DETAILS' }));
      //     }}
      //   />
      // }
      />
      <div className="asset-native__wrapper">
        {nativeCurrency === 'TACT' ?
          <ActCoinIcon
            width="56"
            height="56"
            className="asset-native__wrapper-icon"
          /> :
          <Identicon diameter={56} image={primaryTokenImage} imageBorder />
        }
        <UserPreferencedCurrencyDisplay
          className="eth-overview__primary-balance asset-native__wrapper-balance"
          data-testid="eth-overview__primary-currency"
          value={balance}
          type={PRIMARY}
          ethNumberOfDecimals={3}
          hideTitle
        />
        <div className="asset-native__wrapper-buttons">
          <button
            className="asset-native__wrapper-buttons-receive"
            onClick={() => {
              dispatch(showModal({ name: 'ACCOUNT_DETAILS' }));
            }}
          >
            <ReceiveIcon size={26} color="#FFFFFF" />
            <p>{t('receive')}</p>
          </button>
          <button
            className="asset-native__wrapper-buttons-send"
            onClick={() => {
              sendEvent();
              history.push(SEND_ROUTE);
            }}
          >
            <SendIcon size={26} color="#FFFFFF" />
            <p>{t('send')}</p>
          </button>
        </div>
      </div>
      {/* <EthOverview className="asset__overview" /> */}
      <TransactionList hideTokenTransactions />
    </>
  );
}

NativeAsset.propTypes = {
  nativeCurrency: PropTypes.string.isRequired,
};
