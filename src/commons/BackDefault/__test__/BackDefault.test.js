import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import BackDefault from '../index';

describe('Test BackDefault', () => {
  let tree;
  test('create BackDefault', () => {
    let goBack = () => {};
    let color = { color: 'fff' };
    let fixedHeight = { Height: 50 };
    act(() => {
      tree = renderer.create(
        <BackDefault goBack={goBack} color={color} fixedHeight={fixedHeight} />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);
  });
});
