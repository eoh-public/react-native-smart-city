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
  test('AddNewAutoSmart select sensor device', async () => {
    let tree;
    let route = {
      params: { type: 'value_change', unit: { id: 1 } },
    };

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const item = instance.findAllByType(ItemAutomate);
    expect(item).toHaveLength(2);

    await act(async () => {
      await item[0].props.onPress();
    });

    const bottomButton = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.BUTTON_ADD_AUTO_SMART}${TESTID.BOTTOM_VIEW_MAIN}`
    );
    expect(bottomButton).toBeTruthy();
    await act(async () => {
      await bottomButton.props.onPress();
    });

    expect(mockNavigate).toBeCalledWith(Routes.SelectSensorDevices, {
      title: 'select_sensor',
      type: 'value_change',
      unit: { id: 1 },
    });
  });
});
