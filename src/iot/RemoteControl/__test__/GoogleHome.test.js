import { createConnection, getStates } from 'home-assistant-js-websocket';
import Toast from 'react-native-toast-message';
import { t } from 'i18n-js';
import axios from 'axios';
import {
  googleHomeConnect,
  googleHomeDisconnect,
  sendCommandOverGoogleHome,
} from '../GoogleHome';
import { getConfigGlobalState, setConfigGlobalState } from '../../states';
import { API } from '../../../configs';

jest.mock('axios');
jest.mock('home-assistant-js-websocket', () => {
  return {
    Auth: jest.fn(),
    createConnection: jest.fn(),
    getStates: jest.fn(),
  };
});

const connection = {
  subscribeEvents: jest.fn(),
  addEventListener: jest.fn(),
  sendMessagePromise: jest.fn(),
  close: jest.fn(),
};

getStates.mockImplementation(() => []);
createConnection.mockImplementation(() => connection);

describe('Remote Control Google Home', () => {
  const options = [
    {
      auth: {},
      chip_id: 1,
      text_maps: {
        here: 10,
      },
      config_maps: [
        {
          entity_id: 'group.sensor',
          config_id: 1,
          value_type: 'boolean',
          attribute_maps: [
            {
              config_id: 2,
              attribute_name: 'battery',
              value_type: 'int',
            },
            {
              config_id: 3,
              attribute_name: 'name',
              value_type: 'text',
            },
            {
              config_id: 4,
              attribute_name: 'height',
              value_type: 'number',
            },
          ],
        },
      ],
    },
  ];

  const sensor = {
    chip_id: 1,
  };

  const action = {
    id: 1,
    googlehome_actions: [
      {
        message: 'message',
      },
    ],
  };

  const response = {
    status: 200,
  };

  beforeEach(async () => {
    axios.post.mockClear();
    await googleHomeDisconnect(options);
    connection.sendMessagePromise.mockClear();
    createConnection.mockClear();
    getStates.mockClear();
    setConfigGlobalState('configValues', {});
  });

  it('Connect to google home basic will fetch entities', async () => {
    getStates.mockImplementationOnce(() => [
      {
        entity_id: 'group.sensor',
        state: 'on',
        attributes: {
          battery: '50%',
          name: 'here',
          height: '123.4',
        },
      },
      {
        entity_id: 'group.sensor2',
        state: 'on',
      },
    ]);
    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({});

    await googleHomeConnect(options);
    expect(createConnection).toBeCalledTimes(1);
    expect(getStates).toBeCalledTimes(1);

    configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: true, 2: 50, 3: 10, 4: 123.4 });
  });

  it('When state change, global config value also change', async () => {
    const eventData = {
      data: {
        entity_id: 'group.sensor',
        new_state: {
          state: 'on',
        },
        attributes: {
          battery: '50%',
        },
      },
    };
    const eventData2 = {
      data: {
        entity_id: 'group.sensor2',
      },
    };

    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({});

    connection.subscribeEvents.mockImplementation((listener, event) => {
      if (event === 'state_changed') {
        listener(eventData);
        listener(eventData2);
      }
    });

    await googleHomeConnect(options);

    configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: true });
  });

  it('Connect to same google home will be skipped', async () => {
    await googleHomeConnect(options);
    await googleHomeConnect(options);
    expect(createConnection).toBeCalledTimes(1);
    expect(getStates).toBeCalledTimes(1);
  });

  it('Reconnect will also fetch entities', async () => {
    connection.addEventListener.mockImplementation((event, listener) => {
      if (event === 'ready') {
        listener();
      }
    });
    await googleHomeConnect(options);
    expect(createConnection).toBeCalledTimes(1);
    expect(getStates).toBeCalledTimes(2);
  });

  it('Disconnect will notify user', async () => {
    connection.addEventListener.mockImplementationOnce((event, listener) => {
      if (event === 'disconnected') {
        listener();
      }
    });
    await googleHomeConnect(options);
    expect(Toast.show).toBeCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('command_googlehome_lost'),
      visibilityTime: 1000,
    });
  });

  it('Send command over google home will send message to chip', async () => {
    axios.post.mockImplementation(async () => {
      return response;
    });
    await googleHomeConnect(options);
    await sendCommandOverGoogleHome(sensor, action);
    expect(connection.sendMessagePromise).toBeCalledWith(
      action.googlehome_actions[0].message
    );
  });

  it('Send command over google home will send message to chip with service_data and data', async () => {
    action.googlehome_actions[0].message = {
      type: 'call_service',
      domain: 'climate',
      service: 'set_temperature',
      service_data: {
        temperature: 0,
        entity_id: 'climate.dqsmart_0108f6cdde',
      },
      id: 20,
    };

    axios.post.mockImplementation(async () => {
      return response;
    });
    await googleHomeConnect(options);
    await sendCommandOverGoogleHome(sensor, action, 19);

    action.googlehome_actions[0].message.service_data.temperature = 19;
    expect(connection.sendMessagePromise).toBeCalledWith(
      action.googlehome_actions[0].message
    );
    expect(axios.post).toHaveBeenCalledWith(API.SENSOR.ACTIVITY_LOG(), {
      action_id: 1,
      message: 'Trigger by user action with google home',
    });
  });

  it('Send command over google home that not connected', async () => {
    await googleHomeConnect(options);
    await sendCommandOverGoogleHome({ chip_id: 2 }, action);
    expect(connection.sendMessagePromise).not.toBeCalled();
  });

  it('Send command over google home that not a google home', async () => {
    await googleHomeConnect(options);
    await sendCommandOverGoogleHome(sensor, {});
    expect(connection.sendMessagePromise).not.toBeCalled();
  });

  it('Disconnect a not connected gateway', async () => {
    connection.close.mockClear();
    await googleHomeDisconnect(options);
    expect(connection.close).not.toBeCalled();
  });
});
