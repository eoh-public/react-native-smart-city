import React, { useState } from 'react';
import { create, act } from 'react-test-renderer';

import ManageAccessScreen from '../index';
import { HeaderCustom } from '../../../commons/Header';
import axios from 'axios';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { ScrollView } from 'react-native';
import { RowItem } from '../../../commons/RowItem';
import Routes from '../../../utils/Route';
import { useRoute } from '@react-navigation/native';

const mockUseIsFocused = jest.fn();
const mockedNavigate = jest.fn();
const mockSetState = jest.fn();
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
      goBack: jest.fn(),
      navigate: mockedNavigate,
    }),
    useIsFocused: () => ({
      useIsFocused: mockUseIsFocused,
    }),
  };
});

jest.mock('axios');

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <ManageAccessScreen route={route} />
  </SCProvider>
);

describe('Test Manage Access', () => {
  let tree;
  beforeEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
    useRoute.mockReturnValue({
      params: {
        unit: {
          id: 1,
          name: 'unit',
        },
        sensor: {
          id: 1,
          name: 'sensor',
        },
      },
    });
    mockSetState.mockClear();
  });
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
      ],
    };
    useState.mockImplementationOnce((init) => [response.data, mockSetState]);
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const header = instance.findAllByType(HeaderCustom);
    const scrollView = instance.findAllByType(ScrollView);
    expect(header).toHaveLength(1);
    expect(scrollView).toHaveLength(1);
    const memberButton = instance.findAllByType(RowItem);
    expect(memberButton).toHaveLength(1);
    await act(async () => {
      memberButton[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.GuestInfo, {
      id: 1,
    });
  });
});
