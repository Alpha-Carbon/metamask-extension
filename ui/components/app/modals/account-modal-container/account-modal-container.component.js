import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Identicon from '../../../ui/identicon';
import CloseIcon from '../../../ui/icon/close-icon.component';
import ReceiveGradient from '../../../ui/icon/receive-gradient-icon.component';
import RenameGradientIcon from '../../../ui/icon/rename-gradient-icon.component';

export default function AccountModalContainer(props, context) {
  const {
    className,
    selectedIdentity,
    showBackButton,
    backButtonAction,
    hideModal,
    children,
    type,
  } = props;

  return (
    <div
      className={classnames(className, 'account-modal')}
      style={{ borderRadius: '10px' }}
    >
      <div className="account-modal__container">
        {/* <div>
          <Identicon address={selectedIdentity.address} diameter={64} />
        </div> */}
        {type === 'edit' ?
          <div className="account-modal__title">
            <RenameGradientIcon size={40} />
            <p>{context.t('rename')}</p>
          </div>

          : <div className="account-modal__title">
            <ReceiveGradient size={40} />
            <p> {context.t('receive')}</p>
          </div>}


        {showBackButton && (
          <div className="account-modal__back" onClick={backButtonAction}>
            <i className="fa fa-angle-left fa-lg" />
            <span className="account-modal__back-text">
              {context.t('back')}
            </span>
          </div>
        )}
        <button className="account-modal__close" onClick={hideModal}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

AccountModalContainer.contextTypes = {
  t: PropTypes.func,
};

AccountModalContainer.defaultProps = {
  showBackButton: false,
  children: null,
  backButtonAction: undefined,
  type: null,
};

AccountModalContainer.propTypes = {
  className: PropTypes.string,
  selectedIdentity: PropTypes.object.isRequired,
  showBackButton: PropTypes.bool,
  backButtonAction: PropTypes.func,
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node,
  type: PropTypes.string,
};
