import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NetworksListItem from '../networks-list-item';

const NetworksList = ({
  networkIsSelected,
  networksToRender,
  networkDefaultedToProvider,
  selectedRpcUrl,
  selectedNetwork,
}) => {
  return (
    <div
      className={classnames('networks-tab__networks-list', {
        'networks-tab__networks-list--selection':
          networkIsSelected && !networkDefaultedToProvider,
      })}
    >
      {networksToRender.map((network) => (
        <NetworksListItem
          key={`settings-network-list:${network.rpcUrl}`}
          network={network}
          networkIsSelected={networkIsSelected}
          selectedRpcUrl={selectedRpcUrl}
          networksToRender={networksToRender}
          selectedNetwork={selectedNetwork}
        />
      ))}
    </div>
  );
};

NetworksList.propTypes = {
  networkDefaultedToProvider: PropTypes.bool,
  networkIsSelected: PropTypes.bool,
  networksToRender: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRpcUrl: PropTypes.string,
  selectedNetwork: PropTypes.object,
};

export default NetworksList;
