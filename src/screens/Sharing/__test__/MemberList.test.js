/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import MemberList from '../MemberList';
import { AlertAction } from '../../../commons';
import SharingMembers from '../../../commons/Sharing/MemberList';
import API from '../../../configs/API';
import { t } from 'i18n-js';
import { TESTID } from '../../../configs/Constants';
import { TouchableOpacity } from 'react-native';
import Routes from '../../../utils/Route';

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();
const mockedAddListener = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      addListener: mockedAddListener,
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('axios');
jest.mock('react-native-toast-message');

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockedDispatch,
    useSelector: jest.fn(),
    connect: () => {
      return (component) => component;
    },
  };
});

describe('test MemberList', () => {
  let route;
  let account;

  beforeEach(() => {
    const localState = {
      auth: {
        account: {
          user: {
            id: 2,
          },
        },
      },
    };
    useSelector.mockImplementation((cb) => {
      return cb(localState);
    });

    route = {
      params: {
        unitId: 1,
        unit: {
          id: 1,
          user_id: 2,
          name: '',
        },
      },
    };
    account = {
      user: {
        id: 1,
      },
    };
  });

  afterEach(() => {
    axios.get.mockClear();
  });

  test('render MemberList', async () => {
    await act(async () => {
      await create(<MemberList route={route} account={account} />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.SHARE.UNITS_MEMBERS(1), {});
  });

  test('AlertAction rightButtonClick', async () => {
    const response = {
      status: 200,
      data: '',
    };
    axios.delete.mockImplementation(async () => {
      return response;
    });

    let tree;
    await act(async () => {
      tree = await create(<MemberList route={route} account={account} />);
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    await act(async () => {
      alertAction.props.rightButtonClick();
    });
    expect(axios.delete).toHaveBeenCalledWith(
      API.SHARE.UNITS_MEMBER_DETAIL(1, undefined)
    );
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      position: 'bottom',
      text1: t('sharing_removed_user', {
        name: '[missing %{name} value]',
      }),
      visibilityTime: 1000,
    });
  });

  test('get dataMembers', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          name: 'a',
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    let tree;
    await act(async () => {
      tree = await create(<MemberList route={route} account={account} />);
    });
    const instance = tree.root;
    const sharingMember = instance.findAllByType(SharingMembers);
    expect(axios.get).toHaveBeenCalledWith(API.SHARE.UNITS_MEMBERS(1), {});
    expect(sharingMember).toHaveLength(1);
  });

  test('WrapHeaderScrollable rightHeader', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          name: 'a',
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    let tree;
    await act(async () => {
      tree = await create(<MemberList route={route} account={account} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.MEMBER_LIST_RIGHT_HEADER_TOUCH &&
        el.type === TouchableOpacity
    );
    await act(async () => {
      await button.props.onPress();
    });
    expect(axios.get).toHaveBeenCalledWith(API.SHARE.UNITS_MEMBERS(1), {});
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.AddMemberStack, {
      screen: Routes.SharingSelectPermission,
      params: { unit: { id: 1 } },
    });
  });

  test('WrapHeaderScrollable rightHeader but not owner', async () => {
    route.params.unit.user_id = 1;
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          name: 'a',
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    let tree;
    await act(async () => {
      tree = await create(<MemberList route={route} account={account} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.MEMBER_LIST_RIGHT_HEADER_TOUCH &&
        el.type === TouchableOpacity
    );
    const alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toEqual(false);
    await act(async () => {
      await button.props.onPress();
    });
    expect(alertAction.props.visible).toEqual(true);
    expect(axios.get).toHaveBeenCalledWith(API.SHARE.UNITS_MEMBERS(1), {});
  });
});
