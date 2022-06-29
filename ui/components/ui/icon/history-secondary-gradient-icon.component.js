import React from 'react';
import PropTypes from 'prop-types';

const HistorySecondaryGradientIcon = ({ className, size }) => (
  <svg className={className}
    width={size}
    height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.1002 4.99996C13.6169 4.76662 6.66688 11.5833 6.66688 20H3.68355C2.93355 20 2.56688 20.9 3.10021 21.4166L7.75021 26.0833C8.08355 26.4166 8.60021 26.4166 8.93355 26.0833L13.5835 21.4166C14.1002 20.9 13.7335 20 12.9835 20H10.0002C10.0002 13.5 15.3002 8.24996 21.8335 8.33329C28.0335 8.41662 33.2502 13.6333 33.3335 19.8333C33.4169 26.35 28.1669 31.6666 21.6669 31.6666C18.9835 31.6666 16.5002 30.75 14.5335 29.2C13.8669 28.6833 12.9335 28.7333 12.3335 29.3333C11.6335 30.0333 11.6835 31.2166 12.4669 31.8166C15.0002 33.8166 18.1835 35 21.6669 35C30.0835 35 36.9002 28.05 36.6669 19.5666C36.4502 11.75 29.9169 5.21662 22.1002 4.99996ZM21.2502 13.3333C20.5669 13.3333 20.0002 13.9 20.0002 14.5833V20.7166C20.0002 21.3 20.3169 21.85 20.8169 22.15L26.0169 25.2333C26.6169 25.5833 27.3835 25.3833 27.7335 24.8C28.0835 24.2 27.8835 23.4333 27.3002 23.0833L22.5002 20.2333V14.5666C22.5002 13.9 21.9335 13.3333 21.2502 13.3333Z" fill="url(#paint0_linear_1731_3091)" />
    <defs>
      <linearGradient id="paint0_linear_1731_3091" x1="2.84766" y1="14.8037" x2="35.4354" y2="29.6393" gradientUnits="userSpaceOnUse">
        <stop stop-color="#451DFF" />
        <stop offset="1" stop-color="#FF1D7C" />
      </linearGradient>
    </defs>
  </svg>
);

HistorySecondaryGradientIcon.defaultProps = {
  className: undefined,
  size: '40',
};

HistorySecondaryGradientIcon.propTypes = {
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

export default HistorySecondaryGradientIcon;
