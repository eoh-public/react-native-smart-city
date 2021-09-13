import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { useTranslations } from '../../../hooks/Common/useTranslations';
import AddNewGateway from '../index';
import GroupCheckBox from '../../../commons/GroupCheckBox';
import { TESTID } from '../../../configs/Constants';
import API from '../../../configs/API';
import { ViewButtonBottom } from '../../../commons';
import Routes from '../../../utils/Route';
import { TextInput } from 'react-native';

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

describe('Test AddNewGateway', () => {
  const t = useTranslations();
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
      tree = await create(<AddNewGateway route={route} />);
    });
    const instance = tree.root;
    const textAdd = getText(instance, TESTID.ADD_NEW_GATEWAY_ADD);
    const textThen = getText(instance, TESTID.ADD_NEW_GATEWAY_THEN_SELECT);
    expect(textAdd.props.children).toEqual(t('add_new_gateway'));
    expect(textThen.props.children).toEqual(t('then_select_a_sub_unit_to_add'));

    const groupCheckBox = instance.findAllByType(GroupCheckBox);
    expect(groupCheckBox).toHaveLength(1);
    expect(groupCheckBox[0].props.data).toEqual([]);
  });

  test('onChange chipName and phoneNumber', async () => {
    await act(async () => {
      tree = await create(<AddNewGateway route={route} />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TextInput);

    expect(textInputs[0].props.value).toEqual('');
    expect(textInputs[1].props.value).toEqual('');

    expect(textInputs[0].props.placeholder).toEqual(t('phone_number'));
    expect(textInputs[1].props.placeholder).toEqual(t('chip_name'));

    await act(async () => {
      await textInputs[0].props.onChangeText('New phone number');
      await textInputs[1].props.onChangeText('New chip name');
    });

    expect(textInputs[0].props.value).toEqual('New phone number');
    expect(textInputs[1].props.value).toEqual('New chip name');
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
      tree = await create(<AddNewGateway route={route} />);
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
      tree = await create(<AddNewGateway route={route} />);
    });
    const instance = tree.root;
    expect(axios.get).toHaveBeenCalledWith(API.UNIT.UNIT_DETAIL(1), {});

    const groupCheckBox = instance.findByType(GroupCheckBox);
    expect(groupCheckBox.props.data).toEqual([]);
  });

  test('ViewButtonBottom', async () => {
    await act(async () => {
      tree = await create(<AddNewGateway route={route} />);
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    expect(viewButtonBottom.props.leftTitle).toEqual(t('text_back'));
    expect(viewButtonBottom.props.rightTitle).toEqual(t('text_next'));
  });

  test('ViewButtonBottom onLeftClick', async () => {
    await act(async () => {
      tree = await create(<AddNewGateway route={route} />);
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
      tree = await create(<AddNewGateway route={route} />);
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

    await act(async () => {
      tree = await create(<AddNewGateway route={route} />);
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
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ScanChipQR, {
      chipName: '',
      phoneNumber: '',
      station_id: 2,
      unit_id: 1,
      unit_name: 'Unit name',
    });
  });
});
