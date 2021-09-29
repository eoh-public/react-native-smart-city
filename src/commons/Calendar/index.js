import React, { useState, useCallback } from 'react';
import { Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import BottomSheet from '../BottomSheet';
import ViewButtonBottom from '../ViewButtonBottom';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { Images, Colors } from '../../configs';
import styles from './styles';

export default ({
  isVisible,
  onHide,
  onConfirm,
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

  const onCancel = useCallback(() => {
    onHide && onHide();
  }, [onHide]);

  const onDone = useCallback(() => {
    onConfirm && onConfirm(dateSelected);
    onHide && onHide();
  }, [onHide, onConfirm, dateSelected]);

  return (
    <BottomSheet isVisible={isVisible} onHide={onCancel}>
      <Calendar
        style={styles.calendar}
        onDayPress={onDateSelected}
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
      />
      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={onCancel}
        rightTitle={t('done')}
        onRightClick={onDone}
      />
    </BottomSheet>
  );
};
