import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import ConnectingGateway from '../ConnectingGateway';
import Text from '../../../commons/Text';
import { t } from 'i18n-js';
import API from '../../../configs/API';
import Routes from '../../../utils/Route';

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

describe('Test ConnectingGateway', () => {
  let tree;
  let route;

  afterEach(() => {
    axios.get.mockClear();
    mockedNavigate.mockClear();
  });

  beforeEach(() => {
    route = {
      params: {
        new_chip: {
          id: 1,
        },
      },
    };
  });

  test('create', async () => {
    await act(async () => {
      tree = await create(<ConnectingGateway route={route} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toEqual(t('connecting_your_gateway'));
    expect(texts[1].props.children).toEqual(
      t('dont_turn_off_the_device_or_close_this_app')
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
      tree = await create(<ConnectingGateway route={route} />);
    });
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(setInterval).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(API.CHIP.CHECK_FINALIZED, {
      params: {
        chip_id: 1,
      },
    });
    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.ConnectedGateway,
      route.params
    );
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
      tree = await create(<ConnectingGateway route={route} />);
    });
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(setInterval).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(API.CHIP.CHECK_FINALIZED, {
      params: {
        chip_id: 1,
      },
    });
    expect(mockedNavigate).not.toHaveBeenCalledWith(
      Routes.ConnectedGateway,
      route.params
    );
  });
});
