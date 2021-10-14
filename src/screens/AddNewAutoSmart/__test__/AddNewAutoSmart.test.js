import React from 'react';
import { act, create } from 'react-test-renderer';
import AddNewAutoSmart from '..';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { TESTID } from '../../../configs/Constants';
import ItemAutomate from '../../../commons/Automate/ItemAutomate';
import Routes from '../../../utils/Route';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddNewAutoSmart route={route} />
  </SCProvider>
);

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: () => 'vi',
  };
});

describe('test AddNewAutoSmart', () => {
  let tree;
  let route = {
    params: {
      type: 'value_change',
      unit: { id: 1 },
    },
  };

  test('AddNewAutoSmart select sensor device', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const items = instance.findAllByType(ItemAutomate);
    expect(items).toHaveLength(2);

    await act(async () => {
      await items[0].props.onPress();
    });

    const bottomButton = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.BUTTON_ADD_AUTO_SMART}${TESTID.BOTTOM_VIEW_MAIN}`
    );
    expect(bottomButton).toBeDefined();
    await act(async () => {
      await bottomButton.props.onPress();
    });

    expect(mockNavigate).toBeCalledWith(Routes.SelectSensorDevices, {
      title: 'select_sensor',
      type: 'value_change',
      unit: { id: 1 },
      isAutomateTab: undefined,
      isMultiUnits: undefined,
      routeName: 'SelectSensorDevices',
    });
  });

  test('test choose Schedule', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const items = instance.findAllByType(ItemAutomate);

    await act(async () => {
      await items[1].props.onPress();
    });
    expect(items[1].props.isSelected).toBeTruthy();

    const bottomButton = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.BUTTON_ADD_AUTO_SMART}${TESTID.BOTTOM_VIEW_MAIN}`
    );
    await act(async () => {
      await bottomButton.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(Routes.SetSchedule, {
      type: 'schedule',
      unit: route.params.unit,
      isAutomateTab: undefined,
      isMultiUnits: undefined,
      routeName: 'SetSchedule',
    });
  });
});
