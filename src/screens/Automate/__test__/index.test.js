import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import Automate from '../';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import ItemOneTap from '../../../commons/SubUnit/OneTap/ItemOneTap';

jest.mock('axios');
const mockedNavigate = jest.fn();
const mockSetState = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: () => ({
        headerRight: jest.fn(),
      }),
    }),
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <Automate />
  </SCProvider>
);

describe('Test Automate', () => {
  let tree;

  beforeEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
    mockSetState.mockClear();
  });

  it('Test success get Automate', async () => {
    const response = {
      status: 200,
      data: [
        {
          type: 'MultiUnit',
          automates: [
            {
              id: 1,
              user: 2,
              type: 'one_tap',
              activate_at: '2021-09-17T05:30:00Z',
              script: {
                id: 1,
                name: 'script',
                icon: undefined,
                icon_kit: undefined,
              },
            },
          ],
        },
      ],
    };
    await axios.get.mockImplementation(async () => {
      return response;
    });

    useState.mockImplementation(() => [false, mockSetState]);
    useState.mockImplementation(() => [response.data, mockSetState]);

    await act(() => {
      tree = create(wrapComponent());
    });
    expect(mockSetState).toBeCalledWith(true);
    const instance = tree.root;
    const FlatLists = instance.findAllByType(FlatList);
    expect(FlatLists).toHaveLength(2);
    const ItemOneTaps = instance.findAllByType(ItemOneTap);
    expect(ItemOneTaps).toHaveLength(1);
    act(() => {
      ItemOneTaps[0].props.onPressItem();
    });
    expect(mockedNavigate).toBeCalled();
  });
});
