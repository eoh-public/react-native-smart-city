import React from 'react';
import { Animated } from 'react-native';
import { act, create } from 'react-test-renderer';
import Timer from '../Timer';

describe('test Timer', () => {
  let tree;
  it('Test render', async () => {
    await act(() => {
      tree = create(<Timer />);
    });
    const instance = tree.root;
    const Animateds = instance.findAllByType(Animated.ScrollView);
    expect(Animateds).toHaveLength(1);
  });
});
