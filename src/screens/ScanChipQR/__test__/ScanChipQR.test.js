import React from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import ScanChipQR from '..';
import QRScan from '../components/QRScan';
import API from '../../../configs/API';
import Routes from '../../../utils/Route';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('axios');

jest.mock('react', () => {
  return { ...jest.requireActual('react'), memo: (x) => x };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
  };
});

describe('test ScanChipQR', () => {
  let route;

  beforeEach(() => {
    route = {
      params: {
        station_id: 1,
        phoneNumber: '0909123456',
        chipName: 'Chip name',
      },
    };
  });

  afterEach(() => {
    axios.get.mockClear();
  });

  test('create ScanChipQR', async () => {
    let tree;
    await act(async () => {
      tree = await create(<ScanChipQR route={route} />);
    });
    const instance = tree.root;
    const qrScan = instance.findAllByType(QRScan);
    expect(qrScan).toHaveLength(1);
    expect(qrScan[0].props.loading).toEqual(false);
  });

  test('onScan success', async () => {
    const new_chip = {
      id: 1,
      name: 'ABC',
    };
    const response = {
      status: 200,
      data: new_chip,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    let tree;
    const body = { id: 1, imei: 'IMEI_X', name: 'New Chip' };
    await act(async () => {
      tree = await create(<ScanChipQR route={route} />);
    });
    const instance = tree.root;
    const qrScan = instance.findByType(QRScan);
    expect(qrScan.props.loading).toEqual(false);
    await act(async () => {
      qrScan.props.onScan(JSON.stringify(body));
    });
    expect(qrScan.props.loading).toEqual(true);
    expect(axios.post).toHaveBeenCalledWith(API.SUB_UNIT.CHIP_SCAN(1), {
      ...body,
      phone: '0909123456',
      name: 'Chip name',
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ConnectingGateway, {
      new_chip,
      ...route.params,
    });
  });

  test('onScan failed', async () => {
    const new_chip = {
      id: 1,
      name: 'ABC',
    };
    const response = {
      data: new_chip,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    let tree;
    const body = { id: 1, imei: 'IMEI_X', name: 'New Chip' };
    await act(async () => {
      tree = await create(<ScanChipQR route={route} />);
    });
    const instance = tree.root;
    const qrScan = instance.findByType(QRScan);
    expect(qrScan.props.loading).toEqual(false);
    await act(async () => {
      qrScan.props.onScan(JSON.stringify(body));
    });
    expect(qrScan.props.loading).toEqual(true);
    expect(axios.post).toHaveBeenCalledWith(API.SUB_UNIT.CHIP_SCAN(1), {
      ...body,
      phone: '0909123456',
      name: 'Chip name',
    });
    expect(mockedGoBack).toHaveBeenCalled();
  });
});
