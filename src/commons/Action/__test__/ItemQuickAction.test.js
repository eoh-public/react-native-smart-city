import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import ItemQuickAction from '../ItemQuickAction';
import { Colors } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import { factory } from 'factory-girl';
import { sendRemoteCommand } from '../../../iot/RemoteControl';

class Sensor {}

factory.define('Sensor', Sensor, {});
const mockSetState = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(),
  };
});

useState.mockImplementation((init) => [init, mockSetState]);

jest.mock('../../../iot/RemoteControl');

jest.mock('../../../iot/states', () => ({
  useConfigGlobalState: () => [{}, null],
}));

describe('Test ItemQuickAction', () => {
  let tree;
  beforeEach(() => {
    jest.useFakeTimers();
    mockSetState.mockClear();
  });

  const sensor = {
    action: {
      color: '#00979D',
      command_prefer_over_bluetooth: true,
      command_prefer_over_googlehome: false,
      command_prefer_over_internet: false,
      id: 9,
      icon: 'caret-up',
    },
    quick_action: {
      config_id: 51,
      interval: 5000,
      off_action: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        id: 10,
      },
      on_action: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        id: 9,
      },
      off_status: 'OFF',
      on_status: 'ON',
      will_auto_update_status: false,
    },
    action2: {
      color: '#00979D',
      command_prefer_over_bluetooth: true,
      command_prefer_over_googlehome: false,
      command_prefer_over_internet: false,
      id: 10,
    },
    status: 'OFF',
    status2: 'ON',
  };
  const style = {
    width: 32,
    height: 32,
    backgroundColor: Colors.Gray3,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  };

  test('render with no action', async () => {
    const sensor = await factory.build('Sensor');
    act(() => {
      tree = create(<ItemQuickAction sensor={sensor} />);
    });
    const instance = tree.root;
    const buttonOnActionPress = instance.findAll(
      (el) =>
        el.props.testID === TESTID.ITEM_QUICK_ACTION_PRESS &&
        el.type === TouchableOpacity
    );
    expect(buttonOnActionPress).toHaveLength(0);
  });

  test('render with full action data case on', () => {
    const mockSetStatus = jest.fn();

    act(() => {
      tree = create(
        <ItemQuickAction
          sensor={sensor}
          wrapperStyle={style}
          setStatus={mockSetStatus}
        />
      );
    });

    const instance = tree.root;
    const buttonOnActionPress = instance.find(
      (el) =>
        el.props.testID === TESTID.ITEM_QUICK_ACTION_PRESS &&
        el.type === TouchableOpacity
    );
    expect(buttonOnActionPress).toBeDefined();

    mockSetState.mockClear();
    act(() => {
      buttonOnActionPress.props.onPress();
    });
    expect(sendRemoteCommand).toBeCalled();
    expect(mockSetState).toBeCalledTimes(1);

    jest.runAllTimers();
    expect(mockSetState).toBeCalledTimes(3);
    expect(mockSetState).toBeCalledWith(sensor.quick_action.off_action);
  });

  test('render case old version config', () => {
    const oldSensor = {
      action: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        id: 9,
        icon: 'caret-up',
      },
      action2: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        id: 10,
      },
      status: 'OFF',
      status2: 'ON',
    };
    act(() => {
      tree = create(
        <ItemQuickAction sensor={oldSensor} wrapperStyle={style} />
      );
    });

    const instance = tree.root;
    const buttonOnActionPress = instance.find(
      (el) =>
        el.props.testID === TESTID.ITEM_QUICK_ACTION_PRESS &&
        el.type === TouchableOpacity
    );

    mockSetState.mockClear();
    act(() => {
      buttonOnActionPress.props.onPress();
    });
    expect(mockSetState).toBeCalledTimes(1);

    jest.runAllTimers();
    expect(mockSetState).toBeCalledTimes(3);
  });

  test('when sending command, button is disabled', () => {
    useState.mockImplementationOnce((init) => [true, mockSetState]);
    act(() => {
      tree = create(<ItemQuickAction sensor={sensor} wrapperStyle={style} />);
    });

    const instance = tree.root;
    const buttonOnActionPress = instance.find(
      (el) =>
        el.props.testID === TESTID.ITEM_QUICK_ACTION_PRESS &&
        el.type === TouchableOpacity
    );
    expect(buttonOnActionPress).toBeDefined();
  });

  test('trigger action with quick action no auto update', () => {
    const noAutoUpdateSensor = {
      action: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        id: 9,
        icon: 'caret-up',
      },
      quick_action: {
        config_id: 51,
        interval: 5000,
        off_action: {
          color: '#00979D',
          command_prefer_over_bluetooth: true,
          command_prefer_over_googlehome: false,
          command_prefer_over_internet: false,
          id: 10,
        },
        on_action: {
          color: '#00979D',
          command_prefer_over_bluetooth: true,
          command_prefer_over_googlehome: false,
          command_prefer_over_internet: false,
          id: 9,
        },
        off_status: 'OFF',
        on_status: 'ON',
        will_auto_update_status: true,
      },
    };

    act(() => {
      tree = create(
        <ItemQuickAction sensor={noAutoUpdateSensor} wrapperStyle={style} />
      );
    });

    const instance = tree.root;
    const buttonOnActionPress = instance.find(
      (el) =>
        el.props.testID === TESTID.ITEM_QUICK_ACTION_PRESS &&
        el.type === TouchableOpacity
    );

    mockSetState.mockClear();
    act(() => {
      buttonOnActionPress.props.onPress();
    });
    expect(mockSetState).toBeCalledTimes(1);

    jest.runAllTimers();
    expect(mockSetState).toBeCalledTimes(1);
  });

  test('render with full action data case off', () => {
    sensor.action.id = 10; // off action
    const mockSetStatus = jest.fn();

    act(() => {
      tree = create(
        <ItemQuickAction
          sensor={sensor}
          wrapperStyle={style}
          setStatus={mockSetStatus}
        />
      );
    });

    const instance = tree.root;
    const buttonOnActionPress = instance.find(
      (el) =>
        el.props.testID === TESTID.ITEM_QUICK_ACTION_PRESS &&
        el.type === TouchableOpacity
    );

    mockSetState.mockClear();
    act(() => {
      buttonOnActionPress.props.onPress();
    });

    jest.runAllTimers();
    expect(mockSetState).toBeCalledWith(sensor.quick_action.on_action);
  });

  test('listen to config value for update action', () => {
    const globalStates = require('../../../iot/states');
    globalStates.useConfigGlobalState = () => [{ 51: true }, null];

    const mockSetStatus = jest.fn();

    act(() => {
      tree = create(
        <ItemQuickAction
          sensor={sensor}
          wrapperStyle={style}
          setStatus={mockSetStatus}
        />
      );
    });

    expect(mockSetState).toBeCalledWith(sensor.quick_action.off_action);
  });
});
