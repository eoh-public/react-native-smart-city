import React, { useState, memo, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';

import PauseIcon from '../../../assets/images/Common/Pause.svg';
import { colorOpacity } from '../../utils/Converter/color';
import { Colors, Constants, Images } from '../../configs';
import FImage from '../../commons/FImage';
import { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './Styles/MeidaPlayerFullStyles';

const MediaPlayerFull = ({
  uri,
  isPaused = false,
  thumbnail,
  cameraName,
  isShowFullScreenIcon,
  amount,
}) => {
  const t = useTranslations();
  const [paused, setPaused] = useState(isPaused);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));

  const source = useMemo(
    () => (!thumbnail || !thumbnail.uri ? Images.BgDevice : thumbnail),
    [thumbnail]
  );

  const onPause = useCallback(() => {
    setPaused(true);
  }, []);

  const onPlay = useCallback(() => {
    setPaused(false);
  }, []);

  const onFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    setPaused(isPaused);
  }, [isPaused]);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isFullScreen ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPause}
      style={[isFullScreen ? styles.wrapFull : styles.wrap]}
    >
      <Animated.View
        style={[
          {
            width: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [Constants.width, Constants.height],
            }),
            height: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [224, Constants.width],
            }),
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '90deg'],
                }),
              },
            ],
          },
          isFullScreen && {},
        ]}
      >
        <View style={styles.loadingWrap}>
          <Text style={[styles.loadingText]}>{t('loading')}</Text>
        </View>
        {paused ? (
          <View style={styles.flex1}>
            <FImage
              source={source}
              style={styles.flex1}
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
            videoAspectRatio={
              isFullScreen ? `${Constants.height}:${Constants.width}` : '15:9'
            }
            source={{ uri }}
            style={styles.video}
            resizeMode={'cover'}
          />
        )}
        <View style={styles.buttonView}>
          <View style={styles.buttonPause}>
            <TouchableOpacity
              onPress={onPlay}
              style={[styles.btn]}
              activeOpacity={0.8}
            >
              {paused && <PauseIcon />}
            </TouchableOpacity>
          </View>
        </View>
        {cameraName && paused && (
          <Text
            style={[
              styles.cameraName,
              amount && amount !== 1 && styles.cameraName2,
            ]}
          >
            {cameraName}
          </Text>
        )}
        {isShowFullScreenIcon && (
          <TouchableOpacity
            onPress={onFullScreen}
            style={styles.wrapIconFullScreen}
          >
            <FImage source={Images.fullscreen} style={styles.iconFullScreen} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(MediaPlayerFull);
