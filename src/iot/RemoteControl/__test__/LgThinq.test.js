import { act } from '@testing-library/react-hooks';
import axios from 'axios';
import { API } from '../../../configs';
import { getConfigGlobalState, setConfigGlobalState } from '../../states';
import { lgThinqConnect, sendCommandOverLGThinq } from '../LG';

jest.mock('axios');

describe('Remote Control LG Thinq', () => {
  let options;
  let sensor;
  let action;

  beforeEach(() => {
    setConfigGlobalState('configValues', {});
    axios.get.mockClear();
    axios.post.mockClear();

    options = [
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
    ];

    sensor = {
      id: 1,
      lg_device_id: 'DEVICE_ID',
    };

    action = {
      lg_actions: [
        {
          key: 'ACTION_KEY',
          message: {
            airFlow: { windStrength: 'LOW' },
          },
        },
      ],
    };
  });

  it('Connect to LGThinq basic will fetch device status', async () => {
    const response = {
      status: 200,
      data: {
        airFlow: {
          windStrength: 'LOW',
        },
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({});

    jest.useFakeTimers();
    await lgThinqConnect(options);
    await act(async () => {
      await jest.runAllTimers();
    });

    configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: 'LOW' });
  });

  it('Send command over lg thinq will call sendCommandOverInternet then fetch device status', async () => {
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

    const responsePost = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    jest.useFakeTimers();
    setConfigGlobalState('configValues', { 1: 'LOW' });
    await sendCommandOverLGThinq(sensor, action, 'AUTO');
    await act(async () => {
      await jest.runAllTimers();
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      API.SENSOR.QUICK_ACTION(sensor.id),
      {
        key: action.key,
        data: JSON.stringify({ airFlow: { windStrength: 'AUTO' } }),
        source: 'lg_thinq',
      }
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      API.IOT.LG.DEVICE_STATUS(sensor.id),
      {}
    );
    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: 'AUTO' });
  });

  it('Send command over lg thinq but fetch device status failed', async () => {
    const responseGet = {
      data: {},
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    const responsePost = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    jest.useFakeTimers();

    setConfigGlobalState('configValues', { 1: 'LOW' });
    await sendCommandOverLGThinq(sensor, action, 'AUTO');
    await act(async () => {
      await jest.runAllTimers();
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      API.IOT.LG.DEVICE_STATUS(sensor.id),
      {}
    );
    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: 'LOW' });
  });

  it('Send command over lg thinq but empty actions', async () => {
    action.lg_actions = [];
    await sendCommandOverLGThinq(sensor, action, 'AUTO');
    expect(axios.post).not.toHaveBeenCalled();
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('Send command over lg thinq for timer', async () => {
    options = [
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
                name: 'absoluteHourToStart',
              },
              {
                id: 2,
                name: 'absoluteMinuteToStart',
              },
            ],
          },
        ],
      },
    ];

    action = {
      lg_actions: [
        {
          key: 'ACTION_KEY',
          message: {
            timer: { absoluteHourToStart: 0, absoluteMinuteToStart: 0 },
          },
        },
      ],
    };

    const responseGet = {
      status: 200,
      data: {
        timer: {
          absoluteHourToStart: 18,
          absoluteMinuteToStart: 30,
        },
      },
    };
    axios.get.mockImplementation(async () => {
      return responseGet;
    });

    const responsePost = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });
    jest.useFakeTimers();

    await lgThinqConnect(options);

    setConfigGlobalState('configValues', { 1: 0, 2: 0 });
    await sendCommandOverLGThinq(sensor, action, [18, 30]);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      API.SENSOR.QUICK_ACTION(sensor.id),
      {
        key: action.key,
        data: JSON.stringify({
          timer: { absoluteHourToStart: 18, absoluteMinuteToStart: 30 },
        }),
        source: 'lg_thinq',
      }
    );

    await act(async () => {
      await jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(
      API.IOT.LG.DEVICE_STATUS(sensor.id),
      {}
    );
    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: 18, 2: 30 });
  });

  it('Send command over lg thinq will call sendCommandOverInternet with boolean', async () => {
    const responsePost = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    await sendCommandOverLGThinq(sensor, action, true);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      API.SENSOR.QUICK_ACTION(sensor.id),
      {
        key: action.key,
        data: JSON.stringify({ airFlow: { windStrength: true } }),
        source: 'lg_thinq',
      }
    );
  });

  it('Send command over lg thinq will call sendCommandOverInternet with number', async () => {
    const responsePost = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    await sendCommandOverLGThinq(sensor, action, 7);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      API.SENSOR.QUICK_ACTION(sensor.id),
      {
        key: action.key,
        data: JSON.stringify({ airFlow: { windStrength: 7 } }),
        source: 'lg_thinq',
      }
    );
  });

  it('Send command over lg thinq will call sendCommandOverInternet with number, write first in message', async () => {
    action.lg_actions[0].message = {
      temperature: { targetTemperature: 0, locationName: 'FRIDGE', unit: 'C' },
    };

    const responsePost = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return responsePost;
    });

    await sendCommandOverLGThinq(sensor, action, 7);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      API.SENSOR.QUICK_ACTION(sensor.id),
      {
        key: action.key,
        data: JSON.stringify({
          temperature: {
            targetTemperature: 7,
            locationName: 'FRIDGE',
            unit: 'C',
          },
        }),
        source: 'lg_thinq',
      }
    );
  });

  it('fetch temperature case', async () => {
    options = [
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
                name: 'FREEZER',
              },
              {
                id: 2,
                name: 'FRIDGE',
              },
            ],
          },
        ],
      },
    ];

    action = {
      lg_actions: [
        {
          key: 'ACTION_KEY',
          message: {
            temperature: [
              {
                locationName: 'FREEZER',
                targetTemperature: -10,
              },
              {
                locationName: 'FRIDGE',
                targetTemperature: 7,
              },
            ],
          },
        },
      ],
    };

    const response = {
      status: 200,
      data: {
        temperature: [
          {
            locationName: 'FREEZER',
            targetTemperature: -10,
          },
          {
            locationName: 'FRIDGE',
            targetTemperature: 7,
          },
        ],
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({});

    jest.useFakeTimers();
    await lgThinqConnect(options);
    await act(async () => {
      await jest.runAllTimers();
    });

    configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: -10, 2: 7 });
  });
});
