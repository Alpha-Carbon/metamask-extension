import React from 'react';
import PropTypes from 'prop-types';

export default function HelpOutLineIcon({
  className,
  width = '16',
  height = '16',
  color = '#222222',
}) {
  return (
    <svg className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.00016 1.3335C4.32016 1.3335 1.3335 4.32016 1.3335 8.00016C1.3335 11.6802 4.32016 14.6668 8.00016 14.6668C11.6802 14.6668 14.6668 11.6802 14.6668 8.00016C14.6668 4.32016 11.6802 1.3335 8.00016 1.3335ZM8.00016 13.3335C5.06016 13.3335 2.66683 10.9402 2.66683 8.00016C2.66683 5.06016 5.06016 2.66683 8.00016 2.66683C10.9402 2.66683 13.3335 5.06016 13.3335 8.00016C13.3335 10.9402 10.9402 13.3335 8.00016 13.3335ZM7.3335 10.6668H8.66683V12.0002H7.3335V10.6668ZM8.40683 4.02683C7.0335 3.82683 5.82016 4.6735 5.4535 5.88683C5.3335 6.2735 5.62683 6.66683 6.0335 6.66683H6.16683C6.44016 6.66683 6.66016 6.4735 6.7535 6.22016C6.96683 5.62683 7.60016 5.22016 8.28683 5.36683C8.92016 5.50016 9.38683 6.12016 9.3335 6.76683C9.26683 7.66016 8.2535 7.8535 7.70016 8.68683C7.70016 8.6935 7.6935 8.6935 7.6935 8.70016C7.68683 8.7135 7.68016 8.72016 7.6735 8.7335C7.6135 8.8335 7.5535 8.94683 7.50683 9.06683C7.50016 9.08683 7.48683 9.10016 7.48016 9.12016C7.4735 9.1335 7.4735 9.14683 7.46683 9.16683C7.38683 9.3935 7.3335 9.66683 7.3335 10.0002H8.66683C8.66683 9.72016 8.74016 9.48683 8.8535 9.28683C8.86683 9.26683 8.8735 9.24683 8.88683 9.22683C8.94016 9.1335 9.00683 9.04683 9.0735 8.96683C9.08016 8.96016 9.08683 8.94683 9.0935 8.94016C9.16016 8.86016 9.2335 8.78683 9.3135 8.7135C9.9535 8.10683 10.8202 7.6135 10.6402 6.34016C10.4802 5.18016 9.56683 4.20016 8.40683 4.02683Z" fill={color} />
    </svg>


  );
}

HelpOutLineIcon.propTypes = {
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
