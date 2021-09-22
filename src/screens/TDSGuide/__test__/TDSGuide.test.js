import React from 'react';
import { create, act } from 'react-test-renderer';
import { Text } from 'react-native';

import { TESTID } from '../../../configs/Constants';

import TDSGuide from '../index';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <TDSGuide />
  </SCProvider>
);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

describe('Test TDS Guide', () => {
  test('render tds guide', () => {
    let tree;
    act(() => {
      tree = create(wrapComponent());
    });

    const instance = tree.root;
    const buttonOnActionPress = instance.find(
      (el) => el.props.testID === TESTID.TDS_GUIDE_TITLE && el.type === Text
    );
    expect(buttonOnActionPress).not.toBeUndefined();
  });
});
