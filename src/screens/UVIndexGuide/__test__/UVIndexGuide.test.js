import React from 'react';
import { create, act } from 'react-test-renderer';
import { Text } from 'react-native';

import { TESTID } from '../../../configs/Constants';

import UVIndexGuide from '../index';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

describe('Test UV Index Guide', () => {
  test('render UV Index Guide', async () => {
    let tree;
    act(() => {
      tree = create(<UVIndexGuide />);
    });

    const instance = tree.root;
    const uvIndexTitle = instance.findAll(
      (el) =>
        el.props.testID === TESTID.UV_INDEX_GUIDE_TITLE && el.type === Text
    );
    expect(uvIndexTitle).not.toBeUndefined();
  });
});
