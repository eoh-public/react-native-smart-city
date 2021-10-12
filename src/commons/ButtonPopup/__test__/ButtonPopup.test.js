import React from 'react';
import Modal from 'react-native-modal';
import renderer, { act } from 'react-test-renderer';
import ButtonPopup from '../index';

describe('Test button popup', () => {
  let tree;

  test('create button popup', () => {
    act(() => {
      tree = renderer.create(
        <ButtonPopup
          mainTitle="Main title"
          secondaryTitle="Second title"
          thirdTitle="thirdTitle"
        />
      );
    });
    const instance = tree.root;
    const Modals = instance.findAllByType(Modal);
    expect(Modals).toHaveLength(1);
  });
});
