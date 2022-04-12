import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ToggleButton from '../../../components/ui/toggle-button';
import {
  REVEAL_SEED_ROUTE,
  EXPORT_PRIVATE_KEY_ROUTE,
  SECURITY_ROUTE,
} from '../../../helpers/constants/routes';
import Button from '../../../components/ui/button';
import TextField from '../../../components/ui/text-field';
import VisibilityIcon from '../../../components/ui/icon/visibility-icon.component';
import Tooltip from '../../../components/ui/tooltip';
import copyToClipboard from 'copy-to-clipboard';
import { SECOND } from '../../../../shared/constants/time';
import CopyPrimaryGradientIcon from '../../../components/ui/icon/copy-primary-gradient-icon.component';
export default class SecurityTab extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  };

  static propTypes = {
    exportAccount: PropTypes.func.isRequired,
    warning: PropTypes.string,
    history: PropTypes.object,
    participateInMetaMetrics: PropTypes.bool.isRequired,
    setParticipateInMetaMetrics: PropTypes.func.isRequired,
    showIncomingTransactions: PropTypes.bool.isRequired,
    setShowIncomingTransactionsFeatureFlag: PropTypes.func.isRequired,
    setUsePhishDetect: PropTypes.func.isRequired,
    usePhishDetect: PropTypes.bool.isRequired,
    isExportPrivateKey: PropTypes.bool,
    selectedIdentity: PropTypes.object.isRequired,
  };

  state = {
    password: '',
    privateKey: null,
    copied: false,
    copyTimeout: null,
  }

  renderSeedWords() {
    const { t } = this.context;
    const { history } = this.props;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('revealSeedWords')}</span>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <Button
              type="danger"
              onClick={(event) => {
                event.preventDefault();
                this.context.metricsEvent({
                  eventOpts: {
                    category: 'Settings',
                    action: 'Reveal Seed Phrase',
                    name: 'Reveal Seed Phrase',
                  },
                });
                history.push(REVEAL_SEED_ROUTE);
              }}
            >
              {t('revealSeedWords')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderMetaMetricsOptIn() {
    const { t } = this.context;
    const {
      participateInMetaMetrics,
      setParticipateInMetaMetrics,
    } = this.props;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('participateInMetaMetrics')}</span>
          <div className="settings-page__content-description">
            <span>{t('participateInMetaMetricsDescription')}</span>
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <ToggleButton
              value={participateInMetaMetrics}
              onToggle={(value) => setParticipateInMetaMetrics(!value)}
              offLabel={t('off')}
              onLabel={t('on')}
            />
          </div>
        </div>
      </div>
    );
  }

  renderIncomingTransactionsOptIn() {
    const { t } = this.context;
    const {
      showIncomingTransactions,
      setShowIncomingTransactionsFeatureFlag,
    } = this.props;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('showIncomingTransactions')}</span>
          <div className="settings-page__content-description">
            {t('showIncomingTransactionsDescription')}
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <ToggleButton
              value={showIncomingTransactions}
              onToggle={(value) =>
                setShowIncomingTransactionsFeatureFlag(!value)
              }
              offLabel={t('off')}
              onLabel={t('on')}
            />
          </div>
        </div>
      </div>
    );
  }

  renderPhishingDetectionToggle() {
    const { t } = this.context;
    const { usePhishDetect, setUsePhishDetect } = this.props;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('usePhishingDetection')}</span>
          <div className="settings-page__content-description">
            {t('usePhishingDetectionDescription')}
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <ToggleButton
              value={usePhishDetect}
              onToggle={(value) => setUsePhishDetect(!value)}
              offLabel={t('off')}
              onLabel={t('on')}
            />
          </div>
        </div>
      </div>
    );
  }

  renderShowPrivateKey() {
    const { t } = this.context;
    const {
      history,
      accountsList,
      selectedAddress,
    } = this.props;
    const selectedAccount = accountsList.find((identity) => {
      return identity.address === selectedAddress;
    })

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('showPrivateKeyTitle', [selectedAccount.name])}</span>
          <div className="settings-page__content-description">
            {t('showPrivateKeyDescription', [selectedAccount.name])}
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <Button
              type="primaryGradient"
              onClick={(event) => {
                event.preventDefault();
                history.push(EXPORT_PRIVATE_KEY_ROUTE);
              }}
            >
              {t('showPrivateKey')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  exportAccountAndGetPrivateKey = (password, address) => {
    const { exportAccount } = this.props;
    exportAccount(password, address)
      .then((privateKey) =>
        this.setState({
          privateKey,
          password: '',
        }),
      )
      .catch((e) => log.error(e));
  };

  renderPrivateKeyContent() {
    const { history, selectedIdentity } = this.props;
    const { t } = this.context;
    const { password, privateKey, copied } = this.state;
    const { address } = selectedIdentity;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('saveYourPrivateKey')}</span>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col settings-page__content-item-private-item">
            <div className="settings-page__content-item-private-warning">
              <div className="mr-1">
                <VisibilityIcon color="#CF3939" />
              </div>
              <p>{t('privateKeyWarning')}</p>
            </div>
            <div className="settings-page__content-item-private-inputWrap">
              {privateKey && (
                <Tooltip
                  wrapperClassName="settings-page__content-item-private-inputWrap__tooltip-wrapper"
                  position="bottom"
                  title={copied ? t('copiedExclamation') : t('copyToClipboard')}
                >
                  <button
                    className="settings-page__content-item-private-inputWrap-copy"
                    onClick={() => {
                      this.setState({
                        copied: true,
                        copyTimeout: setTimeout(() => this.setState({ copied: true }), SECOND * 3),
                      })
                      copyToClipboard(privateKey);
                    }}
                  >
                    <CopyPrimaryGradientIcon size={12} />
                  </button>
                </Tooltip>
              )}
              <TextField
                className={
                  classNames({
                    "export-private-key": privateKey,
                  })
                }
                key="export-private-key"
                id="export-private-key"
                placeholder={t('password')}
                value={privateKey ? privateKey : password}
                type={privateKey ? 'text' : 'password'}
                fullWidth
                label={privateKey ? t('yourPrivateKey') : t('enterPasswordContinue')}
                onChange={(event) => this.setState({ password: event.target.value })}
                inputProps={
                  { readOnly: privateKey }
                }
                autoFocus
              />
            </div>
            <div className="settings-page__content-item-private-buttons">
              <Button
                type="cancel"
                className="mr-1"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({
                    privateKey: null,
                  })
                  history.push(SECURITY_ROUTE);
                }}
              >
                {privateKey ? t('done') : t('cancel')}
              </Button>
              {!privateKey && (
                <Button
                  type="primaryGradient"
                  className="ml-1"
                  onClick={(event) => {
                    event.preventDefault();
                    this.exportAccountAndGetPrivateKey(password, address);
                  }}
                >
                  {t('next')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { warning, isExportPrivateKey } = this.props;

    return (
      <div className="settings-page__body">
        {!isExportPrivateKey ?
          <>
            {warning ? <div className="settings-tab__error">{warning}</div> : null}
            {this.renderSeedWords()}
            {this.renderIncomingTransactionsOptIn()}
            {this.renderPhishingDetectionToggle()}
            {this.renderMetaMetricsOptIn()}
            {this.renderShowPrivateKey()}
          </>
          :
          <>
            {this.renderPrivateKeyContent()}
          </>
        }
      </div>
    );
  }
}
