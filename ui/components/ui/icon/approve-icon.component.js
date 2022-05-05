import React from 'react';
import PropTypes from 'prop-types';

const Approve = ({ className, size, color }) => (
  <svg className={className}
    width={size}
    height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.3001 6.2998C16.9101 5.9098 16.2801 5.9098 15.8901 6.2998L10.2501 11.9398L11.6601 13.3498L17.3001 7.6998C17.6801 7.3198 17.6801 6.6798 17.3001 6.2998ZM21.5401 6.2898L11.6601 16.1698L8.18014 12.6998C7.79014 12.3098 7.16014 12.3098 6.77014 12.6998C6.38014 13.0898 6.38014 13.7198 6.77014 14.1098L10.9501 18.2898C11.3401 18.6798 11.9701 18.6798 12.3601 18.2898L22.9501 7.7098C23.3401 7.3198 23.3401 6.6898 22.9501 6.2998H22.9401C22.5601 5.8998 21.9301 5.8998 21.5401 6.2898ZM1.12014 14.1198L5.30014 18.2998C5.69014 18.6898 6.32014 18.6898 6.71014 18.2998L7.41014 17.5998L2.53014 12.6998C2.14014 12.3098 1.51014 12.3098 1.12014 12.6998C0.730137 13.0898 0.730137 13.7298 1.12014 14.1198Z" fill={color} />
  </svg>

);

Approve.defaultProps = {
  className: undefined,
};

Approve.propTypes = {
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

export default Approve;
