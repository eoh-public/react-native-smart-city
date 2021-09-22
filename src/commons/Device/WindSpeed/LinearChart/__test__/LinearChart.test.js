import LinearChart from '../index';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { SCProvider } from '../../../../../context';
import { mockSCStore } from '../../../../../context/mockStore';

Date.now = jest.fn(() => 1487076708000);

const wrapComponent = (chartOptions, datasShow) => (
  <SCProvider initState={mockSCStore({})}>
    <LinearChart chartOptions={chartOptions} datasShow={datasShow} />
  </SCProvider>
);

describe('Test LinearChart', () => {
  let wrapper;

  test('LinearChart render', () => {
    const chartOptions = {
      showAll: true,
    };
    const datasShow = [
      {
        data: [1, 2, 3],
      },
    ];
    act(() => {
      wrapper = renderer.create(wrapComponent(chartOptions, datasShow));
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
