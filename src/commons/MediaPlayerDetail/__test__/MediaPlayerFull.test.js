import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import MediaPlayerFull from '../MediaPlayerFull';

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

const wrapComponent = (props) => (
  <SCProvider initState={mockSCStore({})}>
    <MediaPlayerFull {...props} />
  </SCProvider>
);

describe('Test MediaPlayerFull', () => {
  let tree;

  afterEach(() => {
    useState.mockClear();
  });

  it('Test render', async () => {
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    await act(() => {
      tree = create(
        wrapComponent({
          isShowFullScreenIcon: true,
          thumbnail: { uri: 'test' },
        })
      );
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(3);
    act(() => {
      TouchableOpacities[0].props.onPress();
    });
    expect(mockSetState).toBeCalledWith(false);
    act(() => {
      TouchableOpacities[1].props.onPress();
      TouchableOpacities[2].props.onPress();
    });
    expect(mockSetState).toBeCalledWith(true);
  });

  it('Test render 2', async () => {
    useState.mockImplementationOnce((init) => [true, mockSetState]);
    useState.mockImplementationOnce((init) => [true, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    await act(() => {
      tree = create(
        wrapComponent({
          isShowFullScreenIcon: true,
          cameraName: 'test',
          isPaused: true,
          amount: 1,
        })
      );
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(3);
    act(() => {
      TouchableOpacities[0].props.onPress();
    });
    expect(mockSetState).toBeCalledWith(false);
    act(() => {
      TouchableOpacities[1].props.onPress();
      TouchableOpacities[2].props.onPress();
    });
    expect(mockSetState).toBeCalledWith(true);
  });
});
