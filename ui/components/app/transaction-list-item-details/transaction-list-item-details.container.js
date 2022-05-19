import { connect } from 'react-redux';
import { tryReverseResolveAddress } from '../../../store/actions';
import {
  getAddressBook,
  getRpcPrefsForCurrentProvider,
  getAddressBookEntry,
} from '../../../selectors';
import { toChecksumHexAddress } from '../../../../shared/modules/hexstring-utils';
import TransactionListItemDetails from './transaction-list-item-details.component';

const mapStateToProps = (state, ownProps) => {
  const { metamask } = state;
  const { ensResolutionsByAddress } = metamask;
  const { recipientAddress, senderAddress } = ownProps;
  const to = ownProps.toAddress;
  let recipientEns;
  const contact = getAddressBookEntry(state, to);
  if (recipientAddress) {
    const address = toChecksumHexAddress(recipientAddress);
    recipientEns = ensResolutionsByAddress[address] || '';
  }
  const addressBook = getAddressBook(state);

  const getNickName = (address) => {
    const entry = addressBook.find((contact) => {
      return address.toLowerCase() === contact.address.toLowerCase();
    });
    return (entry && entry.name) || '';
  };
  const rpcPrefs = getRpcPrefsForCurrentProvider(state);

  return {
    rpcPrefs,
    recipientEns,
    senderNickname: getNickName(senderAddress),
    recipientNickname: recipientAddress ? getNickName(recipientAddress) : null,
    toName: contact?.name || ownProps.toName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryReverseResolveAddress: (address) => {
      return dispatch(tryReverseResolveAddress(address));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionListItemDetails);
