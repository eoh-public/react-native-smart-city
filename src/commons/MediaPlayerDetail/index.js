import React, { memo, useCallback, useState } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';

import { t } from 'i18n-js';
import PauseIcon from '../../../assets/images/Common/Pause.svg';
import { Colors, Images } from '../../configs';
import { colorOpacity } from '../../utils/Converter/color';
import styles from './MediaPlayerDetailStyles';

const MediaPlayerDetail = memo(({ uri, cameraName, thumbnail, style }) => {
  const [paused, setPaused] = useState(true);
  const onTapPause = useCallback(() => {
    setPaused(false);
  }, []);

  const onTapGoDetail = useCallback(() => {
    if (!paused) {
      setPaused(true);
    } else {
      // eslint-disable-next-line no-alert
      alert(t('feature_under_development'));
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
        onPress={onTapGoDetail}
      >
        {paused ? (
          <View style={[styles.player, style]}>
            <Image
              source={source}
              style={styles.player}
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

        <View style={styles.buttonView}>
          <View style={styles.buttonPause}>
            <TouchableOpacity
              onPress={onTapPause}
              style={styles.btn}
              activeOpacity={0.8}
            >
              {paused && <PauseIcon />}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {cameraName && <Text style={styles.cameraName}>{cameraName}</Text>}
    </View>
  );
});

export default MediaPlayerDetail;
