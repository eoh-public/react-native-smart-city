import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import BtnRemoveMember from '../BtnRemoveMember';

describe('BtnRemoveMember', () => {
  let tree;

  test('BtnRemoveMember snapshot', () => {
    const component = <BtnRemoveMember />;
    act(() => {
      tree = renderer.create(component);
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(1);
  });
});
