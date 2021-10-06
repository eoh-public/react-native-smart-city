import React from 'react';
import { View } from 'react-native';
import { act, create } from 'react-test-renderer';
import ItemScriptAction from '../ItemScriptAction';

describe('Test LocationItem', () => {
  let tree;
  it('Test render', async () => {
    await act(() => {
      tree = create(<ItemScriptAction item={{}} />);
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(7);
  });
});
