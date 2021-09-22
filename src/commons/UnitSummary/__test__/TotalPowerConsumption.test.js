import TotalPowerConsumption from '../TotalPowerConsumption/index';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <TotalPowerConsumption
      total={{
        value: 10,
      }}
    />
  </SCProvider>
);

describe('Test Total Power Consumption', () => {
  let tree;

  test('render Total Power Consumption', async () => {
    await act(() => {
      tree = renderer.create(wrapComponent());
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.TOTAL_POWER_CONSUMPTION
    );
    expect(item.props.value).toBe(10);
  });
});
