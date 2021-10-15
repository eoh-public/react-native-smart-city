import React from 'react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';

import SelectAction from '../SelectAction';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import BottomButtonView from '../../../commons/BottomButtonView';
import { TESTID } from '../../../configs/Constants';
import ActionTemplate from '../../../commons/ActionTemplate';
import NumberUpDownActionTemplate from '../../../commons/OneTapTemplate/NumberUpDownActionTemplate';
import OptionsDropdownActionTemplate from '../../../commons/OneTapTemplate/OptionsDropdownActionTemplate';
import StatesGridActionTemplate from '../../../commons/OneTapTemplate/StatesGridActionTemplate';

jest.mock('axios');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <SelectAction route={route} />
  </SCProvider>
);

describe('Test SelectAction', () => {
  let tree;
  let route = {
    params: {
      unit: { id: 1, name: 'Unit test' },
      device: { id: 1, name: 'Device test' },
      stationName: 'stationName',
      automateId: 1,
      scriptName: 'scriptName test',
    },
  };

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('test onSave have automateId', async () => {
    const response = {
      status: 200,
      success: true,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;

    const bottomButton = instance.findByType(BottomButtonView);
    await act(async () => {
      bottomButton.props.onPressMain();
    });
    expect(axios.post).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalled();
  });

  test('test fetchData', async () => {
    const response = {
      status: 200,
      success: true,
      data: [
        { template: 'on_off_button_action_template' },
        { template: 'one_button_action_template' },
        { template: 'three_button_action_template' },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    expect(axios.get).toHaveBeenCalled();
  });

  test('test RenderActionItem', async () => {
    const response = {
      status: 200,
      success: true,
      data: [
        {
          title: '',
          template: 'three_button_action_template',
          configuration: {
            action1: '94ae262d-46e3-42ff-9d10-516831ecc830',
            action2: '94ae262d-46e3-42ff-9d10-516831ecc830',
            action3: '94ae262d-46e3-42ff-9d10-516831ecc830',
            icon1: 'up',
            icon2: 'stop',
            icon3: 'down',
            text1: 'OPEN',
            text2: 'STOP',
            text3: 'CLOSE',
            text_lock: 'Door lock',
            is_display_lock: true,
          },
        },
        {
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
            ],
            icon: 'up',
            icon_kit: 43,
          },
        },
        {
          title: '',
          template: 'NumberUpDownActionTemplate',
          configuration: {
            keep_track_config: true,
            config: 1023,
            action: 'b498234c-6c1a-452d-a1d1-87a314c20528',
            min_value: 16,
            max_value: 30,
            text_format: '{number} \u00b0C',
          },
        },
        {
          title: '',
          template: 'StatesGridActionTemplate',
          configuration: {
            options: [
              {
                config: 1024,
                is_on_value: 1,
                action: '800ff454-4e2a-4a38-bad6-1bded728193e',
                icon: 'up-circle',
                icon_kit: 41,
                text: 'Auto',
              },
            ],
          },
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const renderActionItem = instance.find(
      (el) => el.props.testID === TESTID.ACTION_ITEM
    );
    const actionTemplate = instance.findByType(ActionTemplate);
    const numberUpDownActionTemplate = instance.findByType(
      NumberUpDownActionTemplate
    );
    const optionsDropdownActionTemplate = instance.findByType(
      OptionsDropdownActionTemplate
    );
    const statesGridActionTemplate = instance.findByType(
      StatesGridActionTemplate
    );

    expect(renderActionItem.props.data.length).toBe(4);
    expect(actionTemplate).toBeDefined();
    expect(numberUpDownActionTemplate).toBeDefined();
    expect(optionsDropdownActionTemplate).toBeDefined();
    expect(statesGridActionTemplate).toBeDefined();
  });
  test('test onPress handleOnSelectAction', async () => {
    const response = {
      status: 200,
      success: true,
      data: [
        {
          title: '',
          template: 'three_button_action_template',
          configuration: {
            action1: '94ae262d-46e3-42ff-9d10-516831ecc830',
            action2: '94ae262d-46e3-42ff-9d10-516831ecc830',
            action3: '94ae262d-46e3-42ff-9d10-516831ecc830',
            icon1: 'up',
            icon2: 'stop',
            icon3: 'down',
            text1: 'OPEN',
            text2: 'STOP',
            text3: 'CLOSE',
            text_lock: 'Door lock',
            is_display_lock: true,
          },
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const actionTemplate = instance.findByType(ActionTemplate);
    const bottomButton = instance.findByType(BottomButtonView);
    act(() => {
      actionTemplate.props.onSelectAction({
        name: 'OPEN',
        action: '94ae262d-46e3-42ff-9d10-516831ecc830',
        template: 'three_button_action_template',
      });
    });
    expect(bottomButton.props.typeMain).toEqual('primary');
  });
});
