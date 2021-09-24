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

describe('test AddNewOneTap', () => {
  test('render AddNewOneTap', async () => {
    Platform.OS = 'ios';
    let tree;
    let route = {
      params: { type: 'one_tap' },
    };

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
    act(() => {
      item[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.AddNewScriptAction, {
      type: 'one_tap',
      name: 'Tap to up',
    });
    mockedNavigate.mockClear();
  });
  test('render AddNewOneTap Platform android', async () => {
    Platform.OS = 'android';
    let route = {
      params: { type: 'one_tap' },
    };

    await act(async () => {
      await create(wrapComponent(route));
    });
  });
});
