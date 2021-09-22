import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { TESTID } from '../../../configs/Constants';
import ConnectedGateway from '../ConnectedGateway';
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
    <ConnectedGateway route={route} />
  </SCProvider>
);

describe('Test ConnectedGateway', () => {
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
          name: 'Chip name',
          imei: 'ABC123',
        },
        station_id: 2,
        unit_id: 1,
        unit_name: 'Unit name',
      },
    };
  });

  const getText = (instance, id) => {
    return instance.find((el) => el.props.testID === id);
  };

  test('create', async () => {
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;

    const textSuccess = getText(instance, TESTID.CONNECTED_GATEWAY_SUCCESS);
    const textUnitName = getText(instance, TESTID.CONNECTED_GATEWAY_UNIT_NAME);
    const textChipName = getText(instance, TESTID.CONNECTED_GATEWAY_CHIP_NAME);
    const textDone = getText(instance, TESTID.CONNECTED_GATEWAY_DONE);

    expect(textSuccess.props.children).toEqual(
      getTranslate('en', 'successfully_connected')
    );
    expect(textUnitName.props.children).toEqual('Unit name');
    expect(textChipName.props.children).toEqual('Chip name - ABC123');
    expect(textDone.props.children).toEqual(getTranslate('en', 'done'));
  });
});
