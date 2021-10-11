import React from 'react';
import { TextInput } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import OtpInputList from '../OtpInputList';

describe('Test OtpInputList', () => {
  const mockFunc = jest.fn();
  const list_code = [0, 1, 2, 3, 4, 5];
  let tree;

  for (const code of list_code) {
    test(`create OtpInputList ${code} onfinishInputCode is func`, () => {
      act(() => {
        tree = renderer.create(<OtpInputList onfinishInputCode={mockFunc} />);
      });

      const instance = tree.root;
      const textInputs = instance.findAllByType(TextInput);
      textInputs.forEach((el, index) => {
        act(() => {
          el.props.onFocus(code); // TODO check onFocus(code)
          el.props.onChangeText('1');
        });
      });
      expect(mockFunc).toHaveBeenCalledWith('111111');
    });
  }

  test('create OtpInputList not parameter', () => {
    act(() => {
      tree = renderer.create(<OtpInputList />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TextInput);
    textInputs.forEach((el, index) => {
      act(() => {
        el.props.onFocus();
        el.props.onChangeText('');
      });
    });
    expect(mockFunc).toHaveBeenCalledWith('111111');
  });
});
