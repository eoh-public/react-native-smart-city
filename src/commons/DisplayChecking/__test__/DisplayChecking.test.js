import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import LoadingMessage from '../index';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (visible, onClose, message) => (
  <SCProvider initState={mockSCStore({})}>
    <LoadingMessage visible={visible} onClose={onClose} message={message} />
  </SCProvider>
);

describe('Test DisplayChecking', () => {
  let tree;
  let visible = true;
  let message = '';
  let onClose = () => {};

  test('create LoadingMessage', () => {
    act(() => {
      tree = renderer.create(wrapComponent(visible, message, onClose));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(1);
  });
});
