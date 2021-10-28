import React from 'react';
import { act, create } from 'react-test-renderer';
import Text from '../../Text';
import ItemAutomate from '../ItemAutomate';
import { TouchableOpacity } from 'react-native';

import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (type) => (
  <SCProvider initState={mockSCStore({})}>
    <ItemAutomate type={type}/>
  </SCProvider>
);

describe('Test ItemAutomate', () => {
  let tree;
  it('Test render', async () => {
    await act(() => {
      tree = create(wrapComponent('one_tap'));
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
  });
});
