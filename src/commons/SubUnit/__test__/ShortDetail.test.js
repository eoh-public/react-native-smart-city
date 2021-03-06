import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import { act, create } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import Routes from '../../../utils/Route';

const wrapComponent = (unit, station) => (
  <SCProvider initState={mockSCStore({})}>
    <ShortDetailSubUnit unit={unit} station={station} />
  </SCProvider>
);

import ShortDetailSubUnit from '../ShortDetail';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('test ShortDetail Subunit', () => {
  let tree, unit, station;
  beforeEach(() => {
    unit = {
      address: null,
      background:
        'https://cdn-staging.eoh.io/image-90a42c0a-96ad-42e5-b736-b2b8a2e7fb20.jpg',
      can_add: true,
      icon: 'https://cdn-staging.eoh.io/baelen.jpg',
      id: 21,
      main_config_count: 0,
      name: 'Gia Cat Unit',
      remote_control_options: { bluetooth: [], googlehome: [] },
      stations: [
        {
          background:
            'https://cdn-staging.eoh.io/image-cc9ea441-e113-46b5-bff3-23d924723733.jpg',
          camera: null,
          id: 71,
          name: 'Station 1',
          sensors: [],
        },
      ],
      user_id: 64,
    };

    station = {
      background:
        'https://cdn-staging.eoh.io/image-cc9ea441-e113-46b5-bff3-23d924723733.jpg',
      camera: null,
      id: 71,
      name: 'Station 1',
    };
  });

  test('render ShortDetail', () => {
    act(() => {
      tree = create(wrapComponent(unit, station));
    });
    const instance = tree.root;
    const image = instance.findAllByType(Image);
    const imageBackground = image.find(
      (item) => item.props.testID === TESTID.SUB_UNIT_BACKGROUND
    );
    expect(imageBackground).not.toBeDefined();
  });

  test('render ShortDetail without background', () => {
    station.background = '';
    act(() => {
      tree = create(wrapComponent(unit, station));
    });
    const instance = tree.root;
    const image = instance.findAllByType(Image);
    const imageBackground = image.find(
      (item) => item.props.testID === TESTID.SUB_UNIT_BACKGROUND
    );
    expect(imageBackground).not.toBeDefined();
  });

  test('render ShortDetail with camera', () => {
    station.camera = {
      id: 2,
      name: 'EoH Gate',
      preview_uri: '',
      uri: '',
    };

    act(() => {
      tree = create(wrapComponent(unit, station));
    });
    const instance = tree.root;
    const view = instance.findAllByType(View);
    const viewCamera = view.find(
      (item) => item.props.testID === TESTID.SUB_UNIT_CAMERA_VIEW
    );
    expect(viewCamera).toBeDefined();
  });

  test('render ShortDetail with device', () => {
    station.sensors = [
      {
        action: {
          color: '#00979D',
          icon: 'caret-up',
          id: 1,
          key: '',
        },
        action2: null,
        chip_id: 1,
        description: null,
        icon: '',
        id: 1,
        name: 'People Counting',
        quick_action: null,
        remote_control_options: {},
        station: {},
        status: null,
        status2: null,
      },
    ];

    act(() => {
      tree = create(wrapComponent(unit, station));
    });
    const instance = tree.root;
    const itemDevice = instance.findAll(
      (item) =>
        item.props.testID === TESTID.SUB_UNIT_DEVICES && item.type === View
    );
    expect(itemDevice.length).toBe(1);
  });

  test('render ShortDetail add new device', () => {
    act(() => {
      tree = create(wrapComponent(unit, station));
    });
    const instance = tree.root;
    const buttonAddNew = instance.findAllByType(TouchableWithoutFeedback);
    act(() => {
      buttonAddNew[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.AddDeviceStack, {
      screen: Routes.ScanSensorQR,
      params: {
        station_id: station.id,
        unit_id: unit.id,
        unit_name: unit.name,
      },
    });
  });
});
