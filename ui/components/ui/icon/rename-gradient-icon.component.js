import React from 'react';
import PropTypes from 'prop-types';

const RenameGradientIcon = ({ className, size }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 29.1V34.1667C5 34.6334 5.36667 35 5.83333 35H10.9C11.1167 35 11.3333 34.9167 11.4833 34.75L29.6833 16.5667L23.4333 10.3167L5.25 28.5C5.08333 28.6667 5 28.8667 5 29.1ZM34.5167 11.7333C35.1667 11.0834 35.1667 10.0333 34.5167 9.38335L30.6167 5.48335C29.9667 4.83335 28.9167 4.83335 28.2667 5.48335L25.2167 8.53335L31.4667 14.7833L34.5167 11.7333Z"
      fill="url(#paint0_linear_115_12713)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_115_12713"
        x1="6.44251"
        y1="4.9959"
        x2="27.3056"
        y2="5.3861"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#227BFF" />
        <stop offset="1" stopColor="#451DFF" />
      </linearGradient>
    </defs>
  </svg>
);

RenameGradientIcon.defaultProps = {
  className: undefined,
};

RenameGradientIcon.propTypes = {
  /**
   * Additional className
   */
  className: PropTypes.string,
  /**
   * Size of the icon should adhere to 8px grid. e.g: 8, 16, 24, 32, 40 and is required
   */
  size: PropTypes.number.isRequired,
};

export default RenameGradientIcon;
