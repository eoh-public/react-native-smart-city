import React, { memo } from 'react';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../configs';
import Text from '../Text';
import DateTimeButton from './DateTimeButton';

const DateTimeRangeChange = memo(
  ({ startTime, onStart, onEnd, endTime, style, date, formatType }) => {
    const t = useTranslations();
    return (
      <View style={[styles.dateTimeView, style]}>
        <Text size={12} color={Colors.Gray7}>
          {t('from')}
        </Text>
        <DateTimeButton
          onPress={onStart}
          time={startTime}
          date={date}
          formatType={formatType}
        />
        <Text size={12} color={Colors.Gray7}>
          {t('to')}
        </Text>
        <DateTimeButton
          onPress={onEnd}
          time={endTime}
          date={date}
          formatType={formatType}
        />
      </View>
    );
  }
);

export default DateTimeRangeChange;

const styles = StyleSheet.create({
  dateTimeView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
});
