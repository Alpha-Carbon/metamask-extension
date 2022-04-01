import React from 'react';
import PropTypes from 'prop-types';
import ReactToggleButton from 'react-toggle-button';
import classnames from 'classnames';

const trackStyle = {
  width: '40px',
  height: '24px',
  padding: '0px',
  borderRadius: '30px',
  // border: '2px solid rgb(3, 125, 214)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(91.07deg, #227BFF 4.72%, #451DFF 73%)',
};

const offTrackStyle = {
  ...trackStyle,
  // border: '2px solid #8E8E8E',
  background: '#BABABA',
};

const thumbStyle = {
  width: '18px',
  height: '18px',
  display: 'flex',
  boxShadow: 'none',
  alignSelf: 'center',
  borderRadius: '50%',
  position: 'relative',
};

const colors = {
  activeThumb: {
    // base: '#037DD6',
    base: '#FFFFFF',
  },
  inactiveThumb: {
    // base: '#6A737D',
    base: '#FFFFFF',
  },
  active: {
    base: '#ffffff',
    hover: '#ffffff',
  },
  inactive: {
    base: '#DADADA',
    hover: '#DADADA',
  },
};

const ToggleButton = (props) => {
  const { value, onToggle, offLabel, onLabel, disabled, className } = props;

  const modifier = value ? 'on' : 'off';

  return (
    <div
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onToggle(value);
        }
      }}
      className={classnames(
        'toggle-button',
        `toggle-button--${modifier}`,
        {
          'toggle-button--disabled': disabled,
        },
        className,
      )}
    >
      <ReactToggleButton
        value={value}
        onToggle={disabled ? undefined : onToggle}
        activeLabel=""
        inactiveLabel=""
        trackStyle={value ? trackStyle : offTrackStyle}
        thumbStyle={thumbStyle}
        thumbAnimateRange={[3, 18]}
        colors={colors}
        fullWidth
      />
      <div className="toggle-button__status">
        <span className="toggle-button__label-off">{offLabel}</span>
        <span className="toggle-button__label-on">{onLabel}</span>
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  /**
   * ToggleButton value
   */
  value: PropTypes.bool,
  /**
   * The onChange handler of the ToggleButton
   */
  onToggle: PropTypes.func,
  /**
   * Label text when toggle is off
   */
  offLabel: PropTypes.string,
  /**
   * Label text when toggle is on
   */
  onLabel: PropTypes.string,
  /**
   * Disables ToggleButton if true. Set to false as default
   */
  disabled: PropTypes.bool,
  /**
   * Additional className to add to the ToggleButton
   */
  className: PropTypes.string,
};

export default ToggleButton;
