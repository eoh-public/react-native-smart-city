import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import AddLGDevice from '../AddLGDevice';
import API from '../../../configs/API';
import GroupCheckBox from '../../../commons/GroupCheckBox';
import { TESTID } from '../../../configs/Constants';
import { getTranslate } from '../../../utils/I18n';
import { ViewButtonBottom } from '../../../commons';
import { ToastBottomHelper } from '../../../utils/Utils';
import Routes from '../../../utils/Route';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('axios');

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddLGDevice route={route} />
  </SCProvider>
);

describe('Test Add LG Device', () => {
  let tree;
  let route;

  beforeEach(() => {
    route = {
      params: {
        unit_id: 1,
        code: 'CODE',
        backend_url: 'https://doamin.com',
      },
    };
  });

  afterEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
  });

  const getText = (instance, id) => {
    return instance.find((el) => el.props.testID === id);
  };

  test('render', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const textAdd = getText(instance, TESTID.ADD_NEW_DEVICE_LG_ADD);
    const textThen = getText(instance, TESTID.ADD_NEW_DEVICE_LG_THEN_SELECT);
    expect(textAdd.props.children).toEqual(
      getTranslate('en', 'add_new_device')
    );
    expect(textThen.props.children).toEqual(
      getTranslate('en', 'then_select_a_sub_unit_to_add')
    );

    const groupCheckBox = instance.findAllByType(GroupCheckBox);
    expect(groupCheckBox).toHaveLength(1);
    expect(groupCheckBox[0].props.data).toEqual([]);
  });

  test('fetchDetails success', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        name: 'Unit name',
        stations: [{ id: 2, name: 'Station name' }],
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    expect(axios.get).toHaveBeenCalledWith(API.UNIT.UNIT_DETAIL(1), {});

    const groupCheckBox = instance.findByType(GroupCheckBox);
    expect(groupCheckBox.props.data).toEqual([
      { id: 2, name: 'Station name', title: 'Station name' },
    ]);
  });

  test('fetchDetails fail', async () => {
    const response = {
      data: {},
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    expect(axios.get).toHaveBeenCalledWith(API.UNIT.UNIT_DETAIL(1), {});

    const groupCheckBox = instance.findByType(GroupCheckBox);
    expect(groupCheckBox.props.data).toEqual([]);
  });

  test('ViewButtonBottom', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    expect(viewButtonBottom.props.leftTitle).toEqual(
      getTranslate('en', 'text_back')
    );
    expect(viewButtonBottom.props.rightTitle).toEqual(
      getTranslate('en', 'text_next')
    );
  });

  test('ViewButtonBottom onLeftClick', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    await act(async () => {
      viewButtonBottom.props.onLeftClick();
    });
    expect(mockedGoBack).toHaveBeenCalled();
  });

  test('ViewButtonBottom onRightClick without select stationId', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    await act(async () => {
      viewButtonBottom.props.onRightClick();
    });
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test('ViewButtonBottom onRightClick with stationId', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        name: 'Unit name',
        stations: [{ id: 2, name: 'Station name' }],
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    const responseToken = {
      status: 200,
      data: {
        access_token: 'ACCESS_TOKEN',
      },
    };
    axios.post.mockImplementationOnce(async () => {
      return responseToken;
    });

    const responseSync = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementationOnce(async () => {
      return responseSync;
    });

    const spyToastSuccess = jest.spyOn(ToastBottomHelper, 'success');

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const groupCheckBox = instance.findByType(GroupCheckBox);
    await act(async () => {
      groupCheckBox.props.onSelect({ id: 2 }); // select stationId
    });

    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    await act(async () => {
      viewButtonBottom.props.onRightClick();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(spyToastSuccess).toBeCalled();
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.Dashboard);

    spyToastSuccess.mockReset();
    spyToastSuccess.mockRestore();
  });

  test('ViewButtonBottom onRightClick with stationId but sync failed', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        name: 'Unit name',
        stations: [{ id: 2, name: 'Station name' }],
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    const responseToken = {
      status: 200,
      data: {
        access_token: 'ACCESS_TOKEN',
      },
    };
    axios.post.mockImplementationOnce(async () => {
      return responseToken;
    });

    const responseSync = {
      data: {},
    };
    axios.post.mockImplementationOnce(async () => {
      return responseSync;
    });

    const spyToastSuccess = jest.spyOn(ToastBottomHelper, 'success');
    const spyToastError = jest.spyOn(ToastBottomHelper, 'error');

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const groupCheckBox = instance.findByType(GroupCheckBox);
    await act(async () => {
      groupCheckBox.props.onSelect({ id: 2 }); // select stationId
    });

    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    await act(async () => {
      viewButtonBottom.props.onRightClick();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(spyToastSuccess).not.toBeCalled();
    expect(spyToastError).toBeCalled();
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.Dashboard);

    spyToastSuccess.mockReset();
    spyToastSuccess.mockRestore();
  });

  test('ViewButtonBottom onRightClick with stationId but get token failed, wrong data', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        name: 'Unit name',
        stations: [{ id: 2, name: 'Station name' }],
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    const responseToken = {
      status: 200,
      data: {
        httpError: {
          request: 'https://kr.lgeapi.com//oauth/1.0/oauth2/token',
          code: 406,
          message: 'NOT_ACCEPTABLE',
        },
      },
    };
    axios.post.mockImplementationOnce(async () => {
      return responseToken;
    });

    const spyToastSuccess = jest.spyOn(ToastBottomHelper, 'success');
    const spyToastError = jest.spyOn(ToastBottomHelper, 'error');

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const groupCheckBox = instance.findByType(GroupCheckBox);
    await act(async () => {
      groupCheckBox.props.onSelect({ id: 2 }); // select stationId
    });

    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    await act(async () => {
      viewButtonBottom.props.onRightClick();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(1); // called once
    expect(spyToastSuccess).not.toBeCalled();
    expect(spyToastError).toBeCalled();
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.Dashboard);

    spyToastSuccess.mockReset();
    spyToastSuccess.mockRestore();
  });

  test('ViewButtonBottom onRightClick with stationId but get token failed, not success', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        name: 'Unit name',
        stations: [{ id: 2, name: 'Station name' }],
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    const responseToken = {
      data: {},
    };
    axios.post.mockImplementationOnce(async () => {
      return responseToken;
    });

    const spyToastSuccess = jest.spyOn(ToastBottomHelper, 'success');
    const spyToastError = jest.spyOn(ToastBottomHelper, 'error');

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const groupCheckBox = instance.findByType(GroupCheckBox);
    await act(async () => {
      groupCheckBox.props.onSelect({ id: 2 }); // select stationId
    });

    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    await act(async () => {
      viewButtonBottom.props.onRightClick();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(1); // called once
    expect(spyToastSuccess).not.toBeCalled();
    expect(spyToastError).toBeCalled();
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.Dashboard);

    spyToastSuccess.mockReset();
    spyToastSuccess.mockRestore();
  });
});
