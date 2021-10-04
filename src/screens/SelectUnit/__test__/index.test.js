import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import SelectUnit from '../';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('axios');

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
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
    expect(TouchableOpacities).toHaveLength(3);
    await act(async () => {
      await TouchableOpacities[1].props.onPress();
      await TouchableOpacities[2].props.onPress(response.data[0]);
    });
    expect(mockSetState).toBeCalledWith(response.data[0]);
  });

  it('Test SelectUnit getAllUnits fail', async () => {
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
    expect(TouchableOpacities).toHaveLength(3);
    await act(async () => {
      await TouchableOpacities[1].props.onPress();
      await TouchableOpacities[2].props.onPress();
    });
    expect(mockSetState).toBeCalledTimes(1);
  });
});
