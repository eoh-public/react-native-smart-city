import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { create } from 'react-test-renderer';
import { act } from '@testing-library/react-hooks';
import ManageSubUnit from '../ManageSubUnit';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { RowItem } from '../../../commons/RowItem';
import Routes from '../../../utils/Route';

const mockSetState = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});
const mockedNavigate = jest.fn();
const mockUseIsFocused = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: () => ({
      useIsFocused: mockUseIsFocused,
    }),
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <ManageSubUnit route={route} />
  </SCProvider>
);

describe('Test ManageSubUnit', () => {
  let tree;

  afterEach(() => {
    mockSetState.mockClear();
    mockUseIsFocused.mockClear();
    mockedNavigate.mockClear();
  });

  it('render ManageSubUnit', async () => {
    let route = {
      params: { unit: { id: 1, name: 'unit 1' } },
    };
    const data = [{ id: 1, name: 'sensor' }];
    useState.mockImplementationOnce((init) => [data, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    await act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const subUnitScrollViews = instance.findAllByType(ScrollView);
    expect(subUnitScrollViews).toHaveLength(2);
    const rowItem = instance.findAllByType(RowItem);
    expect(rowItem).toHaveLength(1);
    act(() => {
      rowItem[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.UnitStack, {
      params: {
        station: { id: 1, name: 'sensor' },
        unit: {
          id: 1,
          name: 'unit 1',
        },
      },
      screen: 'EditSubUnit',
    });
  });
});
