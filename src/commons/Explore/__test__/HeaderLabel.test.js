import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import HeaderLabel from '../HeaderLabel';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (mockFunc) => (
  <SCProvider initState={mockSCStore({})}>
    <HeaderLabel
      seeMore={true}
      title={'popular_locations'}
      onPress={mockFunc}
    />
  </SCProvider>
);

let tree;
describe('Test HeaderLabel', () => {
  test('render HeaderLabel', async () => {
    const mockFunc = jest.fn();
    await act(() => {
      tree = renderer.create(wrapComponent(mockFunc));
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
