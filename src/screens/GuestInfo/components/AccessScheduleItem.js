import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RadioCircle } from '../../../commons';
import Text from '../../../commons/Text';
import { TESTID } from '../../../configs/Constants';
import styles from '../styles/AccessScheduleItemStyles';

const AccessScheduleItem = ({ item, isSelected, onSelect }) => {
  const DetailComponent = item.detail;
  const handleOnSelect = useCallback(() => {
    onSelect(item.value);
  }, [item.value, onSelect]);

  return (
    <View style={styles.rowWrap}>
      <View style={styles.rowContent}>
        <TouchableOpacity
          style={styles.row}
          onPress={handleOnSelect}
          testID={TESTID.ACCESS_SCHEDULE_RADIO_BUTTON}
        >
          <RadioCircle active={isSelected} />
          <Text style={styles.textAccessSchedule}>{item.text}</Text>
        </TouchableOpacity>
        {isSelected && <DetailComponent />}
      </View>
      <View style={styles.separator} />
    </View>
  );
};

export default AccessScheduleItem;
