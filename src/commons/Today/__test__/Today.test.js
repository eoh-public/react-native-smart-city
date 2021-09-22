import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Today from '../index';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <Today />
  </SCProvider>
);

describe('Test Today', () => {
  let tree;
  test('create Today', () => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
