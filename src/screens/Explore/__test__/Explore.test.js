import React from 'react';
import { SafeAreaView } from 'react-native';
import { act, create } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Explore from '../index';

const wrapComponent = (navigation) => (
  <SCProvider initState={mockSCStore({})}>
    <Explore navigation={navigation} />
  </SCProvider>
);

jest.mock('@react-native-community/geolocation', () => {
  return {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  };
});
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('test Explore', () => {
  let tree;

  test('Explore', async () => {
    act(() => {
      tree = create(wrapComponent(mockedNavigate));
    });
    const instance = tree.root;
    const safeAreaView = instance.findAllByType(SafeAreaView);
    expect(safeAreaView).toHaveLength(1);
  });
});
