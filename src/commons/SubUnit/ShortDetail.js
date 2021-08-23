import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';

import { Images, Device } from '../../configs';
import { TESTID } from '../../configs/Constants';
import { Section } from '../Section';
import Text from '../Text';
import ItemDevice from '../Device/ItemDevice';
import MediaPlayer from '../MediaPlayer';
import { standardizeCameraScreenSize } from '../../utils/Utils';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const ShortDetailSubUnit = ({ unit, station, isGGHomeConnected }) => {
  const renderCamera = () => {
    if (station?.camera) {
      return (
        <View
          style={[
            styles.boxImage,
            { width: standardizeWidth, height: standardizeHeight },
          ]}
          testID={TESTID.SUB_UNIT_CAMERA_VIEW}
        >
          <MediaPlayer
            uri={station.camera.uri}
            thumbnail={{
              uri: station.background,
            }}
            key={`camera-${station.camera.id}`}
          />
        </View>
      );
    } else if (station?.background) {
      return (
        <View style={styles.boxImage}>
          <Image
            source={{
              uri: station.background,
            }}
            borderRadius={10}
            style={styles.image}
            defaultSource={Images.BgDevice}
            resizeMode="cover"
            testID={TESTID.SUB_UNIT_BACKGROUND}
          />
        </View>
      );
    }
    return false;
  };

  return (
    <Section style={styles.noShadow}>
      {renderCamera()}

      {!!station?.sensors?.length && (
        <Text type={'H4'} semibold style={styles.device}>{`${t('device')} (${
          station?.sensors?.length
        })`}</Text>
      )}

      <View style={styles.boxDevices}>
        {!!station.sensors &&
          station.sensors.map((sensor, index) => (
            <ItemDevice
              key={`sensor-${sensor.id}`}
              id={sensor.id}
              svgMain={sensor.icon || 'sensor'}
              statusIcon={sensor.action && sensor.action.icon}
              statusColor={sensor.action && sensor.action.color}
              description={sensor.value}
              title={sensor.name}
              index={index}
              sensor={sensor}
              unit={unit}
              station={station}
              isGGHomeConnected={isGGHomeConnected}
            />
          ))}
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  boxImage: {
    flexDirection: 'row',
    marginTop: 8,
    overflow: 'hidden',
    width: Device.screenWidth - 32,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 160,
  },
  boxDevices: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  noShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  device: {
    marginTop: 24,
  },
});

export default ShortDetailSubUnit;
