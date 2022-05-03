import React from 'react';
import PropTypes from 'prop-types';

export default function NetworkTreeIcon({
  className,
  width = '34',
  height = '30',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height} viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.6666 13.3333V0H21.9999V5H11.9999V0H0.333252V13.3333H11.9999V8.33333H15.3333V25H21.9999V30H33.6666V16.6667H21.9999V21.6667H18.6666V8.33333H21.9999V13.3333H33.6666ZM8.66659 10H3.66659V3.33333H8.66659V10ZM25.3333 20H30.3333V26.6667H25.3333V20ZM25.3333 3.33333H30.3333V10H25.3333V3.33333Z" fill="url(#paint0_linear_1211_417)" />
      <defs>
        <linearGradient id="paint0_linear_1211_417" x1="0.333252" y1="9.80769" x2="32.6051" y2="24.2887" gradientUnits="userSpaceOnUse">
          <stop stop-color="#451DFF" />
          <stop offset="1" stop-color="#FF1D7C" />
        </linearGradient>
      </defs>
    </svg>

  );
}

NetworkTreeIcon.propTypes = {
  className: PropTypes.string,
  /**
   * Width of the icon
   */
  width: PropTypes.string,
  /**
   * Height of the icon
   */
  height: PropTypes.string,
};
