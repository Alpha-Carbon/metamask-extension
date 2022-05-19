import React from 'react';
import PropTypes from 'prop-types';

export default function AccountTreeIcon({
  className,
  width = '24',
  height = '24',
  color = '#BABABA'
}) {
  return (
    <svg className={className}
      width={width}
      height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11V3H15V6H9V3H2V11H9V8H11V18H15V21H22V13H15V16H13V8H15V11H22ZM7 9H4V5H7V9ZM17 15H20V19H17V15ZM17 5H20V9H17V5Z" fill={color} />
    </svg>

  );
}

AccountTreeIcon.propTypes = {
  className: PropTypes.object,
  /**
   * Width of the icon
   */
  width: PropTypes.string,
  /**
   * Height of the icon
   */
  height: PropTypes.string,
  color: PropTypes.string,
};
