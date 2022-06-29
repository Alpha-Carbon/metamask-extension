import React from 'react';
import PropTypes from 'prop-types';

const BridgeIcon = ({ className, size, color }) => (
  <svg className={className}
    width={size}
    height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10C8.14 10 5 13.14 5 17H7C7 14.24 9.24 12 12 12C14.76 12 17 14.24 17 17H19C19 13.14 15.86 10 12 10ZM12 6C5.93 6 1 10.93 1 17H3C3 12.04 7.04 8 12 8C16.96 8 21 12.04 21 17H23C23 10.93 18.07 6 12 6Z" fill={color} />
  </svg>

);

BridgeIcon.defaultProps = {
  className: undefined,
  size: '17',
  color: 'white'
};

BridgeIcon.propTypes = {
  /**
   * Additional className
   */
  className: PropTypes.string,
  /**
   * Size of the icon should adhere to 8px grid. e.g: 8, 16, 24, 32, 40 and is required
   */
  size: PropTypes.number.isRequired,
  /**
   * Color of the icon should be a valid design system color and is required
   */
  color: PropTypes.string.isRequired,
};

export default BridgeIcon;
