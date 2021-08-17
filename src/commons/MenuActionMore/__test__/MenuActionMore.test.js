import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import MenuActionMore from '..';

describe('Test MenuActionMore', () => {
  let wrapper;
  const mockFunc = jest.fn();
  test('render MenuActionMore', async () => {
    let listMenuItem = [{ text: 'text' }];
    await act(async () => {
      wrapper = await renderer.create(
        <MenuActionMore
          isVisible={true}
          hideMore={mockFunc}
          listMenuItem={listMenuItem}
          onItemClick={mockFunc}
        />
      );
    });

    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
