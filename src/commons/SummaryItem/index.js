import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Colors } from '../../configs';
import Text from '../Text';
import AirQuality from '../../../assets/images/AirQuality.svg';
import PowerMeter from '../../../assets/images/PowerMeter.svg';
import Temperature from '../../../assets/images/Temperature.svg';
import UVIndex from '../../../assets/images/UVIndex.svg';
import WaterQuality from '../../../assets/images/WaterQuality.svg';
import Device from '../../../assets/images/Device.svg';

const SummaryItem = memo(({ item, goToSummary }) => {
  const Icon = (() => {
    switch (item.template) {
      case 'air_quality':
        return AirQuality; /* istanbul ignore next */
      case 'water_quality':
        return WaterQuality; /* istanbul ignore next */
      case 'temperature':
        return Temperature; /* istanbul ignore next */
      case 'uv_index':
        return UVIndex; /* istanbul ignore next */
      case 'three_phase_power_consumption':
        return PowerMeter; /* istanbul ignore next */
      case 'power_consumption':
        return PowerMeter; /* istanbul ignore next */
      default:
        return Device; /* istanbul ignore next */
    }
  })();

  return (
    <TouchableOpacity
      onPress={() => goToSummary(item)}
      style={styles.wrapSummaryItem}
    >
      <View style={styles.summaryItem}>
        <Icon />
        <Text type="Body" color={Colors.Gray7} style={styles.summaryText}>
          {item.left_text}
        </Text>
        <Text color={Colors.Gray9} bold>
          {item.left_value}
        </Text>
      </View>
      <View style={styles.dashItem} />
    </TouchableOpacity>
  );
});

export default SummaryItem;
