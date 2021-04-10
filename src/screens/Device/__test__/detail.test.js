import React from 'react';
import { act, create } from 'react-test-renderer';
import DeviceDetail from '../detail';
import axios from 'axios';
import { API } from '../../../configs';
import { AlertSendConfirm } from '../../../commons/EmergencyButton/AlertSendConfirm';
import { AlertSent } from '../../../commons/EmergencyButton/AlertSent';
import { AlertAction, ButtonPopup } from '../../../commons';
import { t } from 'i18n-js';
import { TESTID } from '../../../configs/Constants';
import Text from '../../../commons/Text';
import { IconFill } from '@ant-design/icons-react-native';

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();

jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

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

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

describe('test DeviceDetail', () => {
  let route;
  let account;

  beforeEach(() => {
    route = {
      params: {
        unit: {
          id: 1,
          name: 'Unit name',
          address: '298 Dien Bien Phu',
        },
        station: {
          id: 2,
          name: 'Station name',
        },
        sensor: { id: 1 },
        title: 'Button',
      },
    };
    account = {
      token: 'abc',
    };
    const setState = jest.fn();
    const useLayoutEffectSpy = jest.spyOn(React, 'useLayoutEffect');
    useLayoutEffectSpy.mockImplementation(() => setState);
  });

  afterEach(() => {
    mockedNavigate.mockClear();
  });

  test('render DeviceDetail', async () => {
    const responseDisplay = {
      status: 200,
      data: {
        items: [
          {
            type: 'camera',
            configuration: {
              uri: '',
              preview_uri: '',
            },
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(async () => {
      return responseDisplay;
    });

    await act(async () => {
      await create(<DeviceDetail account={account} route={route} />);
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.DISPLAY(1), {});
  });

  test('AlertSendConfirm onSendNowAlert', async () => {
    let tree;
    await act(async () => {
      tree = await create(<DeviceDetail account={account} route={route} />);
    });
    const instance = tree.root;
    const alertSendConfirm = instance.findByType(AlertSendConfirm);
    const alertSent = instance.findByType(AlertSent);
    expect(alertSendConfirm.props.showAlertConfirm).toEqual(false);
    expect(alertSent.props.showAlertSent).toEqual(false);
    expect(alertSendConfirm.props.countDown).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 5,
    });

    const response = {
      status: 200,
      data: {},
      success: true,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await alertSendConfirm.props.onSendNowAlert();
    });
    expect(alertSent.props.showAlertSent).toEqual(true);
    // expect(clearTimeout).toHaveBeenCalledTimes(1); // current not working
  });

  test('ButtonPopup onClick', async () => {
    let tree;
    await act(async () => {
      tree = await create(<DeviceDetail account={account} route={route} />);
    });
    const instance = tree.root;
    const buttonPopup = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_POPUP_RESOLVED &&
        el.type === ButtonPopup
    );
    const alertAction = instance.findByType(AlertAction);
    expect(buttonPopup.props.visible).toEqual(false);

    const responseResolve = {
      status: 200,
      sucess: true,
    };

    axios.put.mockImplementationOnce(async () => {
      return responseResolve;
    });

    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(buttonPopup.props.visible).toEqual(true);
    expect(buttonPopup.props.mainTitle).toEqual(t('ok'));
    await act(async () => {
      await buttonPopup.props.onPressMain();
      await buttonPopup.props.onClose();
    });
    expect(buttonPopup.props.visible).toEqual(false);
  });

  test('ButtonPopup render', async () => {
    let tree;
    await act(async () => {
      tree = await create(<DeviceDetail account={account} route={route} />);
    });
    const instance = tree.root;
    const buttonPopupTitle = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_POPUP_RESOLVED_TITLE &&
        el.type === Text
    );
    const buttonPopupIcon = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_POPUP_RESOLVED_ICON &&
        el.type === IconFill
    );
    expect(buttonPopupTitle.props.children).toEqual([
      'Unit name',
      ' - ',
      'Station name',
    ]);
    expect(buttonPopupIcon.props.name).toEqual('check-circle');
  });
});
