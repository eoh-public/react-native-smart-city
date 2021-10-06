import React from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import ScriptDetail from '..';
import MenuActionMore from '../../../commons/MenuActionMore';
import AlertAction from '../../../commons/AlertAction';
import _TextInput from '../../../commons/Form/TextInput';
import { AUTOMATE_TYPE } from '../../../configs/Constants';
import { API } from '../../../configs';

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
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

jest.mock('axios');

describe('Test ScriptDetail', () => {
  let route;
  let tree;

  beforeEach(() => {
    axios.patch.mockClear();
    axios.delete.mockClear();
    mockGoBack.mockClear();
    route = {
      params: {
        id: 1,
        name: 'script',
        unit: 2,
        type: AUTOMATE_TYPE.ONE_TAP,
        havePermission: true,
      },
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
});
