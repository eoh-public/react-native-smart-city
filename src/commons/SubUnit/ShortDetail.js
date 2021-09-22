import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Images, Device } from '../../configs';
import { SubUnitName, TESTID } from '../../configs/Constants';
import { Section } from '../Section';
import Text from '../Text';
import ItemDevice from '../Device/ItemDevice';
import ItemAddNew from '../Device/ItemAddNew';
import MediaPlayer from '../MediaPlayer';
import { standardizeCameraScreenSize } from '../../utils/Utils';
import Routes from '../../utils/Route';
import FastImage from 'react-native-fast-image';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const ShortDetailSubUnit = ({ unit, station, isGGHomeConnected }) => {
  const t = useTranslations();
  const { navigate } = useNavigation();
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
            previewUri={station.camera.preview_uri}
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
          <FastImage
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

  const handleOnAddNew = () => {
    if (!station.isFavorites) {
      navigate(Routes.AddDeviceStack, {
        screen: Routes.ScanSensorQR,
        params: {
          station_id: station.id,
          unit_id: unit.id,
          unit_name: unit.name,
        },
      });
    } else {
      alert(t('feature_under_development'));
    }
  };

  const itemAddNewTitle = t(
    station?.isFavorites
      ? 'add_to_favorites'
      : station?.name === SubUnitName.scenario
      ? 'add_script'
      : 'add_new_device'
  );

  return (
    <Section style={styles.noShadow}>
      {renderCamera()}

      {!!station?.sensors?.length && (
        <Text type={'H4'} semibold style={styles.device}>{`${t('device')} (${
          station?.sensors?.length
        })`}</Text>
      )}

      <View style={styles.boxDevices}>
        <ItemAddNew title={itemAddNewTitle} onAddNew={handleOnAddNew} />
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
