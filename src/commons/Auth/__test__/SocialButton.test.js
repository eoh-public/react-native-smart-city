import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { IconFill } from '@ant-design/icons-react-native';

import SocialButton from '../SocialButton';

describe('Test OtpInputList', () => {
  const mockFunc = jest.fn();
  let tree;

  test('create SocialButton', () => {
    act(() => {
      tree = renderer.create(
        <SocialButton icon={'apple'} onPress={mockFunc} />
      );
    });

    const instance = tree.root;
    const textInputs = instance.findAllByType(IconFill);
    expect(textInputs.length).toBe(1);

    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });

  test('create SocialButton icon null', () => {
    act(() => {
      tree = renderer.create(<SocialButton icon={''} onPress={mockFunc} />);
    });

    const instance = tree.root;
    const textInputs = instance.findAllByType(Image);
    expect(textInputs.length).toBe(1);
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
