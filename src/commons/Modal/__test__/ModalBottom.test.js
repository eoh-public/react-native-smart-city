import React from 'react';
import { View } from 'react-native';
import { create } from 'react-test-renderer';
import { act } from 'react-test-renderer';
import { ModalBottom } from '../';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (isVisible) => (
  <SCProvider initState={mockSCStore({})}>
    <ModalBottom isVisible={isVisible} />
  </SCProvider>
);

describe('Test ModalBottom', () => {
  let tree;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('Test render with isVisible', async () => {
    await act(() => {
      tree = create(wrapComponent(true));
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(5);
  });

  it('Test render without isVisible', async () => {
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(5);
  });
});
