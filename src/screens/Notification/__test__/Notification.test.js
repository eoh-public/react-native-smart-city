import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Notification from '../index';
import NotificationItem from '../components/NotificationItem';
import { API } from '../../../configs';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <Notification />
  </SCProvider>
);

jest.mock('axios');

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

describe('test Notification', () => {
  let tree;

  test('test render', async () => {
    const response = {
      status: 200,
      data: {
        results: [
          {
            content_code: 'NOTIFY_INVITE_MEMBER',
            created_at: '2021-10-07T08:57:09.370286Z',
            icon: 'https://eoh-gateway-backend.eoh.io/Rectangle_65.png',
            id: 12905,
            is_read: true,
            params: "{'unit_owner_name': 'Canh', 'unit_name': 'EoH Office'}",
            type: 'NEWS',
          },
          {
            content_code: 'PARKING_COMPLETED',
            created_at: '2021-07-26T07:30:00.558123Z',
            icon: 'https://eoh-gateway-backend.eoh.io/2021-07-01_00-21_1.png',
            id: 11621,
            is_read: true,
            params: "{'booking_id': 4736}",
            type: 'NEWS',
          },
        ],
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const notificationItem = instance.findAllByType(NotificationItem);

    expect(notificationItem).toHaveLength(2);
    expect(axios.get).toHaveBeenCalledWith(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(1, ''),
      {}
    );
  });
});
