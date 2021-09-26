import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableWithoutFeedback } from 'react-native';

import Device from '..';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';

const wrapComponent = (svgMain, sensor, title, isSelectDevice, onPress) => (
  <SCProvider initState={mockSCStore({})}>
    <Device
      svgMain={svgMain}
      title={title}
      sensor={sensor}
      isSelectDevice={isSelectDevice}
      onPress={onPress}
    />
  </SCProvider>
);

describe('Test SelectDevice', () => {
  let tree;

  test('onPressDevice', () => {
    const sensor = { id: 1, name: 'sensor', icon_kit: 'icon_kit' };
    const mockFuntion = jest.fn();
    act(() => {
      tree = renderer.create(
        wrapComponent(sensor.icon_kit, sensor, sensor.name, true, mockFuntion)
      );
    });

    const instance = tree.root;
    const touchableWithoutFeedback = instance.findByType(
      TouchableWithoutFeedback
    );
    act(() => {
      touchableWithoutFeedback.props.onPress();
    });
    expect(mockFuntion).toHaveBeenCalledWith(sensor);
  });
});
