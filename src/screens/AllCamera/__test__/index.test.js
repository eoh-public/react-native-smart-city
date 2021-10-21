import React from 'react';
import { TouchableOpacity } from 'react-native';
import AllCamera from '..';
import { act, create } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { ModalFullVideo } from '../../../commons/Modal';
import Carousel from 'react-native-snap-carousel';

const arrCameras = [
  {
    id: 41,
    order: 1,
    template: 'camera',
    type: 'camera',
    configuration: {
      id: 4,
      name: 'Camera cửa nhà xe',
      uri: 'rtsp://admin:hd543211@203.205.32.86:10555/ISAPI/Streaming/Channels/101/',
      preview_uri:
        'rtsp://admin:hd543211@203.205.32.86:10555/ISAPI/Streaming/Channels/101/',
      playback:
        'rtsp://admin:4tpg2SnnmChdh8TK@203.205.32.86:11024/Streaming/tracks/101/?starttime=20210901T110000Z',
    },
  },
];

const mockSetState = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: (init) => [init, mockSetState],
  };
});

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useRoute: jest.fn().mockReturnValue({
      params: {
        arrCameras: [
          {
            id: 41,
            order: 1,
            template: 'camera',
            type: 'camera',
            configuration: {
              id: 4,
              name: 'Camera cửa nhà xe',
              uri: 'rtsp://admin:hd543211@203.205.32.86:10555/ISAPI/Streaming/Channels/101/',
              preview_uri:
                'rtsp://admin:hd543211@203.205.32.86:10555/ISAPI/Streaming/Channels/101/',
              playback:
                'rtsp://admin:4tpg2SnnmChdh8TK@203.205.32.86:11024/Streaming/tracks/101/?starttime=20210901T110000Z',
            },
          },
        ],
        thumbnail: {
          uri: 'https://eoh-gateway-backend.eoh.io/image-asset.jpeg',
        },
      },
    }),
  };
});

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <AllCamera />
  </SCProvider>
);

describe('Test AllCamera screen', () => {
  let tree;

  beforeEach(() => {
    mockSetState.mockClear();
    jest.useFakeTimers();
  });

  it('Test render', async () => {
    mockSetState.mockImplementation((init) => [init, mockSetState]);
    mockSetState.mockImplementation((init) => [arrCameras, mockSetState]);
    mockSetState.mockImplementation((init) => [init, mockSetState]);
    mockSetState.mockImplementation((init) => [init, mockSetState]);
    mockSetState.mockImplementation((init) => [init, mockSetState]);
    mockSetState.mockImplementation((init) => [init, mockSetState]);
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities).toHaveLength(11);
    const ModalFullVideos = instance.findAllByType(ModalFullVideo);
    expect(ModalFullVideos).toHaveLength(1);
    act(() => {
      ModalFullVideos[0].props.onClose();
    });
    expect(mockSetState).toBeCalledWith(false);
    const Carousels = instance.findAllByType(Carousel);
    expect(Carousels).toHaveLength(1);
  });
});
