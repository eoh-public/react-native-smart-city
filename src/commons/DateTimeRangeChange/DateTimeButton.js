import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import moment from 'moment';

import Text from '../Text';
import { Colors } from '../../configs';

const DateTimeButton = memo(({ onPress, time, date, formatType, style }) => {
  let format = 'DD.MM.YY hh:mm';
  if (formatType === 'date') {
    format = 'DD.MM.YY';
  }
  return (
    <TouchableOpacity style={[styles.dateSelect, style]} onPress={onPress}>
      <Text type={'Label'} color={Colors.Gray8} style={styles.txtTime}>
        {moment(time).format(format)}
      </Text>
      <IconOutline name={'calendar'} size={16} color={Colors.Gray8} />
    </TouchableOpacity>
  );
});

export default DateTimeButton;

const styles = StyleSheet.create({
  dateSelect: {
    paddingLeft: 12,
    paddingVertical: 8,
    paddingRight: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.Gray5,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 124,
    alignItems: 'center',
  },
  txtTime: {
    marginRight: 4,
  },
});
