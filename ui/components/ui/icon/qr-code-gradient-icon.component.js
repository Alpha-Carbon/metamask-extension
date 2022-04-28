import React from 'react';
import PropTypes from 'prop-types';

export default function QrCodeGradient({
  width = '34',
  height = '34',
  className,
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8335 7.83325V12.8333H7.8335V7.83325H12.8335ZM15.3335 5.33325H5.3335V15.3333H15.3335V5.33325ZM12.8335 21.1666V26.1666H7.8335V21.1666H12.8335ZM15.3335 18.6666H5.3335V28.6666H15.3335V18.6666ZM26.1668 7.83325V12.8333H21.1668V7.83325H26.1668ZM28.6668 5.33325H18.6668V15.3333H28.6668V5.33325ZM18.6668 18.6666H21.1668V21.1666H18.6668V18.6666ZM21.1668 21.1666H23.6668V23.6666H21.1668V21.1666ZM23.6668 18.6666H26.1668V21.1666H23.6668V18.6666ZM18.6668 23.6666H21.1668V26.1666H18.6668V23.6666ZM21.1668 26.1666H23.6668V28.6666H21.1668V26.1666ZM23.6668 23.6666H26.1668V26.1666H23.6668V23.6666ZM26.1668 21.1666H28.6668V23.6666H26.1668V21.1666ZM26.1668 26.1666H28.6668V28.6666H26.1668V26.1666ZM32.0002 8.66659C31.0835 8.66659 30.3335 7.91659 30.3335 6.99992V3.66659H27.0002C26.0835 3.66659 25.3335 2.91659 25.3335 1.99992C25.3335 1.08325 26.0835 0.333252 27.0002 0.333252H32.0002C32.9168 0.333252 33.6668 1.08325 33.6668 1.99992V6.99992C33.6668 7.91659 32.9168 8.66659 32.0002 8.66659ZM33.6668 31.9999V26.9999C33.6668 26.0833 32.9168 25.3333 32.0002 25.3333C31.0835 25.3333 30.3335 26.0833 30.3335 26.9999V30.3333H27.0002C26.0835 30.3333 25.3335 31.0833 25.3335 31.9999C25.3335 32.9166 26.0835 33.6666 27.0002 33.6666H32.0002C32.9168 33.6666 33.6668 32.9166 33.6668 31.9999ZM2.00016 33.6666H7.00016C7.91683 33.6666 8.66683 32.9166 8.66683 31.9999C8.66683 31.0833 7.91683 30.3333 7.00016 30.3333H3.66683V26.9999C3.66683 26.0833 2.91683 25.3333 2.00016 25.3333C1.0835 25.3333 0.333496 26.0833 0.333496 26.9999V31.9999C0.333496 32.9166 1.0835 33.6666 2.00016 33.6666ZM0.333496 1.99992V6.99992C0.333496 7.91659 1.0835 8.66659 2.00016 8.66659C2.91683 8.66659 3.66683 7.91659 3.66683 6.99992V3.66659H7.00016C7.91683 3.66659 8.66683 2.91659 8.66683 1.99992C8.66683 1.08325 7.91683 0.333252 7.00016 0.333252H2.00016C1.0835 0.333252 0.333496 1.08325 0.333496 1.99992Z" fill="url(#paint0_linear_1161_401)" />
      <defs>
        <linearGradient id="paint0_linear_1161_401" x1="0.333496" y1="11.2307" x2="33.6668" y2="24.6922" gradientUnits="userSpaceOnUse">
          <stop stop-color="#451DFF" />
          <stop offset="1" stop-color="#FF1D7C" />
        </linearGradient>
      </defs>
    </svg>

  );
}

QrCodeGradient.propTypes = {
  /**
   * Width of the icon
   */
  width: PropTypes.string,
  /**
   * Height of the icon
   */
  height: PropTypes.string,
  className: PropTypes.string,
};
