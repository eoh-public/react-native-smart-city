import { DisconnectedView } from '../DisconnectedView';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (sensor) => (
  <SCProvider initState={mockSCStore({})}>
    <DisconnectedView sensor={sensor} />
  </SCProvider>
);

describe('Test DisconnectedView', () => {
  let tree;

  test('render DisconnectedView icon dooor', () => {
    const sensor = { icon: 'door' };
    act(() => {
      tree = renderer.create(wrapComponent(sensor));
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render DisconnectedView icon sensor', () => {
    const sensor = { icon: 'sensor' };
    act(() => {
      tree = renderer.create(wrapComponent(sensor));
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render DisconnectedView icon barrier', () => {
    const sensor = { icon: 'barrier' };
    act(() => {
      tree = renderer.create(wrapComponent(sensor));
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render DisconnectedView icon wind', () => {
    const sensor = { icon: 'wind' };
    act(() => {
      tree = renderer.create(wrapComponent(sensor));
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render DisconnectedView icon test', () => {
    const sensor = { icon: 'test' };
    act(() => {
      tree = renderer.create(wrapComponent(sensor));
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
