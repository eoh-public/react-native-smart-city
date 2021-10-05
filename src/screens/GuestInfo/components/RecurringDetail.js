import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslations } from '../../../hooks/Common/useTranslations';

import Text from '../../../commons/Text';
import { Colors } from '../../../configs';
import { REPEAT_ITEMS } from '../constant';
import styles from '../styles/AccessScheduleDetailStyles';
import { TESTID } from '../../../configs/Constants';

const RecurringDetail = ({
  onShowSetDateTime,
  recurringTimeStart,
  recurringTimeEnd,
  recurringTimeRepeat,
  setRecurringTimeStart,
  setRecurringTimeEnd,
  setRecurringTimeRepeat,
}) => {
  const t = useTranslations();
  const onSetTimeStart = useCallback(() => {
    onShowSetDateTime(recurringTimeStart, setRecurringTimeStart, 'time');
  }, [onShowSetDateTime, recurringTimeStart, setRecurringTimeStart]);

  const onSetTimeEnd = useCallback(() => {
    onShowSetDateTime(recurringTimeEnd, setRecurringTimeEnd, 'time');
  }, [onShowSetDateTime, recurringTimeEnd, setRecurringTimeEnd]);

  const onSetRepeat = useCallback(
    (item) => {
      const index = recurringTimeRepeat.indexOf(item.value);
      if (index !== -1) {
        setRecurringTimeRepeat([
          ...recurringTimeRepeat.slice(0, index),
          ...recurringTimeRepeat.slice(index + 1),
        ]);
      } else {
        setRecurringTimeRepeat([...recurringTimeRepeat, item.value]);
      }
    },
    [recurringTimeRepeat, setRecurringTimeRepeat]
  );

  const renderRepeatItem = useCallback(
    (item, index, isSelected) => {
      return (
        <TouchableOpacity
          key={index}
          style={[styles.repeatItem, isSelected && styles.repeatItemSelected]}
          onPress={() => onSetRepeat(item)}
        >
          <Text
            type="Body"
            lineHeight={16}
            color={isSelected ? Colors.Orange : item.color}
            style={styles.repeatText}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      );
    },
    [onSetRepeat]
  );

  return (
    <View>
      <Text type="Body" color={Colors.Gray8} style={styles.title}>
        {t('start')}
      </Text>
      <TouchableOpacity
        onPress={onSetTimeStart}
        testID={TESTID.RECURRING_TEXT_BUTTON}
      >
        <Text type="Body" color={Colors.Orange} style={styles.value}>
          {recurringTimeStart.format('HH:mm A')}
        </Text>
      </TouchableOpacity>
      <Text type="Body" color={Colors.Gray8} style={styles.title}>
        {t('end')}
      </Text>
      <TouchableOpacity
        onPress={onSetTimeEnd}
        testID={TESTID.RECURRING_TEXT_BUTTON}
      >
        <Text type="Body" color={Colors.Orange} style={styles.value}>
          {recurringTimeEnd.format('HH:mm A')}
        </Text>
      </TouchableOpacity>
      <Text type="Body" color={Colors.Gray8} style={styles.title}>
        {t('repeat')}
      </Text>
      <View style={styles.repeatWrap}>
        {REPEAT_ITEMS.map((item, index) =>
          renderRepeatItem(
            item,
            index,
            recurringTimeRepeat.includes(item.value)
          )
        )}
      </View>
    </View>
  );
};

export default RecurringDetail;
