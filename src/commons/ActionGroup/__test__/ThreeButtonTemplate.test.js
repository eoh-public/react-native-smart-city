import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import ThreeButtonTemplate from '../ThreeButtonTemplate';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (actionGroup) => (
  <SCProvider initState={mockSCStore({})}>
    <ThreeButtonTemplate actionGroup={actionGroup} doAction={jest.fn()} />
  </SCProvider>
);

describe('Test ThreeButtonTemplate', () => {
  const actionGroup = {
    configuration: {
      action1: '2b949045-8e03-4c07-a855-7794ade2e69c',
      action1_data: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        googlehome_actions: [],
        icon: 'caret-up',
        id: 9,
        key: '2b949045-8e03-4c07-a855-7794ade2e69c',
      },
      action2: '38347d5e-4418-4ab0-978c-c82f4c034897',
      action2_data: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        googlehome_actions: [],
        icon: 'stop',
        id: 11,
        key: '38347d5e-4418-4ab0-978c-c82f4c034897',
      },
      action3: 'a492e08c-8cb1-44ee-8ea0-46aaca4e5141',
      action3_data: {
        color: '#00979D',
        command_prefer_over_bluetooth: true,
        command_prefer_over_googlehome: false,
        command_prefer_over_internet: false,
        googlehome_actions: [],
        icon: 'caret-down',
        id: 10,
        key: 'a492e08c-8cb1-44ee-8ea0-46aaca4e5141',
      },
      icon1: 'caret-up',
      icon2: 'stop',
      icon3: 'caret-down',
      text1: 'UP',
      text2: 'STOP/UNLOCK',
      text3: 'DOWN',
      id: 1,
      template: 'three_button_action_template',
    },
  };

  let wrapper;

  test('render ThreeButtonTemplate', async () => {
    await act(() => {
      wrapper = renderer.create(wrapComponent(actionGroup));
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    const instance = wrapper.root;
    const touchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(touchableOpacities.length).toEqual(3);
  });
});
