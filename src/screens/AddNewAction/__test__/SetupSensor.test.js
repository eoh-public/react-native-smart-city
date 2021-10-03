import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import { HorizontalPicker } from '../../../commons';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import BottomButtonView from '../../../commons/BottomButtonView';
import SetUpSensor from '../SetupSensor';
import { useRoute } from '@react-navigation/native';

const mockSetState = jest.fn();
const mockSetSensorData = jest.fn();
const mockDispatch = jest.fn();
const mockGoBack = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: () => ({
      goBack: mockGoBack,
      dispatch: mockDispatch,
    }),
  };
});

const wrapComponent = (configuration, onPress) => (
  <SCProvider initState={mockSCStore({})}>
    <SetUpSensor />
  </SCProvider>
);

describe('Test SetUpSensor', () => {
  let tree;

  afterEach(() => {
    mockSetState.mockClear();
    useRoute.mockClear();
  });

  it('Test render', async () => {
    useRoute.mockReturnValue({
      params: {
        item: {
          id: 1,
          value: 10,
          range_min: 0,
          range_max: 100,
          decimal_behind: 2,
          title: 'is below (<)',
        },
        sensorData: [],
        setSensorData: () => mockSetSensorData,
      },
    });
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(7);
    act(() => {
      TouchableOpacities[1].props.onPress();
      TouchableOpacities[2].props.onPress();
    });
    expect(mockSetState).toBeCalledWith(true);
    expect(mockDispatch).toBeCalled();
    act(() => {
      TouchableOpacities[4].props.onPress();
    });
    expect(mockSetState).toBeCalledWith({
      conditionValue: '<',
      title: 'is below (<)',
      type: 'IS_BELOW',
    });
    const HorizontalPickers = instance.findAllByType(HorizontalPicker);
    expect(HorizontalPickers).toHaveLength(1);
    act(() => {
      HorizontalPickers[0].props.onChangeValue(128);
    });
    expect(mockSetState).toBeCalledWith(false);
    const BottomButtonViews = instance.findAllByType(BottomButtonView);
    expect(BottomButtonViews).toHaveLength(1);
    act(() => {
      BottomButtonViews[0].props.onPressMain();
    });
    expect(mockGoBack).toBeCalled();
  });

  it('Test change value and item', async () => {
    useRoute.mockReturnValue({
      params: {
        item: {
          id: 1,
          value: 10,
          range_min: 0,
          decimal_behind: 2,
          title: 'is below (<)',
        },
        sensorData: [],
        setSensorData: () => mockSetSensorData,
      },
    });
    useState.mockImplementation((init) => [init, mockSetState]);
    useState.mockImplementation((init) => [100, mockSetState]);
    useState.mockImplementation((init) => [100, mockSetState]);
    useState.mockImplementation((init) => [100, mockSetState]);
    useState.mockImplementation((init) => [100, mockSetState]);
    useState.mockImplementation((init) => [init, mockSetState]);
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const HorizontalPickers = instance.findAllByType(HorizontalPicker);
    expect(HorizontalPickers).toHaveLength(1);
  });
});
