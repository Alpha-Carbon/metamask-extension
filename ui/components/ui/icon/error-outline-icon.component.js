import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorOutlineIcon({
  className,
  width = '16',
  height = '16',
  color = '#525252',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00016 4.66634C8.36683 4.66634 8.66683 4.96634 8.66683 5.33301V7.99967C8.66683 8.36634 8.36683 8.66634 8.00016 8.66634C7.6335 8.66634 7.3335 8.36634 7.3335 7.99967V5.33301C7.3335 4.96634 7.6335 4.66634 8.00016 4.66634ZM7.9935 1.33301C4.3135 1.33301 1.3335 4.31967 1.3335 7.99967C1.3335 11.6797 4.3135 14.6663 7.9935 14.6663C11.6802 14.6663 14.6668 11.6797 14.6668 7.99967C14.6668 4.31967 11.6802 1.33301 7.9935 1.33301ZM8.00016 13.333C5.0535 13.333 2.66683 10.9463 2.66683 7.99967C2.66683 5.05301 5.0535 2.66634 8.00016 2.66634C10.9468 2.66634 13.3335 5.05301 13.3335 7.99967C13.3335 10.9463 10.9468 13.333 8.00016 13.333ZM8.66683 11.333H7.3335V9.99967H8.66683V11.333Z"
        fill={color}
      />
    </svg>
  );
}

ErrorOutlineIcon.propTypes = {
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
