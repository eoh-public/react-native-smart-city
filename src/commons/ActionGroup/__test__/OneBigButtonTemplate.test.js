import React from 'react';
import { create, act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import OneBigButtonTemplate from '../OneBigButtonTemplate';

describe('Test OneBigButtonTemplate', () => {
  const action_data = {
    color: '#00979D',
    command_prefer_over_bluetooth: true,
    command_prefer_over_googlehome: false,
    command_prefer_over_internet: false,
    googlehome_actions: [],
    icon: 'caret-up',
    id: 20,
    key: '5ed1d4dc-a905-47cd-b0c9-f979644bd21a',
  };
  const actionGroup = {
    configuration: {
      action: '5ed1d4dc-a905-47cd-b0c9-f979644bd21a',
      action_data: action_data,
      icon: 'caret-up',
      text: 'UP',
    },
  };
  let wrapper;

  test('render OneBigButtonTemplate', () => {
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = create(
        <OneBigButtonTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
        />
      );
    });

    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);

    act(() => {
      buttons[0].props.onPress();
    });

    expect(mockDoAction).toHaveBeenCalledTimes(1);
    expect(mockDoAction).toHaveBeenCalledWith(action_data);
  });
});
