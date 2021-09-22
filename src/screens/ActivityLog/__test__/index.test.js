import React, { useState } from 'react';
import { SectionList, Text, ActivityIndicator } from 'react-native';
import { create } from 'react-test-renderer';
import { act } from '@testing-library/react-hooks';
import ActivityLog from '../';
import { Constants } from '../../../configs';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const mockUseSelector = jest.fn();
const mockSetState = jest.fn();
const mockRoute = jest.fn();

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: () => mockUseSelector,
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useRoute: () => mockRoute,
  };
});

jest.mock('axios');

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <ActivityLog />
  </SCProvider>
);

describe('Test Activity log', () => {
  let tree;
  Date.now = jest.fn(() => new Date('2021-07-02T15:48:24.917932Z'));

  afterEach(() => {
    mockSetState.mockClear();
  });

  it('render empty list', async () => {
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const SectionListElement = instance.findAllByType(SectionList);
    expect(SectionListElement).toHaveLength(1);
    const TextElement = instance.findAllByType(Text);
    expect(TextElement[1].props.style).toEqual({
      alignSelf: 'center',
      marginTop: Constants.height * 0.3,
      fontSize: 16,
    });
  });

  it('render ActivityIndicator', async () => {
    useState.mockImplementationOnce((init) => [[], mockSetState]);
    useState.mockImplementationOnce((init) => [true, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    useState.mockImplementationOnce((init) => [false, mockSetState]);
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const ActivityIndicatorElement = instance.findAllByType(ActivityIndicator);
    expect(ActivityIndicatorElement).toHaveLength(1);
  });
});
