import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import OnOffButtonTemplate from '../OnOffButtonTemplate';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Test OneBigButtonTemplate', () => {
  const action_on_data = {
    color: '#00979D',
    command_prefer_over_bluetooth: true,
    command_prefer_over_googlehome: false,
    command_prefer_over_internet: false,
    googlehome_actions: [],
    icon: 'caret-up',
    id: 20,
    key: '5ed1d4dc-a905-47cd-b0c9-f979644bd21a',
  };

  const action_off_data = {
    color: '#00979D',
    command_prefer_over_bluetooth: true,
    command_prefer_over_googlehome: false,
    command_prefer_over_internet: false,
    googlehome_actions: [],
    icon: 'caret-up',
    id: 20,
    key: '5ed1d4dc-a905-47cd-b0c9-f979644bd21a',
  };
  const actionGroup = {
    configuration: {
      action_on: '5ed1d4dc-a905-47cd-b0c9-f979644bd21a',
      action_on_data: action_on_data,
      icon_on: 'caret-up',
      text_on: 'ON',
      action_off: '5ed1d4dc-a905-47cd-b0c9-f979644bd21b',
      action_off_data: action_off_data,
      icon_off: 'caret-up',
      text_off: 'OFF',
    },
  };
  let wrapper;

  const setState = jest.fn();
  useState.mockImplementation((init) => [init, setState]);

  const assertRender = (state, text) => {
    useState.mockImplementationOnce((init) => [state, setState]);
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = create(
        <OnOffButtonTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
        />
      );
    });

    const renderJson = wrapper.toJSON();

    expect(renderJson.children[0].children[0].children[1].children).toEqual([
      text,
    ]);
  };

  test('render state on', () => {
    assertRender(true, 'ON');
  });

  test('render state off', () => {
    assertRender(false, 'OFF');
  });

  const assertActionCall = (state, action_data) => {
    useState.mockImplementationOnce((init) => [state, setState]);
    const mockDoAction = jest.fn();
    act(() => {
      wrapper = create(
        <OnOffButtonTemplate
          actionGroup={actionGroup}
          doAction={mockDoAction}
        />
      );
    });

    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);

    act(() => {
      buttons[0].props.onPress();
    });

    expect(mockDoAction).toHaveBeenCalledTimes(1);
    expect(mockDoAction).toHaveBeenCalledWith(action_data);
  };

  test('action state on', () => {
    assertActionCall(true, action_off_data);
  });

  test('action state off', () => {
    assertActionCall(false, action_on_data);
  });
});
