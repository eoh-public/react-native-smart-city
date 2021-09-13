import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { useTranslations } from '../../../hooks/Common/useTranslations';
import ConnectDevices from '../ConnectDevices';
import { TESTID } from '../../../configs/Constants';
import { TouchableOpacity } from 'react-native';
import _TextInput from '../../../commons/Form/TextInput';
import { AlertAction } from '../../../commons';

jest.mock('axios');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test ConnectDevices', () => {
  let tree;
  let route;

  afterEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
  });

  beforeEach(() => {
    route = {
      params: {
        new_sensor: {
          id: 1,
          name: 'Sensor name',
        },
        station_id: 2,
        unit_id: 1,
        unit_name: 'Unit name',
      },
    };
  });

  const getText = (instance, id) => {
    return instance.find((el) => el.props.testID === id);
  };

  test('create', async () => {
    const t = useTranslations();
    await act(async () => {
      tree = await create(<ConnectDevices route={route} />);
    });
    const instance = tree.root;

    const textSuccess = getText(instance, TESTID.CONNECTED_DEVICE_SUCCESS);
    const textUnitName = getText(instance, TESTID.CONNECTED_DEVICE_UNIT_NAME);
    const textDeviceName = getText(
      instance,
      TESTID.CONNECTED_DEVICE_DEVICE_NAME
    );
    const textRenameDevice = getText(
      instance,
      TESTID.CONNECTED_DEVICE_RENAME_DEVICE
    );
    const textDone = getText(instance, TESTID.CONNECTED_DEVICE_DONE);

    expect(textSuccess.props.children).toEqual(t('successfully_connected'));
    expect(textUnitName.props.children).toEqual('Unit name');
    expect(textDeviceName.props.children).toEqual('Sensor name');
    expect(textRenameDevice.props.children).toEqual(t('rename_your_device'));
    expect(textDone.props.children).toEqual(t('done'));
  });

  test('hide show alert action', async () => {
    await act(async () => {
      tree = await create(<ConnectDevices route={route} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.CONNECTED_DEVICE_BUTTON_RENAME_DEVICE &&
        el.type === TouchableOpacity
    );
    const alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toBe(false);
    await act(async () => {
      await button.props.onPress();
    });
    expect(alertAction.props.visible).toBe(true);
    await act(async () => {
      await alertAction.props.leftButtonClick();
    });
    expect(alertAction.props.visible).toBe(false);
  });

  test('change and rename', async () => {
    await act(async () => {
      tree = await create(<ConnectDevices route={route} />);
    });
    const instance = tree.root;
    const textDeviceName = getText(
      instance,
      TESTID.CONNECTED_DEVICE_DEVICE_NAME
    );
    const textInput = instance.findByType(_TextInput);
    expect(textInput.props.value).toEqual('Sensor name');
    expect(textDeviceName.props.children).toEqual('Sensor name');
    await act(async () => {
      await textInput.props.onChange('Temporary sensor name');
    });
    expect(textInput.props.value).toEqual('Temporary sensor name');
    expect(textDeviceName.props.children).toEqual('Sensor name');

    const alertAction = instance.findByType(AlertAction);
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(textInput.props.value).toEqual('Temporary sensor name');
    expect(textDeviceName.props.children).toEqual('Temporary sensor name');
  });
});
