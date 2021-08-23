import { Auth, createConnection, getStates } from 'home-assistant-js-websocket';
import { t } from 'i18n-js';
import { getConfigGlobalState, setConfigGlobalState } from '../states';
import { ToastBottomHelper } from '../../utils/Utils';
import { API } from '../../configs';
import { axiosPost } from '../../utils/Apis/axios';

let connections = {};

let configMaps = {};

let attributeMaps = {};

let textMaps = {};

function booleanType(value) {
  return value === 'on';
}

function intType(value) {
  return parseInt(value, 10);
}

function numberType(value) {
  return parseFloat(value);
}

function textType(value, entityId) {
  const textMap = textMaps[entityId];
  return textMap[value];
}

function keepValue(value) {
  return value;
}

const valueTypes = {
  boolean: booleanType,
  int: intType,
  number: numberType,
  text: textType,
};

async function stateChangeCallback(event) {
  const entityId = event.data.entity_id;
  let configValues = getConfigGlobalState('configValues');
  let isChanged = false;

  if (entityId in configMaps) {
    isChanged = true;
    const [configId, type] = configMaps[entityId];
    const typeConverter = valueTypes[type] || keepValue;
    configValues[configId] = typeConverter(
      event.data.new_state.state,
      entityId
    );
  }

  if (entityId in attributeMaps) {
    const entity = event.data.new_state;
    const entityAttributeMaps = attributeMaps[entityId];
    for (const [attributeName, attributeMap] of Object.entries(
      entityAttributeMaps
    )) {
      if (!entity.attributes) {
        return;
      }

      const [configId, type] = attributeMap;
      const typeConverter = valueTypes[type] || keepValue;
      configValues[configId] = typeConverter(
        entity.attributes[attributeName],
        entityId
      );
    }
  }

  if (isChanged) {
    setConfigGlobalState('configValues', { ...configValues });
  }
}

async function fetchConnectionEntities(connection) {
  const states = await getStates(connection);

  let configValues = getConfigGlobalState('configValues');

  for (let i = 0; i < states.length; i++) {
    const entity = states[i];
    const entityId = entity.entity_id;

    if (configMaps.hasOwnProperty(entityId)) {
      const [configId, type] = configMaps[entityId];
      const typeConverter = valueTypes[type] || keepValue;

      configValues[configId] = typeConverter(entity.state, entityId);
    }

    if (attributeMaps.hasOwnProperty(entityId)) {
      const entityAttributeMaps = attributeMaps[entityId];
      for (const [attributeName, attributeMap] of Object.entries(
        entityAttributeMaps
      )) {
        if (!entity.attributes) {
          return;
        }

        const [configId, type] = attributeMap;
        const typeConverter = valueTypes[type] || keepValue;
        configValues[configId] = typeConverter(
          entity.attributes[attributeName],
          entityId
        );
      }
    }
  }

  setConfigGlobalState('configValues', { ...configValues });
}

export const googleHomeConnect = async (options) => {
  let isConnected = true;
  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (option.chip_id in connections) {
      // skip connected
      return isConnected;
    }
    connections[option.chip_id] = 0; // connecting

    option.config_maps.forEach((configMap) => {
      if (option.text_maps) {
        textMaps[configMap.entity_id] = option.text_maps;
      }

      if (configMap.config_id) {
        configMaps[configMap.entity_id] = [
          configMap.config_id,
          configMap.value_type,
        ];
      }

      if (configMap.attribute_maps && configMap.attribute_maps.length) {
        attributeMaps[configMap.entity_id] = {};
        configMap.attribute_maps.map((attributeMap) => {
          attributeMaps[configMap.entity_id][attributeMap.attribute_name] = [
            attributeMap.config_id,
            attributeMap.value_type,
          ];
        });
      }
    });

    let auth = new Auth(option.auth);
    const connection = await createConnection({ auth });
    await connection.subscribeEvents(stateChangeCallback, 'state_changed');

    connection.addEventListener('disconnected', () => {
      ToastBottomHelper.error(t('command_googlehome_lost'));
      isConnected = false;
    });

    connection.addEventListener('ready', async (conn, eventData) => {
      await fetchConnectionEntities(conn);
      ToastBottomHelper.success(t('command_googlehome_ready'));
      isConnected = true;
    });

    connections[option.chip_id] = connection;
    await fetchConnectionEntities(connection);
    isConnected = true;
  }
  return isConnected;
};

export const googleHomeDisconnect = async (options) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (!(option.chip_id in connections)) {
      return;
    }

    await connections[option.chip_id].close();
    delete connections[option.chip_id];
  }
};

function getSensorConnection(sensor) {
  return connections[sensor.chip_id];
}

function getServiceName(message) {
  if (!message.service_data) {
    return null;
  }

  const serviceSplit = message.service.split('_');
  serviceSplit.shift();
  return serviceSplit.join('_');
}

export async function sendCommandOverGoogleHome(sensor, action, data) {
  if (!action.googlehome_actions || !action.googlehome_actions.length) {
    return;
  }

  const connection = getSensorConnection(sensor);
  if (!connection) {
    ToastBottomHelper.error(t('command_send_fail_googlehome'));
    return;
  }

  for (let i = 0; i < action.googlehome_actions.length; i++) {
    const ghAction = action.googlehome_actions[i];
    const { message } = ghAction;
    const name = getServiceName(ghAction.message);

    if (name && data) {
      message.service_data[name] = data;
    }

    await connection.sendMessagePromise(message);
  }

  await axiosPost(API.SENSOR.ACTIVITY_LOG(), {
    action_id: action.id,
    message: 'Trigger by user action with google home',
  });
  ToastBottomHelper.success(t('command_send_success_googlehome'));
}
