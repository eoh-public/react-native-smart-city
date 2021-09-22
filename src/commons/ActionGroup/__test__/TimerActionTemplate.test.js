import React from 'react';
import { Switch } from 'react-native';
import { act, create } from 'react-test-renderer';
import TimerActionTemplate from '../TimerActionTemplate';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Text from '../../Text';
import { watchMultiConfigs } from '../../../iot/Monitor';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('../../../iot/Monitor');

jest.mock('../../../iot/states', () => ({
  useConfigGlobalState: () => [{ 5: 18, 6: 30 }, null],
}));

const wrapComponent = (actionGroup, mockDoAction, is_managed_by_backend) => (
  <SCProvider initState={mockSCStore({})}>
    <TimerActionTemplate
      actionGroup={actionGroup}
      doAction={mockDoAction}
      sensor={{ is_managed_by_backend }}
    />
  </SCProvider>
);

describe('Test TimerActionTemplate success with config value', () => {
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
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(wrapComponent(actionGroup, mockDoAction, true));
    });
    const instance = wrapper.root;

    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(6);
    expect(texts[0].props.children).toEqual('Timer');
    expect(texts[1].props.children).toEqual('Setting at 18:30');

    const switchButton = instance.findByType(Switch);
    expect(switchButton.props.value).toBeTruthy();

    const dateTimePicker = instance.findByType(DateTimePickerModal);
    expect(dateTimePicker.props.isVisible).toBeFalsy();
    expect(dateTimePicker.props.date).toEqual(
      moment('18:30', 'HH:mm').valueOf()
    );
  });
});
