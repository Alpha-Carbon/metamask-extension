import React from 'react';
import PropTypes from 'prop-types';

const ReceiveGradient = ({ className, size }) => (
  <svg className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.6498 21.6667H21.6665V6.66667C21.6665 5.75 20.9165 5 19.9998 5C19.0832 5 18.3332 5.75 18.3332 6.66667V21.6667H15.3498C14.5998 21.6667 14.2332 22.5667 14.7665 23.0833L19.4165 27.7333C19.7498 28.0667 20.2665 28.0667 20.5998 27.7333L25.2498 23.0833C25.7665 22.5667 25.3998 21.6667 24.6498 21.6667ZM6.6665 33.3333C6.6665 34.25 7.4165 35 8.33317 35H31.6665C32.5832 35 33.3332 34.25 33.3332 33.3333C33.3332 32.4167 32.5832 31.6667 31.6665 31.6667H8.33317C7.4165 31.6667 6.6665 32.4167 6.6665 33.3333Z" fill="url(#paint0_linear_215_380)" />
    <defs>
      <linearGradient id="paint0_linear_215_380" x1="6.6665" y1="14.8077" x2="34.1417" y2="24.6706" gradientUnits="userSpaceOnUse">
        <stop stop-color="#451DFF" />
        <stop offset="1" stop-color="#FF1D7C" />
      </linearGradient>
    </defs>
  </svg>

);

ReceiveGradient.defaultProps = {
  className: undefined,
};

ReceiveGradient.propTypes = {
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

export default ReceiveGradient;
