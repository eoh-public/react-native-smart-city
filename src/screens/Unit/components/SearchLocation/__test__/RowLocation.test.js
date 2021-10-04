import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import RowLocation from '../RowLocation';
import { SCProvider } from '../../../../../context';
import { mockSCStore } from '../../../../../context/mockStore';

const mockFunc = jest.fn();

const wrapComponent = (item, onPress) => (
  <SCProvider initState={mockSCStore({})}>
    <RowLocation item={item} onPress={onPress} />
  </SCProvider>
);

describe('Test RowLocation', () => {
  let item;
  beforeEach(() => {
    item = {
      description: '',
    };
  });
  let tree;

  test('create RowLocation', async () => {
    await act(() => {
      tree = create(wrapComponent(item, mockFunc));
    });
    const instance = tree.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
