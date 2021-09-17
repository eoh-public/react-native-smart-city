import React from 'react';
import { View } from 'react-native';

import ScrollPicker from 'react-native-wheel-scrollview-picker';
import Text from '../Text';

import { Colors } from '../../configs';
import styles from './styles';

const PickerItem = ({ data, isSelected, align }) => {
  return (
    <View style={styles.wrapText}>
      <Text
        type={isSelected ? 'H2' : 'H3'}
        color={isSelected ? Colors.Gray9 : Colors.Gray6}
        bold={isSelected}
        style={{ textAlign: align }}
      >
        {data.text}
      </Text>
    </View>
  );
};

const Picker = ({
  dataSource,
  selectedIndex,
  onValueChange,
  keyPrefix,
  style,
  align = 'center',
}) => {
  return (
    <View style={style}>
      <ScrollPicker
        dataSource={dataSource}
        selectedIndex={selectedIndex}
        renderItem={(data, index, isSelected) => (
          <PickerItem
            key={`${keyPrefix}-${index}`}
            data={data}
            isSelected={isSelected}
            align={align}
          />
        )}
        onValueChange={onValueChange}
        wrapperHeight={180}
        wrapperColor={Colors.Transparent}
        itemHeight={60}
        highlightColor={Colors.Transparent}
        highlightBorderWidth={0}
      />
    </View>
  );
};

export default Picker;
