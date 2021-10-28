import React from 'react';
import { act, create } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Text from '../../Text';
import ItemAutomate from '../ItemAutomate';

const wrapComponent = (type = 'one_tap') => (
  <SCProvider initState={mockSCStore({})}>
    <ItemAutomate type={type} />
  </SCProvider>
);

describe('Test ItemAutomate', () => {
  let tree;
  it('Test render', async () => {
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
  });
});
