import React, { useState, useCallback } from 'react';
import { Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import BottomSheet from '../BottomSheet';
import ViewButtonBottom from '../ViewButtonBottom';
import Text from '../Text';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { Images, Colors } from '../../configs';
import styles from './styles';

export default ({
  isVisible,
  onCancel,
  onConfirm,
  onHide,
  defaultDate = moment(),
  minDate,
  maxDate,
}) => {
  const t = useTranslations();
  const [dateSelected, setDateSelected] = useState(defaultDate);

  const onDateSelected = useCallback(
    (day) => {
      setDateSelected(moment(day.timestamp));
    },
    [setDateSelected]
  );

  const onCalendarCancel = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const onDone = useCallback(() => {
    onConfirm && onConfirm(dateSelected);
    onCancel && onCancel();
  }, [onCancel, onConfirm, dateSelected]);

  return (
    <BottomSheet
      isVisible={isVisible}
      onHide={onHide}
      onBackdropPress={onCalendarCancel}
    >
      <Calendar
        style={styles.calendar}
        onDayPress={onDateSelected}
        current={defaultDate?.format('YYYY-MM-DD')}
        minDate={minDate?.format('YYYY-MM-DD')}
        maxDate={maxDate?.format('YYYY-MM-DD')}
        onMonthChange={(month) => {}}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        markedDates={{
          [dateSelected.format('YYYY-MM-DD')]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.Primary,
            selectedTextColor: Colors.White,
          },
        }}
        enableSwipeMonths={true}
        renderArrow={(direction) => (
          <Image
            source={Images.arrowLeft}
            style={direction !== 'left' && styles.arrowRight}
          />
        )}
        renderHeader={(date) => (
          <Text type="H4">{moment(new Date(date)).format('MMM yyyy')}</Text>
        )}
      />
      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={onCalendarCancel}
        rightTitle={t('done')}
        onRightClick={onDone}
      />
    </BottomSheet>
  );
};
