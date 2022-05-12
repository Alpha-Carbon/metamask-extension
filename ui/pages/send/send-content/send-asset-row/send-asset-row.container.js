import { connect } from 'react-redux';
import {
  getCollectibles,
  getNativeCurrency,
} from '../../../../ducks/metamask/metamask';
import {
  getMetaMaskAccounts,
  getNativeCurrencyImage,
  getMetaMaskAccountsOrdered,
} from '../../../../selectors';
import { updateSendAsset, getSendAsset, getSendStage } from '../../../../ducks/send';
import { showAccountDetail } from '../../../../store/actions';
import SendAssetRow from './send-asset-row.component';

function mapStateToProps(state) {
  return {
    tokens: state.metamask.tokens,
    selectedAddress: state.metamask.selectedAddress,
    collectibles: getCollectibles(state),
    sendAsset: getSendAsset(state),
    accounts: getMetaMaskAccounts(state),
    nativeCurrency: getNativeCurrency(state),
    nativeCurrencyImage: getNativeCurrencyImage(state),
    accountsList: getMetaMaskAccountsOrdered(state),
    sendStage: getSendStage(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSendAsset: ({ type, details }) =>
      dispatch(updateSendAsset({ type, details })),
    showAccountDetail: (address) => {
      dispatch(showAccountDetail(address));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendAssetRow);
