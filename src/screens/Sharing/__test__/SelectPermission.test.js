import React, { useState } from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import { Text } from 'react-native';

import { API } from '../../../configs';
import { TESTID } from '../../../configs/Constants';

import SelectPermission from '../SelectPermission';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  };
});

jest.mock('axios');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('test SelectPermission container', () => {
  afterEach(() => {
    jest.clearAllMocks();
    useState.mockClear();
    axios.get.mockClear();
  });

  const setDataStations = jest.fn();
  const setReadPermissions = jest.fn();
  const setControlPermissions = jest.fn();
  const mockSetStates = (initList = []) => {
    useState.mockImplementationOnce((init) => [initList, setDataStations]);
    useState.mockImplementationOnce((init) => [init, setReadPermissions]); // setList
    useState.mockImplementationOnce((init) => [init, setControlPermissions]);
  };

  let tree;
  let route = {
    key: 'SharingSelectPermission-xCaALgMCXeee1rgzZJ09j',
    name: 'SharingSelectPermission',
    params: {},
  };

  test('default render SelectPermission unit null', async () => {
    mockSetStates();
    await act(async () => {
      tree = create(<SelectPermission route={route} />);
    });
    expect(axios.get).not.toHaveBeenCalledWith(
      API.SHARE.UNIT_PERMISSIONS(30),
      {}
    );
  });

  test('default render SelectPermission get permission return null data', async () => {
    mockSetStates();
    route.params = { unit: { id: 30 } };

    const response = {
      status: 200,
      data: [],
    };
    axios.get.mockImplementationOnce(async (url) => response);

    await act(async () => {
      tree = await create(<SelectPermission route={route} />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.SHARE.UNIT_PERMISSIONS(30), {});
    expect(setDataStations).toHaveBeenCalledWith([]);

    const instance = tree.root;
    const textNoData = instance.find(
      (el) =>
        el.props.testID === TESTID.TEXT_NO_DATA_STATIONS && el.type === Text
    );
    expect(textNoData).not.toBeUndefined();
    expect(textNoData.props.children).toEqual('Không có dữ liệu');
    const leftButton = instance.find(
      (el) =>
        el.props.testID ===
        `${TESTID.PREFIX.SHARING_SELECT_PERMISSION}${TESTID.VIEW_BUTTON_BOTTOM_LEFT_BUTTON}`
    );
    act(() => {
      leftButton.props.onPress();
    });
    expect(mockGoBack).toHaveBeenCalled();
    const rightButton = instance.find(
      (el) =>
        el.props.testID ===
        `${TESTID.PREFIX.SHARING_SELECT_PERMISSION}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
    );
    act(() => {
      rightButton.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalled();
  });

  test('default render SelectPermission get permission return data', async () => {
    const listSensors = [
      {
        actions: [{ id: 136, name: "Phuong's action 1" }],
        id: 204,
        name: "Phuong's sensor",
        read_configs: [],
      },
    ];
    const initList = [
      {
        name: 'Lorem',
        sensors: listSensors,
      },
    ];
    const response = {
      status: 200,
      data: [
        {
          id: 14,
          name: 'Lorem',
          sensors: listSensors,
        },
      ],
    };

    mockSetStates(initList);
    route.params = { unit: { id: 30 } };
    const setListChosen = jest.fn();
    const setExpandedIndex = jest.fn();
    const setSelectIndexes = jest.fn();
    axios.get.mockImplementationOnce(async (url) => response);
    useState.mockImplementationOnce((init) => [init, setListChosen]);
    useState.mockImplementationOnce((init) => [init, setExpandedIndex]);
    useState.mockImplementationOnce((init) => [init, setSelectIndexes]);

    await act(async () => {
      tree = await create(<SelectPermission route={route} />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.SHARE.UNIT_PERMISSIONS(30), {});
    expect(setDataStations).toHaveBeenCalledWith(initList);
    const instance = tree.root;

    instance.find(
      (el) => el.props.testID === TESTID.STATION_DEVICE_PERMISSIONS
    ); // found
  });
});
