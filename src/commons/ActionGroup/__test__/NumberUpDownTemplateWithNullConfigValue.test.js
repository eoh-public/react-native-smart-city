import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import Text from '../../../commons/Text';
import { watchMultiConfigs } from '../../../iot/Monitor';
import NumberUpDownActionTemplate from '../NumberUpDownActionTemplate';

jest.mock('../../../iot/Monitor');

jest.mock('../../../iot/states', () => ({
  useConfigGlobalState: () => [{ 5: null }, null],
}));

describe('Test NumberUpDownActionTemplate', () => {
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
      configuration: {
        config: 5,
        action_data,
        min_value: 16,
        max_value: 30,
        text_format: '{number} *C',
      },
    };
  });

  test('render template', async () => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <NumberUpDownActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;
    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('28 *C');

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);
  });
});
