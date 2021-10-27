import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { Colors } from '../../configs';
import styles from './ItemAutomateStyles';
import { AUTOMATES } from '../../configs/Constants';
import { useTranslations } from '../../hooks/Common/useTranslations';

const ItemAutomate = ({
  type,
  isSelected = false,
  onPress = () => {},
  disabledOnPress = false,
}) => {
  const t = useTranslations();
  const item = AUTOMATES[type];
  const isItemOneTap = AUTOMATES[type] === AUTOMATES.one_tap;
  const Icon = item?.icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabledOnPress}
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
            {isSelected && isItemOneTap
              ? t('quick_button_create_at_dashboard')
              : item?.explanation}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemAutomate;
