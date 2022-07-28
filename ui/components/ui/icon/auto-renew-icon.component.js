import React from 'react';
import PropTypes from 'prop-types';

export default function AutoRenewIcon({
  className,
  width = '16',
  height = '16',
  color = '#227BFF',
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
        d="M7.99984 3.9998V5.19313C7.99984 5.49313 8.35984 5.6398 8.5665 5.42646L10.4265 3.56646C10.5598 3.43313 10.5598 3.22646 10.4265 3.09313L8.5665 1.23313C8.35984 1.02646 7.99984 1.17313 7.99984 1.47313V2.66646C5.05317 2.66646 2.6665 5.05313 2.6665 7.9998C2.6665 8.69313 2.79984 9.3598 3.0465 9.96646C3.2265 10.4131 3.79984 10.5331 4.13984 10.1931C4.31984 10.0131 4.39317 9.7398 4.29317 9.4998C4.09984 9.0398 3.99984 8.52646 3.99984 7.9998C3.99984 5.79313 5.79317 3.9998 7.99984 3.9998ZM11.8598 5.80646C11.6798 5.98646 11.6065 6.26646 11.7065 6.4998C11.8932 6.96646 11.9998 7.47313 11.9998 7.9998C11.9998 10.2065 10.2065 11.9998 7.99984 11.9998V10.8065C7.99984 10.5065 7.63984 10.3598 7.43317 10.5731L5.57317 12.4331C5.43984 12.5665 5.43984 12.7731 5.57317 12.9065L7.43317 14.7665C7.63984 14.9731 7.99984 14.8265 7.99984 14.5331V13.3331C10.9465 13.3331 13.3332 10.9465 13.3332 7.9998C13.3332 7.30646 13.1998 6.6398 12.9532 6.03313C12.7732 5.58646 12.1998 5.46646 11.8598 5.80646Z"
        fill={color}
      />
    </svg>
  );
}

AutoRenewIcon.propTypes = {
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
