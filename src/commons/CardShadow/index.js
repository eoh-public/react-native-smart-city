import React, { memo } from 'react';
import { View } from 'react-native';
import Text from '../../commons/Text';
import styles from './styles';

const Card = memo(({ title, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
      <View>{children}</View>
    </View>
  );
});

export { Card };
