import React, { useState } from 'react';
import { create } from 'react-test-renderer';
import { act, renderHook } from '@testing-library/react-hooks';
import ManageAccessScreen from '../index';
import { HeaderCustom } from '../../../commons/Header';
import useManageAccess from '../hooks/index';
import axios from 'axios';
import API from '../../../configs/API';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { ScrollView } from 'react-native';
import { RowItem } from '../../../commons/RowItem';
import Routes from '../../../utils/Route';

const mockRoute = jest.fn();
const mockSetState = jest.fn();
const mockUseIsFocused = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => mockRoute,
    useNavigation: () => ({
      goBack: jest.fn(),
      navigate: mockedNavigate,
    }),
    useIsFocused: () => ({
      useIsFocused: mockUseIsFocused,
    }),
  };
});

jest.mock('axios');

const wrapComponent = (actionGroup) => (
  <SCProvider initState={mockSCStore({})}>
    <ManageAccessScreen />
  </SCProvider>
);

describe('Test Manage Access', () => {
  beforeEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
    mockSetState.mockClear();
  });
  afterEach(() => {
    axios.get.mockClear();
  });
  const unit = { id: 1, name: 'unit name' };
  const sensor = {
    id: 1,
    icon: '',
    action: { icon: '', color: '' },
    name: 'sensor name',
    value: '',
  };

  it('Test fetch data', () => {
    const { result } = renderHook(() => useManageAccess(unit, sensor));
    axios.get.mockImplementation(() => ({
      status: 200,
      data: [
        {
          id: 1,
          name: 'jason',
          access_schedule: 'always',
          schedule: 'Always',
        },
        {
          id: 2,
          name: 'mike',
          access_schedule: 'recurring',
          schedule: 'M/T 02:40 - 08:40 AM',
        },
        {
          id: 3,
          name: 'david',
          access_schedule: 'temporary',
          schedule: '02:40 09/08/2020 - 08:40 09/10/2020',
        },
      ],
    }));
    act(() => {
      result.current.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.UNIT.MANAGE_ACCESS(unit.id), {
      params: { sensor_id: sensor.id },
    });
  });
  let tree;

  it('render Manage Access', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          name: {
            id: 1,
            name: 'jason',
            phone_number: '0984524544',
            email: '123@gmail.com',
          },
          access_schedule: 'always',
          schedule: 'Always',
        },
        {
          id: 2,
          name: {
            id: 2,
            name: 'mike',
            phone_number: '0984524543',
            email: '1234@gmail.com',
          },
          access_schedule: 'recurring',
          schedule: 'M/T 02:40 - 08:40 AM',
        },
        {
          id: 3,
          name: {
            id: 3,
            name: 'david',
            phone_number: '0984524545',
            email: '1235@gmail.com',
          },
          access_schedule: 'temporary',
          schedule: '02:40 09/08/2020 - 08:40 09/10/2020',
        },
      ],
    };
    useState.mockImplementationOnce((init) => [response.data, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const header = instance.findAllByType(HeaderCustom);
    const scrollView = instance.findAllByType(ScrollView);
    expect(header).toHaveLength(1);
    expect(scrollView).toHaveLength(1);
    const memberButton = instance.findAllByType(RowItem);
    expect(memberButton).toHaveLength(3);
    await act(async () => {
      memberButton[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.GuestInfo, {
      id: 1,
    });
  });
});
