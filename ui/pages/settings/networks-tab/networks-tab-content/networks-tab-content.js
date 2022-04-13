import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NetworksForm from '../networks-form';
// import NetworksFormModal from '../networks-form-modal/networks-form-modal';
import NetworksList from '../networks-list';
import { getProvider } from '../../../../selectors';

const NetworksTabContent = ({
  networkDefaultedToProvider,
  networkIsSelected,
  networksToRender,
  selectedNetwork,
  // shouldRenderNetworkForm,
  isFullScreen,
}) => {
  const provider = useSelector(getProvider);

  return (
    <>
      <NetworksList
        networkDefaultedToProvider={networkDefaultedToProvider}
        networkIsSelected={networkIsSelected}
        networksToRender={networksToRender}
        selectedRpcUrl={selectedNetwork.rpcUrl}
        selectedNetwork={selectedNetwork}
      />
      {isFullScreen && (
        <NetworksForm
          isCurrentRpcTarget={provider.rpcUrl === selectedNetwork.rpcUrl}
          networksToRender={networksToRender}
          selectedNetwork={selectedNetwork}
        />
      )}
      {/* {shouldRenderNetworkForm ? (
        <NetworksForm
          isCurrentRpcTarget={provider.rpcUrl === selectedNetwork.rpcUrl}
          networksToRender={networksToRender}
          selectedNetwork={selectedNetwork}
        />
      ) : null} */}
    </>
  );
};
NetworksTabContent.propTypes = {
  networkDefaultedToProvider: PropTypes.bool,
  networkIsSelected: PropTypes.bool,
  networksToRender: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedNetwork: PropTypes.object,
  // shouldRenderNetworkForm: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool,
};

export default NetworksTabContent;
