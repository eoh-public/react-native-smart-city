import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import SelectUnit from '../';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('axios');
const mockSetState = jest.fn();
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

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <SelectUnit />
  </SCProvider>
);

describe('Test Select unit screen', () => {
  let tree;

  beforeEach(() => {
    mockSetState.mockClear();
    axios.get.mockClear();
  });

  it('Test render', async () => {
    useRoute.mockReturnValue({
      params: {
        type: 'automate',
        isAutomateTab: true,
        isMultiUnits: true,
        routeName: 'test',
        isCreateNewAction: false,
      },
    });
    const response = {
      status: 200,
      data: [
        {
          id: 178,
          name: 'Unit 2',
          is_owner: true,
          number_sensor: 0,
          icon: 'Simulator_Screen_Shot_-_iPhone_8_-_2021-09-21_at_09.16.58.png',
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    useState.mockImplementation((init) => [response.data, mockSetState]);
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(4);
    await act(async () => {
      await TouchableOpacities[1].props.onPress();
      await TouchableOpacities[2].props.onPress(response.data[0]);
    });
    expect(mockSetState).toBeCalledWith(response.data[0]);
  });

  it('Test SelectUnit getAllUnits fail', async () => {
    useRoute.mockReturnValue({
      params: {
        type: 'automate',
        isAutomateTab: true,
        isMultiUnits: true,
        routeName: 'test',
        isCreateNewAction: false,
      },
    });
    const response = {
      status: 400,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent());
    });

    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(4);
    await act(async () => {
      await TouchableOpacities[1].props.onPress();
      await TouchableOpacities[2].props.onPress();
    });
    expect(mockSetState).toBeCalledTimes(1);
  });
});
