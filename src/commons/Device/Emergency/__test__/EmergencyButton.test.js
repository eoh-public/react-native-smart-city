import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { TESTID } from '../../../../configs/Constants';
import Text from '../../../Text';
import EmergencyButton from '../EmergencyButton';

describe('Test EmergencyButton', () => {
  let tree;
  test('create EmergencyButton', () => {
    act(() => {
      tree = renderer.create(<EmergencyButton />);
    });

    const instance = tree.root;
    const textEmergencyDes = instance.findAllByType(Text);
    expect(textEmergencyDes[0]).toBeDefined();
  });

  test('long press EmergencyButton', () => {
    const mockFunction = jest.fn();
    act(() => {
      tree = renderer.create(<EmergencyButton emergency={mockFunction} />);
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
