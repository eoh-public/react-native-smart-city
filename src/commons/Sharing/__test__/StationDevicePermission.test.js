import React from 'react';
import renderer, { act } from 'react-test-renderer';
import StationDevicePermissions from '../StationDevicePermissions';
import { TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (dataStation) => (
  <SCProvider initState={mockSCStore({})}>
    <StationDevicePermissions dataStation={dataStation} />
  </SCProvider>
);

describe('StationDevicePermission', () => {
  let tree;
  test('StationDevicePermission', async () => {
    const dataStation = {
      name: 'test',
      sensors: [
        {
          id: 1,
          device: 'device',
          read_configs: [1, 2],
          actions: [12],
          index: 1,
        },
      ],
    };
    await act(() => {
      tree = renderer.create(wrapComponent(dataStation));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(5);
    let iconOutline = instance.findAllByType(IconOutline);
    expect(iconOutline.length).toBe(1);
    expect(iconOutline[0].props.name).toEqual('down');
    act(() => {
      textInputs[0].props.onPress();
    });
    iconOutline = instance.findAllByType(IconOutline);
    expect(iconOutline[0].props.name).toEqual('up');
  });
  test('StationDevicePermission  icon: barrier', async () => {
    const dataStation = {
      name: 'test',
      sensors: [
        {
          id: 1,
          device: 'device',
          icon: 'barrier',
          read_configs: [1, 2],
          actions: [12],
        },
      ],
    };
    await act(() => {
      tree = renderer.create(wrapComponent(dataStation));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(5);
  });
  test('StationDevicePermission  icon: sensor', async () => {
    const dataStation = {
      name: 'test',
      sensors: [
        {
          device: 'device',
          icon: 'sensor',
          read_configs: [1, 2],
          actions: [12],
        },
      ],
    };
    await act(() => {
      tree = renderer.create(wrapComponent(dataStation));
    });

    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(5);
  });
});
