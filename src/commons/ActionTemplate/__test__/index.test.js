import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';

import ActionTemplate from '..';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import SelectActionCard from '../../SelectActionCard';
import Modal from 'react-native-modal';

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

const wrapComponent = (data, onSelectAction, action) => (
  <SCProvider initState={mockSCStore({})}>
    <ActionTemplate
      data={data}
      onSelectAction={onSelectAction}
      action={action}
    />
  </SCProvider>
);

describe('Test ActionTemplate', () => {
  let tree;
  test('test state visible', () => {
    const data = [
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
    ];
    const setState = jest.fn();
    const mockFunction = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    act(() => {
      tree = renderer.create(wrapComponent(data, mockFunction, mockFunction));
    });
    const instance = tree.root;

    const selectActionCard = instance.findByType(SelectActionCard);
    const modal = instance.findByType(Modal);
    act(() => {
      selectActionCard.props.onPress();
    });
    expect(setState).toHaveBeenCalledWith(true);

    act(() => {
      modal.props.onBackButtonPress();
    });
    expect(setState).toHaveBeenCalledWith(false);
  });
});
