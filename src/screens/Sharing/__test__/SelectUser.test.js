import React from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import { TESTID } from '../../../configs/Constants';

import SelectUser from '../SelectUser';
import { t } from 'i18n-js';
import { Button, ViewButtonBottom } from '../../../commons';
import _TextInput from '../../../commons/Form/TextInput';
import API from '../../../configs/API';
import AccountList from '../../../commons/Auth/AccountList';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
const mockedDangerouslyGetState = jest.fn();
const mockedDangerouslyGetParentGoBack = jest.fn();

jest.mock('axios');

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
      dangerouslyGetParent: () => ({
        dangerouslyGetState: mockedDangerouslyGetState,
        goBack: mockedDangerouslyGetParentGoBack,
      }),
    }),
    useIsFocused: jest.fn(),
  };
});

describe('test SelectUser container', () => {
  let tree;
  let route;

  beforeEach(() => {
    route = {
      params: {
        unit: {
          id: 1,
        },
        permissions: {
          readPermissions: {},
          controlPermissions: {},
        },
      },
    };
  });

  afterEach(() => {
    axios.post.mockClear();
  });

  const findByTestId = (instance, id) => {
    return instance.find((el) => el.props.testID === id);
  };

  const mockAxiosPost = (response) => {
    axios.post.mockImplementation(async () => {
      return response;
    });
  };

  test('create', async () => {
    await act(async () => {
      tree = create(<SelectUser route={route} />);
    });
    const instance = tree.root;
    const textTitle = findByTestId(instance, TESTID.SELECT_USER_ADD_USER_TITLE);
    const textSubTitle = findByTestId(
      instance,
      TESTID.SELECT_USER_ADD_USER_SUB_TITLE
    );
    expect(textTitle.props.children).toEqual(t('add_user_title'));
    expect(textSubTitle.props.children).toEqual(t('add_user_sub_title'));
  });

  test('viewButtonBottom and onLeftClick', async () => {
    await act(async () => {
      tree = create(<SelectUser route={route} />);
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    expect(viewButtonBottom.props.leftTitle).toEqual(t('cancel'));
    expect(viewButtonBottom.props.rightTitle).toEqual(t('done'));
    act(() => {
      viewButtonBottom.props.onLeftClick();
    });
    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('viewButtonBottom onRightClick', async () => {
    await act(async () => {
      tree = create(<SelectUser route={route} />);
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    act(() => {
      viewButtonBottom.props.onRightClick();
    });
    expect(mockedDangerouslyGetParentGoBack).toHaveBeenCalled();
  });

  test('_TextInput onChange phone, validate and call api sharedPermission', async () => {
    const response = {
      status: 200,
      data: {
        user: { id: 1, name: 'User' },
      },
    };
    mockAxiosPost(response);

    await act(async () => {
      tree = create(<SelectUser route={route} />);
    });
    const instance = tree.root;

    const textInput = instance.findByType(_TextInput);
    expect(textInput.props.placeholder).toEqual(t('add_user_phone_number'));
    expect(textInput.props.keyboardType).toEqual('numeric');
    expect(textInput.props.errorText).toEqual('');

    const button = instance.findByType(Button);
    expect(button.props.title).toEqual(t('add_user_invite'));
    expect(button.props.type).toEqual('primary');

    let accountList = instance.findAllByType(AccountList);
    expect(accountList).toHaveLength(0);

    await act(async () => {
      await textInput.props.onChange('0909123456');
    });

    await act(async () => {
      await button.props.onPress();
    });

    expect(textInput.props.errorText).toEqual('');
    expect(axios.post).toHaveBeenCalledWith(API.SHARE.SHARE, {
      phone: '0909123456',
      unit: 1,
      permissions: { read_permissions: [], control_permissions: [] },
    });

    accountList = instance.findAllByType(AccountList);
    expect(accountList).toHaveLength(1);
  });

  test('_TextInput onChange phone, validate and call api sharedPermission with new permission', async () => {
    const response = {
      status: 200,
    };
    mockAxiosPost(response);

    route.params.permissions = {
      readPermissions: { Read1: 'AccessRead1' },
      controlPermissions: { Control1: 'AccessControl1' },
    };

    await act(async () => {
      tree = create(<SelectUser route={route} />);
    });
    const instance = tree.root;
    const textInput = instance.findByType(_TextInput);
    const button = instance.findByType(Button);

    act(() => {
      textInput.props.onChange('0909123456');
    });

    act(() => {
      button.props.onPress();
    });

    expect(axios.post).toHaveBeenCalledWith(API.SHARE.SHARE, {
      phone: '0909123456',
      unit: 1,
      permissions: {
        read_permissions: [{ id: 'Read1', values: 'AccessRead1' }],
        control_permissions: [{ id: 'Control1', values: 'AccessControl1' }],
      },
    });
  });

  test('_TextInput onChange phone, invalidate and not call api sharedPermission', async () => {
    const response = {
      status: 200,
    };
    mockAxiosPost(response);

    await act(async () => {
      tree = create(<SelectUser route={route} />);
    });
    const instance = tree.root;

    const textInput = instance.findByType(_TextInput);
    const button = instance.findByType(Button);

    expect(textInput.props.errorText).toEqual('');

    act(() => {
      textInput.props.onChange('0909xxx');
    });

    act(() => {
      button.props.onPress();
    });

    expect(textInput.props.errorText).toEqual(t('invalid_phone_number'));
    expect(axios.post).not.toHaveBeenCalled();
  });

  test('_TextInput onChange phone, validate and call api sharedPermission fail', async () => {
    const response = {};
    mockAxiosPost(response);

    await act(async () => {
      tree = create(<SelectUser route={route} />);
    });
    const instance = tree.root;

    const textInput = instance.findByType(_TextInput);
    const button = instance.findByType(Button);

    let accountList = instance.findAllByType(AccountList);
    expect(accountList).toHaveLength(0);

    await act(async () => {
      await textInput.props.onChange('0909123456');
    });

    await act(async () => {
      await button.props.onPress();
    });

    expect(textInput.props.errorText).toEqual('');
    expect(axios.post).toHaveBeenCalledWith(API.SHARE.SHARE, {
      phone: '0909123456',
      unit: 1,
      permissions: { read_permissions: [], control_permissions: [] },
    });

    accountList = instance.findAllByType(AccountList);
    expect(accountList).toHaveLength(0);
  });
});
