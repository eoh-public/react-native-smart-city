import React from 'react';
import { TextInput } from 'react-native';
import { act, create } from 'react-test-renderer';
import { EmergencyContactsAddNew } from '../EmergencyContactsAddNew';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ViewButtonBottom } from '../../../commons';
import { TESTID } from '../../../configs/Constants';
import { getTranslate } from '../../../utils/I18n';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <EmergencyContactsAddNew route={route} />
  </SCProvider>
);

jest.mock('react-native-toast-message');

const mockedGoBack = jest.fn();

jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

describe('test EmergencyContactAddNew', () => {
  let route;
  beforeEach(() => {
    route = {
      params: {
        group: {
          id: 1,
          name: 'abc',
        },
      },
    };
    mockedGoBack.mockClear();
  });
  afterEach(() => {
    Toast.show.mockClear();
  });

  let tree;

  test('onChangeNameText', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const textInput = instance.find(
      (item) =>
        item.props.testID === TESTID.ON_CHANGE_NAME_EMERGENCY_CONTACT &&
        item.type === TextInput
    );
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    act(() => {
      textInput.props.onChangeText('ABC');
    });

    expect(textInput.props.value).toBe('ABC');
    expect(viewButtonBottom.props.rightDisabled).toBeTruthy();
  });

  test('onTextPhoneChange', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const textInput = instance.find(
      (item) =>
        item.props.testID === TESTID.ON_CHANGE_PHONE_EMERGENCY_CONTACT &&
        item.type === TextInput
    );
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    act(() => {
      textInput.props.onChangeText('123');
    });

    expect(textInput.props.value).toBe('123');
    expect(viewButtonBottom.props.rightDisabled).toBeTruthy();
  });

  test('onCancel', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    act(() => {
      viewButtonBottom.props.onLeftClick();
    });

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });

  test('onSave success', async () => {
    const response = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    await act(async () => {
      await viewButtonBottom.props.onRightClick();
    });

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });

  test('onSave fail', async () => {
    const response = {
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    await act(async () => {
      await viewButtonBottom.props.onRightClick();
    });
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: getTranslate('en', 'create_contact_failed'),
      visibilityTime: 1000,
    });
    expect(mockedGoBack).not.toHaveBeenCalled();
  });
});
