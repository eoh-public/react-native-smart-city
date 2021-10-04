import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Text from '../../../commons/Text';
import HeaderExplore from '../HeaderExplore';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <HeaderExplore />
  </SCProvider>
);

describe('Test HeaderExplore', () => {
  let tree;

  test('render HeaderExplore', () => {
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const button = instance.findAllByType(Text);
    expect(button.length).toBe(1);
  });
});
