import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { t } from 'i18n-js';

import styles from './CameraDeviceStyles';
import MediaPlayerDetail from '../MediaPlayerDetail';
import Text from '../Text';
import { Section } from '..';
import { standardizeCameraScreenSize } from '../../utils/Utils';
import { Device } from '../../configs';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const CameraDevice = ({ station }) => {
  return (
    <Section style={styles.noShadow}>
      <View style={styles.UnitsHeading}>
        {!!station.camera_devices?.length && (
          <Text type={'H4'} semibold style={styles.device}>{`${t('device')} (${
            station.camera_devices?.length
          })`}</Text>
        )}

        <TouchableOpacity
          onPress={() => {
            // eslint-disable-next-line no-alert
            alert(t('feature_under_development'));
          }}
        >
          <Text style={styles.viewAll}>{t('view_all')}</Text>
        </TouchableOpacity>
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
          />
        </View>
      ))}
    </Section>
  );
};

export default CameraDevice;
