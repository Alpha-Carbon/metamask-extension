import { connect } from 'react-redux';
import { hideModal, setAccountLabel } from '../../../../store/actions';
import {
  getSelectedIdentity,
  getMetaMaskAccountsOrdered,
} from '../../../../selectors';
import AccountNameEdit from './account-name-edit-modal.component';

const mapStateToProps = (state) => {
  return {
    selectedIdentity: getSelectedIdentity(state),
    accounts: getMetaMaskAccountsOrdered(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccountLabel: (address, label) =>
      dispatch(setAccountLabel(address, label)),
    hideModal: () => {
      dispatch(hideModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountNameEdit);
