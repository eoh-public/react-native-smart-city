import React from 'react';
import { View } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { CircleView } from '../index';

describe('Test circle view', () => {
  let tree;
  test('create circle view', () => {
    act(() => {
      tree = renderer.create(<CircleView size={5} />);
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(1);
  });
});
