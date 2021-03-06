import { BleManager } from 'react-native-ble-plx';
import Toast from 'react-native-toast-message';
import { getTranslate } from '../../../utils/I18n';
import '../Bluetooth';
import {
  scanBluetoothDevices,
  clearNeedToScanDevices,
  sendCommandOverBluetooth,
  SEND_COMMAND_OVER_BLUETOOTH_FAIL,
  clearFoundDevices,
} from '../Bluetooth';

const bleManager = new BleManager();

describe('Test IOT Bluetooth', () => {
  beforeEach(() => {
    bleManager.startDeviceScan.mockClear();
    bleManager.stopDeviceScan.mockClear();
    Toast.show.mockClear();
    clearNeedToScanDevices();
    clearFoundDevices();
  });

  afterEach(() => {
    clearFoundDevices();
    clearNeedToScanDevices();
  });

  test('When bluetooth is powered on, user get notification', async () => {
    const onStateChangeFn = bleManager.onStateChangeFn;
    onStateChangeFn('PoweredOn');
    expect(Toast.show).toBeCalledWith({
      type: 'success',
      position: 'bottom',
      text1: getTranslate('en', 'text_ble_is_powered_on'),
      visibilityTime: 1000,
    });
  });

  test('When bluetooth is powered on but Toast not ready, user does not get notification', async () => {
    const onStateChangeFn = bleManager.onStateChangeFn;
    Toast._ref = null;

    onStateChangeFn('PoweredOn');
    expect(Toast.show).not.toBeCalled();

    Toast._ref = true;
  });

  test('When bluetooth is powered off, user does not get notification', async () => {
    const onStateChangeFn = bleManager.onStateChangeFn;
    onStateChangeFn('PoweredOff');
    expect(Toast.show).not.toBeCalled();
  });

  test('Scan bluetooth device will init hardware scan', async () => {
    scanBluetoothDevices(['123456']);
    expect(bleManager.startDeviceScan).toBeCalled();
  });

  test('When power on, hardware will continue look for bluetooth', async () => {
    scanBluetoothDevices(['123456']);
    expect(bleManager.startDeviceScan).toBeCalledTimes(1);
    bleManager.onStateChangeFn('PoweredOn');
    expect(bleManager.startDeviceScan).toBeCalledTimes(2);
  });

  test('When power on, if not looking for bluetooth then hardware will not scan', async () => {
    bleManager.onStateChangeFn('PoweredOn');
    expect(bleManager.startDeviceScan).not.toBeCalled();
  });

  test('When look for bluetooth name, hardware will auto stop after period of time', async () => {
    jest.useFakeTimers();
    scanBluetoothDevices(['123456']);
    jest.runAllTimers();
    expect(bleManager.stopDeviceScan).toBeCalled();
  });

  test('When search bluetooth then hardware also search for local name', async () => {
    const device = {
      localName: '123456',
    };
    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener(null, device);
      }
    );

    scanBluetoothDevices([device.localName]);
    expect(Toast.show).toBeCalledWith({
      type: 'success',
      position: 'bottom',
      text1: 'Found bluetooth 123456 for remote control',
      visibilityTime: 1000,
    });
  });

  test('When search bluetooth has error then program does nothing', async () => {
    const device = {
      name: '123456',
    };

    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener('Something wrong', null);
      }
    );

    scanBluetoothDevices([device.name]);
    expect(Toast.show).not.toBeCalled();
  });

  test('When search bluetooth but found another device then program does nothing', async () => {
    const device = {
      name: '123456',
    };

    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener(null, device);
      }
    );

    scanBluetoothDevices([device.name + 'x']);
    expect(Toast.show).not.toBeCalled();
  });

  test('When not found all bluetooth then hardware will continue scan', async () => {
    const device = {
      name: '123456',
    };
    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener(null, device);
      }
    );
    scanBluetoothDevices([device.name, device.name + 'x']);
    expect(bleManager.stopDeviceScan).not.toBeCalled();
  });

  test('When found all bluetooth then hardware will be stop', async () => {
    const device = {
      name: '123456',
    };
    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener(null, device);
      }
    );
    scanBluetoothDevices([device.name]);
    expect(bleManager.stopDeviceScan).toBeCalled();
  });

  test('Scan same device again will not trigger hardware scan', async () => {
    const device = {
      name: '1234567',
    };
    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener(null, device);
      }
    );
    scanBluetoothDevices([device.name]);
    expect(bleManager.startDeviceScan).toBeCalled();

    bleManager.startDeviceScan.mockClear();

    scanBluetoothDevices([device.name]);
    expect(bleManager.startDeviceScan).not.toBeCalled();
  });

  const sendCommandBluetoothFail = async (sensor) => {
    let error = null;
    try {
      await sendCommandOverBluetooth(sensor, {});
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(SEND_COMMAND_OVER_BLUETOOTH_FAIL);
  };

  test('Send command over bluetooth do nothing for sensor has no bluetooth', async () => {
    await sendCommandBluetoothFail({
      remote_control_options: {},
    });
  });

  test('Send command over bluetooth do nothing for sensor has not found bluetooth', async () => {
    await sendCommandBluetoothFail({
      remote_control_options: {
        bluetooth: 'bluetooth',
      },
    });
  });

  test('Send command over bluetooth via device failed to connect', async () => {
    const device = {
      name: '1234567',
    };
    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener(null, device);
      }
    );
    scanBluetoothDevices([device.name]);

    await sendCommandBluetoothFail({
      remote_control_options: {
        bluetooth: {
          address: device.name,
        },
      },
    });
  });

  test('Send command over bluetooth via device success', async () => {
    const device = {
      name: '1234567',
      cancelConnection: jest.fn(),
      connect: async () => ({
        discoverAllServicesAndCharacteristics: async () => ({
          writeCharacteristicWithResponseForService: async () => ({}),
        }),
      }),
    };
    bleManager.startDeviceScan.mockImplementation(
      (uuids, options, listener) => {
        listener(null, device);
      }
    );
    scanBluetoothDevices([device.name]);

    await sendCommandOverBluetooth(
      {
        remote_control_options: {
          bluetooth: {
            address: device.name,
          },
        },
      },
      {}
    );
  });
});
