import React from 'react';
import { act, create } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import NotificationItem from '../components/NotificationItem';
import { NOTIFICATION_TYPES } from '../../../configs/Constants';
import Routes from '../../../utils/Route';

const wrapComponent = (item) => (
  <SCProvider initState={mockSCStore({})}>
    <NotificationItem item={item} />
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

describe('test NotificationItem', () => {
  let item = {};
  beforeEach(() => {
    item = {
      id: 1,
      content_code: '',
      is_read: true,
      params: JSON.stringify({ booking_id: 1 }),
      created_at: '',
      icon: '',
    };
  });
  afterEach(() => {
    item = { ...item, is_read: false, content_code: '' };
  });
  let tree;
  const listCase = [
    NOTIFICATION_TYPES.REMIND_TO_MAKE_PAYMENT,
    NOTIFICATION_TYPES.EXPIRE_PARKING_SESSION,
    NOTIFICATION_TYPES.REMIND_TO_SCAN_QR_CODE,
    NOTIFICATION_TYPES.USER_CANCEL,
    NOTIFICATION_TYPES.SYSTEM_CANCEL_NO_PAYMENT,
    NOTIFICATION_TYPES.BOOKING_SUCCESSFULLY,
    NOTIFICATION_TYPES.PARKING_COMPLETED,
    NOTIFICATION_TYPES.BOOKING_EXPIRED_AND_VIOLATION_CREATED,
    NOTIFICATION_TYPES.MOVE_CAR_WITHOUT_PAY_VIOLATION,
    NOTIFICATION_TYPES.PAY_FINE_SUCCESSFULLY,
  ];

  for (const content_code of listCase) {
    test(`create ItemNotification ${content_code}`, () => {
      item.content_code = content_code;
      act(() => {
        tree = create(wrapComponent(item));
      });
      const instance = tree.root;
      const button = instance.findByType(TouchableOpacity);
      act(() => {
        button.props.onPress();
      });
      expect(mockNavigate).toHaveBeenCalledWith(Routes.SmartParkingStack, {
        screens: Routes.SmartParkingBookingDetails,
        params: {
          id: 1,
        },
      });
    });
  }
});
