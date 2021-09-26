import React from 'react';
import renderer, { act } from 'react-test-renderer';

import AddCommonSelectSubUnit from '../SelectSubUnit';
import { ViewButtonBottom } from '../../../commons';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('axios');

const mockedGoBack = jest.fn();
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
    useIsFocused: () => ({}),
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddCommonSelectSubUnit route={route} />
  </SCProvider>
);

describe('Test SelectSubUnit', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockedGoBack.mockClear();
  });
  let tree;
  test('test ViewButtonBottom leftClick', async () => {
    const route = { params: { addType: 'AddNewGateway' } };
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    act(() => {
      viewButtonBottom.props.onLeftClick();
    });
    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('test ViewButtonBottom onRightClick', async () => {
    const route = { params: { addType: 'AddNewGateway' } };
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    act(() => {
      viewButtonBottom.props.onRightClick();
    });
    expect(mockedNavigate).toHaveBeenCalled();
  });
});
