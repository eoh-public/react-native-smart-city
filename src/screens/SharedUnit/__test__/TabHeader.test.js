import React from 'react';
import { create } from 'react-test-renderer';
import { act } from '@testing-library/react-hooks';
import TabHeader from '../TabHeader';
import { TouchableOpacity } from 'react-native';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('axios');

const wrapComponent = (current, getCurrentTab, showModal, textFilter) => (
  <SCProvider initState={mockSCStore({})}>
    <TabHeader
      current={current}
      getCurrentTab={getCurrentTab}
      showModal={showModal}
      textFilter={textFilter}
    />
  </SCProvider>
);

describe('Test TabHeader', () => {
  let tree;

  const current = 0;
  const getCurrentTab = () => {};
  const showModal = true;
  const textFilter = '';

  it('render TabHeader', async () => {
    act(() => {
      tree = create(
        wrapComponent(current, getCurrentTab, showModal, textFilter)
      );
    });
    const instance = tree.root;
    const touchableOpacity = instance.findAllByType(TouchableOpacity);
    expect(touchableOpacity).toHaveLength(3);
  });
});
