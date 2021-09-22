import React from 'react';
import renderer, { act } from 'react-test-renderer';

import ImagePicker from '../index';
import ButtonPopup from '../../ButtonPopup';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (options) => (
  <SCProvider initState={mockSCStore({})}>
    <ImagePicker
      showImagePicker={true}
      setShowImagePicker={''}
      setImageUrl={'setImageUrl'}
      optionsCapture={options}
      optionsSelect={{
        mediaType: 'photo',
        quality: 1,
      }}
    />
  </SCProvider>
);

describe('Test ImagePicker', () => {
  let tree;
  let Platform;
  beforeEach(() => {
    Platform = require('react-native').Platform;
  });
  test('create ImagePicker', () => {
    Platform.OS = 'android';
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(ButtonPopup);
    expect(textInputs.length).toBe(1);
  });

  test('create ImagePicker optionsCapture', () => {
    Platform.OS = 'android';
    const options = {
      mediaType: 'photo',
      maxWidth: 1024,
      quality: 0.8,
      saveToPhotos: true,
    };
    act(() => {
      tree = renderer.create(wrapComponent(options));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(ButtonPopup);
    expect(textInputs.length).toBe(1);
  });
});
