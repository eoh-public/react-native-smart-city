import React from 'react';
import { create, act } from 'react-test-renderer';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import StatesGridActionTemplate from '../StatesGridActionTemplate';

import { TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockOnSelectAction = jest.fn();

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <StatesGridActionTemplate data={data} onSelectAction={mockOnSelectAction} />
  </SCProvider>
);

describe('Test StatesGridActionTempalte', () => {
  let tree;
  let data = {
    title: 'Mode',
    template: 'StatesGridActionTemplate',
    configuration: {
      options: [
        {
          config: 1024,
          is_on_value: 1,
          action: '800ff454-4e2a-4a38-bad6-1bded728193e',
          icon: 'up-circle',
          icon_kit: 41,
          text: 'Auto',
        },
        {
          config: 1024,
          is_on_value: 2,
          action: '4e43da81-469e-4d23-a66b-2656db7cf196',
          icon: 'up-circle',
          icon_kit: 42,
          text: 'Cool',
        },
        {
          config: 1024,
          is_on_value: 3,
          action: '63f1bbfa-0e42-4401-9ea2-4aa07327ff26',
          icon: 'up-circle',
          icon_kit: 44,
          text: 'Dry',
        },
        {
          config: 1024,
          is_on_value: 4,
          action: '8ba3e471-dd84-478b-87f3-6008aead8804',
          icon: 'up-circle',
          icon_kit: 43,
          text: 'Fan Only',
        },
      ],
    },
  };
  test('Test render StatesGridActionTempalte', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const touchOpacity = instance.findAll(
      (item) =>
        item.props.testID === TESTID.STATES_GRID_ACTION_GRID_ITEM &&
        item.type === TouchableOpacity
    );
    expect(touchOpacity).toHaveLength(4);
  });

  test('Test onPress hanleSelectAction', () => {
    act(() => {
      tree = create(wrapComponent(data));
    });
    const instance = tree.root;
    const touchOpacity = instance.findAll(
      (item) =>
        item.props.testID === TESTID.STATES_GRID_ACTION_GRID_ITEM &&
        item.type === TouchableOpacity
    );
    expect(touchOpacity).toHaveLength(4);

    act(() => {
      touchOpacity[0].props.onPress(data.configuration.options[0]);
    });
    expect(mockOnSelectAction).toHaveBeenCalled();
  });
});
