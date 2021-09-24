import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { Colors } from '../../configs';
import styles from './ItemAutomateStyles';
import { AUTOMATES } from '../../configs/Constants';

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
