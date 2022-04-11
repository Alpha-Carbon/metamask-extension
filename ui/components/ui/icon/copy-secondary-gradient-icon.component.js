import React from 'react';
import PropTypes from 'prop-types';

const CopySecondaryGradientIcon = ({ className, size }) => (
  <svg className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.8">
      <path d="M7.5 0.5H2C1.45 0.5 1 0.95 1 1.5V8C1 8.275 1.225 8.5 1.5 8.5C1.775 8.5 2 8.275 2 8V2C2 1.725 2.225 1.5 2.5 1.5H7.5C7.775 1.5 8 1.275 8 1C8 0.725 7.775 0.5 7.5 0.5ZM9.5 2.5H4C3.45 2.5 3 2.95 3 3.5V10.5C3 11.05 3.45 11.5 4 11.5H9.5C10.05 11.5 10.5 11.05 10.5 10.5V3.5C10.5 2.95 10.05 2.5 9.5 2.5ZM9 10.5H4.5C4.225 10.5 4 10.275 4 10V4C4 3.725 4.225 3.5 4.5 3.5H9C9.275 3.5 9.5 3.725 9.5 4V10C9.5 10.275 9.275 10.5 9 10.5Z" fill="url(#paint0_linear_215_376)" />
    </g>
    <defs>
      <linearGradient id="paint0_linear_215_376" x1="1" y1="4.09615" x2="10.851" y2="7.53196" gradientUnits="userSpaceOnUse">
        <stop stop-color="#451DFF" />
        <stop offset="1" stop-color="#FF1D7C" />
      </linearGradient>
    </defs>
  </svg>
);

CopySecondaryGradientIcon.defaultProps = {
  className: undefined,
};

CopySecondaryGradientIcon.propTypes = {
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
};

export default CopySecondaryGradientIcon;
