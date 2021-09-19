import React from 'react';
import { View, Image } from 'react-native';
import Text from '../Text';
import { Colors } from '../../configs';
import styles from './ItemScriptActionStyles';

const ItemScriptAction = ({ order, item }) => {
  return (
    <View style={styles.wrap}>
      <View style={[styles.wrapOrder, styles.border]}>
        <Text type="H4" color={Colors.Gray9} bold>
          {`${order}`.padStart(2, '0')}
        </Text>
      </View>
      <View style={[styles.wrapItem, styles.border]}>
        <View style={styles.wrapIcon}>
          <Image source={item.device_icon} />
        </View>
        <View>
          <View style={styles.row}>
            <Text
              type="Label"
              color={Colors.Gray7}
              bold
              style={styles.unitName}
            >
              {item.unit_name}
            </Text>
            <Text type="Label">{item.station_name}</Text>
          </View>
          <Text type="H4" bold style={styles.deviceName}>
            {item.device_name}
          </Text>
          <Text type="H4">{item.action_name}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemScriptAction;
