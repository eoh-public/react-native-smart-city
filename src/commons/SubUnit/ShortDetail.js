import React from 'react';
import { Icon } from '@ant-design/react-native';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors, Images, Device } from '../../configs';
import { TESTID } from '../../configs/Constants';
import { Section } from '../../commons/index';
import Text from '../../commons/Text';
import ItemDevice from '../../commons/Device/ItemDevice';
import MediaPlayer from '../../commons/MediaPlayer';
import Routes from '../../utils/Route';
import { standardizeCameraScreenSize } from '../../utils/Utils';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const ShortDetailSubUnit = ({ unit, station, isGGHomeConnected }) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate(Routes.SubUnitDetail, {
      unit,
      station,
      isGGHomeConnected,
    });
  };

  const renderCamera = () => {
    if (station.camera) {
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
    } else if (station.background) {
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
    <Section>
      <TouchableOpacity
        onPress={goToDetail}
        testID={TESTID.SUB_UNIT_GO_TO_DETAIL}
      >
        <View style={styles.boxTitle}>
          <View>
            <Text type="H4" semibold style={styles.nameSubUnit}>
              {`${station.name}  `}
              <Text regular style={styles.numberDevices}>
                {/* &nbsp; mean numberDevices and devices always come together */}
                {station.sensors ? station.sensors.length : 0}
                &nbsp;
                {t('devices')}
              </Text>
            </Text>
          </View>
          <Icon name={'right'} color={Colors.Black} size={16} />
        </View>
      </TouchableOpacity>

      {renderCamera()}

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
  nameSubUnit: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
  },
  numberDevices: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    color: Colors.Gray8,
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
});

export default ShortDetailSubUnit;
