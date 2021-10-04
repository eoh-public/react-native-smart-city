import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import Text from '../../../commons/Text';
import styles from '../styles/RowItemStyles';
import { Colors } from '../../../configs';

const RowItem = ({ title, value, icon = null, arrow = false, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Text type="Body" color={Colors.Gray7}>
          {title}
        </Text>
        <Text type="H4" color={Colors.Gray9} bold>
          {value}
        </Text>
      </View>
      <View style={[styles.itemRight, arrow && styles.center]}>
        {arrow && <IconOutline name="right" color={Colors.Gray7} />}
        {icon && <IconOutline name={icon} size={17} color={Colors.Black} />}
      </View>
    </TouchableOpacity>
  );
};

export default RowItem;
