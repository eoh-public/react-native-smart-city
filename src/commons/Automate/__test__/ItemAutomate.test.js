import React from 'react';
import { act, create } from 'react-test-renderer';
import Text from '../../Text';
import ItemAutomate from '../ItemAutomate';

describe('Test ItemAutomate', () => {
  let tree;
  it('Test render', async () => {
    await act(() => {
      tree = create(<ItemAutomate type={'one_tap'} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
  });
});
