/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { useSelector } from 'react-redux';
import { act, create } from 'react-test-renderer';
import AQIGuide from '..';
import Text from '../../../commons/Text';
import { TESTID } from '../../../configs/Constants';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

describe('test AQIGuide', () => {
  beforeEach(() => {
    const localState = {
      language: 'en',
    };
    useSelector.mockImplementation((cb) => {
      return cb(localState);
    });
  });

  test('render', async () => {
    let tree;
    act(() => {
      tree = create(<AQIGuide />);
    });

    const instance = tree.root;
    const mainTitles = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AQI_GUIDE_MAIN_TITLE && el.type === Text
    );
    const uvindexTitles = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AQI_GUIDE_UVINDEX_TITLE && el.type === Text
    );
    expect(mainTitles).toHaveLength(2);
    expect(uvindexTitles).toHaveLength(6);
  });
});
