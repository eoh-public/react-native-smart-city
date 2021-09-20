import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { Colors } from '../../configs';
import styles from './ItemAutomateStyles';
import OneTap from '../../../assets/images/OneTap.svg';
import WeatherChange from '../../../assets/images/WeatherChange.svg';
import Schedule from '../../../assets/images/Schedule.svg';
import Event from '../../../assets/images/Event.svg';

const AUTOMATES = {
  'one-tap': {
    value: 'one_tap',
    title: 'Launch One-Tap',
    explanation: 'Do everything with just one button',
    icon: OneTap,
  },
  'value-change': {
    value: 'value_change',
    title: 'When weather change',
    explanation: 'Short Explanation',
    icon: WeatherChange,
  },
  schedule: {
    value: 'schedule',
    title: 'Schedule',
    explanation: 'Short Explanation',
    icon: Schedule,
  },
  event: {
    value: 'event',
    title: 'Event',
    explanation: 'Short Explanation',
    icon: Event,
  },
};

const ItemAutomate = ({ type, isSelected = false, onPress = () => {} }) => {
  const item = AUTOMATES[type];
  const Icon = item?.icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrap, isSelected && styles.active]}
    >
      <View style={styles.row}>
        <View style={styles.wrapIcon}>
          <Icon />
        </View>
        <View>
          <Text type="H4" bold>
            {item?.title}
          </Text>
          <Text type="Label" color={Colors.Gray8} numberOfLines={1}>
            {item?.explanation}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemAutomate;
