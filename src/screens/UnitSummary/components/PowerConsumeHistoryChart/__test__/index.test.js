import React from 'react';
import { act, create } from 'react-test-renderer';
import ConfigHistoryChart from '../';
import { SCProvider } from '../../../../../context';
import { mockSCStore } from '../../../../../context/mockStore';
import HistoryChart from '../../../../../commons/Device/HistoryChart';

const wrapComponent = (configs = []) => (
  <SCProvider initState={mockSCStore({})}>
    <ConfigHistoryChart configs={configs} />
  </SCProvider>
);

describe('Test HistoryChart', () => {
  let tree;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('Test render', async () => {
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const HistoryCharts = instance.findAllByType(HistoryChart);
    expect(HistoryCharts).toHaveLength(0);
  });
});
