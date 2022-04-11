import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  setFeatureFlag,
  setParticipateInMetaMetrics,
  setUsePhishDetect,
  exportAccount,
} from '../../../store/actions';
import SecurityTab from './security-tab.component';
import { EXPORT_PRIVATE_KEY_ROUTE } from '../../../helpers/constants/routes';
import { getSelectedIdentity } from '../../../selectors';

const mapStateToProps = (state, ownProps) => {
  const {
    appState: { warning },
    metamask,
  } = state;
  const {
    featureFlags: { showIncomingTransactions } = {},
    participateInMetaMetrics,
    usePhishDetect,
  } = metamask;
  const { location } = ownProps;
  const { pathname } = location;
  const isExportPrivateKey = Boolean(pathname.match(EXPORT_PRIVATE_KEY_ROUTE));
  let selectedIdentity = null;
  selectedIdentity = selectedIdentity || getSelectedIdentity(state);
  return {
    warning,
    showIncomingTransactions,
    participateInMetaMetrics,
    usePhishDetect,
    isExportPrivateKey,
    selectedIdentity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setParticipateInMetaMetrics: (val) =>
      dispatch(setParticipateInMetaMetrics(val)),
    setShowIncomingTransactionsFeatureFlag: (shouldShow) =>
      dispatch(setFeatureFlag('showIncomingTransactions', shouldShow)),
    setUsePhishDetect: (val) => dispatch(setUsePhishDetect(val)),
    exportAccount: (password, address) => {
      return dispatch(exportAccount(password, address)).then((res) => {
        return res;
      });
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SecurityTab);
