import React from 'react';
import renderer, { act } from 'react-test-renderer';

import ActionTemplate from '..';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import SelectActionCard from '../../SelectActionCard';
import Modal from 'react-native-modal';
import ThreeButtonAction from '../ThreeButtonAction';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockOnSelectAction = jest.fn();

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <ActionTemplate data={data} onSelectAction={mockOnSelectAction} />
  </SCProvider>
);

describe('Test ActionTemplate', () => {
  let tree;
  let data = [
    {
      title: '',
      template: 'three_button_action_template',
      configuration: {
        action1: '94ae262d-46e3-42ff-9d10-516831ecc830',
        action2: '94ae262d-46e3-42ff-9d10-516831ecc830',
        action3: '94ae262d-46e3-42ff-9d10-516831ecc830',
        icon1: 'up',
        icon2: 'stop',
        icon3: 'down',
        text1: 'OPEN',
        text2: 'STOP',
        text3: 'CLOSE',
        text_lock: 'Door lock',
        is_display_lock: true,
      },
    },
    {
      title: '',
      template: 'on_off_button_action_template',
      configuration: {
        action_on: '94ae262d-46e3-42ff-9d10-516831ecc830',
        action_off: '94ae262d-46e3-42ff-9d10-516831ecc830',
        text_on: 'On',
        text_off: 'Off',
      },
    },
    {
      title: '',
      template: 'one_button_action_template',
      configuration: {
        action: '94ae262d-46e3-42ff-9d10-516831ecc830',
        text: 'One',
      },
    },
    {
      title: '',
      template: 'OnOffSimpleActionTemplate',
      configuration: {
        action_on: '94ae262d-46e3-42ff-9d10-516831ecc830',
        action_off: '94ae262d-46e3-42ff-9d10-516831ecc830',
      },
    },
  ];
  test('test onPress SelectActionCard', () => {
    act(() => {
      tree = renderer.create(wrapComponent(data));
    });
    const instance = tree.root;

    const selectActionCard = instance.findByType(SelectActionCard);
    const modal = instance.findByType(Modal);
    act(() => {
      selectActionCard.props.onPress();
    });
    expect(modal.props.isVisible).toBe(true);
  });
  test('test onPressSelectAction', () => {
    act(() => {
      tree = renderer.create(wrapComponent(data));
    });
    const instance = tree.root;

    const threeButtonAction = instance.findByType(ThreeButtonAction);
    act(() => {
      threeButtonAction.props.onPress({
        name: 'OPEN',
        action: '94ae262d-46e3-42ff-9d10-516831ecc830',
        template: 'three_button_action_template',
      });
    });
    expect(mockOnSelectAction).toBeCalledWith({
      action: '94ae262d-46e3-42ff-9d10-516831ecc830',
      data: null,
      template: 'three_button_action_template',
    });
  });
});
