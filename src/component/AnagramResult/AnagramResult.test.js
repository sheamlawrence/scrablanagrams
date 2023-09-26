import React from 'react';
import { shallow } from 'enzyme';
import AnagramResult from './AnagramResult';

describe('<AnagramResult />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<AnagramResult />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
