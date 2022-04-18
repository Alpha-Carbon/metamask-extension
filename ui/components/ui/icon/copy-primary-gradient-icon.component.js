import React from 'react';
import PropTypes from 'prop-types';

const CopyPrimaryGradientIcon = ({ className, size }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99967 0.666992H2.66634C1.93301 0.666992 1.33301 1.26699 1.33301 2.00033V10.667C1.33301 11.0337 1.63301 11.3337 1.99967 11.3337C2.36634 11.3337 2.66634 11.0337 2.66634 10.667V2.66699C2.66634 2.30033 2.96634 2.00033 3.33301 2.00033H9.99967C10.3663 2.00033 10.6663 1.70033 10.6663 1.33366C10.6663 0.966992 10.3663 0.666992 9.99967 0.666992ZM12.6663 3.33366H5.33301C4.59967 3.33366 3.99967 3.93366 3.99967 4.66699V14.0003C3.99967 14.7337 4.59967 15.3337 5.33301 15.3337H12.6663C13.3997 15.3337 13.9997 14.7337 13.9997 14.0003V4.66699C13.9997 3.93366 13.3997 3.33366 12.6663 3.33366ZM11.9997 14.0003H5.99967C5.63301 14.0003 5.33301 13.7003 5.33301 13.3337V5.33366C5.33301 4.96699 5.63301 4.66699 5.99967 4.66699H11.9997C12.3663 4.66699 12.6663 4.96699 12.6663 5.33366V13.3337C12.6663 13.7003 12.3663 14.0003 11.9997 14.0003Z"
      fill="url(#paint0_linear_996_1592)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_996_1592"
        x1="1.94198"
        y1="0.667019"
        x2="10.7504"
        y2="0.809297"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#227BFF" />
        <stop offset="1" stopColor="#451DFF" />
      </linearGradient>
    </defs>
  </svg>
);

CopyPrimaryGradientIcon.defaultProps = {
  className: undefined,
};

CopyPrimaryGradientIcon.propTypes = {
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

export default CopyPrimaryGradientIcon;
