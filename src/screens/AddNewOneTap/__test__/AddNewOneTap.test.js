import axios from 'axios';
import React from 'react';
import { Platform, TextInput, TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';

import AddNewOneTap from '..';
import { TESTID } from '../../../configs/Constants';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Routes from '../../../utils/Route';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddNewOneTap route={route} />
  </SCProvider>
);
jest.mock('axios');

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: () => 'vi',
  };
});

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('axios');
let tree;

describe('test AddNewOneTap', () => {
  beforeEach(() => {
    axios.post.mockClear();
    mockedNavigate.mockClear();
  });
  test('create AddNewOneTap success', async () => {
    Platform.OS = 'ios';
    let route = {
      params: { type: 'one_tap', unit: { id: 1 } },
    };

    const response = {
      status: 200,
      data: {
        id: 1,
        unit: 1,
        type: 'one_tap',
        weekday_repeat: [],
        script: { id: 1, name: 'William Miller' },
      },
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const inputName = instance.findAll(
      (el) =>
        el.props.testID === TESTID.NAME_YOUR_BUTTON && el.type === TextInput
    );
    expect(inputName).toHaveLength(1);

    await act(async () => {
      await inputName[0].props.onChangeText('Tap to up');
    });

    const item = instance.findAll(
      (el) =>
        el.props.testID === TESTID.BOTTOM_VIEW_MAIN &&
        el.type === TouchableOpacity
    );

    expect(item).toHaveLength(1);
    await act(async () => {
      await item[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ScriptDetail, {
      havePermission: true,
      id: 1,
      type: 'one_tap',
      name: 'Tap to up',
      unit: {
        id: 1,
      },
      isCreateScriptSuccess: true,
    });
  });
  test('create AddNewOneTap fail', async () => {
    Platform.OS = 'android';
    let route = {
      params: { type: 'one_tap' },
    };

    const response = {
      status: 400,
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });

    const item = tree.root.findAll(
      (el) =>
        el.props.testID === TESTID.BOTTOM_VIEW_MAIN &&
        el.type === TouchableOpacity
    );

    expect(item).toHaveLength(1);
    await act(async () => {
      await item[0].props.onPress();
    });
    expect(mockedNavigate).not.toBeCalled();
  });
});
