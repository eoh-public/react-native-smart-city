import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import Text from '../../../commons/Text';
import { watchMultiConfigs } from '../../../iot/Monitor';
import NumberUpDownActionTemplate from '../NumberUpDownActionTemplate';

jest.mock('../../../iot/Monitor');

jest.mock('../../../iot/states', () => ({
  useConfigGlobalState: () => [{ 5: 25 }, null],
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
        keep_track_config: false,
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
    expect(text.props.children).toEqual('25 *C');

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);
  });

  test('do action call watchConfigs', async () => {
    actionGroup.configuration.keep_track_config = true;
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[0].props.onPress();
    });

    expect(watchMultiConfigs).toBeCalled();
  });

  test('do action not call watchConfigs cause is_managed_by_backend false', async () => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <NumberUpDownActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: false }}
        />
      );
    });
    const instance = wrapper.root;
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[0].props.onPress();
    });

    expect(watchMultiConfigs).not.toBeCalled();
  });

  test('do action not call watchConfigs cause keep track config false', async () => {
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[0].props.onPress();
    });

    expect(watchMultiConfigs).not.toBeCalled();
  });

  test('action down without config', async () => {
    actionGroup.configuration.keep_track_config = true;
    actionGroup.configuration.config = undefined;
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[0].props.onPress();
    });

    expect(watchMultiConfigs).not.toBeCalled();
  });

  test('action down without keep track config', async () => {
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[0].props.onPress();
    });

    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('24 *C');
  });

  test('action up without keep track config', async () => {
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[1].props.onPress();
    });

    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('26 *C');
  });

  test('action down with keep track config', async () => {
    actionGroup.configuration.keep_track_config = true;
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[0].props.onPress();
    });

    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('25 *C'); // TODO should 24, configValues make changes again
  });

  test('action up with keep track config', async () => {
    actionGroup.configuration.keep_track_config = true;
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[1].props.onPress();
    });

    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('25 *C'); // TODO should 26, configValues make changes again
  });

  test('action down limit ', async () => {
    actionGroup.configuration.min_value = 25;
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[0].props.onPress();
    });

    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('25 *C');
  });

  test('action up limit ', async () => {
    actionGroup.configuration.max_value = 25;
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
    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(2);

    await act(async () => {
      await touchs[1].props.onPress();
    });

    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('25 *C');
  });
});
