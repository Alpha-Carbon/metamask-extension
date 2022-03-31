import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import CloseIcon from '../../../../components/ui/icon/close-icon.component';
import { getRecipient, resetRecipientInput } from '../../../../ducks/send';
import { ellipsify } from '../../send.utils';
import Identicon from '../../../../components/ui/identicon/identicon.component';

function mapStateToProps(state) {
  return {};
}

function SendTo({ }) {
  const t = useI18nContext();
  const dispatch = useDispatch();
  const recipient = useSelector(getRecipient);
  return (
    <div className={classnames('send-v2__to-wrap')}>
      <div className="send-v2__to-title">{t('to')}</div>
      <div className="send-v2__to-cont">
        <div className="send-v2__to-cont-img">
          <Identicon address={recipient.address} diameter={30} />
        </div>
        <div className="send-v2__to-cont-address">
          {ellipsify(recipient.address)}
        </div>
      </div>
      <div
        className="send-v2__to-close"
        onClick={() => dispatch(resetRecipientInput())}
      >
        <CloseIcon color="#525252" />
      </div>
    </div>
  );
}
SendTo.propTypes = {};
export default compose(withRouter, connect(mapStateToProps))(SendTo);
