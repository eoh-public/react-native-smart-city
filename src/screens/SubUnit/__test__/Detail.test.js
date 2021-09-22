/* eslint-disable promise/prefer-await-to-callbacks */
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { act, create } from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import SubUnitDetail from '../Detail';
import ItemDevice from '../../../commons/Device/ItemDevice';
import Routes from '../../../utils/Route';
import WrapParallaxScrollView from '../../../commons/WrapParallaxScrollView';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();
const mockedDangerouslyGetState = jest.fn();
const mockedDangerouslyGetStatePop = jest.fn();
const mockedPop = jest.fn();

jest.mock('axios');

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      dangerouslyGetParent: () => ({
        dangerouslyGetState: mockedDangerouslyGetState,
        pop: mockedDangerouslyGetStatePop,
      }),
      pop: mockedPop,
    }),
    useIsFocused: jest.fn(),
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <SubUnitDetail route={route} />
  </SCProvider>
);

describe('Test SubUnitDetail', () => {
  let route;
  let stationState = {
    id: 2,
    camera: {
      id: 1,
      uri: 'camera-uri',
      preview_uri: 'camera-preview-uri',
    },
    sensors: [
      {
        icon: '',
        id: 1,
        action: { icon: '', color: '' },
        name: '',
        value: '',
      },
    ],
  };

  beforeEach(() => {
    route = {
      params: {
        unit: {
          id: 1,
          user_id: 1,
          name: 'Unit name',
        },
        station: {
          id: 2,
          name: 'Station name',
          background: '',
        },
      },
    };

    const localState = {
      language: 'en',
      auth: {
        account: {
          user: {
            id: 2,
          },
        },
      },
      unit: {
        unitDetail: {
          id: 1,
          stations: [stationState],
        },
      },
    };
    useSelector.mockImplementation((cb) => {
      return cb(localState);
    });
  });

  afterEach(() => {
    mockedDispatch.mockClear();
    Toast.show.mockClear();
    axios.delete.mockClear();
    axios.patch.mockClear();
  });
  let tree;

  test('ItemDevice', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const itemDevices = instance.findAllByType(ItemDevice);
    expect(itemDevices).toHaveLength(0);
  });

  test('onBack', async () => {
    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [
        { name: 'route 1' },
        { name: 'route 2' },
        { name: Routes.AddSubUnitStack },
      ],
    }));

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const wrapScrollView = instance.findByType(WrapParallaxScrollView);
    await act(async () => {
      await wrapScrollView.props.onBack();
    });
    expect(mockedDangerouslyGetStatePop).toHaveBeenCalledWith(2);
  });
});

// 71-72,78-84,90-91,97
// 78-84,97
