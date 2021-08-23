import axios from 'axios';
import { API } from '../../../configs';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import UnitDetail from '../Detail';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => 'vi',
  connect: () => {
    return (component) => component;
  },
}));

jest.mock('../../../iot/RemoteControl/GoogleHome', () => ({
  ...jest.requireActual('../../../iot/RemoteControl/GoogleHome'),
  googleHomeConnect: jest.fn(() => false),
}));

jest.mock('axios');

describe('Test UnitDetail google home disconnect', () => {
  const route = {
    params: {
      unitId: 1,
    },
  };
  const account = {};

  axios.get.mockImplementation(() => ({ status: 200 }));

  beforeEach(() => {
    jest.clearAllTimers();
    axios.get.mockClear();
    useIsFocused.mockImplementation(() => true);
    AsyncStorage.clear();
  });

  test('when unit has google home disconnect call api check send email', async () => {
    const unitData = {
      remote_control_options: {
        googlehome: [
          {
            auth: {},
            chip_id: 1,
            text_maps: {
              here: 10,
            },
          },
        ],
      },
    };
    jest.useFakeTimers();

    await act(async () => {
      await renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });

    expect(axios.post).toHaveBeenCalledWith(API.GOOGLE_HOME.CHECK_SEND_EMAIL, {
      chip_id: 1,
      is_connected: false,
    });
  });
});
