import React from 'react';
import PropTypes from 'prop-types';

const Interaction = ({ className, size, color }) => (
  <svg className={className}
    width={size}
    height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.13979 11.8598L3.35979 14.6498C3.16979 14.8498 3.16979 15.1598 3.35979 15.3598L6.13979 18.1498C6.44978 18.4698 6.98978 18.2398 6.98978 17.7998V15.9998H12.9998C13.5498 15.9998 13.9998 15.5498 13.9998 14.9998C13.9998 14.4498 13.5498 13.9998 12.9998 13.9998H6.98978V12.2098C6.98978 11.7598 6.44978 11.5398 6.13979 11.8598ZM20.6498 8.64984L17.8698 5.85984C17.5598 5.53984 17.0198 5.76984 17.0198 6.20984V7.99984H10.9998C10.4498 7.99984 9.99979 8.44984 9.99979 8.99984C9.99979 9.54984 10.4498 9.99984 10.9998 9.99984H17.0098V11.7898C17.0098 12.2398 17.5498 12.4598 17.8598 12.1398L20.6398 9.34984C20.8398 9.15984 20.8398 8.83984 20.6498 8.64984Z" fill={color} />
  </svg>
);

Interaction.defaultProps = {
  className: undefined,
};

Interaction.propTypes = {
  /**
   * Additional className
   */
  className: PropTypes.string,
  /**
   * Size of the icon should adhere to 8px grid. e.g: 8, 16, 24, 32, 40
   */
  size: PropTypes.number.isRequired,
  /**
   * Color of the icon should be a valid design system color and is required
   */
  color: PropTypes.string.isRequired,
};

export default Interaction;
