import React from 'react';
import { View } from 'react-native';
import { act, create } from 'react-test-renderer';

import ItemAverage from '../ItemAverage';

describe('Test ItemAverage', () => {
  let tree;
  test('render ItemAverage', async () => {
    act(() => {
      tree = create(<ItemAverage />);
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(1);
  });
});
