import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';

import SelectAction from '../SelectAction';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import BottomButtonView from '../../../commons/BottomButtonView';
import { TESTID } from '../../../configs/Constants';
import ActionTemplate from '../../../commons/ActionTemplate';

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

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
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
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    expect(axios.get).toHaveBeenCalled();

    expect(mockSetState).toHaveBeenCalledWith(response.data);
  });

  test('test RenderActionItem', async () => {
    const data = [
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
        title: '',
        template: 'on_off_button_action_template',
        configuration: {
          action_off: '94ae262d-46e3-42ff-9d10-516831ecc830',
          icon_off: 'poweroff',
          text_off: 'OFF',
          action_on: '94ae262d-46e3-42ff-9d10-516831ecc830',
          icon_on: 'poweroff',
          text_on: 'ON',
          config: 941,
        },
      },
      {
        title: '',
        template: 'one_button_action_template',
        configuration: {
          action: '94ae262d-46e3-42ff-9d10-516831ecc830',
          icon: 'up',
          text: 'UP',
        },
      },
    ];
    useState.mockImplementationOnce((init) => [data, mockSetState]);
    await act(async () => {
      tree = renderer.create(wrapComponent(route));
    });
    const instance = tree.root;
    const renderActionItem = instance.findAll(
      (el) => el.props.testID === TESTID.ACTION_ITEM
    );
    const actionTemplate = instance.findByType(ActionTemplate);

    expect(renderActionItem[0].props.data.length).toBe(3);
    expect(actionTemplate).toBeDefined();
  });
});
