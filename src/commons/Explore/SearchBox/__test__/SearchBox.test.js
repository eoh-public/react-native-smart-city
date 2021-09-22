import SearchBox from '../index';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';

const mockedNavigate = jest.fn();

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <SearchBox isBack={true} />
  </SCProvider>
);

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedNavigate,
    }),
  };
});

describe('Test SearchBox', () => {
  let wrapper;
  test('SearchBox render', () => {
    act(() => {
      wrapper = renderer.create(wrapComponent());
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);

    act(() => {
      button.props.onPress();
    });
    expect(mockedNavigate.mock.calls.length).toBe(1);
  });
});
