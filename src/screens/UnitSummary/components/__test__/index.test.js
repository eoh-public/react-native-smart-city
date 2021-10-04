import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';
import UnitSummary from '..';

describe('UnitSummary components', () => {
  let tree;

  test('test render UnitSummary components', () => {
    const summary = {
      left_value: 'left_value test',
      left_text: 'left_text test',
      right_value: 'right_value test',
      right_text: 'right_text test',
    };
    act(() => {
      tree = renderer.create(<UnitSummary summary={summary} />);
    });
    const instance = tree.root;
    const textElement = instance.findAllByType(Text);

    expect(textElement[0].props.children).toEqual(summary.left_value);
    expect(textElement[1].props.children).toEqual(summary.left_text);
    expect(textElement[2].props.children).toEqual(summary.right_value);
    expect(textElement[3].props.children).toEqual(summary.right_text);
  });

  test('test onPress goToSummary', () => {
    const summary = {
      left_value: 'left_value test',
      left_text: 'left_text test',
      right_value: 'right_value test',
      right_text: 'right_text test',
    };
    const mockFuntion = jest.fn();
    act(() => {
      tree = renderer.create(
        <UnitSummary summary={summary} goToSummary={mockFuntion} />
      );
    });
    const instance = tree.root;
    const touchableOpacity = instance.findByType(TouchableOpacity);
    act(() => {
      touchableOpacity.props.onPress();
    });
    expect(mockFuntion).toHaveBeenCalled();
  });
});
