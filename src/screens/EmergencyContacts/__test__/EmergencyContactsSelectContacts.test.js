import React from 'react';
import { act, create } from 'react-test-renderer';
import { EmergencyContactsSelectContacts } from '../EmergencyContactsSelectContacts';
import { TESTID } from '../../../configs/Constants';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (actionGroup) => (
  <SCProvider initState={mockSCStore({})}>
    <EmergencyContactsSelectContacts />
  </SCProvider>
);

describe('test EmergencyContactsSelectContacts', () => {
  let tree;

  test('onPressContact remove from list', async () => {
    act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const rowUser = instance.findAllByProps({
      testID: TESTID.EMERGENCY_SELECT_CONTACT,
    });

    expect(rowUser).toHaveLength(3);
  });

  test('onPressContact remove and add again from list', async () => {
    act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const rowUser = instance.findAllByProps({
      testID: TESTID.EMERGENCY_SELECT_CONTACT,
    });
    expect(rowUser).toHaveLength(3);
  });
});
