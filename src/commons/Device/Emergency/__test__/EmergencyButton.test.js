import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { TESTID } from '../../../../configs/Constants';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';
import Text from '../../../Text';
import EmergencyButton from '../EmergencyButton';

const wrapComponent = (mockFunction) => (
  <SCProvider initState={mockSCStore({})}>
    <EmergencyButton emergency={mockFunction} />
  </SCProvider>
);

describe('Test EmergencyButton', () => {
  let tree;
  test('create EmergencyButton', async () => {
    await act(() => {
      tree = renderer.create(wrapComponent());
    });

    const instance = tree.root;
    const textEmergencyDes = instance.findAllByType(Text);
    expect(textEmergencyDes[0]).toBeDefined();
  });

  test('long press EmergencyButton', async () => {
    const mockFunction = jest.fn();
    await act(() => {
      tree = renderer.create(wrapComponent(mockFunction));
    });

    const instance = tree.root;
    const button = instance.findAllByType(TouchableOpacity);
    const emergencyButton = button.find(
      (item) => item.props.testID === TESTID.EMERGENCY_BUTTON
    );

    act(() => {
      emergencyButton.props.onLongPress();
    });

    expect(mockFunction).toBeCalled();
  });
});
