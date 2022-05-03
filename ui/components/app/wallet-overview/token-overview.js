import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useDispatch,
  //  useSelector
} from 'react-redux';
import { useHistory } from 'react-router-dom';

import Identicon from '../../ui/identicon';
// import Tooltip from '../../ui/tooltip';
import CurrencyDisplay from '../../ui/currency-display';
import { I18nContext } from '../../../contexts/i18n';
// import { isHardwareKeyring } from '../../../helpers/utils/hardware';
import {
  SEND_ROUTE,
  // BUILD_QUOTE_ROUTE,
} from '../../../helpers/constants/routes';
import {
  useMetricEvent,
  // useNewMetricEvent,
} from '../../../hooks/useMetricEvent';
import { useTokenTracker } from '../../../hooks/useTokenTracker';
import { useTokenFiatAmount } from '../../../hooks/useTokenFiatAmount';
import { ASSET_TYPES, updateSendAsset } from '../../../ducks/send';
// import { setSwapsFromToken } from '../../../ducks/swaps/swaps';
// import {
//   getCurrentKeyring,
//   getIsSwapsChain,
// } from '../../../selectors/selectors';

// import SwapIcon from '../../ui/icon/swap-icon.component';
import SendIcon from '../../ui/icon/overview-send-icon.component';
import ReceiveIcon from '../../ui/icon/receive-icon.component';

// import IconButton from '../../ui/icon-button';
import { INVALID_ASSET_TYPE } from '../../../helpers/constants/error-keys';
import { showModal } from '../../../store/actions';
import WalletOverview from './wallet-overview';

const TokenOverview = ({ className, token }) => {
  const dispatch = useDispatch();
  const t = useContext(I18nContext);
  const sendTokenEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Send: Token',
    },
  });
  const history = useHistory();
  // const keyring = useSelector(getCurrentKeyring);
  // const usingHardwareWallet = isHardwareKeyring(keyring.type);
  const { tokensWithBalances } = useTokenTracker([token]);
  const balanceToRender = tokensWithBalances[0]?.string;
  // const balance = tokensWithBalances[0]?.balance;
  const formattedFiatBalance = useTokenFiatAmount(
    token.address,
    balanceToRender,
    token.symbol,
  );
  // const isSwapsChain = useSelector(getIsSwapsChain);
  // const enteredSwapsEvent = useNewMetricEvent({
  //   event: 'Swaps Opened',
  //   properties: { source: 'Token View', active_currency: token.symbol },
  //   category: 'swaps',
  // });
  useEffect(() => {
    if (token.isERC721 && process.env.COLLECTIBLES_V1) {
      dispatch(
        showModal({
          name: 'CONVERT_TOKEN_TO_NFT',
          tokenAddress: token.address,
        }),
      );
    }
  }, [token.isERC721, token.address, dispatch]);

  return (
    <WalletOverview
      balance={
        <div className="token-overview__balance">
          <CurrencyDisplay
            className="token-overview__primary-balance"
            displayValue={balanceToRender}
            suffix={token.symbol}
          />
          {formattedFiatBalance ? (
            <CurrencyDisplay
              className="token-overview__secondary-balance"
              displayValue={formattedFiatBalance}
              hideLabel
            />
          ) : null}
        </div>
      }
      buttons={
        <>
          {/* <IconButton
            className="token-overview__button"
            onClick={async () => {
              sendTokenEvent();
              try {
                await dispatch(
                  updateSendAsset({
                    type: ASSET_TYPES.TOKEN,
                    details: token,
                  }),
                );
                history.push(SEND_ROUTE);
              } catch (err) {
                if (!err.message.includes(INVALID_ASSET_TYPE)) {
                  throw err;
                }
              }
            }}
            Icon={SendIcon}
            label={t('send')}
            data-testid="eth-overview-send"
            disabled={token.isERC721}
          /> */}
          {/* <IconButton
            className="token-overview__button"
            disabled={!isSwapsChain}
            Icon={SwapIcon}
            onClick={() => {
              if (isSwapsChain) {
                enteredSwapsEvent();
                dispatch(
                  setSwapsFromToken({
                    ...token,
                    iconUrl: token.image,
                    balance,
                    string: balanceToRender,
                  }),
                );
                if (usingHardwareWallet) {
                  global.platform.openExtensionInBrowser(BUILD_QUOTE_ROUTE);
                } else {
                  history.push(BUILD_QUOTE_ROUTE);
                }
              }
            }}
            label={t('swap')}
            tooltipRender={(contents) => (
              <Tooltip
                title={t('currentlyUnavailable')}
                position="bottom"
                disabled={isSwapsChain}
              >
                {contents}
              </Tooltip>
            )}
          /> */}
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
              onClick={async () => {
                sendTokenEvent();
                try {
                  await dispatch(
                    updateSendAsset({
                      type: ASSET_TYPES.TOKEN,
                      details: token,
                    }),
                  );
                  history.push(SEND_ROUTE);
                } catch (err) {
                  if (!err.message.includes(INVALID_ASSET_TYPE)) {
                    throw err;
                  }
                }
              }}
            >
              <SendIcon size={19} color="#FFFFFF" />
              <p>{t('send')}</p>
            </button>
          </div>
        </>
      }
      className={className}
      icon={
        <Identicon diameter={56} address={token.address} image={token.image} />
      }
    />
  );
};

TokenOverview.propTypes = {
  className: PropTypes.string,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    decimals: PropTypes.number,
    symbol: PropTypes.string,
    image: PropTypes.string,
    isERC721: PropTypes.bool,
  }).isRequired,
};

TokenOverview.defaultProps = {
  className: undefined,
};

export default TokenOverview;
