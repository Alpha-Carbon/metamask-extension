import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';
import { getBlockExplorerLink } from '@metamask/etherscan-link';
// import SenderToRecipient from '../../ui/sender-to-recipient';
// import { DEFAULT_VARIANT } from '../../ui/sender-to-recipient/sender-to-recipient.constants';
import { toChecksumHexAddress } from '../../../../shared/modules/hexstring-utils';
import Disclosure from '../../ui/disclosure';
import TransactionActivityLog from '../transaction-activity-log';
import TransactionBreakdown from '../transaction-breakdown';
import Button from '../../ui/button';
import Tooltip from '../../ui/tooltip';
import CancelButton from '../cancel-button';
import Popover from '../../ui/popover';
import { SECOND } from '../../../../shared/constants/time';
import { TRANSACTION_TYPES } from '../../../../shared/constants/transaction';
import { getURLHostName, shortenAddress } from '../../../helpers/utils/util';
import TransactionDecoding from '../transaction-decoding';
import TransactionIcon from '../transaction-icon';
import Identicon from '../../ui/identicon/identicon.component';
import AutoRenewIcon from '../../ui/icon/auto-renew-icon.component';
import NicknamePopovers from '../modals/nickname-popovers/nickname-popovers.component';

export default class TransactionListItemDetails extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  static defaultProps = {
    // recipientEns: null,
  };

  static propTypes = {
    onCancel: PropTypes.func,
    onRetry: PropTypes.func,
    showCancel: PropTypes.bool,
    showSpeedUp: PropTypes.bool,
    showRetry: PropTypes.bool,
    isEarliestNonce: PropTypes.bool,
    primaryCurrency: PropTypes.string,
    transactionGroup: PropTypes.object,
    title: PropTypes.string.isRequired,
    isOtherTitle: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    // recipientEns: PropTypes.string,
    recipientAddress: PropTypes.string,
    rpcPrefs: PropTypes.object,
    senderAddress: PropTypes.string.isRequired,
    tryReverseResolveAddress: PropTypes.func.isRequired,
    // senderNickname: PropTypes.string.isRequired,
    // recipientNickname: PropTypes.string,
    transactionStatus: PropTypes.func,
    category: PropTypes.string,
    status: PropTypes.string,
    nativeCurrency: PropTypes.string,
    toName: PropTypes.string,
  };

  state = {
    justCopied: false,
    addressCopied: false,
    showNicknamePopovers: false,
    addressOnly: true,
  };

  handleBlockExplorerClick = () => {
    const {
      transactionGroup: { primaryTransaction },
      rpcPrefs,
    } = this.props;
    const blockExplorerLink = getBlockExplorerLink(
      primaryTransaction,
      rpcPrefs,
    );

    this.context.trackEvent({
      category: 'Transactions',
      event: 'Clicked Block Explorer Link',
      properties: {
        link_type: 'Transaction Block Explorer',
        action: 'Transaction Details',
        block_explorer_domain: getURLHostName(blockExplorerLink),
      },
    });

    global.platform.openTab({
      url: blockExplorerLink,
    });
  };

  handleCancel = (event) => {
    const { onCancel, onClose } = this.props;
    onCancel(event);
    onClose();
  };

  handleRetry = (event) => {
    const { onClose, onRetry } = this.props;
    onRetry(event);
    onClose();
  };

  handleCopyTxId = () => {
    const { transactionGroup } = this.props;
    const { primaryTransaction: transaction } = transactionGroup;
    const { hash } = transaction;

    this.context.metricsEvent({
      eventOpts: {
        category: 'Navigation',
        action: 'Activity Log',
        name: 'Copied Transaction ID',
      },
    });

    this.setState({ justCopied: true }, () => {
      copyToClipboard(hash);
      setTimeout(() => this.setState({ justCopied: false }), SECOND);
    });
  };

  handleCopyFromAddress = () => {
    const { senderAddress } = this.props;
    this.setState({ addressCopied: true }, () => {
      copyToClipboard(senderAddress);
      setTimeout(() => this.setState({ addressCopied: false }), SECOND)
    })
  }

  componentDidMount() {
    const { recipientAddress, tryReverseResolveAddress } = this.props;

    if (recipientAddress) {
      tryReverseResolveAddress(recipientAddress);
    }
  }

  render() {
    const { t } = this.context;
    const { justCopied, addressCopied, showNicknamePopovers, addressOnly } = this.state;
    const {
      transactionGroup,
      primaryCurrency,
      showSpeedUp,
      showRetry,
      recipientEns,
      recipientAddress,
      senderAddress,
      isEarliestNonce,
      // senderNickname,
      title,
      isOtherTitle,
      onClose,
      recipientNickname,
      toName,
      showCancel,
      transactionStatus: TransactionStatus,
      category,
      status,
      nativeCurrency,
    } = this.props;
    const {
      primaryTransaction: transaction,
      initialTransaction: { type },
    } = transactionGroup;
    const { hash } = transaction;

    let tooltipHtml = <p>{t('copiedExclamation')}</p>;
    if (!addressCopied) {
      tooltipHtml = <p>
        {shortenAddress(senderAddress)}
        <br />
        {t('copyAddress')}
      </p>
    }
    return (
      <>
        {showNicknamePopovers &&
          <NicknamePopovers
            onClose={() => this.setState({ showNicknamePopovers: false })}
            address={toChecksumHexAddress(recipientAddress)}
          />
        }
        <Popover onClose={onClose} className="transaction-list-popover">
          <div className="transaction-list-item-details">
            <div className="transaction-list-item-details-title">
              <TransactionIcon category={category} status={status} />
              <div className="transaction-list-item-details-title-txt">
                {/* {isOtherTitle ?
                  <span className="mr-2">{title}</span>
                  :
                  <>
                    <span className="mr-2">{title}</span>
                    <span>{nativeCurrency}</span>
                  </>
                } */}
                <span>{title}</span>
              </div>
            </div>

            <div className="transaction-list-item-details__operations">
              <div className="transaction-list-item-details__header-buttons">
                {showSpeedUp && (
                  <Button
                    type="primary"
                    onClick={this.handleRetry}
                    className="transaction-list-item-details__header-button-rounded-button"
                  >
                    {t('speedUp')}
                  </Button>
                )}
                {showCancel && (
                  <CancelButton
                    transaction={transaction}
                    cancelTransaction={this.handleCancel}
                    detailsModal
                  />
                )}
                {/* {showRetry && (
                  <Tooltip title={t('retryTransaction')}>
                    <Button
                      type="raised"
                      onClick={this.handleRetry}
                      className="transaction-list-item-details__header-button"
                    >
                      <i className="fa fa-sync"></i>
                    </Button>
                  </Tooltip>
                )} */}
              </div>
            </div>
            <div className="transaction-list-item-details__header">
              <div className="transaction-list-item-details__tx-status">
                <div>{t('status')}</div>
                <div className="d-flex align-items-center">
                  <TransactionStatus />
                  {showRetry && (
                    <Tooltip title={t('retryTransaction')}>
                      <Button
                        type="raised"
                        onClick={this.handleRetry}
                        className="transaction-list-item-details__header-button transaction-list-item-details__header-button-renew ml-2"
                      >
                        {/* <i className="fa fa-sync"></i> */}
                        <AutoRenewIcon />
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="transaction-list-item-details__tx-hash">
                <div>
                  <Button
                    type="link"
                    onClick={this.handleBlockExplorerClick}
                    disabled={!hash}
                  >
                    {t('viewOnBlockExplorer')}
                  </Button>
                </div>
                <div>
                  <Tooltip
                    wrapperClassName="transaction-list-item-details__header-button"
                    containerClassName="transaction-list-item-details__header-button-tooltip-container"
                    title={justCopied ? t('copiedExclamation') : null}
                  >
                    <Button
                      type="link"
                      onClick={this.handleCopyTxId}
                      disabled={!hash}
                    >
                      {t('copyTransactionId')}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="transaction-list-item-details__body">
              <div className="transaction-list-item-details__address">
                <div className="transaction-list-item-details__address-from">
                  <div>{t('from')}</div>
                  <Tooltip
                    position="bottom"
                    containerClassName="transaction-list-item-details__address-tooltip"
                    html={tooltipHtml}
                  >
                    <Identicon address={shortenAddress(senderAddress)}
                      diameter={20} />
                    <div
                      className="transaction-list-item-details__address-txt"
                      onClick={this.handleCopyFromAddress}
                    >

                      {shortenAddress(senderAddress)}
                    </div>
                  </Tooltip>
                </div>
                <div className="transaction-list-item-details__address-to">
                  <div>{t('to')}</div>
                  <Tooltip
                    position="bottom"
                    containerClassName="transaction-list-item-details__address-tooltip"
                    html={t('viewDetail')}
                  >
                    <Identicon address={shortenAddress(recipientAddress)}
                      diameter={20} />
                    <div
                      className="transaction-list-item-details__address-txt"
                      onClick={() => {
                        this.setState({ showNicknamePopovers: true })
                      }}
                    >
                      {addressOnly
                        ? recipientNickname ||
                        recipientEns ||
                        shortenAddress(recipientAddress)
                        : recipientNickname ||
                        recipientEns ||
                        toName ||
                        t('newContract')}
                    </div>
                  </Tooltip>
                </div>
                <div className="transaction-list-item-details__address-line"></div>
              </div>
              {/* <div className="transaction-list-item-details__sender-to-recipient-header">
              <div>{t('from')}</div>
              <div>{t('to')}</div>
            </div>
            <div className="transaction-list-item-details__sender-to-recipient-container">
              <SenderToRecipient
                warnUserOnAccountMismatch={false}
                variant={DEFAULT_VARIANT}
                addressOnly
                recipientEns={recipientEns}
                recipientAddress={recipientAddress}
                recipientNickname={recipientNickname}
                senderName={senderNickname}
                senderAddress={senderAddress}
                onRecipientClick={() => {
                  this.context.metricsEvent({
                    eventOpts: {
                      category: 'Navigation',
                      action: 'Activity Log',
                      name: 'Copied "To" Address',
                    },
                  });
                }}
                onSenderClick={() => {
                  this.context.metricsEvent({
                    eventOpts: {
                      category: 'Navigation',
                      action: 'Activity Log',
                      name: 'Copied "From" Address',
                    },
                  });
                }}
              />
            </div> */}
              <div className="transaction-list-item-details__cards-container">
                <TransactionBreakdown
                  nonce={transactionGroup.initialTransaction.txParams.nonce}
                  isTokenApprove={type === TRANSACTION_TYPES.TOKEN_METHOD_APPROVE}
                  transaction={transaction}
                  primaryCurrency={primaryCurrency}
                  className="transaction-list-item-details__transaction-breakdown"
                />
                {transactionGroup.initialTransaction.type !==
                  TRANSACTION_TYPES.INCOMING && (
                    <Disclosure title={t('activityLog')} size="small">
                      <TransactionActivityLog
                        transactionGroup={transactionGroup}
                        className="transaction-list-item-details__transaction-activity-log"
                        onCancel={this.handleCancel}
                        onRetry={this.handleRetry}
                        isEarliestNonce={isEarliestNonce}
                      />
                    </Disclosure>
                  )}
                {transactionGroup.initialTransaction?.txParams?.data ? (
                  <Disclosure title="Transaction data" size="small">
                    <TransactionDecoding
                      title={t('transactionData')}
                      to={transactionGroup.initialTransaction.txParams?.to}
                      inputData={
                        transactionGroup.initialTransaction.txParams?.data
                      }
                    />
                  </Disclosure>
                ) : null}
              </div>
            </div>
          </div>
        </Popover>
      </>
    );
  }
}
