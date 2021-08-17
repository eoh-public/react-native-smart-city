import { API } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import { getConfigGlobalState, setConfigGlobalState } from '../states';
import { sendCommandOverInternet } from './Internet';

let deviceMaps = {};

export async function updateStateByLgThinq(device_id, data) {
  const device = deviceMaps[device_id];

  if (!device) {
    return;
  }

  let configValues = getConfigGlobalState('configValues');
  // eslint-disable-next-line no-unused-vars
  for (const [resource, property] of Object.entries(data)) {
    for (const [propertyName, propertyValue] of Object.entries(property)) {
      if (device.hasOwnProperty(propertyName)) {
        const [configId] = device[propertyName];
        configValues[configId] = propertyValue;
      }
    }
  }

  setConfigGlobalState('configValues', { ...configValues });
}

export async function fetchDeviceStatusLG(sensor) {
  const { success, data: dataStatus } = await axiosGet(
    API.IOT.LG.DEVICE_STATUS(sensor.id)
  );

  if (success) {
    updateStateByLgThinq(sensor.lg_device_id, dataStatus);
  }
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
    const item = action.lg_actions[i];
    let new_message = {};

    if (typeof data === 'string') {
      for (const [key, value] of Object.entries(item.message)) {
        let new_property = {};
        // eslint-disable-next-line no-unused-vars
        for (const [key1, value1] of Object.entries(value)) {
          new_property[key1] = data;
        }
        new_message[key] = new_property;
      }
    } else {
      for (const [key, value] of Object.entries(item.message)) {
        let new_property = {};
        let index = 0;
        // eslint-disable-next-line no-unused-vars
        for (const [key1, value1] of Object.entries(value)) {
          new_property[key1] = data[index];
          index += 1;
        }
        new_message[key] = new_property;
      }
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
