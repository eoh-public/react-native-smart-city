import axios from 'axios';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { act, create } from 'react-test-renderer';
import SubUnitAutomate from '..';
import { TESTID } from '../../../../configs/Constants';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';
import Routes from '../../../../utils/Route';

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <SubUnitAutomate {...data} />
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

let tree;
let data = {
  isOwner: true,
  type: 'one_tap',
  automates: [
    {
      id: 1,
      user: 6,
      type: 'one_tap',
      activate_at: '2021-09-17T05:30:00Z',
      script: {
        name: 'Joshua Ray',
        icon: '',
        icon_kit: '',
      },
    },
  ],
};

describe('test Item', () => {
  beforeEach(() => {
    axios.post.mockClear();
    mockedNavigate.mockClear();
  });
  test('render SubUnitAutomate isOwner', async () => {
    const response = {
      status: 200,
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(data));
    });

    const instance = tree.root;
    const item = instance.findAll(
      (el) => el.props.testID === TESTID.PLUS && el.type === TouchableOpacity
    );

    expect(item).toHaveLength(1);
    await act(async () => {
      await item[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.AddNewOneTap, {
      type: 'one_tap',
    });
    mockedNavigate.mockClear();

    const goDetail = instance.findAll(
      (el) =>
        el.props.testID === TESTID.GO_DETAIL && el.type === TouchableOpacity
    );
    expect(goDetail).toHaveLength(1);
    await act(async () => {
      await goDetail[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ScriptDetail, {
      havePermission: true,
      id: 1,
      name: 'Joshua Ray',
      type: 'one_tap',
    });

    const handleScriptAction = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AUTOMATE_SCRIPT_ACTION &&
        el.type === TouchableOpacity
    );
    expect(handleScriptAction).toHaveLength(1);
    await act(async () => {
      await handleScriptAction[0].props.onPress();
    });
    expect(Toast.show).toBeCalledWith({
      type: 'success',
      position: 'bottom',
      text1: 'Activated successfully.',
      visibilityTime: 1000,
    });
  });

  test('render SubUnitAutomate not is owner handleScriptAction fail', async () => {
    data.isOwner = false;
    const response = {
      status: 400,
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(data));
    });

    const handleScriptAction = tree.root.findAll(
      (el) =>
        el.props.testID === TESTID.AUTOMATE_SCRIPT_ACTION &&
        el.type === TouchableOpacity
    );
    expect(handleScriptAction).toHaveLength(1);
    await act(async () => {
      await handleScriptAction[0].props.onPress();
    });
    expect(Toast.show).toBeCalledWith({
      type: 'error',
      position: 'bottom',
      text1: 'Activation failed.',
      visibilityTime: 1000,
    });
  });

  test('render SubUnitAutomate script value_change', async () => {
    data.isOwner = false;
    data.type = 'value_change';
    data.automates = [
      {
        id: 1,
        user: 6,
        type: 'value_change',
        activate_at: null,
        script: {
          name: 'Rain',
          icon: '',
          icon_kit: 'https://www.figma.com/',
        },
      },
    ];
    const response = {
      status: 200,
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(data));
    });

    const goDetail = tree.root.findAll(
      (el) =>
        el.props.testID === TESTID.GO_DETAIL && el.type === TouchableOpacity
    );
    expect(goDetail).toHaveLength(1);
    await act(async () => {
      await goDetail[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ScriptDetail, {
      havePermission: false,
      id: 1,
      name: 'Rain',
      type: 'value_change',
      unit: undefined,
    });
  });
});
