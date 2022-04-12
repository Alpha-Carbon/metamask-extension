import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SendRowWrapper from '../send-row-wrapper';
import UserPreferencedCurrencyInput from '../../../../components/app/user-preferenced-currency-input';
import UserPreferencedTokenInput from '../../../../components/app/user-preferenced-token-input';
import UserPreferencedCurrencyDisplay from '../../../../components/app/user-preferenced-currency-display';
import { ASSET_TYPES } from '../../../../ducks/send';
import ArrowIcon from '../../../../components/ui/icon/arrow-icon.component';
import AmountMaxButton from './amount-max-button';
import { ERC20, ERC721, PRIMARY } from '../../../../helpers/constants/common';

import Identicon from '../../../../components/ui/identicon';
import TokenBalance from '../../../../components/ui/token-balance';
import TokenListDisplay from '../../../../components/app/token-list-display';
import { isEqualCaseInsensitive } from '../../../../helpers/utils/util';

export default class SendAmountRow extends Component {
  static propTypes = {
    tokens: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string,
        decimals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        symbol: PropTypes.string,
        image: PropTypes.string,
      }),
    ).isRequired,
    amount: PropTypes.string,
    inError: PropTypes.bool,
    asset: PropTypes.object,
    accounts: PropTypes.object.isRequired,
    selectedAddress: PropTypes.string.isRequired,
    accountsList: PropTypes.object,
    sendAsset: PropTypes.object,
    updateSendAsset: PropTypes.func.isRequired,
    nativeCurrency: PropTypes.string,
    nativeCurrencyImage: PropTypes.string,
    collectibles: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string.isRequired,
        tokenId: PropTypes.string.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        standard: PropTypes.string,
        imageThumbnail: PropTypes.string,
        imagePreview: PropTypes.string,
        creator: PropTypes.shape({
          address: PropTypes.string,
          config: PropTypes.string,
          profile_img_url: PropTypes.string,
        }),
      }),
    ),
  };

  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  };

  state = {
    isShowingDropdown: false,
    sendableTokens: [],
    sendableCollectibles: [],
  };

  async componentDidMount() {
    const sendableTokens = this.props.tokens.filter((token) => !token.isERC721);
    const sendableCollectibles = this.props.collectibles.filter(
      (collectible) =>
        collectible.isCurrentlyOwned && collectible.standard === ERC721,
    );
    this.setState({
      sendableTokens, sendableCollectibles,
    })
  }

  openDropdown = () => this.setState({ isShowingDropdown: true });

  closeDropdown = () => this.setState({ isShowingDropdown: false });

  getAssetSelected = (type, token) => {
    switch (type) {
      case ASSET_TYPES.NATIVE:
        return this.props.nativeCurrency;
      case ASSET_TYPES.TOKEN:
        return ERC20;
      case ASSET_TYPES.COLLECTIBLE:
        return token?.standard;
      default:
        return null;
    }
  };

  selectToken = (type, token) => {
    this.setState(
      {
        isShowingDropdown: false,
      },
      () => {
        this.context.metricsEvent({
          eventOpts: {
            category: 'Transactions',
            action: 'Send Screen',
            name: 'User clicks "Assets" dropdown',
          },
          customVariables: {
            assetSelected: this.getAssetSelected(type, token),
          },
        });
        this.props.updateSendAsset({
          type,
          details: type === ASSET_TYPES.NATIVE ? null : token,
        });
      },
    );
  };

  handleChange = (newAmount) => {
    this.props.updateSendAmount(newAmount);
  };

  renderInput() {
    const { amount, inError, asset } = this.props;

    return asset.type === ASSET_TYPES.TOKEN ? (
      <UserPreferencedTokenInput
        error={inError}
        onChange={this.handleChange}
        token={asset.details}
        value={amount}
      />
    ) : (
      <UserPreferencedCurrencyInput
        error={inError}
        onChange={this.handleChange}
        hexValue={amount}
      />
    );
  }

  renderAmount() {
    const { accounts, selectedAddress, inError, nativeCurrency, tokens, sendAsset: { details } } = this.props;
    const { t } = this.context;
    const balanceValue = accounts[selectedAddress]
      ? accounts[selectedAddress].balance
      : '';
    let token;
    if (details) {
      token = tokens.find(({ address }) =>
        isEqualCaseInsensitive(address, details.address),
      );
    }

    return (
      <div className="send-v2__amount__wrapper">
        <button className="send-v2__amount__switch" onClick={() => {
          this.openDropdown();
        }}>
          {/* <p>{nativeCurrency}</p> */}
          <p>
            {token ? token?.symbol : nativeCurrency}
          </p>
          <ArrowIcon color="#FFFFFF" />
        </button>
        {this.renderInput()}
        <p className="send-v2__amount__balance">
          <span>{t('balance')} : </span>
          {details ?
            <TokenBalance token={token} />
            :
            <UserPreferencedCurrencyDisplay
              ethNumberOfDecimals={4}
              value={balanceValue}
              type={PRIMARY}
            />}
        </p>
        <AmountMaxButton inError={inError} />
        {[...this.state.sendableTokens, ...this.state.sendableCollectibles]
          .length > 0
          ? this.renderMountDropdown()
          : null}
      </div>
    );
  }


  render() {
    const { inError, asset } = this.props;

    if (asset.type === ASSET_TYPES.COLLECTIBLE) {
      return null;
    }

    return this.renderAmount()
    /* <SendRowWrapper
        label={`${this.context.t('amount')}:`}
        showError={inError}
        errorType="amount"
      >
        <AmountMaxButton inError={inError} />
        {this.renderInput()}
      </SendRowWrapper> */
  }


  renderMountDropdown() {
    return (
      this.state.isShowingDropdown && (
        <div>
          <div
            className="send-v2__asset-dropdown__close-area"
            onClick={this.closeDropdown}
          />
          <div className="send-v2__asset-dropdown__list send-v2__amount-dropdown__list">
            {this.renderNativeCurrency(true)}
            <TokenListDisplay
              clickHandler={(token) =>
                this.selectToken(ASSET_TYPES.TOKEN, token)
              }
            />

            {this.state.sendableCollectibles.map((collectible) =>
              this.renderCollectible(collectible, true),
            )}
          </div>
        </div>
      )
    );
  }

  renderNativeCurrency(insideDropdown = false) {
    const { t } = this.context;
    const {
      accounts,
      selectedAddress,
      nativeCurrency,
      nativeCurrencyImage,
      accountsList,
    } = this.props;

    const { sendableTokens, sendableCollectibles, selectAccount } = this.state;

    const balanceValue = accounts[selectedAddress]
      ? accounts[selectedAddress].balance
      : '';

    const sendableAssets = [...sendableTokens, ...sendableCollectibles];
    const selectedAccount = accountsList.find((identity) => {
      return identity.address === selectedAddress;
    })

    return (
      <div
        className={
          sendableAssets.length > 0
            ? 'send-v2__asset-dropdown__asset'
            : 'send-v2__asset-dropdown__single-asset'
        }
        onClick={() => this.selectToken(ASSET_TYPES.NATIVE)}
      >
        <div className="send-v2__asset-dropdown__asset-icon">
          <Identicon
            diameter={30}
            image={nativeCurrencyImage}
            address={nativeCurrency}
          />
        </div>
        <div className="send-v2__asset-dropdown__asset-data">
          <div className="send-v2__asset-dropdown__symbol">
            {nativeCurrency}
          </div>
          <div className="send-v2__asset-dropdown__name">
            <span className="send-v2__asset-dropdown__name__label">
              {`${t('balance')}:`}
            </span>
            <UserPreferencedCurrencyDisplay
              value={balanceValue}
              type={PRIMARY}
            />
          </div>
        </div>
        {!insideDropdown && sendableAssets.length > 0 && (
          // <i className="fa fa-caret-down fa-lg send-v2__asset-dropdown__caret" />
          <ArrowIcon />
        )}
      </div>
    );
  }

  renderCollectible(collectible, insideDropdown = false) {
    const { address, name, image, tokenId } = collectible;
    const { accountsList, selectedAddress } = this.props;
    const { t } = this.context;
    const selectedAccount = accountsList.find((identity) => {
      return identity.address === selectedAddress;
    })

    return (
      <div
        key={address}
        className="send-v2__asset-dropdown__asset"
        onClick={() => this.selectToken(ASSET_TYPES.COLLECTIBLE, collectible)}
      >
        <div className="send-v2__asset-dropdown__asset-icon">
          <Identicon address={address} diameter={30} image={image} />
        </div>
        <div className="send-v2__asset-dropdown__asset-data">
          <div className="send-v2__asset-dropdown__symbol">
            {/* {name} */}
            {selectedAccount.name}
          </div>
          <div className="send-v2__asset-dropdown__name">
            <span className="send-v2__asset-dropdown__name__label">
              {`${t('tokenId')}:`}
            </span>
            {tokenId}
          </div>
        </div>
        {!insideDropdown && (
          // <i className="fa fa-caret-down fa-lg send-v2__asset-dropdown__caret" />
          <ArrowIcon />
        )}
      </div>
    );
  }
}
