import { act } from '@testing-library/react-hooks';
import React, { useState } from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { create } from 'react-test-renderer';
import SelectPermission from '../SelectPermission';
import axios from 'axios';
import { SensorItem, TitleCheckBox } from '../Components';
import { ViewButtonBottom } from '../../../commons';
import Routes from '../../../utils/Route';

jest.mock('axios');

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  };
});

describe('Test SelectPermission', () => {
  let tree;
  let route = { params: { unit: null } };
  let listSensors = [
    {
      id: 204,
      name: 'sensor',
      sensors: [
        {
          id: 123,
          actions: [{ id: 136, name: 'action 1' }],
          read_configs: [{ id: 137, name: 'config 1' }],
          name: 'child1',
        },
      ],
    },
  ];

  const mockSetTickAllDevice = jest.fn();
  const mockSetActiveItemId = jest.fn();
  const mockSetDataStations = jest.fn();

  afterEach(() => {
    axios.mockClear();
    mockSetState.mockClear();
    mockSetTickAllDevice.mockClear();
    mockSetActiveItemId.mockClear();
    mockSetDataStations.mockClear();
  });

  function mockLoading() {
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]); // loading
  }

  function mocSetdata() {
    useState.mockImplementationOnce((init) => [
      listSensors,
      mockSetDataStations,
    ]);
    useState.mockImplementationOnce((init) => [init, mockSetTickAllDevice]);
    useState.mockImplementationOnce((init) => [init, mockSetActiveItemId]);
    useState.mockImplementationOnce((init) => [false, mockSetState]); // loading
  }

  it('test unit null', () => {
    Platform.OS = 'android';
    act(() => {
      tree = create(<SelectPermission route={route} />);
    });
    expect(axios.get).not.toBeCalled();
  });

  it('render empty list', () => {
    mockLoading();
    Platform.OS = 'ios';

    route.params.unit = 1;
    axios.get.mockImplementationOnce(() => ({ status: 200, data: [] }));
    act(() => {
      tree = create(<SelectPermission route={route} />);
    });
    const instance = tree.root;
    const TextElement = instance.findAllByType(Text);
    expect(TextElement[2].props.children).toBe('Không có dữ liệu');
  });

  it('test get unit fail', () => {
    mockLoading();

    route.params.unit = 1;
    axios.get.mockImplementationOnce(() => ({ status: 400, data: [] }));
    act(() => {
      tree = create(<SelectPermission route={route} />);
    });
    const instance = tree.root;
    const TextElement = instance.findAllByType(Text);
    expect(TextElement[2].props.children).toBe('Không có dữ liệu');
  });

  it('render list', () => {
    mocSetdata();
    act(() => {
      tree = create(<SelectPermission route={route} />);
    });
    const instance = tree.root;
    const FlatListElement = instance.findAllByType(FlatList);
    expect(FlatListElement).toHaveLength(1);
    const TitleCheckBoxElement = instance.findAllByType(TitleCheckBox);
    expect(TitleCheckBoxElement).toHaveLength(2);
    act(() => {
      TitleCheckBoxElement[0].props.onPress(null, true);
    });
    expect(mockSetTickAllDevice).toBeCalledWith(true);
    expect(mockSetDataStations).toBeCalledWith([
      {
        id: 204,
        isChecked: true,
        name: 'sensor',
        sensors: [
          {
            actions: [{ id: 136, isChecked: true, name: 'action 1' }],
            id: 123,
            name: 'child1',
            read_configs: [{ id: 137, isChecked: true, name: 'config 1' }],
          },
        ],
      },
    ]);
    act(() => {
      TitleCheckBoxElement[0].props.onPress(204, true);
    });
    expect(mockSetTickAllDevice).toBeCalledWith(true);
  });

  it('test onTickedChild function', () => {
    mocSetdata();
    act(() => {
      tree = create(<SelectPermission route={route} />);
    });
    const instance = tree.root;
    const SensorItemElement = instance.findAllByType(SensorItem);
    expect(SensorItemElement).toHaveLength(1);
    act(() => {
      SensorItemElement[0].props.onTickedChild(204, 123, 136, true, true);
    });
    expect(mockSetDataStations).toBeCalled();
  });

  it('test ViewButtonBottom', () => {
    mocSetdata();
    act(() => {
      tree = create(<SelectPermission route={route} />);
    });
    const instance = tree.root;
    const ViewButtonBottomElement = instance.findAllByType(ViewButtonBottom);
    expect(ViewButtonBottomElement).toHaveLength(1);
    act(() => {
      ViewButtonBottomElement[0].props.onRightClick();
    });
    expect(mockNavigate).toBeCalledWith(Routes.SharingInviteMembers, {
      permissions: {
        control_permissions: [{ id: 123, values: [136] }],
        read_permissions: [{ id: 123, values: [137] }],
      },
      unit: 1,
    });
    act(() => {
      ViewButtonBottomElement[0].props.onLeftClick();
    });
    expect(mockGoBack).toBeCalled();
  });
});
