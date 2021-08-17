import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import { TESTID } from '../../../configs/Constants';
import GroupCheckBox from '..';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Test Group CheckBox', () => {
  let tree;
  const mockSetState = () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    return setState;
  };

  const findGroupCheckBoxItem = (instance) => {
    const item = instance.find(
      (el) => el.props.testID === TESTID.GROUP_CHECKBOX_ITEM
    );
    return item;
  };

  test('render Group CheckBox', () => {
    const data = [
      {
        title: 'testItem',
        source: 'source',
        description: 'description',
      },
    ];
    mockSetState();
    act(() => {
      tree = create(<GroupCheckBox data={data} />);
    });
    const item = findGroupCheckBoxItem(tree.root);
    expect(item).not.toBeUndefined();
  });

  test('press Group CheckBox foundIndex === -1 multiple', async () => {
    const data = [
      {
        title: 'testItem',
        source: 'source',
        description: 'description',
      },
    ];
    const mockFunc = jest.fn();
    const setState = mockSetState();
    await act(async () => {
      tree = create(<GroupCheckBox data={data} onSelect={mockFunc} multiple />);
    });
    const item = findGroupCheckBoxItem(tree.root);

    await act(async () => {
      item.props.onSelect(0);
    });
    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(1, [0]);
    expect(setState).toHaveBeenNthCalledWith(2, [0]);
    expect(mockFunc).toHaveBeenCalledWith([
      { description: 'description', source: 'source', title: 'testItem' },
    ]);
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockFunc).toBeCalledTimes(2);
  });

  test('render Group CheckBox with foundIndex === -1 multiple false', async () => {
    const data = [
      {
        title: 'title 1',
        description: 'description 1',
      },
    ];
    const mockFunc = jest.fn();
    const setState = mockSetState();
    await act(async () => {
      tree = create(<GroupCheckBox data={data} onSelect={mockFunc} />);
    });
    const item = findGroupCheckBoxItem(tree.root);

    await act(async () => {
      item.props.onSelect(0);
    });
    expect(setState).toHaveBeenNthCalledWith(1, [0]);
    expect(setState).toHaveBeenNthCalledWith(2, [0]);
    expect(mockFunc).toHaveBeenCalledWith({
      description: 'description 1',
      title: 'title 1',
    });
  });

  test('render Group CheckBox with foundIndex !== -1', async () => {
    const data = [
      {
        title: 'title 1',
        description: 'description 1',
      },
      {
        title: 'title 2',
        description: 'description 2',
      },
    ];
    const mockFunc = jest.fn();
    const setState = jest.fn();
    useState.mockImplementation((init) => [[0], setState]);
    await act(async () => {
      tree = create(<GroupCheckBox data={data} onSelect={mockFunc} />);
    });
    const instance = tree.root;
    const items = instance.findAll(
      (el) => el.props.testID === TESTID.GROUP_CHECKBOX_ITEM
    );
    expect(items).toHaveLength(2);
    await act(async () => {
      items[1].props.onSelect(0);
    });
    expect(setState).toHaveBeenCalledWith([]); // called 1 time
    expect(mockFunc).toHaveBeenCalledWith({
      description: 'description 1',
      title: 'title 1',
    });
  });
});
