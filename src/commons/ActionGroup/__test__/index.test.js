import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import ActionGroup from '..';

describe('Test ActionGroup', () => {
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

  let wrapper;

  test('render ActionGroup three_button_action_template', () => {
    const mockDoAction = jest.fn();
    const actionGroup = {
      template: 'three_button_action_template',
      configuration: {
        action1: '2b949045-8e03-4c07-a855-7794ade2e69c',
        action1_data: {
          color: '#00979D',
          command_prefer_over_bluetooth: true,
          command_prefer_over_googlehome: false,
          command_prefer_over_internet: false,
          googlehome_actions: [],
          icon: 'caret-up',
          id: 9,
          key: '2b949045-8e03-4c07-a855-7794ade2e69c',
        },
        action2: '38347d5e-4418-4ab0-978c-c82f4c034897',
        action2_data: {
          color: '#00979D',
          command_prefer_over_bluetooth: true,
          command_prefer_over_googlehome: false,
          command_prefer_over_internet: false,
          googlehome_actions: [],
          icon: 'stop',
          id: 11,
          key: '38347d5e-4418-4ab0-978c-c82f4c034897',
        },
        action3: 'a492e08c-8cb1-44ee-8ea0-46aaca4e5141',
        action3_data: {
          color: '#00979D',
          command_prefer_over_bluetooth: true,
          command_prefer_over_googlehome: false,
          command_prefer_over_internet: false,
          googlehome_actions: [],
          icon: 'caret-down',
          id: 10,
          key: 'a492e08c-8cb1-44ee-8ea0-46aaca4e5141',
        },
        icon: 'caret-up',
        text: 'UP',
      },
    };
    act(() => {
      wrapper = renderer.create(
        <ActionGroup actionGroup={actionGroup} doAction={mockDoAction} />
      );
    });
    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(3);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockDoAction).toHaveBeenCalledTimes(1);
    expect(mockDoAction).toHaveBeenCalledWith(
      actionGroup.configuration.action1_data
    );
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockDoAction).toHaveBeenCalledTimes(2);
    expect(mockDoAction).toHaveBeenCalledWith(
      actionGroup.configuration.action2_data
    );
    act(() => {
      buttons[2].props.onPress();
    });
    expect(mockDoAction).toHaveBeenCalledTimes(3);
    expect(mockDoAction).toHaveBeenCalledWith(
      actionGroup.configuration.action3_data
    );
  });
  test('render ActionGroup one_button_action_template', () => {
    const mockDoAction = jest.fn();
    const actionGroup = {
      template: 'one_button_action_template',
      configuration: {
        action: '5ed1d4dc-a905-47cd-b0c9-f979644bd21a',
        action_data: action_data,
        icon: 'caret-up',
        text: 'UP',
      },
    };
    act(() => {
      wrapper = renderer.create(
        <ActionGroup actionGroup={actionGroup} doAction={mockDoAction} />
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

  test('render ActionGroup on_off_button_action_template', () => {
    const mockDoAction = jest.fn();
    const actionGroup = {
      template: 'on_off_button_action_template',
      configuration: {
        action_on: '5ed1d4dc-a905-47cd-b0c9-f979644bd21a',
        icon_on: 'caret-up',
        text_on: 'ON',
        action_off: '5ed1d4dc-a905-47cd-b0c9-f979644bd21b',
        icon_off: 'caret-up',
        text_off: 'OFF',
      },
    };
    act(() => {
      wrapper = renderer.create(
        <ActionGroup actionGroup={actionGroup} doAction={mockDoAction} />
      );
    });
    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockDoAction).toHaveBeenCalledTimes(1);
  });
});
