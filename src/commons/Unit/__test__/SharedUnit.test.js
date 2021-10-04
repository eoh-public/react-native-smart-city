import axios from 'axios';
import React from 'react';
import { create, act } from 'react-test-renderer';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import SharedUnit from '../SharedUnit';
import { TESTID } from '../../../configs/Constants';
import { API } from '../../../configs';
import Routes from '../../../utils/Route';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const wrapComponent = (item, navigation, isOptions, mockedRenewItem) => (
  <SCProvider initState={mockSCStore({})}>
    <SharedUnit
      item={item}
      navigation={navigation}
      isOptions={isOptions}
      renewItem={mockedRenewItem}
    />
  </SCProvider>
);

describe('Test SharedUnit', () => {
  let tree, item, unit;

  beforeEach(() => {
    axios.post.mockClear();

    unit = {
      background: '',
      icon: '',
      id: 3,
      name: 'name',
      owner_name: 'owner_name',
      short_summaries: [],
    };

    item = {
      created_at: moment('2021-01-26T03:00:00.677514Z'),
      id: 69,
      is_pin: false,
      is_star: false,
      unit: unit,
      user: 1,
    };
  });

  test('test create SharedUnit unit is not pin, not star', async () => {
    const navigation = useNavigation();

    await act(async () => {
      tree = await create(wrapComponent(item, navigation));
    });
    const instance = tree.root;
    const touchSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.TOUCH_SHARED_UNIT + '-69'
    );
    act(() => {
      touchSharedUnit.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(Routes.UnitStack, {
      screen: Routes.UnitDetail,
      params: {
        unitId: 3,
        unitData: unit,
      },
    });

    const iconRemovePinSharedUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_REMOVE_PIN_SHARED_UNIT + '-69'
    );
    expect(iconRemovePinSharedUnit).toHaveLength(0);

    const iconAddPinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_PIN_SHARED_UNIT + '-69'
    );
    act(() => {
      iconAddPinSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.PIN_UNIT(3));

    const iconAddStarSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_STAR_SHARED_UNIT + '-69'
    );
    act(() => {
      iconAddStarSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.STAR_UNIT(3));
  });

  test('test create SharedUnit unit without unit owner', async () => {
    const navigation = useNavigation();
    delete unit.owner_name;

    await act(async () => {
      tree = await create(wrapComponent(item, navigation));
    });
    const instance = tree.root;
    const ownerName = instance.findAll(
      (el) => el.props.testID === TESTID.SHARED_UNIT_OWN_BY
    );

    expect(ownerName).toHaveLength(0);
  });

  test('test create SharedUnit unit isOption false', async () => {
    const navigation = useNavigation();

    await act(async () => {
      tree = await create(wrapComponent(item, navigation, false));
    });
    const instance = tree.root;

    const iconAddPinSharedUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_ADD_PIN_SHARED_UNIT + '-69'
    );
    const iconStarUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_ADD_STAR_SHARED_UNIT + '-69'
    );

    expect(iconAddPinSharedUnit).toHaveLength(0);
    expect(iconStarUnit).toHaveLength(0);
  });

  test('test create SharedUnit unit is pin, is star', async () => {
    const navigation = useNavigation();
    item.is_pin = true;
    item.is_star = true;

    await act(async () => {
      tree = await create(wrapComponent(item, navigation));
    });
    const instance = tree.root;
    const iconRemovePinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_PIN_SHARED_UNIT + '-69'
    );
    act(() => {
      iconRemovePinSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.UNPIN_UNIT(3));

    const iconRemoveStarSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_STAR_SHARED_UNIT + '-69'
    );
    act(() => {
      iconRemoveStarSharedUnit.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.UNSTAR_UNIT(3));
  });

  test('test pin SharedUnit success', async () => {
    const navigation = useNavigation();
    const mockedRenewItem = jest.fn();
    await act(async () => {
      tree = await create(
        wrapComponent(item, navigation, true, mockedRenewItem)
      );
    });
    const instance = tree.root;

    const response = {
      success: true,
      status: 200,
    };

    jest.spyOn(axios, 'post').mockImplementation(() => {
      return response;
    });

    const iconAddPinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_PIN_SHARED_UNIT + '-69'
    );

    const iconStarUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_STAR_SHARED_UNIT + '-69'
    );

    await act(async () => {
      await iconAddPinSharedUnit.props.onPress();
      await iconStarUnit.props.onPress();
    });

    expect(mockedRenewItem).toHaveBeenCalledTimes(2);
  });

  test('test pin SharedUnit unsuccess', async () => {
    const navigation = useNavigation();
    const mockedRenewItem = jest.fn();
    await act(async () => {
      tree = await create(
        wrapComponent(item, navigation, true, mockedRenewItem)
      );
    });
    const instance = tree.root;

    const response = {
      success: false,
      status: 500,
    };

    jest.spyOn(axios, 'post').mockImplementation(() => {
      return response;
    });

    const iconAddPinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_PIN_SHARED_UNIT + '-69'
    );

    const iconStarUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_ADD_STAR_SHARED_UNIT + '-69'
    );

    await act(async () => {
      await iconAddPinSharedUnit.props.onPress();
      await iconStarUnit.props.onPress();
    });

    const iconRemovePinSharedUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_REMOVE_PIN_SHARED_UNIT + '-69'
    );

    const iconRemoveStartUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_REMOVE_STAR_SHARED_UNIT + '-69'
    );

    expect(mockedRenewItem).toHaveBeenCalledTimes(0);
    expect(iconRemovePinSharedUnit).toHaveLength(0);
    expect(iconRemoveStartUnit).toHaveLength(0);
  });

  test('test unpin SharedUnit success', async () => {
    const navigation = useNavigation();
    item.is_pin = true;
    item.is_star = true;
    const mockedRenewItem = jest.fn();

    await act(async () => {
      tree = await create(
        wrapComponent(item, navigation, true, mockedRenewItem)
      );
    });
    const instance = tree.root;

    const response = {
      success: true,
      status: 200,
    };

    jest.spyOn(axios, 'post').mockImplementation(() => {
      return response;
    });

    const iconRemovePinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_PIN_SHARED_UNIT + '-69'
    );

    const iconRemoveStartUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_STAR_SHARED_UNIT + '-69'
    );

    await act(async () => {
      await iconRemovePinSharedUnit.props.onPress();
      await iconRemoveStartUnit.props.onPress();
    });

    expect(mockedRenewItem).toHaveBeenCalledTimes(2);
  });

  test('test unpin SharedUnit unsuccess', async () => {
    const navigation = useNavigation();
    item.is_pin = true;
    item.is_star = true;
    const mockedRenewItem = jest.fn();

    await act(async () => {
      tree = await create(
        wrapComponent(item, navigation, true, mockedRenewItem)
      );
    });
    const instance = tree.root;

    const response = {
      success: false,
      status: 500,
    };

    jest.spyOn(axios, 'post').mockImplementation(() => {
      return response;
    });

    const iconRemovePinSharedUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_PIN_SHARED_UNIT + '-69'
    );

    const iconRemoveStartUnit = instance.find(
      (el) => el.props.testID === TESTID.ICON_REMOVE_STAR_SHARED_UNIT + '-69'
    );

    await act(async () => {
      await iconRemovePinSharedUnit.props.onPress();
      await iconRemoveStartUnit.props.onPress();
    });

    const iconAddPinSharedUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_ADD_PIN_SHARED_UNIT + '-69'
    );

    const iconStarUnit = instance.findAll(
      (el) => el.props.testID === TESTID.ICON_ADD_STAR_SHARED_UNIT + '-69'
    );

    expect(mockedRenewItem).toHaveBeenCalledTimes(0);
    expect(iconAddPinSharedUnit).toHaveLength(0);
    expect(iconStarUnit).toHaveLength(0);
  });
});
