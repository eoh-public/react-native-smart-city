import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text } from 'react-native-svg';
import ChartLoading from '../index';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <ChartLoading message="loading" />
  </SCProvider>
);

describe('Test chart loading', () => {
  let tree;

  test('create chart  message null', () => {
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(1);
  });
});
