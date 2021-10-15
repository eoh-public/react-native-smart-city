import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

import MultiUnits from '../MultiUnits';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import ItemOneTap from '../../../commons/SubUnit/OneTap/ItemOneTap';
import ItemAddNew from '../../../commons/Device/ItemAddNew';
import Routes from '../../../utils/Route';
import WrapHeaderScrollable from '../../../commons/Sharing/WrapHeaderScrollable';
import { getTranslate } from '../../../utils/I18n';
import { AUTOMATE_TYPE } from '../../../configs/Constants';

jest.mock('axios');
const mockedNavigate = jest.fn();
const mockSetState = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
    useRoute: jest.fn(),
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
    <MultiUnits />
  </SCProvider>
);

describe('Test MultiUnits', () => {
  let tree;

  beforeEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
    mockSetState.mockClear();
    useRoute.mockClear();
    useState.mockClear();
  });

  it('Test is multi unit and current is Scenario tab', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          user: 223,
          type: 'one_tap',
          config: null,
          value: null,
          activate_at: '2021-09-22T14:16:54Z',
          condition: null,
          script: {
            id: 1,
            name: 'Tap to up down up down coc coc coc coc coc',
            icon: null,
            icon_kit:
              'https://eoh-gateway-backend.eoh.io/_Category_Sensors_Type_Garage_door_StyleC_olorful.png',
          },
        },
        {
          id: 299,
          user: 223,
          type: 'value_change',
          config: 'Light Value',
          value: 0,
          activate_at: null,
          condition: '<',
          script: {
            id: 300,
            name: 'p14',
            icon: null,
            icon_kit: null,
          },
        },
      ],
    };
    await axios.get.mockImplementation(async () => {
      return response;
    });
    useRoute.mockReturnValue({
      params: {
        isMultiUnits: true,
        unitName: null,
        unit: null,
      },
    });
    useState.mockImplementationOnce(() => [response.data, mockSetState]);
    useState.mockImplementationOnce(() => [
      getTranslate('en', 'Scenario'),
      mockSetState,
    ]);
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const WrapHeaderScrollables = instance.findAllByType(WrapHeaderScrollable);
    expect(WrapHeaderScrollables[0].props.title).toEqual(
      getTranslate('en', 'multi_units_automate')
    );
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    act(() => {
      TouchableOpacities[2].props.onPress();
    });
    expect(mockSetState).toBeCalledWith(getTranslate('en', 'Scenario'));
    const ItemOneTaps = instance.findAllByType(ItemOneTap);
    act(() => {
      ItemOneTaps[0].props.onPressItem();
    });
    expect(mockedNavigate).toBeCalledWith(Routes.UnitStack, {
      screen: Routes.ScriptDetail,
      params: {
        id: response.data[1].id,
        name: response.data[1].script?.name,
        type: response.data[1].type,
        havePermission: false,
        unit: null,
        isMultiUnits: true,
      },
    });
    const ItemAddNews = instance.findAllByType(ItemAddNew);
    act(() => {
      ItemAddNews[0].props.onAddNew();
    });
    expect(mockedNavigate).toBeCalledWith(Routes.UnitStack, {
      screen: Routes.AddNewAutoSmart,
      params: {
        type: AUTOMATE_TYPE.VALUE_CHANGE,
        isAutomateTab: true,
        isMultiUnits: true,
      },
    });
  });

  it('Test is multi unit and current is One-Tap tab', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          user: 223,
          type: 'one_tap',
          config: null,
          value: null,
          activate_at: '2021-09-22T14:16:54Z',
          condition: null,
          script: {
            id: 1,
            name: 'Tap to up down up down coc coc coc coc coc',
            icon: null,
            icon_kit:
              'https://eoh-gateway-backend.eoh.io/_Category_Sensors_Type_Garage_door_StyleC_olorful.png',
          },
        },
        {
          id: 299,
          user: 223,
          type: 'value_change',
          config: 'Light Value',
          value: 0,
          activate_at: null,
          condition: '<',
          script: {
            id: 300,
            name: 'p14',
            icon: null,
            icon_kit: null,
          },
        },
      ],
    };
    await axios.get.mockImplementation(async () => {
      return response;
    });
    useRoute.mockReturnValue({
      params: {
        isMultiUnits: true,
        unitName: null,
        unit: null,
      },
    });
    useState.mockImplementationOnce(() => [response.data, mockSetState]);
    useState.mockImplementationOnce(() => [
      getTranslate('en', 'One-Tap'),
      mockSetState,
    ]);
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const WrapHeaderScrollables = instance.findAllByType(WrapHeaderScrollable);
    expect(WrapHeaderScrollables[0].props.title).toEqual(
      getTranslate('en', 'multi_units_automate')
    );
    const ItemAddNews = instance.findAllByType(ItemAddNew);
    act(() => {
      ItemAddNews[0].props.onAddNew();
    });
    expect(mockedNavigate).toBeCalledWith(Routes.UnitStack, {
      screen: Routes.AddNewAutoSmart,
      params: {
        type: AUTOMATE_TYPE.ONE_TAP_ONLY,
        isAutomateTab: true,
        isMultiUnits: true,
      },
    });
  });

  it('Test is not multi unit', async () => {
    useRoute.mockReturnValue({
      params: {},
    });
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const WrapHeaderScrollables = instance.findAllByType(WrapHeaderScrollable);
    expect(WrapHeaderScrollables[0].props.title).toEqual('');
  });
});
