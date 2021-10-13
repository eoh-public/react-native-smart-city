import React from 'react';
import { G } from 'react-native-svg';
import ValueBalloon from '../ValueBalloon';
import renderer, { act } from 'react-test-renderer';

describe('Test ValueBalloon', () => {
  let wrapper;

  test('ValueBalloon render', () => {
    act(() => {
      wrapper = renderer.create(<ValueBalloon x={10} y={15} />);
    });
    const instance = wrapper.root;
    const Gs = instance.findAllByType(G);
    expect(Gs).toHaveLength(1);
  });
});
