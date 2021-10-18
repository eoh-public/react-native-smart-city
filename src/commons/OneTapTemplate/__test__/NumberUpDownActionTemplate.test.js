import React from 'react';
import { create, act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import NumberUpDownActionTemplate from '../NumberUpDownActionTemplate';

import { TouchableOpacity } from 'react-native';
import Text from '../../Text';
import { TESTID } from '../../../configs/Constants';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockOnSelectAction = jest.fn();

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <NumberUpDownActionTemplate
      data={data}
      onSelectAction={mockOnSelectAction}
    />
  </SCProvider>
);

describe('Test NumberUpDownActionTemplate', () => {
  let tree;
  let data = {
    title: '',
    template: 'NumberUpDownActionTemplate',
    configuration: {
      keep_track_config: true,
      config: 1023,
      action: 'b498234c-6c1a-452d-a1d1-87a314c20528',
      min_value: 16,
      max_value: 30,
      text_format: '{number} *C',
    },
  };
  test('Test onPressDown', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const touchableOpacity = instance.find(
      (item) =>
        item.props.testID === TESTID.NUMBER_UP_DOWN_ACTION_DOWN &&
        item.type === TouchableOpacity
    );
    const textElement = instance.find(
      (item) =>
        item.props.testID === TESTID.NUMBER_UP_DOWN_ACTION_TEXT &&
        item.type === Text
    );
    act(() => {
      touchableOpacity.props.onPress();
    });
    expect(textElement.props.children).toEqual('27 *C');
  });

  test('Test onPressUp', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const touchableOpacity = instance.find(
      (item) =>
        item.props.testID === TESTID.NUMBER_UP_DOWN_ACTION_UP &&
        item.type === TouchableOpacity
    );
    const textElement = instance.find(
      (item) =>
        item.props.testID === TESTID.NUMBER_UP_DOWN_ACTION_TEXT &&
        item.type === Text
    );
    act(() => {
      touchableOpacity.props.onPress();
    });
    expect(textElement.props.children).toEqual('29 *C');
  });

  test('Test onPressDone', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const touchableOpacity = instance.find(
      (item) =>
        item.props.testID === TESTID.NUMBER_UP_DOWN_ACTION_DONE &&
        item.type === TouchableOpacity
    );
    act(() => {
      touchableOpacity.props.onPress();
    });
    expect(mockOnSelectAction).toHaveBeenCalled();
  });
});
