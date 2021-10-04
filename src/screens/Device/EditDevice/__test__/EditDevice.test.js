import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import { SCProvider } from '../../../../context';
import { mockSCStore } from '../../../../context/mockStore';
import EditDevice from '..';
import AlertAction from '../../../../commons/AlertAction';
import _TextInput from '../../../../commons/Form/TextInput';
import { TESTID } from '../../../../configs/Constants';
import { API } from '../../../../configs';
import { useRoute } from '@react-navigation/native';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <EditDevice route={route} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('axios');

describe('Test EditDevice', () => {
  let tree;

  beforeEach(() => {
    axios.patch.mockClear();
    axios.delete.mockClear();
    mockNavigate.mockClear();
    useRoute.mockReturnValue({
      params: {
        unit: {
          id: 1,
          name: 'unit',
        },
        sensor: {
          id: 1,
          name: 'sensor',
        },
      },
    });
  });

  test('test rename EditDevice', async () => {
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    const buttonRename = instance.findAll(
      (el) =>
        el.props.testID === TESTID.DEVICE_SHOW_RENAME &&
        el.type === TouchableOpacity
    );
    expect(buttonRename).toHaveLength(1);
    await act(async () => {
      await buttonRename[0].props.onPress();
    });

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
    expect(axios.patch).toHaveBeenCalledWith(API.SENSOR.RENAME_SENSOR(1), {
      name: 'new_name',
    });
    expect(alertAction.props.visible).toBeFalsy();
  });
  test('test delete EditDevice', async () => {
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    const buttonDelete = instance.findAll(
      (el) =>
        el.props.testID === TESTID.DEVICE_SHOW_REMOVE &&
        el.type === TouchableOpacity
    );
    expect(buttonDelete).toHaveLength(1);
    await act(async () => {
      await buttonDelete[0].props.onPress();
    });
    expect(alertAction.props.visible).toBeTruthy();
    const response = { status: 204 };
    axios.delete.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await alertAction.props.rightButtonClick();
    });
    expect(axios.delete).toHaveBeenCalledWith(API.SENSOR.REMOVE_SENSOR(1));
    expect(alertAction.props.visible).toBeFalsy();
    expect(mockNavigate).toHaveBeenCalled();
  });
});
