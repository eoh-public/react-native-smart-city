import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import Automate from '../';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import ItemOneTap from '../../../commons/SubUnit/OneTap/ItemOneTap';
import ItemAddNew from '../../../commons/Device/ItemAddNew';
import Routes from '../../../utils/Route';
import { TESTID } from '../../../configs/Constants';

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
    useIsFocused: jest.fn(),
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

  it('Test success get Automate onPress onAddNew', async () => {
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

    const ItemAddNews = instance.findAllByType(ItemAddNew);
    expect(ItemAddNews).toHaveLength(1);
    act(() => {
      ItemAddNews[0].props.onAddNew('MultiUnit');
    });
    expect(mockedNavigate).toBeCalledWith(Routes.UnitStack, {
      screen: Routes.AddNewAutoSmart,
      params: {
        isAutomateTab: true,
        isMultiUnits: true,
        type: 'automate',
        unit: { id: undefined },
      },
    });
  });

  it('Test success get Automate onPressItem to ScriptDetail', async () => {
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
        { automates: [], unit_id: 3, unit_name: 'La Vida' },
      ],
    };
    await axios.get.mockImplementation(async () => {
      return response;
    });

    useState.mockImplementation(() => [false, mockSetState]);
    useState.mockImplementation(() => [response.data, mockSetState]);

    await act(async () => {
      tree = await create(wrapComponent());
    });
    expect(mockSetState).toBeCalledWith(true);
    const instance = tree.root;
    const FlatLists = instance.findAllByType(FlatList);
    expect(FlatLists).toHaveLength(3);
    const ItemOneTaps = instance.findAllByType(ItemOneTap);
    expect(ItemOneTaps).toHaveLength(1);
    await act(async () => {
      await ItemOneTaps[0].props.onPressItem();
    });

    expect(mockedNavigate).toBeCalledWith(Routes.UnitStack, {
      screen: Routes.ScriptDetail,
      params: {
        isAutomateTab: true,
        isMultiUnits: true,
        name: 'script',
        type: 'one_tap',
        unit: { id: undefined },
        havePermission: true,
        id: 1,
      },
    });
  });
  it('Test success get Automate onPressArrowRight to ScriptDetail', async () => {
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
        { automates: [], unit_id: 3, unit_name: 'La Vida' },
      ],
    };
    await axios.get.mockImplementation(async () => {
      return response;
    });

    useState.mockImplementation(() => [false, mockSetState]);
    useState.mockImplementation(() => [response.data, mockSetState]);

    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;

    const iconArrowRight = instance.findAll(
      (el) =>
        el.props.testID === TESTID.ICON_ARROW_RIGHT &&
        el.type === TouchableOpacity
    );

    expect(iconArrowRight).toHaveLength(2);

    await act(async () => {
      await iconArrowRight[0].props.onPress();
    });

    expect(mockedNavigate).toBeCalledWith(Routes.MultiUnits, {
      isMultiUnits: true,
      unitName: '',
      unit: { id: undefined },
    });

    mockedNavigate.mockClear();
    await act(async () => {
      await iconArrowRight[1].props.onPress();
    });

    expect(mockedNavigate).toBeCalledWith(Routes.UnitStack, {
      screen: Routes.UnitDetail,
      params: { unitId: 3, isOneTap: true },
    });
  });
});
