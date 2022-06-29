import { connect } from 'react-redux';
import { hideModal } from '../../../../store/actions';
import BridgeHistory from './bridge-history-modal.component';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => {
      dispatch(hideModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BridgeHistory);
