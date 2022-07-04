import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dropdown from 'react-dropdown';
import { I18nContext } from '../../../contexts/i18n';

const DropdownCustom = ({
  className,
  onChange,
  options,
  defaultOption,
}) => {
  const t = useContext(I18nContext);

  const _onChange = (e) => {
    onChange(e.value)
  }

  return (
    <Dropdown
      className={classnames('dropdown-select', className)}
      options={options}
      value={defaultOption}
      arrowClassName='dropdown-arrow'
      onChange={_onChange}
      placeholder={t('swapSelect')}

    />
  );
};

DropdownCustom.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  defaultOption: PropTypes.string,
};

export default DropdownCustom;
