import React from 'react';
import { mount } from 'enzyme';
import AlphaCarbonLogo from '.';

describe('MetaFoxLogo', () => {
  it('sets icon height and width to 42 by default', () => {
    const wrapper = mount(<AlphaCarbonLogo />);

    expect(
      wrapper.find('img.app-header__metafox-logo--icon').prop('width'),
    ).toStrictEqual(42);
    expect(
      wrapper.find('img.app-header__metafox-logo--icon').prop('height'),
    ).toStrictEqual(42);
  });

  it('does not set icon height and width when unsetIconHeight is true', () => {
    const wrapper = mount(<AlphaCarbonLogo unsetIconHeight />);

    expect(
      wrapper.find('img.app-header__metafox-logo--icon').prop('width'),
    ).toBeUndefined();
    expect(
      wrapper.find('img.app-header__metafox-logo--icon').prop('height'),
    ).toBeUndefined();
  });
});
