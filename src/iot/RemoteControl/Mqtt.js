import * as Mqtt from 'react-native-native-mqtt';
import { t } from 'i18n-js';
import _ from 'lodash';

import { getConfigGlobalState, setConfigGlobalState } from '../states';
import { ToastBottomHelper } from '../../utils/Utils';

let connections = {};

function handleMqttMessage(mappings, topic, message) {
  if (!mappings[topic]) {
    return;
  }

  let isChanged = false;
  let data;
  try {
    data = JSON.parse(message.toString());
  } catch {
    return;
  }

  let configValues = getConfigGlobalState('configValues');

  mappings.map(({ path, config_id }) => {
    const value = _.get(data, path);
    if (
      value !== undefined &&
      value !== null &&
      configValues[config_id] !== value
    ) {
      configValues[config_id] = value;
      isChanged = true;
    }
  });

  if (isChanged) {
    setConfigGlobalState('configValues', { ...configValues });
  }
}

export const mqttConnect = async (servers) => {
  for (let i = 0; i < servers.length; i++) {
    const server = servers[i];

    if (server.chip_id in connections) {
      // skip connected
      continue;
    }

    const maps = {};
    server.devices.map((device) => {
      maps[device.topic] = device.attributes;
    });

    const client = new Mqtt.Client(server.endpoint);
    connections[server.chip_id] = 0; // connecting

    client.on(Mqtt.Event.Connect, () => {
      ToastBottomHelper.success(t('command_mqtt_ready'));
      connections[server.chip_id] = client;
    });

    client.on(Mqtt.Event.Message, handleMqttMessage.bind(client, maps));

    client.connect({
      clientId: '',
      username: server.username,
      password: server.password,
    });
  }
};

export const mqttDisconnect = async (options) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (!(option.chip_id in connections)) {
      return;
    }

    connections[option.chip_id].disconnect();
    delete connections[option.chip_id];
  }
};
