import React from 'react';
import PropTypes from 'prop-types';

const NetworkPrimaryGradientIcon = ({ className, size = '40' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0001 18.3334C18.1668 18.3334 16.6668 19.8334 16.6668 21.6667C16.6668 23.5001 18.1668 25.0001 20.0001 25.0001C21.8334 25.0001 23.3334 23.5001 23.3334 21.6667C23.3334 19.8334 21.8334 18.3334 20.0001 18.3334ZM30.0001 21.6667C30.0001 15.7334 24.8168 11.0001 18.7501 11.7501C14.3834 12.2834 10.7834 15.7667 10.1168 20.1167C9.56676 23.7001 10.9334 26.9667 13.3334 29.1167C14.1334 29.8334 15.3834 29.6667 15.9334 28.7334L15.9501 28.7167C16.3501 28.0167 16.1834 27.1667 15.5834 26.6167C13.8668 25.0667 12.9334 22.6667 13.5501 20.0501C14.1001 17.6834 16.0168 15.7667 18.3834 15.2001C22.7501 14.1501 26.6668 17.4501 26.6668 21.6667C26.6668 23.6334 25.8001 25.3834 24.4501 26.6001C23.8501 27.1334 23.6668 28.0001 24.0668 28.7001L24.0834 28.7167C24.6001 29.6001 25.8001 29.8667 26.5834 29.1834C28.6668 27.3501 30.0001 24.6667 30.0001 21.6667ZM18.0501 5.11674C10.3501 5.98341 4.13342 12.3334 3.41676 20.0501C2.83342 26.2167 5.61676 31.7501 10.1168 35.0667C10.9168 35.6501 12.0501 35.4001 12.5501 34.5501C12.9668 33.8334 12.7834 32.9001 12.1168 32.4001C8.31676 29.5834 6.03342 24.8167 6.85009 19.5667C7.75009 13.7334 12.6168 9.08341 18.4834 8.43341C26.5168 7.51674 33.3334 13.8001 33.3334 21.6667C33.3334 26.0834 31.1834 29.9667 27.8834 32.4001C27.2168 32.9001 27.0334 33.8167 27.4501 34.5501C27.9501 35.4167 29.0834 35.6501 29.8834 35.0667C34.0001 32.0334 36.6668 27.1667 36.6668 21.6667C36.6668 11.8167 28.1168 3.96674 18.0501 5.11674Z"
      fill="url(#paint0_linear_503_2030)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_503_2030"
        x1="3.33984"
        y1="14.9377"
        x2="35.7438"
        y2="29.2916"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#451DFF" />
        <stop offset="1" stopColor="#FF1D7C" />
      </linearGradient>
    </defs>
  </svg>
);

NetworkPrimaryGradientIcon.defaultProps = {
  className: undefined,
};

NetworkPrimaryGradientIcon.propTypes = {
  /**
   * Additional className
   */
  className: PropTypes.string,
  /**
   * Size of the icon should adhere to 8px grid. e.g: 8, 16, 24, 32, 40
   */
  size: PropTypes.number,
  /**
   * Color of the icon should be a valid design system color and is required
   */
};

export default NetworkPrimaryGradientIcon;
