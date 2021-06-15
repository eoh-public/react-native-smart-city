import React, { memo, useCallback, useState } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { t } from 'i18n-js';
import PauseIcon from '../../../assets/images/Common/Pause.svg';
import { Colors, Images } from '../../configs';
import { colorOpacity } from '../../utils/Converter/color';

const MediaPlayer = memo(({ uri, thumbnail, style }) => {
  const [paused, setPaused] = useState(true);
  const onTapPause = useCallback(() => {
    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [paused]);
  const source = !thumbnail || !thumbnail.uri ? Images.BgDevice : thumbnail;
  return (
    <View style={styles.wrap}>
      <View style={styles.loadingWrap}>
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoBtn}
        onPress={onTapPause}
      >
        {paused ? (
          <View style={[styles.player, style]}>
            <Image
              source={source}
              style={[styles.player]}
              defaultSource={Images.BgDevice}
              resizeMode="cover"
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: colorOpacity(Colors.Black, 0.3) },
              ]}
            />
          </View>
        ) : (
          <VLCPlayer
            autoAspectRatio={true}
            videoAspectRatio="21:9"
            source={{ uri: uri }}
            style={[styles.player, style]}
          />
        )}

        <View style={[styles.bottomView]}>{paused && <PauseIcon />}</View>
      </TouchableOpacity>
    </View>
  );
});

export default MediaPlayer;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.TextGray,
    overflow: 'hidden',
  },
  loadingWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.White,
  },
  player: {
    zIndex: 0,
    flex: 1,
    borderRadius: 10,
  },
  videoBtn: {
    flex: 1,
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    height: '100%',
    position: 'absolute',
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,0)',
  },
});
