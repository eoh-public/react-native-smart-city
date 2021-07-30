/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/prefer-await-to-callbacks */
import { BLE } from '../../configs';
import { t } from 'i18n-js';
import base64 from 'react-native-base64';
import { BleManager } from 'react-native-ble-plx';
import { ToastBottomHelper } from '../../utils/Utils';

const bluetoothDevices = {};
const needToScanDevices = [];
const bleManager = new BleManager();

export const SEND_COMMAND_OVER_BLUETOOTH_FAIL =
  'SEND_COMMAND_OVER_BLUETOOTH_FAIL';

export const clearNeedToScanDevices = () => {
  needToScanDevices.length = 0;
};

export const clearFoundDevices = () => {
  for (const prop of Object.getOwnPropertyNames(bluetoothDevices)) {
    delete bluetoothDevices[prop];
  }
};

bleManager.onStateChange((state) => {
  if (state === 'PoweredOn') {
    ToastBottomHelper.success(t('text_ble_is_powered_on'));
    realScanBluetoothDevices();
  }
}, true);

export const scanBluetoothDevices = (names) => {
  names.map((name) => {
    if (bluetoothDevices[name]) {
      return;
    }
    needToScanDevices.push(name);
  });
  realScanBluetoothDevices();
};

const realScanBluetoothDevices = () => {
  if (!needToScanDevices.length) {
    return;
  }

  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      return;
    }

    let name = null;
    if (
      needToScanDevices.includes(device.name) &&
      !bluetoothDevices[device.name]
    ) {
      name = device.name;
    } else if (
      needToScanDevices.includes(device.localName) &&
      !bluetoothDevices[device.localName]
    ) {
      name = device.localName;
    } else {
      return;
    }

    const index = needToScanDevices.indexOf(name);
    needToScanDevices.splice(index, 1);

    ToastBottomHelper.success(
      t('Found bluetooth %{name} for remote control', {
        name,
      })
    );

    bluetoothDevices[name] = device;
    if (!needToScanDevices.length) {
      try {
        bleManager.stopDeviceScan();
        // eslint-disable-next-line no-empty
      } catch {}
    }
  });

  setTimeout(() => {
    try {
      bleManager.stopDeviceScan();
    } catch {}
  }, 15000);
};

export const sendCommandOverBluetooth = async (sensor, action, data) => {
  const bluetooth = sensor.remote_control_options.bluetooth;
  let device = null;
  if (bluetooth) {
    device = getDeviceByName(bluetooth.address);
  }

  await sendDataOverBluetooth(device, {
    type: 'command',
    command: action.key,
    password: bluetooth ? bluetooth.password : '',
    data,
  });
};

export const getDeviceByName = (name) => {
  return bluetoothDevices[name];
};

export const subcribeCharacteristicNotify = async (device, onListener) => {
  return await device.monitorCharacteristicForService(
    BLE.BLE_REMOTE_SERVICE_UUID,
    BLE.BLE_REMOTE_CHARACTERISTIC_UUID_TX,
    onListener
  );
};

export const readCharacteristic = async (device) => {
  return await device.readCharacteristicForService(
    BLE.BLE_REMOTE_SERVICE_UUID,
    BLE.BLE_REMOTE_CHARACTERISTIC_UUID_RX
  );
};

export const sendDataOverBluetooth = async (
  device = null,
  data,
  keepConnect = false
) => {
  if (!device) {
    throw SEND_COMMAND_OVER_BLUETOOTH_FAIL;
  }

  ToastBottomHelper.error(t('Sending command via bluetooth'));

  let connectedDevice = null;
  let fullDataDevice = null;

  try {
    connectedDevice = await device.connect();
    fullDataDevice = await connectedDevice.discoverAllServicesAndCharacteristics();
    await fullDataDevice.writeCharacteristicWithResponseForService(
      BLE.BLE_REMOTE_SERVICE_UUID,
      BLE.BLE_REMOTE_CHARACTERISTIC_UUID,
      base64.encode(JSON.stringify(data))
    );
    ToastBottomHelper.success(t('Command is sent to device via bluetooth'));
  } catch (e) {
    ToastBottomHelper.error(t('Command is fail to send via bluetooth'));
    throw SEND_COMMAND_OVER_BLUETOOTH_FAIL;
  }

  if (keepConnect) {
    return;
  }

  await device.cancelConnection();
};
