import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DropdownBridge = ({
  className,
  disabled = false,
  onChange,
  options,
  selectedOption = null,
  style,
  title,
}) => {
  const _onChange = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <select
      className={classnames('bridge-dropdown', className)}
      disabled={disabled}
      title={title}
      onChange={_onChange}
      style={style}
      value={selectedOption}
    >
      <option value="" disabled key="select">
        Select
      </option>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        );
      })}
    </select>
  );
};

DropdownBridge.propTypes = {
  /**
   * Additional css className to add to root of Dropdown component
   */
  className: PropTypes.string,
  /**
   * Disable dropdown by setting to true
   */
  disabled: PropTypes.bool,
  /**
   * Title of the dropdown
   */
  title: PropTypes.string,
  /**
   * On options change handler
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Predefined options for component
   */
  options: PropTypes.arrayOf(
    PropTypes.exact({
      chainId: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
      meta: PropTypes.object,
    }),
  ).isRequired,
  /**
   * Selected options of dropdown
   */
  selectedOption: PropTypes.string,
  /**
   * Add inline style for the component
   */
  style: PropTypes.object,
};

export default DropdownBridge;
