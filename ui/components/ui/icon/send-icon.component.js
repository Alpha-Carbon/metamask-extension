import React from 'react';
import PropTypes from 'prop-types';

const Send = ({ className, size, color }) => (
  <svg
    className={className}
    width={size}
    height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1186_2670)">
      <path d="M19.37 4.00012H13.97C13.8338 4.00126 13.7009 4.04269 13.5882 4.11921C13.4755 4.19573 13.3879 4.3039 13.3366 4.4301C13.2853 4.55629 13.2724 4.69486 13.2997 4.82833C13.327 4.96181 13.3932 5.0842 13.49 5.18011L15.49 7.18011L4.28998 18.4201C4.18529 18.5098 4.10027 18.6201 4.04025 18.7442C3.98023 18.8682 3.94649 19.0033 3.94117 19.1411C3.93586 19.2788 3.95906 19.4161 4.00934 19.5444C4.05961 19.6728 4.13588 19.7893 4.23333 19.8868C4.33079 19.9842 4.44733 20.0605 4.57565 20.1108C4.70398 20.161 4.84131 20.1842 4.97903 20.1789C5.11675 20.1736 5.25188 20.1399 5.37594 20.0798C5.50001 20.0198 5.61033 19.9348 5.69998 19.8301L16.9 8.63012L18.9 10.6301C18.993 10.7301 19.1144 10.7992 19.2478 10.8283C19.3813 10.8573 19.5204 10.8449 19.6466 10.7927C19.7728 10.7405 19.88 10.651 19.9539 10.5361C20.0277 10.4213 20.0648 10.2866 20.06 10.1501V4.74012C20.0684 4.64506 20.0568 4.54928 20.0257 4.45903C19.9947 4.36877 19.9451 4.28606 19.88 4.21626C19.8149 4.14646 19.7359 4.09114 19.648 4.05391C19.5601 4.01667 19.4654 3.99834 19.37 4.00012Z" fill={color} />
    </g>
  </svg>
);

Send.defaultProps = {
  className: undefined,
  size: '17',
};

Send.propTypes = {
  /**
   * Additional className
   */
  className: PropTypes.string,
  /**
   * Size of the icon should adhere to 8px grid. e.g: 8, 16, 24, 32, 40 and is required
   */
  size: PropTypes.number.isRequired,
  /**
   * Color of the icon should be a valid design system color and is required
   */
  color: PropTypes.string.isRequired,
};

export default Send;
