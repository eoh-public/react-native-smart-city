import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import OneButtonAction from '../OneButtonAction';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (configuration, onPress) => (
  <SCProvider initState={mockSCStore({})}>
    <OneButtonAction configuration={configuration} onPress={onPress} />
  </SCProvider>
);

describe('Test OneButtonAction', () => {
  let tree;

  test('test onPress', () => {
    const configuration = {};
    const mockFuntion = jest.fn();
    act(() => {
      tree = renderer.create(wrapComponent(configuration, mockFuntion));
    });
    const instance = tree.root;
    const touchOpacity = instance.findAllByType(TouchableOpacity);

    expect(touchOpacity).toHaveLength(1);
    act(() => {
      touchOpacity[0].props.onPress();
    });
    expect(mockFuntion).toHaveBeenCalled();
  });
});
