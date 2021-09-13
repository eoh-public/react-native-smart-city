import React, { memo, useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { useTranslations } from '../../hooks/Common/useTranslations';
import PauseIcon from '../../../assets/images/Common/Pause.svg';
import { Colors, Images } from '../../configs';
import { colorOpacity } from '../../utils/Converter/color';
import styles from './styles';

const PreviewPlayer = memo(({ uri, start }) => {
  const [count, setCount] = useState(0);
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setCount(1);
      }, 3000);
      setTimeout(() => {
        setCount(2);
      }, 6000);
      setTimeout(() => {
        setCount(3);
      }, 9000);
    }
  }, [start]);

  const onLoad1 = useCallback(() => {
    setLoad1(true);
  }, []);
  const onLoad2 = useCallback(() => {
    setLoad2(true);
  }, []);
  const onLoad3 = useCallback(() => {
    setLoad3(true);
  }, []);

  return (
    <>
      {start && count >= 2 && (
        <Image
          source={{ uri: uri + '?c=2' }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.previewImage, { zIndex: -3 }]}
          resizeMode="stretch"
          fadeDuration={0}
          onLoad={onLoad3}
        />
      )}
      {start && count >= 1 && (
        <Image
          source={{ uri: uri + '?c=1' }}
          style={[
            styles.previewImage,
            // eslint-disable-next-line react-native/no-inline-styles
            { zIndex: -2 },
            load3 ? styles.hideImage : {},
          ]}
          resizeMode="stretch"
          fadeDuration={0}
          onLoad={onLoad2}
        />
      )}
      {start && (
        <Image
          source={{ uri: uri + '?c=0' }}
          style={[
            styles.previewImage,
            // eslint-disable-next-line react-native/no-inline-styles
            { zIndex: -1 },
            load2 ? styles.hideImage : {},
          ]}
          resizeMode="stretch"
          fadeDuration={0}
          onLoad={onLoad1}
        />
      )}
      <Image
        source={{ uri: uri }}
        style={[
          styles.previewImage,
          // eslint-disable-next-line react-native/no-inline-styles
          { zIndex: 0 },
          load1 ? styles.hideImage : {},
        ]}
        resizeMode="stretch"
        fadeDuration={0}
      />
    </>
  );
});

const MediaPlayer = memo(({ uri, previewUri, thumbnail, style }) => {
  const t = useTranslations();
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);

  const onTapPause = useCallback(() => {
    setStarted(true);
    setPaused((p) => !p);
  }, []);

  const imageSource =
    !thumbnail || !thumbnail.uri ? Images.BgDevice : thumbnail;
  return (
    <View style={styles.wrap}>
      <View style={styles.loadingWrap}>
        {previewUri ? (
          <PreviewPlayer uri={previewUri} start={started} />
        ) : (
          <Text style={styles.loadingText}>{t('loading')}</Text>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoBtn}
        onPress={onTapPause}
      >
        {!started ? (
          <View style={[styles.player, style]}>
            <Image
              source={imageSource}
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
          <>
            <VLCPlayer
              autoAspectRatio={true}
              videoAspectRatio="21:9"
              source={{ uri }}
              style={[styles.player, style]}
              paused={paused}
            />
          </>
        )}
        <View style={styles.bottomView}>
          {(paused || !started) && <PauseIcon />}
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default MediaPlayer;
