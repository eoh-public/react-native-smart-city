import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import GuestInfo from '..';
import RowGuestInfo from '../components/RowGuestInfo';
import AccessScheduleItem from '../components/AccessScheduleItem';
import WheelDateTimePicker from '../../../commons/WheelDateTimePicker';
import Text from '../../../commons/Text';
import { TESTID } from '../../../configs/Constants';
import { API } from '../../../configs';

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <GuestInfo route={route} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

jest.mock('axios');

const getButton = (instance, testID, many = false) => {
  if (many) {
    return instance.findAll(
      (el) => el.props.testID === testID && el.type === TouchableOpacity
    );
  }
  return instance.find(
    (el) => el.props.testID === testID && el.type === TouchableOpacity
  );
};

describe('Test GuestInfo', () => {
  let route;
  let tree;
  let data;

  beforeEach(() => {
    axios.get.mockClear();
    axios.put.mockClear();
    mockGoBack.mockClear();
    route = {
      params: { id: 1 },
    };
    data = {
      user: {
        id: 1,
        name: 'name',
        avatar: 'avatar',
      },
      access_schedule: 'always',
      recurring_time_start: '07:00:00',
      recurring_time_end: '07:00:00',
      recurring_time_repeat: [0, 1, 2],
      temporary_time_start: '2021-01-24T12:00:00.000Z',
      temporary_time_end: '2021-01-24T12:00:00.000Z',
    };
  });

  test('test render GuestInfo', async () => {
    const response = {
      status: 200,
      data: data,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;

    expect(axios.get).toHaveBeenCalledWith(API.SHARED_SENSOR.ACCESS(1), {});
    const texts = instance.findAllByType(Text);
    expect(texts[4].props.children).toBe(data.user.id);
    expect(texts[6].props.children).toBe('Always');

    const accessScheduleItems = instance.findAllByType(AccessScheduleItem);
    const radioButtons = getButton(
      instance,
      TESTID.ACCESS_SCHEDULE_RADIO_BUTTON,
      true
    );
    expect(accessScheduleItems).toHaveLength(3);
    expect(radioButtons).toHaveLength(3);
  });

  test('test open and close 2 modal', async () => {
    const response = {
      status: 200,
      data: data,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const rows = instance.findAllByType(RowGuestInfo);
    const accessScheduleSheet = instance.find(
      (el) => el.props.testID === TESTID.ACCESS_SCHEDULE_SHEET
    );
    const dateTimePicker = instance.findByType(WheelDateTimePicker);
    const radioButtons = getButton(
      instance,
      TESTID.ACCESS_SCHEDULE_RADIO_BUTTON,
      true
    );
    const accessScheduleSheetDone = getButton(
      instance,
      `${TESTID.ACCESS_SCHEDULE_SHEET}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
    );
    const dateTimePickerDone = getButton(
      instance,
      `${TESTID.WHEEL_DATE_TIME_PICKER}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
    );

    // show AccessScheduleSheet
    await act(async () => {
      await rows[1].props.onPress();
    });
    expect(accessScheduleSheet.props.isVisible).toBeTruthy();

    // select recurring
    await act(async () => {
      await radioButtons[1].props.onPress();
    });

    // click recurring time start
    const recurringTextButtons = getButton(
      instance,
      TESTID.RECURRING_TEXT_BUTTON,
      true
    );
    await act(async () => {
      await recurringTextButtons[0].props.onPress();
      await accessScheduleSheet.props.onHide();
    });
    expect(accessScheduleSheet.props.isVisible).toBeFalsy();
    expect(dateTimePicker.props.isVisible).toBeTruthy();

    // WheelDateTimePicker -> click done
    await act(async () => {
      await dateTimePickerDone.props.onPress();
      await dateTimePicker.props.onHide();
    });
    expect(accessScheduleSheet.props.isVisible).toBeTruthy();
    expect(dateTimePicker.props.isVisible).toBeFalsy();

    // AccessScheduleSheet -> click done
    await act(async () => {
      await accessScheduleSheetDone.props.onPress();
      await accessScheduleSheet.props.onHide();
    });
    expect(accessScheduleSheet.props.isVisible).toBeFalsy();
  });
});
