import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import AddNewDevice from '../index';
import GroupCheckBox from '../../../commons/GroupCheckBox';
import { TESTID } from '../../../configs/Constants';
import API from '../../../configs/API';
import { ViewButtonBottom } from '../../../commons';
import Routes from '../../../utils/Route';
import { getTranslate } from '../../../utils/I18n';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddNewDevice route={route} />
  </SCProvider>
);

jest.mock('axios');

jest.mock('react', () => {
  return { ...jest.requireActual('react'), memo: (x) => x };
});

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
  };
});

describe('Test AddNewDevice', () => {
  let tree;
  let route;

  afterEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
  });

  beforeEach(() => {
    route = {
      params: {
        unit_id: 1,
      },
    };
  });

  const getText = (instance, id) => {
    return instance.find((el) => el.props.testID === id);
  };

  test('create', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const textAdd = getText(instance, TESTID.ADD_NEW_DEVICE_ADD);
    const textThen = getText(instance, TESTID.ADD_NEW_DEVICE_THEN_SELECT);
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
    expect(mockedNavigate).toHaveBeenCalled();
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
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ScanSensorQR, {
      station_id: 2,
      unit_id: 1,
      unit_name: 'Unit name',
    });
  });
});
