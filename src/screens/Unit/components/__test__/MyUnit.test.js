import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { act, create } from 'react-test-renderer';
import MyUnit from '../MyUnit';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';

const wrapComponent = (units) => (
  <SCProvider initState={mockSCStore({})}>
    <MyUnit myUnits={units} />
  </SCProvider>
);
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

describe('Test MyUnit', () => {
  let tree;

  it('render MyUnit carousel', async () => {
    const units = [
      { id: 1, name: '', abstract_sensors: [{ id: 1, name: '' }] },
      { id: 2, name: '', abstract_sensors: [{ id: 1, name: '' }] },
    ];
    await act(() => {
      tree = create(wrapComponent(units));
    });
    const instance = tree.root;
    const carousel = instance.findAllByType(Carousel);
    expect(carousel).toHaveLength(1);
  });
});
