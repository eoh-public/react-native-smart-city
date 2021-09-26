import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';

import { Card } from '../CardShadow';
import Text from '../Text';
import { Colors } from '../../configs';
import styles from './SelectActionStyles';

const SelectActionCard = memo(({ title, action, onPress }) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapcontent}>
          <View>
            <Text type="Body" color={Colors.Gray7}>
              {title}
            </Text>
            <Text bold type="H4" style={styles.mt4}>
              {action}
            </Text>
          </View>
          <IconOutline name="right" size={20} />
        </View>
      </TouchableOpacity>
    </Card>
  );
});

export default SelectActionCard;
