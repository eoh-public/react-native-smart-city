import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';
import Text from '../../../Text';
import Compass from './index';

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <Compass data={data} />
  </SCProvider>
);

describe('Test Compass', () => {
  let tree;
  let list_value = [0, 45, 90, 135, 180, 235, 270, 330, 360];
  let list_result = [
    '0° North',
    '45° North East',
    '90° East',
    '135° South East',
    '180° South',
    '235° South West',
    '270° West',
    '330° North West',
    '0° North',
  ];
  list_value.forEach((value, index) => {
    test(`create Compass ${value}`, () => {
      let data = [
        {
          value: value,
        },
      ];
      act(() => {
        tree = renderer.create(wrapComponent(data));
      });
      const instance = tree.root;
      const textInputs = instance.findAllByType(Text);
      expect(textInputs.length).toEqual(1);
      expect(textInputs[0].props.children).toEqual(list_result[index]);
    });
  });

  test('create Compass data null', () => {
    act(() => {
      tree = renderer.create(wrapComponent([]));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toEqual(1);
  });
});
