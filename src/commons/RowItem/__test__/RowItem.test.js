import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import { RowItem } from '../index';

describe('Test RowUser', () => {
  let tree;
  test('create RowUser', () => {
    act(() => {
      tree = renderer.create(<RowItem text="Text" type="primary" />);
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);
  });
});
