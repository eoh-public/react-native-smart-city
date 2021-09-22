import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import AddNewGateway from '../index';
import GroupCheckBox from '../../../commons/GroupCheckBox';
import { TESTID } from '../../../configs/Constants';
import { ViewButtonBottom } from '../../../commons';
import { TextInput } from 'react-native';
import { getTranslate } from '../../../utils/I18n';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddNewGateway route={route} />
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

describe('Test AddNewGateway', () => {
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
    const textAdd = getText(instance, TESTID.ADD_NEW_GATEWAY_ADD);
    const textThen = getText(instance, TESTID.ADD_NEW_GATEWAY_THEN_SELECT);
    expect(textAdd.props.children).toEqual(
      getTranslate('en', 'add_new_gateway')
    );
    expect(textThen.props.children).toEqual(
      getTranslate('en', 'please_add_your_phone_number_and_chip_name')
    );

    const groupCheckBox = instance.findAllByType(GroupCheckBox);
    expect(groupCheckBox).toHaveLength(0);
  });

  test('onChange chipName and phoneNumber', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TextInput);

    expect(textInputs[0].props.value).toEqual('');
    expect(textInputs[1].props.value).toEqual('');

    expect(textInputs[0].props.placeholder).toEqual(
      getTranslate('en', 'phone_number_of_data_sim')
    );
    expect(textInputs[1].props.placeholder).toEqual(
      getTranslate('en', 'gateway_name')
    );

    await act(async () => {
      await textInputs[0].props.onChangeText('New phone number');
      await textInputs[1].props.onChangeText('New chip name');
    });

    expect(textInputs[0].props.value).toEqual('New phone number');
    expect(textInputs[1].props.value).toEqual('New chip name');
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

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;

    const viewButtonBottom = instance.findByType(ViewButtonBottom);
    await act(async () => {
      viewButtonBottom.props.onRightClick();
    });
    expect(mockedNavigate).not.toBeCalled();
  });
});
