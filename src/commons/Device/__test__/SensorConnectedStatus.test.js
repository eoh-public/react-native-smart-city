import SensorConnectedStatus from '../SensorConnectedStatus';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <SensorConnectedStatus />
  </SCProvider>
);

describe('Test Sensor Connected Status', () => {
  let tree;

  test('render Sensor Connected Status', () => {
    act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.SENSOR_CONNECTED_STATUS
    );
    expect(item).not.toBeUndefined();
  });
});
