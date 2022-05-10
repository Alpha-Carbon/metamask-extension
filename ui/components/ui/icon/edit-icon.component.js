import React from 'react';
import PropTypes from 'prop-types';

export default function EditIcon({
  width = '16',
  height = '16',
  color = 'black',
}) {
  return (
    <svg width={width}
      height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11.6402V13.6669C2 13.8535 2.14667 14.0002 2.33333 14.0002H4.36C4.44667 14.0002 4.53333 13.9669 4.59333 13.9002L11.8733 6.62687L9.37333 4.12687L2.1 11.4002C2.03333 11.4669 2 11.5469 2 11.6402ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill={color} />
    </svg>
  );
}

EditIcon.propTypes = {
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
