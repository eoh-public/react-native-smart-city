import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { useTranslations } from '../../../hooks/Common/useTranslations';
import { TESTID } from '../../../configs/Constants';
import ConnectedGateway from '../ConnectedGateway';

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

describe('Test ConnectedGateway', () => {
  const t = useTranslations();
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
      tree = await create(<ConnectedGateway route={route} />);
    });
    const instance = tree.root;

    const textSuccess = getText(instance, TESTID.CONNECTED_GATEWAY_SUCCESS);
    const textUnitName = getText(instance, TESTID.CONNECTED_GATEWAY_UNIT_NAME);
    const textChipName = getText(instance, TESTID.CONNECTED_GATEWAY_CHIP_NAME);
    const textDone = getText(instance, TESTID.CONNECTED_GATEWAY_DONE);

    expect(textSuccess.props.children).toEqual(t('successfully_connected'));
    expect(textUnitName.props.children).toEqual('Unit name');
    expect(textChipName.props.children).toEqual('Chip name - ABC123');
    expect(textDone.props.children).toEqual(t('done'));
  });
});
