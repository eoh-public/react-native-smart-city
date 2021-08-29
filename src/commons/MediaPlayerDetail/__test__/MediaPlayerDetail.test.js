import React from 'react';
import { act, create } from 'react-test-renderer';
import { TouchableOpacity, Text } from 'react-native';
import MediaPlayerDetail from '../index';
import PauseIcon from '../../../assets/images/Common/Pause.svg';

describe('Test MediaPlayerDetail', () => {
  let wrapper;

  test('MediaPlayerDetail render when onTap setPause', async () => {
    await act(async () => {
      wrapper = await create(
        <MediaPlayerDetail
          uri={'rtsp://admin:hd111111:1111111/Streaming/Channels/101/'}
          key={'camera-1'}
          thumbnail={{ uri: 'https://abc.com/image.png' }}
          cameraName={'cameraName'}
        />
      );
    });
    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(2);
    await act(async () => {
      await buttons[0].props.onPress();
    });

    const texts = instance.findAllByType(Text);
    expect(texts.length).toEqual(2);
    expect(texts[1].props.children).toEqual('cameraName');

    const pauseIcon = instance.findAllByType(PauseIcon);
    expect(pauseIcon.length).toEqual(1);

    await act(async () => {
      await buttons[1].props.onPress();
    });

    expect(texts[1].child).toBeUndefined();
    expect(pauseIcon.child).toBeUndefined();
  });
});
