import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccountModalContainer from '../account-modal-container';
import EditableLabel from '../../../ui/editable-label';

export default class AccountNameEdit extends Component {
  static propTypes = {
    selectedIdentity: PropTypes.object,
    setAccountLabel: PropTypes.func,
    accounts: PropTypes.array,
    hideModal: PropTypes.func,
  };

  static contextTypes = {
    t: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  render() {
    const {
      selectedIdentity,
      setAccountLabel,
      accounts,
      hideModal,
    } = this.props;
    const { name, address } = selectedIdentity;

    const getAccountsNames = (allAccounts, currentName) => {
      return Object.values(allAccounts)
        .map((item) => item.name)
        .filter((itemName) => itemName !== currentName);
    };

    return (
      <AccountModalContainer type="edit" className="account-details-modal">
        <EditableLabel
          className="account-details-modal__name"
          defaultValue={name}
          onSubmit={(label) => setAccountLabel(address, label)}
          accountsNames={getAccountsNames(accounts, name)}
          onClose={hideModal}
        />
      </AccountModalContainer>
    );
  }
}
