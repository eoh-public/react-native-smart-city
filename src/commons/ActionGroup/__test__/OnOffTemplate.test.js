import { TESTID } from '../../../configs/Constants';
import { watchMultiConfigs } from '../../../iot/Monitor';
import React from 'react';
import { View } from 'react-native';
import { act, create } from 'react-test-renderer';
import OnOffTemplate from '../OnOffTemplate';
import OnOffButtonTemplate from '../OnOffTemplate/OnOffButtonTemplate';
import OnOffSimpleTemplate from '../OnOffTemplate/OnOffSimpleTemplate';

jest.mock('iot/Monitor');

jest.mock('iot/states', () => ({
  useConfigGlobalState: () => [{ 5: 2 }, null],
}));

describe('Test OnOffTemplate', () => {
  let wrapper;
  let actionGroup;

  const action_data = {
    color: '#00979D',
    command_prefer_over_bluetooth: true,
    command_prefer_over_googlehome: false,
    command_prefer_over_internet: false,
    googlehome_actions: [],
    icon: 'caret-up',
    id: 20,
    key: 'key-1',
  };
  const action_on_data = {
    color: '#00979D',
    command_prefer_over_bluetooth: true,
    command_prefer_over_googlehome: false,
    command_prefer_over_internet: false,
    googlehome_actions: [],
    icon: 'caret-up',
    id: 20,
    key: 'key-2',
  };
  const action_off_data = {
    color: '#00979D',
    command_prefer_over_bluetooth: true,
    command_prefer_over_googlehome: false,
    command_prefer_over_internet: false,
    googlehome_actions: [],
    icon: 'caret-up',
    id: 20,
    key: 'key-3',
  };

  beforeEach(() => {
    watchMultiConfigs.mockClear();

    actionGroup = {
      template: 'OnOffSimpleActionTemplate',
      configuration: {
        config: 5,
        action_on_data: action_on_data,
        action_off_data: action_off_data,
        icon: 'up',
        is_on_value: [2],
      },
      title: 'Turn on / off',
    };
  });

  test('render with template OnOffSimpleActionTemplate', async () => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findAllByType(OnOffSimpleTemplate);
    expect(template).toHaveLength(1);
  });

  test('render with template on_off_button_action_template', async () => {
    actionGroup.template = 'on_off_button_action_template';
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findAllByType(OnOffButtonTemplate);
    expect(template).toHaveLength(1);
  });

  test('render with wrong template', async () => {
    actionGroup.template = 'wrong_template';
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;

    const templateOnOffButton = instance.findAll(
      (el) =>
        el.props.testID === TESTID.ON_OFF_BUTTON_ACTION_TEMPLATE &&
        el.type === View
    );
    const templateOnOffSimple = instance.findAllByType(OnOffSimpleTemplate);

    expect(templateOnOffButton).not.toHaveLength(1);
    expect(templateOnOffSimple).not.toHaveLength(1);
  });

  test('render with template OnOffSimpleActionTemplate with is_managed_by_backend', async () => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findAllByType(OnOffSimpleTemplate);
    expect(template).toHaveLength(1);
    expect(watchMultiConfigs).toBeCalledTimes(1);
  });

  test('template OnOffSimpleActionTemplate doAction with is_on_value, match configValue', async () => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findByType(OnOffSimpleTemplate);
    expect(template.props.isOn).toEqual(true);

    await act(async () => {
      await template.props.triggerAction();
    });
    expect(mockDoAction).toHaveBeenCalledWith(action_off_data);
    expect(watchMultiConfigs).toBeCalledTimes(0);
  });

  test('template OnOffSimpleActionTemplate doAction with is_on_value, not match configValue', async () => {
    actionGroup.configuration.is_on_value = [1];
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{}}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findByType(OnOffSimpleTemplate);
    expect(template.props.isOn).toEqual(false);

    await act(async () => {
      await template.props.triggerAction();
    });
    expect(mockDoAction).toHaveBeenCalledWith(action_on_data);
  });

  test('template OnOffSimpleActionTemplate doAction with is_on_value and is_managed_by_backend', async () => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findByType(OnOffSimpleTemplate);
    expect(template.props.isOn).toEqual(true);

    await act(async () => {
      await template.props.triggerAction();
    });
    expect(mockDoAction).toHaveBeenCalledWith(action_off_data);
    expect(watchMultiConfigs).toBeCalledTimes(2);
  });

  test('render with template OnOffSimpleActionTemplate with just action_data', async () => {
    actionGroup = {
      template: 'OnOffSimpleActionTemplate',
      configuration: {
        config: 5,
        action_data: action_data,
        icon: 'up',
        is_on_value: [2],
      },
      title: 'Turn on / off',
    };
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findAllByType(OnOffSimpleTemplate);
    expect(template).toHaveLength(1);
    expect(template[0].props.disabled).toBeFalsy();

    await act(async () => {
      await template[0].props.triggerAction();
    });
    expect(mockDoAction).toHaveBeenCalledWith(action_data, false);
  });

  test('render with template OnOffSimpleActionTemplate disabled', async () => {
    actionGroup = {
      template: 'OnOffSimpleActionTemplate',
      configuration: {
        config: 5,
        icon: 'up',
        is_on_value: [],
      },
      title: 'Turn on / off',
    };
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OnOffTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;
    const template = instance.findAllByType(OnOffSimpleTemplate);
    expect(template).toHaveLength(1);
    expect(template[0].props.disabled).toBeTruthy();

    await act(async () => {
      await template[0].props.triggerAction();
    });
    expect(mockDoAction).not.toHaveBeenCalled();
  });
});
