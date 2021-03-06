import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';

import SelectSensorDevices from '../SelectSensorDevices';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Device from '../Device';
import BottomButtonView from '../../../commons/BottomButtonView';
import NavBar from '../../../commons/NavBar';
import API from '../../../configs/API';
import { TESTID } from '../../../configs/Constants';
import { TouchableOpacity } from 'react-native';
import Routes from '../../../utils/Route';

jest.mock('axios');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <SelectSensorDevices route={route} />
  </SCProvider>
);

describe('Test SelectSensorDevices', () => {
  let tree;
  const route = {
    params: {
      unit: { id: 1, name: 'Unit test' },
      automateId: 1,
      scriptName: 'scriptName test',
    },
  };

  beforeEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
    mockSetState.mockClear();
  });

  test('fetch Device success', async () => {
    const response = {
      status: 200,
      success: true,
      data: [
        {
          id: 1,
          name: 'Device 1',
          sensors: [
            { id: 1, name: 'sensor' },
            { id: 2, name: 'sensor' },
          ],
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });

    expect(axios.get).toHaveBeenCalledWith(API.UNIT.DEVICE_CONTROL(1), {});
    expect(mockSetState).toHaveBeenCalledTimes(3);
  });

  test('onPress continue', async () => {
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;

    const bottomButton = instance.findByType(BottomButtonView);
    act(() => {
      bottomButton.props.onPressMain();
    });
    expect(mockedNavigate).toHaveBeenCalled();
  });

  test('test onPressDevice', async () => {
    const data = [
      {
        id: 1,
        name: 'Device 1',
        sensors: [
          { id: 1, name: 'sensor' },
          { id: 2, name: 'sensor' },
        ],
      },
    ];
    const mockSetSelectedDevice = jest.fn();
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [data, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetSelectedDevice]);

    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const device = instance.findAllByType(Device);
    expect(device).toHaveLength(2);

    act(() => {
      device[0].props.onPress({ id: 1, name: 'sensor' });
    });
    expect(mockSetSelectedDevice).toHaveBeenCalledWith({
      id: 1,
      name: 'sensor',
    });
  });

  test('test onPressDevice false', async () => {
    const data = [
      {
        id: 1,
        name: 'Device 1',
        sensors: [
          { id: 1, name: 'sensor' },
          { id: 2, name: 'sensor' },
        ],
      },
    ];
    const mockSetSelectedDevice = jest.fn();
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [data, mockSetState]);
    useState.mockImplementationOnce((init) => [
      { id: 1, name: 'sensor' },
      mockSetSelectedDevice,
    ]);

    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const device = instance.findAllByType(Device);
    expect(device).toHaveLength(2);

    act(() => {
      device[0].props.onPress({ id: 1, name: 'sensor' });
    });
    expect(mockSetSelectedDevice).toHaveBeenCalledWith(false);
  });

  test('test onSnapItem', async () => {
    const data = [
      {
        id: 1,
        name: 'Device 1',
        sensors: [
          { id: 1, name: 'sensor' },
          { id: 2, name: 'sensor' },
        ],
      },
    ];
    const mockSetIndexStation = jest.fn();
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetIndexStation]);
    useState.mockImplementationOnce((init) => [data, mockSetState]);

    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const navBar = instance.findByType(NavBar);

    act(() => {
      navBar.props.onSnapToItem({ id: 1, name: 'sensor' }, 0);
    });

    expect(mockSetIndexStation).toBeCalledWith(0);
  });
  test('test onPressClose user already has an automateId', async () => {
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const iconClose = instance.findAll(
      (el) =>
        el.props.testID === TESTID.ICON_CLOSE && el.type === TouchableOpacity
    );
    expect(iconClose).toHaveLength(1);

    await act(async () => {
      iconClose[0].props.onPress();
    });

    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ScriptDetail, {
      havePermission: true,
      id: 1,
      isAutomateTab: undefined,
      isCreateNewAction: undefined,
      isMultiUnits: undefined,
      name: 'scriptName test',
      type: undefined,
      unit: { id: 1, name: 'Unit test' },
    });
  });
});
