import OptionsDropdownActionTemplate from '../../../commons/ActionGroup/OptionsDropdownActionTemplate';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import Text from '../../../commons/Text';
import { watchMultiConfigs } from '../../../iot/Monitor';
import { AlertAction, RadioCircle } from '../../../commons';
import { TESTID } from '../../../configs/Constants';
import IconComponent from '../../../commons/IconComponent';
import t from 'i18n-js';

jest.mock('../../../iot/Monitor');

jest.mock('../../../iot/states', () => ({
  useConfigGlobalState: () => [{ 5: 2 }, null],
}));

describe('Test OptionsDropdownActionTemplate', () => {
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
      title: 'Fan Speed',
      configuration: {
        action_data,
        config: 5,
        action: 'e5d23347-ee31-4fe3-9fb5-bbce05bf4b61',
        options: [
          {
            text: 'Level1',
            value_int: 1,
            value_text: '',
          },
          {
            text: 'Level2',
            value_int: 2,
            value_text: '',
          },
        ],
        icon: 'slack',
      },
    };
  });

  test('render template', async () => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OptionsDropdownActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;

    const icon = instance.findByType(IconComponent);
    expect(icon.props.icon).toEqual('slack');

    const texts = instance.findAllByType(Text);
    const radioCircles = instance.findAllByType(RadioCircle);
    expect(texts[1].props.children).toEqual('Level2'); // selectedOption,  ConfigGlobalState is 2
    expect(radioCircles[1].props.active).toBeTruthy(); // radioCircle tick

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(5); // show-hide alert + 2 options + onDone
  });

  test('render template without selectedOption match, get first one', async () => {
    actionGroup.configuration.options[1].value_int = 3;
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OptionsDropdownActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;

    const icon = instance.findByType(IconComponent);
    expect(icon.props.icon).toEqual('slack');

    const text = instance.findAllByType(Text);
    expect(text[0].props.children).toEqual('Fan Speed'); // title
    expect(text[1].props.children).toEqual('Level1'); // selectedOption, first one
  });

  const assertUpdateSelectedOption = async (is_managed_by_backend) => {
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OptionsDropdownActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend }}
        />
      );
    });
    const instance = wrapper.root;

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(5); // 1 show popup + 2 alert bottom button + 2 option
    const showListOption = touchs[0];

    const texts = instance.findAllByType(Text);
    expect(texts[1].props.children).toEqual('Level2'); // selectedOption

    const radioCircles = instance.findAllByType(RadioCircle);
    expect(radioCircles[0].props.active).toBeFalsy();
    expect(radioCircles[1].props.active).toBeTruthy(); // choosing 2nd radioCircle in list

    const listChoosingOption = instance.findAll(
      (el) =>
        el.props.testID === TESTID.OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM &&
        el.type === TouchableOpacity
    );
    expect(listChoosingOption).toHaveLength(2); // 2 option

    const alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toBeFalsy();

    // show option
    await act(async () => {
      await showListOption.props.onPress();
    });
    expect(alertAction.props.visible).toBeTruthy();

    // Choosed Level1 option
    await act(async () => {
      await listChoosingOption[0].props.onPress();
    });

    expect(radioCircles[0].props.active).toBeTruthy(); // choosing 1st radioCircle in list
    expect(radioCircles[1].props.active).toBeFalsy();

    // doAction then update selectedOption
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(alertAction.props.visible).toBeFalsy();

    expect(mockDoAction).toHaveBeenCalledWith(action_data, 1);
    is_managed_by_backend
      ? expect(watchMultiConfigs).toBeCalled()
      : expect(watchMultiConfigs).not.toBeCalled();

    expect(texts[1].props.children).toEqual('Level2'); // TODO: should be Level1, configValues make change again
  };

  test('show popup, change selectedOption and watchMultiConfigs', async () => {
    await assertUpdateSelectedOption(true);
  });

  test('show popup, change selectedOption and not watchMultiConfigs', async () => {
    await assertUpdateSelectedOption(false);
  });

  test('doAction with text when have value_text', async () => {
    actionGroup.configuration.options[0].value_text = 'level-1';
    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OptionsDropdownActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: false }}
        />
      );
    });
    const instance = wrapper.root;

    const touchs = instance.findAllByType(TouchableOpacity);
    expect(touchs).toHaveLength(5);
    const showListOption = touchs[0];

    const texts = instance.findAllByType(Text);
    expect(texts[1].props.children).toEqual('Level2');

    const radioCircles = instance.findAllByType(RadioCircle);
    expect(radioCircles[0].props.active).toBeFalsy();
    expect(radioCircles[1].props.active).toBeTruthy();

    const listChoosingOption = instance.findAll(
      (el) =>
        el.props.testID === TESTID.OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM &&
        el.type === TouchableOpacity
    );
    expect(listChoosingOption).toHaveLength(2);

    const alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toBeFalsy();

    // show option
    await act(async () => {
      await showListOption.props.onPress();
    });
    expect(alertAction.props.visible).toBeTruthy();

    // Choosed Level1 option
    await act(async () => {
      await listChoosingOption[0].props.onPress();
    });

    expect(radioCircles[0].props.active).toBeTruthy();
    expect(radioCircles[1].props.active).toBeFalsy();

    // doAction then update selectedOption
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(alertAction.props.visible).toBeFalsy();

    expect(mockDoAction).toHaveBeenCalledWith(action_data, 'level-1'); // doAction with text instead of int

    expect(texts[1].props.children).toEqual('Level2');
  });

  test('render template without read config', async () => {
    delete actionGroup.configuration.config;

    const mockDoAction = jest.fn();
    await act(async () => {
      wrapper = await create(
        <OptionsDropdownActionTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
          sensor={{ is_managed_by_backend: true }}
        />
      );
    });
    const instance = wrapper.root;
    const textDisplaySelected = instance.find(
      (el) =>
        el.props.testID === TESTID.OPTIONS_DROPDOWN_ACTION_DISPLAY_SELECTED &&
        el.type === Text
    );
    expect(textDisplaySelected.props.children).toEqual(t('not_available'));
  });
});
