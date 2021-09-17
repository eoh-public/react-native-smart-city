import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import Text from '../../../commons/Text';
import styles from '../styles/indexStyles';

const RowGuestInfo = ({
  textLeft,
  textRight,
  rightArrow = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Text type="H4" bold>
          {textLeft}
        </Text>
        <View style={styles.rowRight}>
          <Text type="Body">{textRight}</Text>
          {rightArrow && (
            <IconOutline name="right" size={20} style={styles.icon} />
          )}
        </View>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};

export default RowGuestInfo;
