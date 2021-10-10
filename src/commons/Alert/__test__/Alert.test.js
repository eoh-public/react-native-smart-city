import React from 'react';
import Modal from 'react-native-modal';
import renderer, { act } from 'react-test-renderer';
import Alert from '../index';

describe('Test Alert', () => {
  let tree;
  test('create Alert', () => {
    act(() => {
      tree = renderer.create(<Alert />);
    });
    const instance = tree.root;
    const Modals = instance.findAllByType(Modal);
    expect(Modals).toHaveLength(1);
  });
});
