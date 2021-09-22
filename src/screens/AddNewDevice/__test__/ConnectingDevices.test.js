import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { API } from '../../../configs';
import ConnectingDevices from '../ConnectingDevices';
import Text from '../../../commons/Text';
import Routes from '../../../utils/Route';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { getTranslate } from '../../../utils/I18n';

jest.mock('axios');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <ConnectingDevices route={route} />
  </SCProvider>
);

describe('Test ConnectingDevices', () => {
  let tree;
  let route;

  afterEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
  });

  beforeEach(() => {
    route = {
      params: {
        new_sensor: {
          id: 1,
        },
      },
    };
  });

  test('create', () => {
    act(() => {
      tree = create(wrapComponent(route));
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toEqual(
      getTranslate('en', 'connecting_your_device')
    );
    expect(texts[1].props.children).toEqual(
      getTranslate('en', 'dont_turn_off_the_device_or_close_this_app')
    );
  });

  test('call setInterval api success', async () => {
    jest.useFakeTimers();
    const response = {
      status: 200,
      data: {},
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(setInterval).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.CHECK_CONNECTION(1), {});
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ConnectDevices, {
      new_sensor: { id: 1 },
    });
  });

  test('call setInterval api fail', async () => {
    jest.useFakeTimers();
    const response = {
      status: 400,
      data: {},
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(setInterval).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(API.SENSOR.CHECK_CONNECTION(1), {});
    expect(mockedNavigate).not.toHaveBeenCalledWith(Routes.ConnectDevices, {
      new_sensor: { id: 1 },
    });
  });
});
