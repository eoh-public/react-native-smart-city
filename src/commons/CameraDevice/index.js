import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { t } from 'i18n-js';

import styles from './CameraDeviceStyles';
import MediaPlayerDetail from '../MediaPlayerDetail';
import Text from '../Text';
import { Section } from '..';
import { standardizeCameraScreenSize } from '../../utils/Utils';
import { Device } from '../../configs';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../utils/Route';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const CameraDevice = ({ station, handleFullScreen, goToPlayBack }) => {
  const { navigate } = useNavigation();

  const onPressViewAll = () => {
    navigate(Routes.AllCamera, {
      arrCameras: station?.camera_devices,
      thumbnail: { uri: station?.background },
    });
  };

  return (
    <Section style={styles.noShadow}>
      <View style={styles.UnitsHeading}>
        {!!station.camera_devices?.length && (
          <Text type={'H4'} semibold style={styles.device}>{`${t('device')} (${
            station.camera_devices?.length
          })`}</Text>
        )}

        {Boolean(station?.camera_devices?.length) && (
          <TouchableOpacity onPress={onPressViewAll}>
            <Text style={styles.viewAll}>{t('view_all')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {station.camera_devices.map((device) => (
        <View
          style={[
            styles.boxImage,
            { width: standardizeWidth, height: standardizeHeight },
          ]}
        >
          <MediaPlayerDetail
            uri={device.configuration.uri}
            thumbnail={{
              uri: station.background,
            }}
            key={`camera-device-${device.id}`}
            cameraName={device.configuration.name}
            isShowFullScreenIcon
            handleFullScreen={handleFullScreen}
            goToPlayBack={goToPlayBack(device, { uri: station?.background })}
          />
        </View>
      ))}
    </Section>
  );
};

export default CameraDevice;
