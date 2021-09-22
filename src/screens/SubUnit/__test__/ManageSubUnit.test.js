/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { AlertAction, ImagePicker, ViewButtonBottom } from '../../../commons';
import { API } from '../../../configs';
import { useSelector } from 'react-redux';
import { act, create } from 'react-test-renderer';
import Toast from 'react-native-toast-message';

import Routes from '../../../utils/Route';
import ManageSubUnit from '../ManageSubUnit';
import { TESTID } from '../../../configs/Constants';
import Text from '../../../commons/Text';
import _TextInput from '../../../commons/Form/TextInput';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { getTranslate } from '../../../utils/I18n';

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();
const mockedDangerouslyGetState = jest.fn();
const mockedPop = jest.fn();

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
    useIsFocused: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      dangerouslyGetState: mockedDangerouslyGetState,
      pop: mockedPop,
    }),
    useIsFocused: jest.fn(),
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <ManageSubUnit route={route} />
  </SCProvider>
);

describe('Test ManageSubUnit', () => {
  let route;

  beforeEach(() => {
    route = {
      params: {
        station: {
          id: 2,
          name: 'Station name',
          background: '',
          group: {
            id: 1,
          },
        },
      },
    };
    const localState = {
      language: 'en',
      unit: {
        unitDetail: {
          id: 1,
        },
      },
    };
    useSelector.mockImplementation((cb) => {
      return cb(localState);
    });
  });

  afterEach(() => {
    mockedDispatch.mockClear();
    Toast.show.mockClear();
    axios.delete.mockClear();
    axios.patch.mockClear();
  });
  let tree;

  test('alertAction', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.leftButtonTitle).toEqual(
      getTranslate('en', 'cancel')
    );
    expect(alertAction.props.rightButtonTitle).toEqual(
      getTranslate('en', 'remove')
    );
  });

  test('alertAction rightButtonClick success, previous screen Routes.UnitDetail', async () => {
    const response = {
      status: 200,
    };
    axios.delete.mockImplementation(async () => {
      return response;
    });

    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [
        { name: Routes.UnitDetail },
        { name: 'route 2' },
        { name: 'route 3' },
      ],
    }));

    act(() => {
      tree = create(wrapComponent(route));
    });

    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(alertAction.props.visible).toEqual(false);
    expect(axios.delete).toHaveBeenCalledWith(
      'https://backend.eoh.io/api/property_manager/undefined/sub_units/2/'
    );
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      position: 'bottom',
      text1: getTranslate('en', 'text_remove_sub_unit_success'),
      visibilityTime: 1000,
    });
    expect(mockedPop).toHaveBeenCalledWith(2);
  });

  test('alertAction rightButtonClick success', async () => {
    const response = {
      status: 200,
    };
    axios.delete.mockImplementation(async () => {
      return response;
    });

    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [{ name: 'route 1' }, { name: 'route 2' }, { name: 'route 3' }],
    }));

    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(mockedPop).toHaveBeenCalledWith(3);
  });

  test('alertAction rightButtonClick fail', async () => {
    const response = {
      data: '',
    };
    axios.delete.mockImplementation(async () => {
      return response;
    });

    mockedDangerouslyGetState.mockImplementation(() => ({
      routes: [{ name: 'route 1' }, { name: 'route 2' }, { name: 'route 3' }],
    }));

    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    await act(async () => {
      await alertAction.props.rightButtonClick();
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: getTranslate('en', 'text_remove_sub_unit_fail'),
      visibilityTime: 1000,
    });
  });

  test('alertAction leftButtonClick', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    await act(async () => {
      await alertAction.props.leftButtonClick();
    });
    expect(alertAction.props.visible).toEqual(false);
  });

  test('alertAction hideModal', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    await act(async () => {
      await alertAction.props.hideModal();
    });
    expect(alertAction.props.visible).toEqual(false);
  });

  test('viewBottomButton onLeftClick', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const modal = instance.find(
      (el) => el.props.testID === TESTID.MANAGE_SUB_UNIT_MODAL
    );
    const viewBottomButtons = instance.findAllByType(ViewButtonBottom);
    const viewBottomButton = viewBottomButtons[0];

    expect(viewBottomButton.props.leftTitle).toEqual(
      getTranslate('en', 'cancel')
    );
    expect(viewBottomButton.props.rightTitle).toEqual(
      getTranslate('en', 'rename')
    );

    await act(async () => {
      await viewBottomButton.props.onLeftClick();
    });

    expect(modal.props.isVisible).toEqual(false);
  });

  test('viewBottomButton onRightClick success', async () => {
    const response = {
      status: 200,
      data: { name: 'Station name' },
    };
    axios.patch.mockImplementation(async () => {
      return response;
    });

    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const text = instance.find(
      (el) =>
        el.props.testID === TESTID.MANAGE_SUB_UNIT_NAME && el.type === Text
    );
    const viewBottomButtons = instance.findAllByType(ViewButtonBottom);
    const viewBottomButton = viewBottomButtons[0];

    await act(async () => {
      await viewBottomButton.props.onRightClick();
    });

    expect(axios.patch).not.toHaveBeenCalledWith(
      API.SUB_UNIT.MANAGE_SUB_UNIT(1, 2),
      { name: 'Station name' },
      {}
    );
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      position: 'bottom',
      text1: getTranslate('en', 'text_rename_sub_unit_success'),
      visibilityTime: 1000,
    });
    expect(text.props.children).toEqual('Station name');
  });

  test('viewBottomButton onRightClick fail', async () => {
    const response = {
      data: '',
    };
    axios.patch.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewBottomButtons = instance.findAllByType(ViewButtonBottom);
    const viewBottomButton = viewBottomButtons[0];

    await act(async () => {
      await viewBottomButton.props.onRightClick();
    });

    expect(axios.patch).not.toHaveBeenCalledWith(
      API.SUB_UNIT.MANAGE_SUB_UNIT(1, 2),
      { name: 'Station name' },
      {}
    );
    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(Toast.show).not.toHaveBeenCalled();
  });

  test('onPressRemove', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.MANAGE_SUB_UNIT_REMOVE_BUTTON &&
        el.type === TouchableOpacity
    );
    const alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toEqual(false);

    act(() => {
      button.props.onPress();
    });

    expect(alertAction.props.visible).toEqual(true);
  });

  test('onChangeName', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const textInput = instance.findByType(_TextInput);
    act(() => {
      textInput.props.onChange('New sub-unit name');
    });
    // This dont have expect
  });

  test('selectFile', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.MANAGE_SUB_UNIT_SELECT_FILE_BUTTON &&
        el.type === TouchableOpacity
    );
    const imagePicker = instance.findByType(ImagePicker);
    expect(imagePicker.props.showImagePicker).toEqual(false);
    act(() => {
      button.props.onPress();
    });
    expect(imagePicker.props.showImagePicker).toEqual(true);
  });

  test('setImage and updateBackground success', async () => {
    const response = {
      status: 200,
      data: { name: 'Station name' },
    };
    axios.patch.mockImplementation(async () => {
      return response;
    });

    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const imagePicker = instance.findByType(ImagePicker);
    const image = instance.findByType(Image);
    expect(image.props.source).toEqual({
      uri: '',
    });
    await act(async () => {
      await imagePicker.props.setImageUrl({ uri: 'path' });
    });
    expect(image.props.source).toEqual({
      uri: 'path',
    });
    expect(axios.patch).toHaveBeenCalled();
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      position: 'bottom',
      text1: getTranslate('en', 'text_change_background_sub_unit_success'),
      visibilityTime: 1000,
    });
  });

  test('setImage and updateBackground but fail', async () => {
    const response = {
      data: '',
    };
    axios.patch.mockImplementation(async () => {
      return response;
    });

    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const imagePicker = instance.findByType(ImagePicker);
    const image = instance.findByType(Image);
    expect(image.props.source).toEqual({
      uri: '',
    });
    await act(async () => {
      await imagePicker.props.setImageUrl({ uri: 'path' });
    });
    expect(image.props.source).toEqual({
      uri: 'path',
    });
    expect(axios.patch).toHaveBeenCalled();
    expect(Toast.show).not.toHaveBeenCalled();
  });
});
