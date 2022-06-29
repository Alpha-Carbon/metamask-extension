import React from 'react';
import PropTypes from 'prop-types';

const HistoryPrimaryGradientIcon = ({ className, size }) => (
  <svg className={className}
    width={size}
    height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.83969 1.99989C5.44636 1.90655 2.66636 4.63322 2.66636 7.99989H1.47303C1.17303 7.99989 1.02636 8.35989 1.23969 8.56655L3.09969 10.4332C3.23303 10.5666 3.43969 10.5666 3.57303 10.4332L5.43303 8.56655C5.63969 8.35989 5.49303 7.99989 5.19303 7.99989H3.99969C3.99969 5.39989 6.1197 3.29989 8.73303 3.33322C11.213 3.36655 13.2997 5.45322 13.333 7.93322C13.3664 10.5399 11.2664 12.6666 8.66636 12.6666C7.59303 12.6666 6.5997 12.2999 5.81303 11.6799C5.54636 11.4732 5.17303 11.4932 4.93303 11.7332C4.65303 12.0132 4.67303 12.4866 4.98636 12.7266C5.99969 13.5266 7.27303 13.9999 8.66636 13.9999C12.033 13.9999 14.7597 11.2199 14.6664 7.82655C14.5797 4.69989 11.9664 2.08655 8.83969 1.99989ZM8.49969 5.33322C8.22636 5.33322 7.99969 5.55989 7.99969 5.83322V8.28655C7.99969 8.51989 8.12636 8.73989 8.32636 8.85989L10.4064 10.0932C10.6464 10.2332 10.953 10.1532 11.093 9.91989C11.233 9.67989 11.153 9.37322 10.9197 9.23322L8.99969 8.09322V5.82655C8.99969 5.55989 8.77303 5.33322 8.49969 5.33322Z" fill="url(#paint0_linear_1731_2579)" />
    <defs>
      <linearGradient id="paint0_linear_1731_2579" x1="1.13867" y1="1.99756" x2="14.0156" y2="1.33365" gradientUnits="userSpaceOnUse">
        <stop stop-color="#227BFF" />
        <stop offset="1" stop-color="#451DFF" />
      </linearGradient>
    </defs>
  </svg>

);

HistoryPrimaryGradientIcon.defaultProps = {
  className: undefined,
  size: '16',
};

HistoryPrimaryGradientIcon.propTypes = {
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

export default HistoryPrimaryGradientIcon;
