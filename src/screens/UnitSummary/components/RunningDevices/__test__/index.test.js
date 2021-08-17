import React from 'react';
import { act, create } from 'react-test-renderer';
import RunningDevices from '..';
import { TouchableOpacity } from 'react-native';
import ItemDevice from '../../../../../commons/Device/ItemDevice';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('test RunningDevices', () => {
  afterEach(() => {
    mockedNavigate.mockClear();
  });

  let list_svgMain = [
    '',
    'sensor',
    'barrier',
    'emergency',
    'alert-connected',
    'alert-disconnected',
    'null',
  ];
  list_svgMain.forEach(function (item, index) {
    test(`render RunningDevices svgMain: ${item}, create ItemDevice`, async () => {
      let tree;
      let unit = {
        remote_control_options: {
          googlehome: true,
        },
      };
      let summaryDetail = {
        devices: [
          {
            id: index,
            icon: item,
            description: 'description',
            title: 'title',
            sensor: 'sensor',
            station: 'station',
            action: {
              color: 'color',
              icon: 'icon',
            },
          },
        ],
      };

      await act(async () => {
        tree = await create(
          <RunningDevices unit={unit} summaryDetail={summaryDetail} />
        );
      });
      const instance = tree.root;
      const texts = instance.findAllByType(ItemDevice);
      expect(texts.length).toEqual(1);

      const button = instance.findAllByType(TouchableOpacity);
      act(() => {
        button[0].props.onPress();
      });
    });
  });

  test('render RunningDevices remote_control_options.bluetooth', async () => {
    let tree;
    let unit = {
      remote_control_options: {
        bluetooth: [{ name: 'RKSDKJSSVS' }],
      },
    };
    let summaryDetail = {
      devices: [
        {
          id: 1,
          icon: 'sensor',
          description: 'description',
          title: 'title',
          sensor: 'sensor',
          station: 'station',
          action: {
            color: 'color',
            icon: 'icon',
          },
        },
      ],
    };

    await act(async () => {
      tree = await create(
        <RunningDevices unit={unit} summaryDetail={summaryDetail} />
      );
    });
    const instance = tree.root;
    const texts = instance.findAllByType(ItemDevice);
    expect(texts.length).toEqual(1);

    const button = instance.findAllByType(TouchableOpacity);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockedNavigate).toBeCalledWith('DeviceDetail', {
      isGGHomeConnected: false,
      sensor: summaryDetail.devices[0],
      station: 'station',
      title: undefined,
      unit: unit,
    });
  });
});
