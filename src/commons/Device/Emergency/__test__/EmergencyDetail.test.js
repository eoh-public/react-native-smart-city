import React from 'react';
import renderer, { act } from 'react-test-renderer';
import EmergencyDetail from '../EmergencyDetail';
import { useIsFocused } from '@react-navigation/native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';

const wrapComponent = (item) => (
  <SCProvider initState={mockSCStore({})}>
    <EmergencyDetail item={item} />
  </SCProvider>
);

const mockUseIsFocused = jest.fn();
jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useIsFocused: mockUseIsFocused,
  };
});

describe('Test EmergencyDetail', () => {
  let tree;
  afterEach(() => {
    useIsFocused.mockClear();
  });
  test('create EmergencyDetail', () => {
    const item = {
      configuration: {
        uri: '123',
        preview_uri: '123',
        device: {
          group: {
            id: 1,
          },
        },
      },
    };
    useIsFocused.mockImplementation(() => true);
    act(() => {
      tree = renderer.create(wrapComponent(item));
    });
    const instance = tree.root;
    const button = instance.findAllByType(VLCPlayer);
    expect(button.length).toEqual(0);
  });
});
