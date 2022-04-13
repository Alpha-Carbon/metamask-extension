import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import Identicon from '../../../ui/identicon';
import Button from '../../../ui/button';
import { DEFAULT_ROUTE } from '../../../../helpers/constants/routes';
import CloseIcon from '../../../ui/icon/close-icon.component';
import VisibilityIcon from '../../../ui/icon/visibility-icon.component';

function mapStateToProps(state) {
  return {
    token: state.appState.modal.modalState.props.token,
    history: state.appState.modal.modalState.props.history,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(actions.hideModal()),
    hideToken: (address) => {
      dispatch(actions.removeToken(address)).then(() => {
        dispatch(actions.hideModal());
      });
    },
  };
}

class HideTokenConfirmationModal extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    hideToken: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    token: PropTypes.shape({
      symbol: PropTypes.string,
      address: PropTypes.string,
      image: PropTypes.string,
    }),
    history: PropTypes.object,
  };

  state = {};

  render() {
    const { token, hideToken, hideModal, history } = this.props;
    const { symbol, address, image } = token;

    return (
      <div className="hide-token-confirmation">
        <div className="hide-token-confirmation__container">
          <button
            className="hide-token-confirmation__close"
            onClick={() => hideModal()}
          >
            <CloseIcon />
          </button>
          <div className="hide-token-confirmation__title">
            <VisibilityIcon color="#525252" width="36" height="31" />
            <p>{this.context.t('hideTokenPrompt')}</p>
          </div>
          <Identicon
            className="hide-token-confirmation__identicon"
            diameter={45}
            address={address}
            image={image}
          />
          <div className="hide-token-confirmation__symbol">{symbol}</div>
          <div className="hide-token-confirmation__copy">
            {this.context.t('readdToken')}
          </div>
          <div className="hide-token-confirmation__buttons">
            <Button
              type="cancel"
              className="hide-token-confirmation__button"
              data-testid="hide-token-confirmation__cancel"
              onClick={() => hideModal()}
            >
              {this.context.t('cancel')}
            </Button>
            <Button
              type="primaryGradient"
              className="hide-token-confirmation__button"
              data-testid="hide-token-confirmation__hide"
              onClick={() => {
                hideToken(address);
                history.push(DEFAULT_ROUTE);
                hideModal();
              }}
            >
              {this.context.t('hide')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HideTokenConfirmationModal);
