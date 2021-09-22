import React from 'react';
import { create } from 'react-test-renderer';
import { act } from '@testing-library/react-hooks';
import { TESTID } from '../../../configs/Constants';
import DeviceInfo from '../';
import { View } from 'react-native';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('axios');

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useRoute: jest.fn().mockReturnValue({
      params: {
        deviceInfo: [
          {
            type: 'device_info',
            configuration: {
              battery: '11.5 VDC',
              rssi_node: '29',
              chip_info: {
                voltage: '12 VDC',
                temperature: '32.4 °C',
                rssi_board: 28,
                modbus_fail: '45/55',
                request_fail: '34/40',
              },
            },
          },
        ],
      },
    }),
  };
});

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <DeviceInfo />
  </SCProvider>
);

describe('Test DeviceInfo', () => {
  let tree;

  it('render DeviceInfo', async () => {
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const battety = instance.findAll(
      (el) => el.props.testID === TESTID.DEVICE_INFO_BATTERY && el.type === View
    );
    expect(battety.length).toEqual(1);

    const rssiNode = instance.findAll(
      (el) =>
        el.props.testID === TESTID.DEVICE_INFO_RSSI_NODE && el.type === View
    );
    expect(rssiNode.length).toEqual(1);

    const chip = instance.findAll(
      (el) =>
        el.props.testID === TESTID.DEVICE_INFO_CHIP_INFO && el.type === View
    );
    expect(chip.length).toEqual(5);
  });
});
