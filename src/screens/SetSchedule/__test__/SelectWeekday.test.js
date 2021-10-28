import React from 'react';
import { create, act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { TouchableOpacity } from 'react-native';
import SelectWeekday from '../components/SelectWeekday';

const wrapComponent = (props) => (
  <SCProvider initState={mockSCStore({})}>
    <SelectWeekday {...props} />
  </SCProvider>
);

const mockSetWeekday = jest.fn();
test('test select', async () => {
  let tree;
  let props = {
    weekday: [],
    setWeekday: mockSetWeekday,
  };
  await act(async () => {
    tree = await create(wrapComponent(props));
  });
  let instance = tree.root;
  let items = instance.findAllByType(TouchableOpacity);
  expect(items).toHaveLength(7);

  await act(async () => {
    await items[0].props.onPress();
  });
  expect(mockSetWeekday).toBeCalledWith(['0']);

  mockSetWeekday.mockClear();
  props = {
    ...props,
    weekday: ['0'],
  };
  await act(async () => {
    tree = await create(wrapComponent(props));
  });
  instance = tree.root;
  items = instance.findAllByType(TouchableOpacity);

  await act(async () => {
    await items[0].props.onPress();
  });
  expect(mockSetWeekday).toBeCalledWith([]);
});
