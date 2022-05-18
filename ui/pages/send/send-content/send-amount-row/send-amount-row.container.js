import { connect } from 'react-redux';
import {
  getCollectibles,
  // getNativeCurrency,
} from '../../../../ducks/metamask/metamask';
import {
  updateSendAmount,
  getSendAmount,
  sendAmountIsInError,
  getSendAsset,
  updateSendAsset,
  getSendStage,
} from '../../../../ducks/send';
import {
  getMetaMaskAccounts,
  getNativeCurrencyImage,
  getMetaMaskAccountsOrdered,
} from '../../../../selectors';
import SendAmountRow from './send-amount-row.component';

export default connect(mapStateToProps, mapDispatchToProps)(SendAmountRow);

function mapStateToProps(state) {
  const {
    metamask: { nativeCurrency, tokens },
  } = state;
  return {
    nativeCurrency,
    accounts: getMetaMaskAccounts(state),
    selectedAddress: state.metamask.selectedAddress,
    amount: getSendAmount(state),
    inError: sendAmountIsInError(state),
    asset: getSendAsset(state),
    tokens,
    collectibles: getCollectibles(state),
    sendAsset: getSendAsset(state),
    nativeCurrencyImage: getNativeCurrencyImage(state),
    accountsList: getMetaMaskAccountsOrdered(state),
    sendStage: getSendStage(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSendAmount: (newAmount) => dispatch(updateSendAmount(newAmount)),
    updateSendAsset: ({ type, details }) =>
      dispatch(updateSendAsset({ type, details })),
  };
}
