import React from 'react';
import { shallow } from 'enzyme';
import UserInput from './UserInput';

describe('<UserInput />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<UserInput />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
