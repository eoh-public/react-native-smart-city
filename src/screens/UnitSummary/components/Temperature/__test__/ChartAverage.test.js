import React from 'react';
import { View } from 'react-native';
import { act, create } from 'react-test-renderer';

import ChartAverage from '../ChartAverage';

describe('Test ChartAverage', () => {
  let tree;
  test('render ChartAverage', () => {
    act(() => {
      tree = create(<ChartAverage />);
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(3);
  });
});
