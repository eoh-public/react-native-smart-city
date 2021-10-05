import React from 'react';
import { ScrollView } from 'react-native';
import { act, create } from 'react-test-renderer';
import DeviceDetail from '../detail';
import axios from 'axios';
import { API } from '../../../configs';
import { AlertSendConfirm } from '../../../commons/EmergencyButton/AlertSendConfirm';
import { AlertSent } from '../../../commons/EmergencyButton/AlertSent';
import { AlertAction, ButtonPopup, MenuActionMore } from '../../../commons';
import { TESTID } from '../../../configs/Constants';
import Text from '../../../commons/Text';
import { IconFill } from '@ant-design/icons-react-native';
// import CurrentRainSensor from 'components/Device/RainningSensor/CurrentRainSensor';
import CurrentRainSensor from '../../../commons/Device/RainningSensor/CurrentRainSensor';
import { ConnectedViewHeader } from '../../../commons/Device';
import { getTranslate } from '../../../utils/I18n';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Routes from '../../../utils/Route';

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();

jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockedDispatch,
    useSelector: jest.fn(),
    connect: () => {
      return (component) => component;
    },
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
  memo: (x) => x,
}));

const mockAxios = (
  responseDisplay,
  responseDisplayValueV2,
  responseRemoteControl = {}
) => {
  axios.get.mockImplementation((url) => {
    if (url === API.SENSOR.DISPLAY(1)) {
      return responseDisplay;
    } else if (url === API.SENSOR.REMOTE_CONTROL_OPTIONS(1)) {
      return responseRemoteControl;
    } else if (url === API.SENSOR.DISPLAY_VALUES_V2(1)) {
      return responseDisplayValueV2;
    }
    return {
      status: 200,
      data: {},
    };
  });
};

const wrapComponent = (account, route) => (
  <SCProvider initState={mockSCStore({})}>
    <DeviceDetail account={account} route={route} />
  </SCProvider>
);

