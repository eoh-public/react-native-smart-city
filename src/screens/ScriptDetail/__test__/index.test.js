import React from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import ScriptDetail from '..';
import MenuActionMore from '../../../commons/MenuActionMore';
import AlertAction from '../../../commons/AlertAction';
import _TextInput from '../../../commons/Form/TextInput';
import { AUTOMATE_TYPE, TESTID } from '../../../configs/Constants';
import { API } from '../../../configs';
import { TouchableOpacity } from 'react-native';
import Routes from '../../../utils/Route';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <ScriptDetail route={route} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockGoBack,
      navigate: mockNavigate,
    }),
  };
});

jest.mock('axios');

describe('Test ScriptDetail', () => {
  let route;
  let data;
  let tree;

  beforeEach(() => {
    axios.get.mockClear();
    axios.patch.mockClear();
    axios.delete.mockClear();
    axios.post.mockClear();
    mockGoBack.mockClear();
    route = {
      params: {
        id: 1,
        name: 'script',
        unit: { id: 2 },
        type: AUTOMATE_TYPE.ONE_TAP,
        havePermission: true,
      },
    };
    data = {
      is_star: false,
      script_actions: [
        {
          id: 1,
          sensor_icon_kit: 'icon',
          station_name: 'station',
          sensor_name: 'sensor',
          action_name: 'action',
        },
      ],
    };
  });

  test('test rename script', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const menu = instance.findByType(MenuActionMore);
    const alertAction = instance.findByType(AlertAction);
    const rename = menu.props.listMenuItem[0];

    await act(async () => {
      await menu.props.onItemClick(rename);
      await menu.props.hideComplete();
    });
    expect(menu.props.isVisible).toBeFalsy();
    expect(alertAction.props.visible).toBeTruthy();

    const textInput = instance.findByType(_TextInput);
    await act(async () => {
      textInput.props.onChange('new_name');
    });

    const response = {
      status: 200,
      data: {
        name: 'new_name',
      },
    };
    axios.patch.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(axios.patch).toHaveBeenCalledWith(API.AUTOMATE.SCRIPT(1), {
      name: 'new_name',
    });
    expect(alertAction.props.visible).toBeFalsy();
  });

  test('test delete script', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const menu = instance.findByType(MenuActionMore);
    const alertAction = instance.findByType(AlertAction);
    const deleteItem = menu.props.listMenuItem[2];

    await act(async () => {
      await menu.props.onItemClick(deleteItem);
      await menu.props.hideComplete();
    });
    expect(alertAction.props.visible).toBeTruthy();

    const response = { status: 204 };
    axios.delete.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(axios.delete).toHaveBeenCalledWith(API.AUTOMATE.SCRIPT(1));
    expect(alertAction.props.visible).toBeFalsy();
    expect(mockGoBack).toHaveBeenCalled();
  });

  test('test star then unstar script', async () => {
    await act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const buttonStar = instance.find(
      (el) => el.props.testID === TESTID.HEADER_DEVICE_BUTTON_STAR
    );

    axios.post.mockImplementation(async () => {
      return { status: 200 };
    });
    await act(async () => {
      await buttonStar.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.AUTOMATE.STAR_SCRIPT(1));

    axios.post.mockClear();

    axios.post.mockImplementation(async () => {
      return { status: 204 };
    });
    await act(async () => {
      await buttonStar.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.AUTOMATE.UNSTAR_SCRIPT(1));
  });

  test('test activate one tap', async () => {
    const response = {
      status: 200,
      data: data,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const buttonActivate = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_ACTIVATE_ONE_TAP &&
        el.type === TouchableOpacity
    );

    axios.post.mockImplementation(async () => {
      return { status: 200 };
    });
    await act(async () => {
      await buttonActivate.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.AUTOMATE.ACTION_ONE_TAP(1));
  });

  test('test press add action', async () => {
    const response = {
      status: 200,
      data: data,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.BUTTON_ADD_SCRIPT_ACTION &&
        el.type === TouchableOpacity
    );
    await act(async () => {
      await button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(Routes.SelectSensorDevices, {
      unit: route.params.unit,
      automateId: route.params.id,
      isCreateNewAction: true,
      scriptName: route.params.name,
      isScript: false,
      type: AUTOMATE_TYPE.ONE_TAP,
    });
  });

  const _testGoToActivityLog = (automateType, activityLogType) => {
    test('test go to activity log', async () => {
      route.params.type = automateType;
      await act(async () => {
        tree = await create(wrapComponent(route));
      });
      const instance = tree.root;
      const menu = instance.findByType(MenuActionMore);
      const gotoActivityLog = menu.props.listMenuItem[1];

      await act(async () => {
        await menu.props.onItemClick(gotoActivityLog);
      });
      expect(mockNavigate).toHaveBeenCalledWith(Routes.ActivityLog, {
        id: route.params.id,
        type: activityLogType,
        share: route.params.unit,
      });
    });
  };

  _testGoToActivityLog(
    AUTOMATE_TYPE.ONE_TAP,
    `automate.${AUTOMATE_TYPE.ONE_TAP}`
  );
  _testGoToActivityLog(AUTOMATE_TYPE.VALUE_CHANGE, 'automate');
});
