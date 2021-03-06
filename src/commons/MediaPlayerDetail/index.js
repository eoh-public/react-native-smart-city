import React, { memo, useCallback, useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTranslations } from '../../hooks/Common/useTranslations';

import PauseIcon from '../../../assets/images/Common/Pause.svg';
import { Colors, Constants, Images } from '../../configs';
import { colorOpacity } from '../../utils/Converter/color';
import styles from './Styles/MediaPlayerDetailStyles';
import FImage from '../../commons/FImage';
import { TESTID } from '../../configs/Constants';

const MediaPlayerDetail = memo(
  ({
    uri,
    cameraName,
    thumbnail,
    style,
    wrapStyles,
    resizeMode = 'none',
    amount,
    handleFullScreen,
    isFullScreen = false,
    isPaused = true,
    goToPlayBack,
    isShowFullScreenIcon = false,
  }) => {
    const t = useTranslations();
    const [paused, setPaused] = useState(isPaused);
    const onTapPause = useCallback(() => {
      setPaused(false);
    }, []);

    const onTapGoDetail = useCallback(() => {
      if (!paused) {
        setPaused(true);
      } else {
        goToPlayBack && goToPlayBack();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused]);

    const onFullScreen = useCallback(() => {
      handleFullScreen && handleFullScreen({ uri, cameraName, thumbnail });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setPaused(isPaused);
    }, [isPaused]);

    const source = !thumbnail || !thumbnail.uri ? Images.BgDevice : thumbnail;
    return (
      <View style={[styles.wrap, wrapStyles]}>
        <View
          style={[
            styles.loadingWrap,
            isFullScreen && { transform: [{ rotate: '90deg' }] },
          ]}
        >
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.videoBtn}
          onPress={onTapGoDetail}
        >
          {paused ? (
            <View style={[styles.player, style]}>
              <FImage
                source={source}
                style={[
                  styles.player,
                  style,
                  isFullScreen && {
                    marginLeft: -Constants.width / 2 - getStatusBarHeight(),
                    width: Constants.height,
                    height: Constants.width,
                    transform: [{ rotate: '90deg' }],
                  },
                ]}
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
          ) : isFullScreen ? (
            <View style={{ transform: [{ rotate: '90deg' }] }}>
              <VLCPlayer
                autoAspectRatio={true}
                videoAspectRatio={`${Constants.height}:${Constants.width}`}
                source={{ uri }}
                style={[
                  {
                    width: Constants.height,
                    height: Constants.width,
                  },
                ]}
              />
            </View>
          ) : (
            <VLCPlayer
              autoAspectRatio={true}
              videoAspectRatio={
                !amount
                  ? '21:9'
                  : amount === 1
                  ? '15:9'
                  : amount === 4
                  ? '5:3'
                  : '10:9'
              }
              source={{
                initType: 2,
                hwDecoderEnabled: 1,
                hwDecoderForced: 1,
                uri,
                initOptions: [
                  '--no-audio',
                  '--rtsp-tcp',
                  '--network-caching=150',
                  '--rtsp-caching=150',
                  '--no-stats',
                  '--tcp-caching=150',
                  '--realrtsp-caching=150',
                ],
              }}
              style={[styles.player, style]}
              resizeMode={resizeMode}
              isLive={true}
            />
          )}

          <View style={styles.buttonView}>
            <View style={styles.buttonPause}>
              <TouchableOpacity
                onPress={onTapPause}
                style={[
                  styles.btn,
                  isFullScreen && { transform: [{ rotate: '90deg' }] },
                ]}
                activeOpacity={0.8}
              >
                {paused && <PauseIcon />}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

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
            style={[
              styles.iconFullScreen,
              (amount === 4 || amount === 6) && styles.iconFullScreen2,
            ]}
            testID={TESTID.SUB_UNIT_FULL_CAMERA}
          >
            <Image source={Images.fullscreen} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

export default MediaPlayerDetail;
