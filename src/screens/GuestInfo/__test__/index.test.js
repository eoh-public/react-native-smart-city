import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import GuestInfo from '..';
import AccessScheduleItem from '../components/AccessScheduleItem';
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

jest.mock('axios');

describe('Test GuestInfo', () => {
  let route;
  let tree;
  let data = {
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

  beforeEach(() => {
    axios.get.mockClear();
    route = {
      params: { id: 1 },
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
    const radioButtons = instance.findAll(
      (el) =>
        el.props.testID === TESTID.ACCESS_SCHEDULE_RADIO_BUTTON &&
        el.type === TouchableOpacity
    );
    expect(accessScheduleItems).toHaveLength(3);
    expect(radioButtons).toHaveLength(3);
  });
});
