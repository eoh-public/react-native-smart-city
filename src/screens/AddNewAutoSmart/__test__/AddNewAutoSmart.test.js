import React from 'react';
import { act, create } from 'react-test-renderer';
import AddNewAutoSmart from '..';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { TESTID } from '../../../configs/Constants';
import ItemAutomate from '../../../commons/Automate/ItemAutomate';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <AddNewAutoSmart route={route} />
  </SCProvider>
);

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: () => 'vi',
  };
});

describe('test AddNewAutoSmart', () => {
  test('render AddNewAutoSmart', async () => {
    let tree;
    let route = {
      params: { type: 'value_change' },
    };

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const addNewAutoSmart = instance.findAllByType(ItemAutomate);
    expect(addNewAutoSmart).toHaveLength(2);
  });
  test('render BottomButtonView', async () => {
    let tree;
    let route = {
      params: { type: 'change_value' },
    };
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const bottomButton = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.BUTTON_ADD_AUTO_SMART}${TESTID.BOTTOM_VIEW_MAIN}`
    );
    expect(bottomButton).toBeTruthy();
    await act(async () => {
      await bottomButton.props.onPress();
    });
  });
});