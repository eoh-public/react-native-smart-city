import React from 'react';
import { TouchableOpacity, Switch } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import ActionGroup from '..';
import RadioCircle from '../../RadioCircle';
import IconComponent from '../../IconComponent';
import Text from '../../Text';
import { Colors } from '../../../configs';
import { TESTID } from '../../../configs/Constants';

describe('Test ActionGroup', () => {
  const configuration_with_none_action_on_off = {
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
    icon1: 'caret-up',
    icon2: 'stop',
    icon3: 'caret-down',
    text_door_lock: 'Door lock',
    text1: 'UP',
    text2: 'STOP',
    text3: 'DOWN',
    is_display_lock: true,
  };
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
  let actionGroupData;
  let wrapper;

  beforeEach(() => {
    actionGroupData = {
      title: 'title',
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
        action_on: 'f4c844fb-0a8e-401a-b8cf-6f481f9a5a3e',
        action_on_data: {
          color: '#00979D',
          command_prefer_over_bluetooth: true,
          command_prefer_over_googlehome: false,
          command_prefer_over_internet: false,
          googlehome_actions: [],
          icon: 'on',
          id: 11,
          key: 'f4c844fb-0a8e-401a-b8cf-6f481f9a5a3e',
        },
        action_off: '09bc3472-e1e7-4bba-ac5a-d0d140a919d9',
        action_off_data: {
          color: '#00979D',
          command_prefer_over_bluetooth: true,
          command_prefer_over_googlehome: false,
          command_prefer_over_internet: false,
          googlehome_actions: [],
          icon: 'off',
          id: 12,
          key: '09bc3472-e1e7-4bba-ac5a-d0d140a919d9',
        },
        icon1: 'caret-up',
        icon2: 'stop',
        icon3: 'caret-down',
        text_door_lock: 'Door lock',
        text1: 'UP',
        text2: 'STOP',
        text3: 'DOWN',
        is_display_lock: true,
      },
    };
  });

  test('render ActionGroup three_button_action_template', () => {
    const actionGroup = actionGroupData;
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <ActionGroup actionGroup={actionGroup} doAction={mockDoAction} />
      );
    });
    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    const switchOnOff = instance.findAllByType(Switch);
    const TextDoorLock = instance.find(
      (el) => el.props.testID === TESTID.TEXT_DOOR_LOOK_ON_OFF
    );
    expect(TextDoorLock.props.children).toEqual(['Door lock', ' ']);
    expect(switchOnOff.length).toEqual(1);
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

  test('Three_button_action_template Action OnOff isDisplayLock True', () => {
    const actionGroup = actionGroupData;
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <ActionGroup actionGroup={actionGroup} doAction={mockDoAction} />
      );
    });
    const instance = wrapper.root;
    const switchOnOff = instance.findAllByType(Switch);
    expect(switchOnOff.length).toEqual(1);
    act(() => {
      switchOnOff[0].props.onValueChange();
    });
    expect(mockDoAction).toHaveBeenCalledTimes(1);
    expect(mockDoAction).toHaveBeenCalledWith(
      actionGroup.configuration.action_on_data
    );
    act(() => {
      switchOnOff[0].props.onValueChange();
    });
    expect(mockDoAction).toHaveBeenCalledTimes(2);
    expect(mockDoAction).toHaveBeenCalledWith(
      actionGroup.configuration.action_off_data
    );
  });

  test('Three_button_action_template None Action OnOff isDisplayLock True', () => {
    const actionGroup = {
      ...actionGroupData,
      configuration: configuration_with_none_action_on_off,
    };
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <ActionGroup actionGroup={actionGroup} doAction={mockDoAction} />
      );
    });
    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    const switchOnOff = instance.findAllByType(Switch);
    const TextDoorLock = instance.find(
      (el) => el.props.testID === TESTID.TEXT_DOOR_LOOK_ON_OFF
    );
    expect(TextDoorLock.props.children).toEqual(['Door lock', ' ']);
    expect(switchOnOff.length).toEqual(1);
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

  test('Three_button_action_template Action OnOff isDisplayLock False', () => {
    const actionGroup = {
      ...actionGroupData.configuration,
      is_display_lock: false,
    };
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <ActionGroup actionGroup={actionGroup} doAction={mockDoAction} />
      );
    });
    const instance = wrapper.root;
    const switchOnOff = instance.findAllByType(Switch);
    expect(switchOnOff.length).toEqual(0);
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
        <ActionGroup
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
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
  });

  test('render ActionGroup NumberUpDownActionTemplate', () => {
    const mockDoAction = jest.fn();
    const actionGroup = {
      template: 'NumberUpDownActionTemplate',
      configuration: {
        config: 5,
        action_data,
        min_value: 16,
        max_value: 30,
        text_format: '{number} *C',
      },
    };
    act(() => {
      wrapper = renderer.create(
        <ActionGroup
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;
    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('28 *C');

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);
  });

  test('render ActionGroup StatesGridActionTemplate', () => {
    const mockDoAction = jest.fn();
    const actionGroup = {
      template: 'StatesGridActionTemplate',
      title: 'Mode',
      configuration: {
        options: [
          {
            config: 5,
            is_on_value: 0,
            action: 'action1-47b3-43f6-ba45-83cd1cf5d8f2',
            icon: 'up-circle',
            text: 'Text',
            action_data: action_data,
          },
          {
            config: 6,
            is_on_value: 0,
            action: 'action2-47b3-43f6-ba45-83cd1cf5d8f2',
            icon: 'up-circle',
            text: 'Text',
            action_data: action_data,
          },
        ],
      },
    };
    act(() => {
      wrapper = renderer.create(
        <ActionGroup
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts[0].props.children).toEqual('Mode');

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2); // 2 GridItem

    const buttonStyle = {
      width: 48,
      height: 48,
      padding: 12,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: Colors.Gray4,
      backgroundColor: Colors.White,
    };

    const OnOffStyle = {
      OFF: {
        borderColor: Colors.Gray4,
        backgroundColor: Colors.White,
      },
      ON: {
        borderColor: Colors.Primary,
        backgroundColor: Colors.Primary,
      },
    };

    expect(touchs[0].props.style).toEqual([buttonStyle, OnOffStyle.OFF]);
    expect(touchs[1].props.style).toEqual([buttonStyle, OnOffStyle.OFF]);
  });

  test('render ActionGroup OptionsDropdownActionTemplate', () => {
    const mockDoAction = jest.fn();
    const actionGroup = {
      template: 'OptionsDropdownActionTemplate',
      configuration: {
        action_data,
        config: 5,
        action: 'e5d23347-ee31-4fe3-9fb5-bbce05bf4b61',
        options: [
          {
            text: 'Level1',
            value: 1,
          },
          {
            text: 'Level2',
            value: 2,
          },
        ],
        icon: 'slack',
      },
    };
    act(() => {
      wrapper = renderer.create(
        <ActionGroup
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;

    const icon = instance.findByType(IconComponent);
    expect(icon.props.icon).toEqual('slack');

    const texts = instance.findAllByType(Text);
    const radioCircles = instance.findAllByType(RadioCircle);
    expect(texts[1].props.children).toEqual('Level1'); // selectedOption, get first one
    expect(radioCircles[0].props.active).toBeTruthy(); // radioCircle tick

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(5); // show-hide alert + 2 options + onDone
  });

  test('render TimerActionTemplate', async () => {
    Date.now = jest.fn(() => new Date('2021-09-09T10:00:00.000Z'));
    const actionGroup = {
      template: 'TimerActionTemplate',
      title: 'Timer',
      configuration: {
        action_data,
        config_hour: 5,
        config_minute: 6,
      },
    };
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <ActionGroup
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;

    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toEqual('Timer');

    const switchButton = instance.findByType(Switch);
    expect(switchButton.props.value).toBeFalsy();

    const dateTimePicker = instance.findByType(DateTimePickerModal);
    expect(dateTimePicker.props.isVisible).toBeFalsy();
    expect(dateTimePicker.props.date).toEqual(
      moment('2021-09-09T10:00:00.000Z').valueOf()
    );
  });
});
