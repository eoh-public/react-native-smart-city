import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import Routes from '../../../utils/Route';
import { AlertAction } from '../../../commons';
import { EmergencyContactsList } from '../EmergencyContactsList';
import { TESTID } from '../../../configs/Constants';
import { getTranslate } from '../../../utils/I18n';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <EmergencyContactsList route={route} />
  </SCProvider>
);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

describe('test EmergencyContactList', () => {
  let route;

  beforeEach(() => {
    route = {
      params: {
        unitId: 1,
        group: 1,
      },
    };
  });
  let tree;

  afterEach(() => {
    mockedNavigate.mockClear();
  });

  test('handleRemove', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);

    act(() => {
      alertAction.props.rightButtonClick();
    });

    expect(alertAction.props.visible).toBe(false);
  });

  test('onAddNew', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;

    const menuActionList = instance.findByProps({
      title: getTranslate('en', 'add_new'),
    });
    const rowUser = instance.findByProps({
      text: getTranslate('en', 'add_new'),
    });

    expect(menuActionList.props.visible).toBe(false);

    act(() => {
      rowUser.props.onPress();
    });

    expect(menuActionList.props.visible).toBeTruthy();
  });

  test('onItemAddClick create contact', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;

    const buttons = instance.findAllByType(TouchableOpacity);
    const buttonsMenuActionList = buttons.filter(
      (item) => item.props.testID === TESTID.MENU_ACTION_LIST_TOUCHABLE
    );
    expect(buttonsMenuActionList).toHaveLength(2);
  });

  test('onItemAddClick select unit members', async () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;

    const buttons = instance.findAllByType(TouchableOpacity);
    const buttonsMenuActionList = buttons.filter(
      (item) => item.props.testID === TESTID.MENU_ACTION_LIST_TOUCHABLE
    );
    expect(buttonsMenuActionList).toHaveLength(2);

    act(() => {
      buttonsMenuActionList[1].props.onPress();
    });

    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.EmergencyContactsSelectContacts,
      {
        unitId: route.params.unitId,
      }
    );
  });
});
