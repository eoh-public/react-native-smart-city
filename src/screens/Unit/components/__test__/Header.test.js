import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Modal from 'react-native-modal';
import Popover from 'react-native-popover-view';

import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';
import Header from '../Header';
import ImageButton from '../../../../commons/ImageButton';
import Routes from '../../../../utils/Route';

const wrapComponent = (title, goBack, dark, hideRight) => (
  <SCProvider initState={mockSCStore({})}>
    <Header title={title} goBack={goBack} dark={dark} hideRight={hideRight} />
  </SCProvider>
);

describe('Test Header', () => {
  let tree;
  test('test hideModal', () => {
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const modal = instance.findByType(Modal);
    act(() => {
      modal.props.onBackButtonPress();
    });
    expect(modal.props.isVisible).toBe(false);
  });

  test('test onItemClick', () => {
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const modal = instance.findByType(Modal);
    const imageButton = instance.findByType(ImageButton);
    act(() => {
      imageButton.props.onPress(Routes.Sharing);
    });
    expect(modal.props.isVisible).toBe(false);
  });

  test('test Popover Close Menu', () => {
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const popover = instance.findByType(Popover);
    act(() => {
      popover.props.onRequestClose();
    });
    expect(popover.props.isVisible).toBe(false);
  });
});
