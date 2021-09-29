import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../../commons/Text';
import { Colors } from '../../../configs';
import styles from '../styles/SelectWeekdayStyles';
import { useTranslations } from '../../../hooks/Common/useTranslations';

const WEEKDAY_ITEMS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SelectWeekday = ({ weekday, setWeekday }) => {
  const t = useTranslations();

  const onSetWeekday = useCallback(
    (value) => {
      const index = weekday.indexOf(value);
      if (index !== -1) {
        setWeekday([...weekday.slice(0, index), ...weekday.slice(index + 1)]);
      } else {
        setWeekday([...weekday, value]);
      }
    },
    [weekday, setWeekday]
  );

  const WeekdayItem = useCallback(
    ({ item, index, isSelected }) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => onSetWeekday(`${index}`)}
          style={[styles.item, isSelected && styles.selected]}
        >
          <Text
            type="Body"
            color={isSelected ? Colors.White : Colors.Black}
            style={styles.text}
            semibold
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [onSetWeekday]
  );

  return (
    <View style={styles.wrap}>
      <Text type="Body" Colors={Colors.Gray7}>
        {t('select_date')}
      </Text>
      <View style={styles.row}>
        {WEEKDAY_ITEMS.map((item, index) => (
          <WeekdayItem
            item={item}
            index={index}
            isSelected={weekday.includes(`${index}`)}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectWeekday;
