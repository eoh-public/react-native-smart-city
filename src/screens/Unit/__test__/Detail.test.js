import axios from 'axios';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { createConnection, getStates } from 'home-assistant-js-websocket';
import ParallaxScrollView from 'libs/react-native-parallax-scroll-view';
import { BleManager } from 'react-native-ble-plx';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import UnitDetail from '../Detail';
import { API } from '../../../configs';
import ShortDetailSubUnit from '../../../commons/SubUnit/ShortDetail';
import Summaries from '../Summaries';
import { TESTID } from '../../../configs/Constants';
import NavBar from '../../../commons/NavBar';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: mockDispatch, // fix problem of re-render continuously
    useSelector: () => 'vi',
    connect: () => {
      return (component) => component;
    },
  };
});

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('home-assistant-js-websocket', () => {
  return {
    ...jest.requireActual('home-assistant-js-websocket'),
    createConnection: jest.fn(),
    getStates: jest.fn(),
  };
});

jest.mock('axios');

describe('Test UnitDetail', () => {
  const route = {
    params: {
      unitId: 1,
    },
  };
  const account = {};

  const detailUnitApiUrl = API.UNIT.UNIT_DETAIL(1);
  const summaryUnitApiUrl = API.UNIT.UNIT_SUMMARY(1);

  let tree;

  axios.get.mockImplementation(() => ({ status: 200 }));

  beforeEach(() => {
    jest.clearAllTimers();
    axios.get.mockClear();
    useIsFocused.mockImplementation(() => true);
    AsyncStorage.clear();
  });

  test('fetch unit detail success', async () => {
    axios.get.mockImplementation((url) => ({
      status: 200,
      data: {},
    }));
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(detailUnitApiUrl, {});
  });

  test('fetch unit detail no network then load from cache', async () => {
    axios.get.mockImplementation((url) => ({
      status: 200,
      data: {},
    }));
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    axios.get.mockImplementation((url) => {
      if (url === detailUnitApiUrl) {
        throw {};
      }
      return { status: 200, data: [] };
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(detailUnitApiUrl, {});
  });

  test('fetch unit detail no network and fail load from cache', async () => {
    axios.get.mockImplementation((url) => {
      throw {};
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(detailUnitApiUrl, {});
  });

  test('fetch unit summary empty', async () => {
    axios.get.mockImplementation((url) => {
      if (url === summaryUnitApiUrl) {
        return {
          status: 200,
          data: [],
        };
      }

      return {
        status: 200,
        data: {},
      };
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(summaryUnitApiUrl, {});
  });

  test('fetch unit summary has data', async () => {
    axios.get.mockImplementation((url) => {
      if (url === summaryUnitApiUrl) {
        return {
          status: 200,
          data: [{}],
        };
      }

      return {
        status: 200,
        data: {},
      };
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(summaryUnitApiUrl, {});
  });
  test('not fetch unit summary if not focus', async () => {
    useIsFocused.mockImplementation(() => false);
    axios.get.mockImplementation((url) => {
      if (url === summaryUnitApiUrl) {
        return {
          status: 200,
          data: [{}],
        };
      }

      return {
        status: 200,
        data: {},
      };
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).not.toHaveBeenCalledWith(summaryUnitApiUrl, {});
  });

  test('fetch unit detail when refresh', async () => {
    await act(async () => {
      tree = await renderer.create(
        <UnitDetail route={route} account={account} />
      );
    });
    axios.get.mockClear();
    const scrollView = tree.root.findByType(ParallaxScrollView);
    const refreshControl = scrollView.props.refreshControl;
    await act(async () => {
      refreshControl.props.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(detailUnitApiUrl, {});
  });

  test('when unit has google home action then connect to google home', async () => {
    const unitData = {
      remote_control_options: {
        googlehome: [
          {
            config_maps: [],
            auth: {},
            chip_id: 1,
          },
        ],
      },
    };
    jest.useFakeTimers();

    createConnection.mockImplementation(async () => ({
      subscribeEvents: jest.fn(),
      addEventListener: jest.fn(),
    }));

    await act(async () => {
      renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });

    expect(createConnection).toHaveBeenCalled();
    expect(getStates).toHaveBeenCalled();
  });

  test('when unit has bluetooth action then scan for devices', async () => {
    const unitData = {
      remote_control_options: {
        bluetooth: ['xxx'],
      },
    };
    jest.useFakeTimers();

    await act(async () => {
      renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });
    const bleManager = BleManager();
    expect(bleManager.startDeviceScan).toHaveBeenCalled();
  });

  test('when unit has stations', async () => {
    const unitData = {
      stations: [
        {
          background: 'https://eoh-gateway-backend.eoh.io/Atlantis.png',
          camera: {
            id: 6,
            name: 'Camera',
            uri: 'rtsp://admin:1@1.1.1.1:1/Streaming/',
            preview_uri: 'rtsp://admin:1@1.1.1.1:1/Streaming/',
          },
          id: 172,
          name: '[EoH Office] Atlantis',
          sensors: [
            {
              action: null,
              action2: null,
              chip_id: 40,
              description: null,
              icon: '',
              icon_kit: '',
              id: 73,
              is_managed_by_backend: true,
              is_other_device: false,
              name: 'Multi-Air Quality',
              quick_action: null,
            },
          ],
        },
        {
          background: 'https://eoh-gateway-backend.eoh.io/Atlantis.png',
          camera: {
            id: 6,
            name: 'Camera',
            uri: 'rtsp://admin:1@1.1.1.1:1/Streaming/',
            preview_uri: 'rtsp://admin:1@1.1.1.1:1/Streaming/',
          },
          id: 145,
          name: 'HR Room',
          sensors: [
            {
              action: null,
              action2: null,
              chip_id: 40,
              description: null,
              icon: '',
              icon_kit: '',
              id: 73,
              is_managed_by_backend: true,
              is_other_device: false,
              name: 'HR',
              quick_action: null,
            },
          ],
        },
      ],
    };
    jest.useFakeTimers();
    axios.get.mockImplementation((url) => {
      if (url === summaryUnitApiUrl) {
        return {
          status: 200,
          data: [],
        };
      }

      return {
        status: 200,
        data: unitData,
      };
    });

    await act(async () => {
      tree = await renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });
    const instance = tree.root;
    const stationViews = instance.findAllByType(ShortDetailSubUnit);
    expect(stationViews).toHaveLength(1);

    const icon = await instance.findAll(
      (el) =>
        el.props.testID === TESTID.NAVBAR_ICON_BARS &&
        el.type === TouchableOpacity
    );
    expect(icon.length).toEqual(1);

    await act(async () => {
      await icon[0].props.onPress();
    });

    const menu = instance.findAll(
      (el) => el.props.testID === TESTID.NAVBAR_MENU_ACTION_MORE
    );
    expect(menu).toHaveLength(1);
    expect(menu[0].props.isVisible).toEqual(true);

    const nav = instance.findAllByType(NavBar);
    expect(nav[0].props.indexStation).toEqual(0);
  });

  test('when unit has summaries', async () => {
    jest.useFakeTimers();

    await act(async () => {
      tree = renderer.create(
        <UnitDetail route={{ params: { ...route.params } }} account={account} />
      );
    });

    const summaryViews = tree.root.findAllByType(Summaries);
    expect(summaryViews).toHaveLength(1);
  });

  test('when unit has google home action then connect to lg thinq', async () => {
    const unitData = {
      remote_control_options: {
        lg_thinq: [
          {
            id: 1,
            lg_devices: [
              {
                id: 1,
                sensor_id: 2,
                device_id: 'DEVICE_ID',
                configs: [
                  {
                    id: 1,
                    name: 'windStrength',
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    const responseGet = {
      status: 200,
      data: {
        airFlow: {
          windStrength: 'AUTO',
        },
      },
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    jest.useFakeTimers();
    await act(async () => {
      tree = await renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    // TODO Called but can not expect
    // expect(axios.get).toHaveBeenCalledWith(API.IOT.LG.DEVICE_STATUS(2));
  });
});
