import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import moment from 'moment';
import DateTimeButton from '../DateTimeButton';

describe('Test DateTimeButton', () => {
  const time = moment('2021-01-20T05:00:00.629Z').utcOffset(0);
  let tree;

  test('render DateTimeButton formatType = "date"', () => {
    act(() => {
      tree = renderer.create(
        <DateTimeButton onPress={() => {}} time={time} formatType="date" />
      );
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(1);
  });

  test('render DateTimeButton formatType is undefined', () => {
    act(() => {
      tree = renderer.create(<DateTimeButton onPress={() => {}} time={time} />);
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(1);
  });
});
