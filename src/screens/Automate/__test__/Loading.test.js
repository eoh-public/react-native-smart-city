import React from 'react';
import { View } from 'react-native';
import { act, create } from 'react-test-renderer';
import Loading from '../Components/Loading';

describe('Test Loading', () => {
  let tree;
  it('Test render', async () => {
    await act(() => {
      tree = create(<Loading />);
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(1);
  });
});
