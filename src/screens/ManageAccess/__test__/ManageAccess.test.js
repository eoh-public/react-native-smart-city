import React from 'react';
import { create } from 'react-test-renderer';
import { act, renderHook } from '@testing-library/react-hooks';
import ManageAccessScreen from '../index';
import { HeaderCustom } from '../../../commons/Header';
import useManageAccess from '../hooks/index';
import axios from 'axios';
import API from '../../../configs/API';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const mockRoute = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => mockRoute,
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('axios');

const wrapComponent = (actionGroup) => (
  <SCProvider initState={mockSCStore({})}>
    <ManageAccessScreen />
  </SCProvider>
);

describe('Test Manage Access', () => {
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
  it('rendering Manage Access header', async () => {
    act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const header = instance.findAllByType(HeaderCustom);
    expect(header).toHaveLength(1);
  });
});
