import React from 'react';
import { create, act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { ImageButton, MenuActionAddnew } from '../../index';

const wrapComponent = (dataActions) => (
  <SCProvider initState={mockSCStore({})}>
    <MenuActionAddnew dataActions={dataActions} />
  </SCProvider>
);

const item = (id) => ({ id, image: '', text: '' });

describe('Test MenuActionAddNew', () => {
  const dataActions = [item(1), item(2)];
  let wrapper;

  test('onItemClick MenuActionAddNew', () => {
    const mockFunc = jest.fn();
    act(() => {
      wrapper = create(wrapComponent(dataActions));
    });
    const instance = wrapper.root;
    const imageButtons = instance.findAllByType(ImageButton);
    act(() => {
      imageButtons[0].props.onPress();
    });
    expect(imageButtons.length).toEqual(2);
    expect(mockFunc.mock.calls.length).toBe(0);
  });
});