describe('test DeviceDetail', () => {
  let tree;
  let route;
  let account;

  beforeEach(() => {
    route = {
      params: {
        unit: {
          id: 1,
          name: 'Unit name',
          address: '298 Dien Bien Phu',
          remote_control_options: {
            googlehome: true,
          },
        },
        station: {
          id: 2,
          name: 'Station name',
        },
        sensor: {
          id: 1,
          is_managed_by_backend: true,
          station: { id: 2, name: 'Station name' },
        },
        title: 'Button',
      },
    };
    account = {
      token: 'abc',
    };
    jest.clearAllTimers();
    const setState = jest.fn();
    const useLayoutEffectSpy = jest.spyOn(React, 'useLayoutEffect');
    useLayoutEffectSpy.mockImplementation(() => setState);
    axios.get.mockClear();
  });

  afterEach(() => {
    mockedNavigate.mockClear();
  });

  test('render DeviceDetail render SensorDisplayItem', async () => {
    const responseDisplay = {
      status: 200,
      data: {
        items: [
          {
            configuration: {
              id: 2,
              name: 'EoH Gate',
              preview_uri:
                'http://admin:admin123@203.205.32.86:10080/Streaming/Channels/2/picture',
              uri: 'rtsp://admin:admin123@203.205.32.86:10554/Streaming/Channels/1/',
            },
            id: 17,
            order: 1,
            template: 'camera',
            type: 'camera',
          },
          {
            configuration: {
              id: 1,
              template: 'three_button_action_template',
              title: '',
              configuration: {
                action1: '2b949045-8e03-4c07-a855-7794ade2e69c',
                action1_data: {
                  color: '#00979D',
                  command_prefer_over_bluetooth: false,
                  command_prefer_over_googlehome: false,
                  command_prefer_over_internet: true,
                  googlehome_actions: [],
                  icon: 'caret-up',
                  id: 9,
                  key: '2b949045-8e03-4c07-a855-7794ade2e69c',
                },
                action2: '38347d5e-4418-4ab0-978c-c82f4c034897',
                action2_data: {
                  color: '#00979D',
                  command_prefer_over_bluetooth: false,
                  command_prefer_over_googlehome: false,
                  command_prefer_over_internet: true,
                  googlehome_actions: [],
                  icon: 'stop',
                  id: 11,
                  key: '38347d5e-4418-4ab0-978c-c82f4c034897',
                },
                action3: 'a492e08c-8cb1-44ee-8ea0-46aaca4e5141',
                action3_data: {
                  color: '#00979D',
                  command_prefer_over_bluetooth: false,
                  command_prefer_over_googlehome: false,
                  command_prefer_over_internet: true,
                  googlehome_actions: [],
                  icon: 'caret-down',
                  id: 10,
                  key: 'a492e08c-8cb1-44ee-8ea0-46aaca4e5141',
                },
                icon1: 'caret-up',
                icon2: 'stop',
                icon3: 'caret-down',
                text1: 'UP',
                text2: 'STOP/UNLOCK',
                text3: 'DOWN',
              },
            },
            id: 18,
            order: 2,
            template: 'action',
            type: 'action',
          },
        ],
      },
    };

    const responseRemoteControl = {
      status: 200,
      data: {
        bluetooth: {
          address: 'JUvfa06PMDU8Cqlo',
          password: 'MYcNoskxspWTPsnh',
        },
        internet: {},
      },
    };

    const responseDisplayValueV2 = {
      status: 200,
      data: {
        configs: [],
        is_connected: true,
        last_updated: '2021-01-24T12:00:00.000Z',
      },
    };

    mockAxios(responseDisplay, responseDisplayValueV2, responseRemoteControl);

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;
    expect(axios.get).toHaveBeenCalledTimes(4);
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.DISPLAY(1), {});
    expect(axios.get).toHaveBeenCalledWith(
      API.SENSOR.REMOTE_CONTROL_OPTIONS(1),
      {}
    );
    const sensorDisplayItem = instance.findAll(
      (el) => el.props.testID === TESTID.SENSOR_DISPLAY_ITEM
    );
    expect(sensorDisplayItem.length).toEqual(2);

    const itemMediaPlayer = instance.find(
      (el) => el.props.testID === TESTID.DEVICE_DETAIL_MEDIA_PLAYER
    );
    expect(itemMediaPlayer).toBeDefined();

    const itemActionGroup = instance.find(
      (el) => el.props.testID === TESTID.DEVICE_DETAIL_ACTION_GROUP
    );
    expect(itemActionGroup).toBeDefined();

    const button1 = instance.find(
      (el) => el.props.testID === TESTID.BUTTON_TEMPLATE_1
    );
    await act(async () => {
      await button1.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.SENSOR.QUICK_ACTION(1), {
      key: responseDisplay.data.items[1].configuration.configuration.action1,
      source: 'internet',
    });

    const button2 = instance.find(
      (el) => el.props.testID === TESTID.BUTTON_TEMPLATE_2
    );
    await act(async () => {
      await button2.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.SENSOR.QUICK_ACTION(1), {
      key: responseDisplay.data.items[1].configuration.configuration.action2,
      source: 'internet',
    });

    const button3 = instance.find(
      (el) => el.props.testID === TESTID.BUTTON_TEMPLATE_3
    );
    await act(async () => {
      await button3.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.SENSOR.QUICK_ACTION(1), {
      key: responseDisplay.data.items[1].configuration.configuration.action3,
      source: 'internet',
    });
  });

  test('AlertSendConfirm onSendNowAlert', async () => {
    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;
    const alertSendConfirm = instance.findByType(AlertSendConfirm);
    const alertSent = instance.findByType(AlertSent);
    expect(alertSendConfirm.props.showAlertConfirm).toEqual(false);
    expect(alertSent.props.showAlertSent).toEqual(false);
    expect(alertSendConfirm.props.countDown).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 5,
    });

    const response = {
      status: 200,
      data: {},
      success: true,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await alertSendConfirm.props.onSendNowAlert();
    });
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(alertSent.props.showAlertSent).toEqual(true);
    // expect(clearTimeout).toHaveBeenCalledTimes(1); // current not working
  });

  test('ButtonPopup onClick', async () => {
    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;
    const buttonPopup = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_POPUP_RESOLVED &&
        el.type === ButtonPopup
    );
    const alertAction = instance.findByType(AlertAction);
    expect(buttonPopup.props.visible).toEqual(false);

    const responseResolve = {
      status: 200,
      sucess: true,
    };

    axios.put.mockImplementationOnce(async () => {
      return responseResolve;
    });

    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(buttonPopup.props.visible).toEqual(true);
    expect(buttonPopup.props.mainTitle).toEqual(getTranslate('en', 'ok'));
    await act(async () => {
      await buttonPopup.props.onPressMain();
      await buttonPopup.props.onClose();
    });
    expect(buttonPopup.props.visible).toEqual(false);
  });

  test('ButtonPopup render', async () => {
    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;
    const buttonPopupTitle = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_POPUP_RESOLVED_TITLE &&
        el.type === Text
    );
    const buttonPopupIcon = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_POPUP_RESOLVED_ICON &&
        el.type === IconFill
    );
    expect(buttonPopupTitle.props.children).toEqual([
      'Unit name',
      ' - ',
      'Station name',
    ]);
    expect(buttonPopupIcon.props.name).toEqual('check-circle');
  });

  test('ScrollView onRefresh', async () => {
    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;
    const scrollView = instance.findByType(ScrollView);
    const refreshControl = scrollView.props.refreshControl;
    expect(axios.get).toHaveBeenCalledTimes(5);
    await act(async () => {
      refreshControl.props.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledTimes(7);
  });

  test('Should render SensorDisplayItem', async () => {
    const responseDisplay = {
      status: 200,
      data: {
        items: [
          {
            id: 0,
            order: 1,
            template: 'camera',
            type: 'camera',
            configuration: {
              id: 2,
              name: 'E',
              uri: 'http://123121',
              preview_uri: 'http://123121',
            },
          },
          {
            id: 1,
            order: 2,
            template: 'action',
            type: 'action',
            configuration: {
              id: 1,
              template: 'three_button_action_template',
              title: '',
              configuration: {
                action1: 'a',
                action2: 'b',
                action3: 'b',
                icon1: 'caret-up',
                icon2: 'stop',
                icon3: 'caret-down',
                text1: 'A',
                text2: 'B',
                text3: 'C',
                action1_data: {
                  id: 9,
                  key: 'a',
                  icon: 'caret-up',
                  color: '#00979D',
                  googlehome_actions: [],
                  command_prefer_over_internet: false,
                  command_prefer_over_bluetooth: true,
                  command_prefer_over_googlehome: false,
                },
                action2_data: {
                  id: 11,
                  key: 'c',
                  icon: 'stop',
                  color: '#00979D',
                  googlehome_actions: [],
                  command_prefer_over_internet: false,
                  command_prefer_over_bluetooth: true,
                  command_prefer_over_googlehome: false,
                },
                action3_data: {
                  id: 10,
                  key: 'b',
                  icon: 'caret-down',
                  color: '#00979D',
                  googlehome_actions: [],
                  command_prefer_over_internet: false,
                  command_prefer_over_bluetooth: true,
                  command_prefer_over_googlehome: false,
                },
              },
            },
          },
          {
            id: 3,
            order: 3,
            template: 'action',
            type: 'action',
            configuration: {
              id: 25,
              template: 'one_button_action_template',
              title: '',
              configuration: {
                action: 'd',
                icon: 'lock',
                text: 'd',
                action_data: {
                  id: 77,
                  key: 'd',
                  icon: 'lock',
                  color: '#00979D',
                  googlehome_actions: [],
                  command_prefer_over_internet: false,
                  command_prefer_over_bluetooth: true,
                  command_prefer_over_googlehome: false,
                },
              },
            },
          },
          {
            id: 170,
            order: 1,
            template: 'value',
            type: 'value',
            configuration: {
              type: 'simple_list',
              configs: [
                {
                  id: 428,
                  standard: 'Temperature',
                  measure: '°C',
                  color: 'red',
                },
              ],
            },
          },
        ],
      },
    };

    const responseDisplayValueV2 = {
      status: 200,
      data: {
        configs: [],
        is_connected: true,
        last_updated: '2021-01-24T12:00:00.000Z',
      },
    };

    mockAxios(responseDisplay, responseDisplayValueV2);

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });

    const instance = tree.root;
    const sensorDisplayItem = instance.findAll(
      (el) => el.props.testID === TESTID.SENSOR_DISPLAY_ITEM
    );
    expect(sensorDisplayItem).toHaveLength(4);
  });

  test('render SensorDisplayItem emercency', async () => {
    const responseDisplay = {
      status: 200,
      data: {
        items: [
          {
            id: 1,
            order: 1,
            template: 'emergency',
            type: 'emergency',
            configuration: {
              camera: null,
              device: {
                configs: { id: 521, value: null, time: null },
                last_event: { id: 374, reportedAt: '' },
                id: 1,
                group: {
                  id: 1,
                  contacts: [
                    {
                      id: 1,
                      group: 1,
                      name: 'user1',
                      phone_number: '038111111',
                    },
                    {
                      id: 2,
                      group: 1,
                      name: 'user1',
                      phone_number: '038111112',
                    },
                    { id: 3, group: 1, name: 'user1', phone_number: '' },
                  ],
                },
              },
              title: '',
            },
          },
        ],
      },
    };

    const responseDisplayValueV2 = {
      status: 200,
      data: {
        configs: [],
        is_connected: true,
        last_updated: '2021-01-24T12:00:00.000Z',
      },
    };

    mockAxios(responseDisplay, responseDisplayValueV2);

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });

    const instance = tree.root;
    const sensorDisplayItem = instance.findAll(
      (el) => el.props.testID === TESTID.SENSOR_DISPLAY_ITEM
    );
    expect(sensorDisplayItem).toHaveLength(1);
  });

  test('render CurrentRainSensor', async () => {
    const responseDisplay = {
      status: 200,
      data: {
        items: [
          {
            id: 170,
            order: 1,
            template: 'value',
            type: 'value',
            configuration: {
              type: 'circle',
              configs: [
                {
                  id: 428,
                  color: 'red',
                  standard: 'Temperature',
                  measure: '°C',
                },
              ],
            },
          },
        ],
      },
    };

    const responseDisplayValueV2 = {
      status: 200,
      data: {
        configs: [{ id: 428 }],
        is_connected: true,
        last_updated: '2021-01-24T12:00:00.000Z',
      },
    };

    mockAxios(responseDisplay, responseDisplayValueV2);

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });

    const instance = tree.root;
    const sensorDisplayItem = instance.findAll(
      (el) => el.props.testID === TESTID.SENSOR_DISPLAY_ITEM
    );
    expect(sensorDisplayItem).toHaveLength(1);

    const currentRainSensor = instance.findAllByType(CurrentRainSensor);
    expect(currentRainSensor).toHaveLength(1); // not crash app
  });

  test('not fetch value if not managed by backend', async () => {
    route.params.sensor.is_managed_by_backend = false;

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });

    expect(axios.get).not.toBeCalledWith(API.SENSOR.DISPLAY_VALUES_V2(1));
  });

  test('render CurrentRainSensor but is other device', async () => {
    route.params.sensor.is_other_device = true;
    route.params.isGGHomeConnected = true;

    const responseDisplay = {
      status: 200,
      data: {
        items: [
          {
            id: 170,
            order: 1,
            template: 'value',
            type: 'value',
            configuration: {
              type: 'circle',
              configs: [
                {
                  id: 428,
                  color: 'red',
                  standard: 'Temperature',
                  measure: '°C',
                },
              ],
            },
          },
        ],
      },
    };

    const responseDisplayValueV2 = {
      status: 200,
      data: {
        configs: [{ id: 428 }],
        is_connected: true,
        last_updated: '2021-01-24T12:00:00.000Z',
      },
    };

    mockAxios(responseDisplay, responseDisplayValueV2);

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });

    const instance = tree.root;
    const sensorDisplayItem = instance.findAll(
      (el) => el.props.testID === TESTID.SENSOR_DISPLAY_ITEM
    );
    expect(sensorDisplayItem).toHaveLength(1);
    const connectedViewHeader = instance.findByType(ConnectedViewHeader);
    expect(connectedViewHeader.props.type).toEqual('GoogleHome');
  });

  test('HeaderDevice button more onClick', async () => {
    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;
    const menu = instance.findByType(MenuActionMore);
    expect(menu.props.isVisible).toBe(false);

    const buttonMore = instance.find(
      (el) => el.props.testID === TESTID.HEADER_DEVICE_BUTTON_MORE
    );
    await act(async () => {
      await buttonMore.props.onPress();
    });
    expect(menu.props.isVisible).toBe(true);
  });

  test('Add device to Favourites', async () => {
    const unit_id = route.params.unit.id;
    const station_id = route.params.station.id;
    const sensor = route.params.sensor;
    sensor.is_favourite = false;

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;

    const response = {
      status: 200,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });
    const buttonStar = instance.find(
      (el) => el.props.testID === TESTID.HEADER_DEVICE_BUTTON_STAR
    );
    await act(async () => {
      await buttonStar.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(
      API.SENSOR.ADD_TO_FAVOURITES(unit_id, station_id, sensor.id)
    );
  });

  test('Remove device from Favourites', async () => {
    const unit_id = route.params.unit.id;
    const station_id = route.params.station.id;
    const sensor = route.params.sensor;
    sensor.is_favourite = true;

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;

    const response = {
      status: 200,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    const buttonStar = instance.find(
      (el) => el.props.testID === TESTID.HEADER_DEVICE_BUTTON_STAR
    );
    await act(async () => {
      await buttonStar.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(
      API.SENSOR.REMOVE_FROM_FAVOURITES(unit_id, station_id, sensor.id)
    );
  });

  test('Go to ActivityLog', async () => {
    const responseDisplay = {
      status: 200,
      data: {
        items: [
          {
            configuration: {
              template: 'OnOffSimpleActionTemplate',
              configuration: {
                config: 5,
                icon: 'up',
                is_on_value: [],
              },
              title: 'Turn on / off',
            },
            id: 18,
            order: 2,
            template: 'action',
            type: 'action',
          },
        ],
      },
    };

    const responseDisplayValueV2 = {
      status: 200,
      data: {
        configs: [],
        is_connected: true,
        last_updated: '2021-01-24T12:00:00.000Z',
      },
    };

    mockAxios(responseDisplay, responseDisplayValueV2);

    await act(async () => {
      tree = await create(wrapComponent(account, route));
    });
    const instance = tree.root;
    const menu = instance.findByType(MenuActionMore);
    const gotoActivityLog = menu.props.listMenuItem[1];

    await act(async () => {
      await menu.props.onItemClick(gotoActivityLog);
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ActivityLog, {
      id: route.params.sensor.id,
      type: 'action',
    });
  });
});
