import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { ModalCustom } from '../../commons/Modal';
import MediaPlayerDetail from '../../commons/MediaPlayerDetail';
import { Images } from '../../configs';
import styles from './Styles/ModalFullVideoStyles';
import { useHiddenStatusBar } from '../../hooks/Common/useStatusBar';

const ModalFullVideo = ({
  animationOut = 'fadeOut',
  isVisible = false,
  modalStyles,
  data,
  resizeMode = 'cover',
  onClose,
}) => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHiddenStatusBar(isVisible);
  }, [isVisible]);

  return (
    <ModalCustom
      animationOut={animationOut}
      isVisible={isVisible}
      style={modalStyles}
    >
      <View style={styles.modalContent}>
        <MediaPlayerDetail
          uri={data?.uri}
          thumbnail={data?.thumbnail}
          style={styles.camera}
          wrapStyles={styles.wrapStyles}
          resizeMode={resizeMode}
          cameraName={data?.name}
          isFullScreen={true}
          isPaused={false}
        />
        <TouchableOpacity onPress={onClose} style={styles.buttonFullScreen}>
          <Image source={Images.fullscreen} />
        </TouchableOpacity>
      </View>
    </ModalCustom>
  );
};

export default ModalFullVideo;
