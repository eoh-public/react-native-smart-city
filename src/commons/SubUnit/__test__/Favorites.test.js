import React from 'react';
import { act, create } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import ItemAddNew from '../../Device/ItemAddNew';
import ItemDevice from '../../Device/ItemDevice';
import SubUnitFavorites from '../Favorites';
import ItemOneTap from '../OneTap/ItemOneTap';

const wrapComponent = (props) => (
  <SCProvider initState={mockSCStore({})}>
    <SubUnitFavorites {...props} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('test ShortDetail Subunit', () => {
  let tree;
  let props;

  beforeEach(() => {
    props = {
      unit: {
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
      },
      isOwner: true,
      favorites: {
        devices: [
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
        ],
        automates: [
          {
            id: 1,
            user: 6,
            type: 'one_tap',
            activate_at: '2021-09-17T05:30:00Z',
            script: {
              name: 'Joshua Ray',
              icon: '',
              icon_kit: '',
            },
          },
        ],
      },
      isGGHomeConnected: true,
    };
  });

  test('render SubUnitFavorites', async () => {
    act(() => {
      tree = create(wrapComponent(props));
    });
    const instance = tree.root;
    const devices = instance.findAllByType(ItemDevice);
    const automates = instance.findAllByType(ItemOneTap);
    const itemAddNew = instance.findAllByType(ItemAddNew);
    expect(devices).toHaveLength(props.favorites.devices.length);
    expect(automates).toHaveLength(props.favorites.automates.length);
    expect(itemAddNew).toHaveLength(1);

    await act(async () => {
      await itemAddNew[0].props.onAddNew();
    });
  });
});
