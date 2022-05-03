import React from 'react';
import PropTypes from 'prop-types';

export default function RemoveOutlineIcon({
  className,
  width = '16',
  height = '16',
  color = '#222222',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.66659 8.00016C4.66659 8.36683 4.96659 8.66683 5.33325 8.66683H10.6666C11.0333 8.66683 11.3333 8.36683 11.3333 8.00016C11.3333 7.6335 11.0333 7.3335 10.6666 7.3335H5.33325C4.96659 7.3335 4.66659 7.6335 4.66659 8.00016ZM7.99992 1.3335C4.31992 1.3335 1.33325 4.32016 1.33325 8.00016C1.33325 11.6802 4.31992 14.6668 7.99992 14.6668C11.6799 14.6668 14.6666 11.6802 14.6666 8.00016C14.6666 4.32016 11.6799 1.3335 7.99992 1.3335ZM7.99992 13.3335C5.05992 13.3335 2.66659 10.9402 2.66659 8.00016C2.66659 5.06016 5.05992 2.66683 7.99992 2.66683C10.9399 2.66683 13.3333 5.06016 13.3333 8.00016C13.3333 10.9402 10.9399 13.3335 7.99992 13.3335Z" fill={color} />
    </svg>

  );
}

RemoveOutlineIcon.propTypes = {
  className: PropTypes.object,
  /**
   * Width of the icon
   */
  width: PropTypes.string,
  /**
   * Height of the icon
   */
  height: PropTypes.string,
  /**
   * Color of the icon should be a valid design system color
   */
  color: PropTypes.string,
};
