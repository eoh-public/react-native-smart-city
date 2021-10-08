import React from 'react';
import { create, act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import OptionsDropdownActionTemplate from '../OptionsDropdownActionTemplate';
import { RadioCircle } from '../..';

import { TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockOnSelectAction = jest.fn();

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <OptionsDropdownActionTemplate
      data={data}
      onSelectAction={mockOnSelectAction}
    />
  </SCProvider>
);

describe('Test OptionsDropdownActionTemplate', () => {
  let tree;
  let data = {
    title: 'Fan Speed',
    template: 'OptionsDropdownActionTemplate',
    configuration: {
      config: 1019,
      action: '05195362-75de-4db5-9e5e-98fef9d4910c',
      options: [
        {
          text: 'Auto',
          value_int: 1,
          value_text: 'auto',
        },
        {
          text: 'Level1',
          value_int: 2,
          value_text: 'level1',
        },
        {
          text: 'Level2',
          value_int: 3,
          value_text: 'level2',
        },
        {
          text: 'Level3',
          value_int: 4,
          value_text: 'level3',
        },
        {
          text: 'Level4',
          value_int: 5,
          value_text: 'level4',
        },
        {
          text: 'Level5',
          value_int: 6,
          value_text: 'level5',
        },
        {
          text: 'Silent',
          value_int: 7,
          value_text: 'silent',
        },
      ],
      icon: 'up',
      icon_kit: 43,
    },
  };
  test('Test render OptionsDropdownActionTemplate', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const touchOpacity = instance.findAll(
      (item) =>
        item.props.testID === TESTID.OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM &&
        item.type === TouchableOpacity
    );
    expect(touchOpacity).toHaveLength(7);
  });

  test('Test handleOnPressItem', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const touchOpacity = instance.findAll(
      (item) =>
        item.props.testID === TESTID.OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM &&
        item.type === TouchableOpacity
    );
    const radioCircle = instance.findAllByType(RadioCircle);

    act(() => {
      touchOpacity[0].props.onPress(data.configuration.options[0], 0);
    });
    expect(radioCircle[0].props.active).toEqual(true);
  });

  test('Test onPressDone', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const selectOptions = instance.findAll(
      (item) =>
        item.props.testID === TESTID.OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM &&
        item.type === TouchableOpacity
    );
    const touchOpacity = instance.find(
      (item) =>
        item.props.testID === TESTID.OPTIONS_DROPDOWN_ACTION_DONE &&
        item.type === TouchableOpacity
    );

    act(() => {
      selectOptions[0].props.onPress(data.configuration.options[0], 0);
      touchOpacity.props.onPress();
    });
    expect(mockOnSelectAction).toHaveBeenCalled();
  });
});
