import React from 'react';
import { View } from 'react-native';
import { act, create } from 'react-test-renderer';
import MyUnitDevice from '../MyUnitDevice';

describe('Test MyUnitDevice', () => {
  let tree;

  it('Test render with status', async () => {
    await act(() => {
      tree = create(
        <MyUnitDevice
          sensor={{ status: 'Ok', name: 'Test', station_name: '' }}
        />
      );
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(5);
  });

  it('Test render without status', async () => {
    await act(() => {
      tree = create(
        <MyUnitDevice sensor={{ name: 'Test', station_name: '' }} />
      );
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(5);
  });
});
