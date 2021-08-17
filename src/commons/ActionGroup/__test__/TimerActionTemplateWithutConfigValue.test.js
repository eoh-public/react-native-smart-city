import React from 'react';
import { Switch, TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import Text from '../../Text';
import { watchMultiConfigs } from '../../../iot/Monitor';
import TimerActionTemplate from '../TimerActionTemplate';

jest.mock('../../../iot/Monitor');

jest.mock('../../../iot/states', () => ({
  useConfigGlobalState: () => [{}, null],
}));

describe('Test TimerActionTemplate without config value', () => {
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

  let actionGroup;
  let wrapper;

  beforeEach(() => {
    watchMultiConfigs.mockClear();
    actionGroup = {
      title: 'Timer',
      configuration: {
        action_data,
        config_hour: 5,
        config_minute: 6,
      },
    };
  });

  test('render template', async () => {
    Date.now = jest.fn(() => new Date('2021-09-09T10:00:00.000Z'));
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <TimerActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
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

  test('timer onConfirm', async () => {
    Date.now = jest.fn(() => new Date('2021-09-09T10:00:00.000Z'));
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <TimerActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;
    let dateTimePicker = instance.findByType(DateTimePickerModal);
    expect(dateTimePicker.props.isVisible).toBeFalsy();

    const touchTimer = instance.findByType(TouchableOpacity);
    await act(async () => {
      await touchTimer.props.onPress();
    });
    expect(dateTimePicker.props.isVisible).toBeTruthy();

    await act(async () => {
      await dateTimePicker.props.onConfirm();
    });
    expect(dateTimePicker.props.isVisible).toBeFalsy();
    expect(mockDoAction).toHaveBeenCalledWith(action_data, [17, 0]);
  });
});
