import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import LocationItem from '../LocationItem';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (item, mockFunc, margin) => (
  <SCProvider initState={mockSCStore({})}>
    <LocationItem item={item} onPress={mockFunc} margin={margin} />
  </SCProvider>
);

let tree;
describe('Test LocationItem', () => {
  test('render LocationItem', async () => {
    const item = { background: '', name: '', address: '', distance: '' };
    const margin = { marginLeft: 10 };
    const mockFunc = jest.fn();
    await act(() => {
      tree = renderer.create(wrapComponent(item, mockFunc, margin));
    });
    const instance = tree.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockFunc).toBeCalledTimes(1);
  });
});
