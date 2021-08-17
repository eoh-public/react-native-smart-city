import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from '../Text';
import RadioCircle from '../RadioCircle';
import { Colors } from '../../configs';

const CheckBox = memo(
  ({ select, title, index, onSelect, source, description }) => {
    const onPress = useCallback(() => {
      onSelect && onSelect(index);
    }, [index, onSelect]);
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <RadioCircle active={select} style={styles.svgCheck} />
        <Text size={16} color={Colors.Gray9} style={styles.txt}>
          {title}
          {!!description && (
            <Text size={14} color={Colors.Gray8}>
              {`{\n}${description}`}
            </Text>
          )}
        </Text>
        {source && <FastImage source={source} style={styles.img} />}
        <View style={styles.line} />
      </TouchableOpacity>
    );
  }
);
export default CheckBox;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    overflow: 'hidden',
  },
  svgCheck: {
    marginTop: 2,
  },
  txt: {
    flex: 1,
    marginLeft: 8,
  },
  line: {
    height: 1,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.Gray4,
    bottom: 0,
    marginLeft: 24,
  },
  img: {
    width: 24,
    height: 24,
  },
});
