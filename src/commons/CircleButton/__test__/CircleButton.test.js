import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { CircleButton } from '../index';

describe('Test circle button', () => {
  let tree;
  test('create circle button', () => {
    act(() => {
      tree = renderer.create(<CircleButton size={5} />);
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(1);
  });
});
