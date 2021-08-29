import React from 'react';
import { View } from 'react-native';
import { t } from 'i18n-js';
import { HeaderCustom } from '../../commons/Header';
import { useRoute } from '@react-navigation/native';
import Text from '../../commons/Text';
import styles from './DeviceInfoStyles';
import { TESTID } from '../../configs/Constants';

const DeviceInfo = () => {
  const { params = {} } = useRoute();
  const { deviceInfo } = params;
  const configuration = deviceInfo[0] ? deviceInfo[0].configuration : {};

  const renderRow = (testID, textLeft, textRight) => {
    return (
      <>
        <View style={styles.row} testID={testID}>
          <Text style={styles.textLeft}>{t(textLeft)}</Text>
          <Text style={styles.textRight}>{textRight}</Text>
        </View>
        <View style={styles.separator} />
      </>
    );
  };

  return (
    <View style={styles.wrap}>
      <HeaderCustom title={t('device_info')} isShowSeparator />
      <View style={styles.content}>
        {configuration.battery &&
          renderRow(
            TESTID.DEVICE_INFO_BATTERY,
            'battery',
            configuration.battery
          )}

        {configuration.rssi_node &&
          renderRow(
            TESTID.DEVICE_INFO_RSSI_NODE,
            'rssi_node',
            configuration.rssi_node
          )}

        {configuration.chip_info &&
          Object.entries(configuration.chip_info).map((item) => {
            return renderRow(TESTID.DEVICE_INFO_CHIP_INFO, item[0], item[1]);
          })}
      </View>
    </View>
  );
};

export default DeviceInfo;
