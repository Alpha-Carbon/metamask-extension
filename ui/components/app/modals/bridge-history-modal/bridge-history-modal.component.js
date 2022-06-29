import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../../ui/icon/close-icon.component';
import HistorySecondaryGradientIcon from '../../../ui/icon/history-secondary-gradient-icon.component';

export default class BridgeHistory extends Component {
  static propTypes = {
    hideModal: PropTypes.func,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  render() {
    const {
      hideModal,
    } = this.props;
    const { t } = this.context;
    return (
      <div className="bridge-history-modal">
        <div className="bridge-history-modal-close" onClick={hideModal}>
          <CloseIcon />
        </div>
        <div className="bridge-history-modal-icon">
          <HistorySecondaryGradientIcon />
        </div>
        <div className="bridge-history-modal-title">
          {t('activityLog')}
        </div>
        <div className="bridge-history-modal-record">

        </div>
      </div>
    );
  }
}
