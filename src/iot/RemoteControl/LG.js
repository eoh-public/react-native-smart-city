import { API } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import { getConfigGlobalState, setConfigGlobalState } from '../states';
import { sendCommandOverInternet } from './Internet';

let deviceMaps = {};
const propertyListMaps = {
  temperature: 'targetTemperature',
  doorStatus: 'doorState',
};
const propertyTimer = [
  'absoluteHourToStart',
  'absoluteMinuteToStart',
  'absoluteHourToStop',
  'absoluteMinuteToStop',
];

function updateConfigValues(device, configValues, name, value) {
  if (device.hasOwnProperty(name)) {
    const [configId] = device[name];
    configValues[configId] = value;
  }
  return configValues;
}

export async function updateStateByLgThinq(device_id, data) {
  const device = deviceMaps[device_id];

  if (!device) {
    return;
  }

  let configValues = getConfigGlobalState('configValues');
  // eslint-disable-next-line no-unused-vars
  for (const [resource, property] of Object.entries(data)) {
    // base on data
    if (Array.isArray(property)) {
      const valueName = propertyListMaps[resource];
      if (valueName) {
        for (let i = 0; i < property.length; i++) {
          const item = property[i];
          configValues = updateConfigValues(
            device,
            configValues,
            item.locationName,
            item[valueName]
          );
        }
      }
      continue;
    }

    for (const [propertyName, propertyValue] of Object.entries(property)) {
      configValues = updateConfigValues(
        device,
        configValues,
        propertyName,
        propertyValue
      );
    }
  }

  // For timer, if there is not exist in data, set undefined
  for (let i = 0; i < propertyTimer.length; i++) {
    // base on device
    const name = propertyTimer[i];
    if (device.hasOwnProperty(name)) {
      const value = data.timer && data.timer[name];
      const [configId] = device[name];
      configValues[configId] = value;
    }
  }

  setConfigGlobalState('configValues', { ...configValues });
}

export async function fetchDeviceStatusLG(sensor) {
  // still need some delay
  setTimeout(async () => {
    const { success, data: dataStatus } = await axiosGet(
      API.IOT.LG.DEVICE_STATUS(sensor.id),
      {},
      true
    );

    if (success) {
      updateStateByLgThinq(sensor.lg_device_id, dataStatus);
    }
  }, 1000);
}

export const lgThinqConnect = async (options) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    for (let j = 0; j < option.lg_devices.length; j++) {
      const lgDevice = option.lg_devices[j];
      let configMaps = {};
      if (lgDevice.device_id) {
        lgDevice.configs.forEach((config) => {
          configMaps[config.name] = [config.id];
        });
        deviceMaps[lgDevice.device_id] = configMaps;
      }
    }
  }

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    for (let j = 0; j < option.lg_devices.length; j++) {
      const lgDevice = option.lg_devices[j];
      const sensor = {
        id: lgDevice.sensor_id,
        lg_device_id: lgDevice.device_id,
      };
      await fetchDeviceStatusLG(sensor);
    }
  }
};

export const sendCommandOverLGThinq = async (sensor, action, data) => {
  if (action.lg_actions.length === 0) {
    return;
  }

  for (let i = 0; i < action.lg_actions.length; i++) {
    if (['string', 'boolean', 'number'].includes(typeof data)) {
      data = [data];
    }

    const item = action.lg_actions[i];
    let new_message = {};
    for (const [key, value] of Object.entries(item.message)) {
      let new_property = {};
      let index = 0;
      for (const [key1, value1] of Object.entries(value)) {
        new_property[key1] = data[index] ? data[index] : value1; // new or keep old one
        index += 1;
      }
      new_message[key] = new_property;
    }

    await sendCommandOverInternet(
      sensor,
      action,
      JSON.stringify(new_message),
      'lg_thinq'
    );
  }
  await fetchDeviceStatusLG(sensor);
};
