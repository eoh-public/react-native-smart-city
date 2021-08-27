import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import styles from './RowLocationStyles';

const RowLocation = memo(({ item, onPress }) => {
  const onPressItem = useCallback(() => {
    onPress && onPress(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity onPress={onPressItem} style={styles.container}>
      <View style={styles.rowContainer}>
        <Text
          type="H4"
          color={Colors.Gray9}
          style={styles.textTitle}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default RowLocation;
