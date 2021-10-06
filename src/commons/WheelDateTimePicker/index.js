import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';
import moment from 'moment';

import Picker from './Picker';
import Text from '../Text';
import BottomSheet from '../BottomSheet';
import ViewButtonBottom from '../ViewButtonBottom';

import { getDateData } from '../../utils/Converter/time';
import styles from './styles';
import { TESTID } from '../../configs/Constants';

const formatNumber = (number) => {
  return {
    text: `${number}`.padStart(2, '0'),
    value: number,
  };
};

const hourData = Array.from({ length: 24 }, (_, i) => formatNumber(i));
const minuteData = Array.from({ length: 60 }, (_, i) => formatNumber(i));

const WheelDateTimePicker = ({
  mode,
  isVisible,
  defaultValue,
  onPicked,
  onCancel,
  onHide,
}) => {
  const t = useTranslations();
  const [dateSelected, setDateSelected] = useState();
  const [hourSelected, setHourSelected] = useState();
  const [minuteSelected, setMinuteSelected] = useState();

  const { dateData, indexInitialDate, indexInitialHour, indexInitialMinute } =
    useMemo(() => {
      const date = moment(defaultValue);
      const maximumDate = moment(date).add(15, 'days');
      const minimumDate = moment(date).add(-15, 'days');
      const [dateData, indexDate] =
        mode === 'datetime'
          ? getDateData(date, maximumDate, minimumDate)
          : [[{ value: date }], 0];
      return {
        dateData: dateData,
        indexInitialDate: indexDate,
        indexInitialHour: date.hour(),
        indexInitialMinute: date.minute(),
      };
    }, [mode, defaultValue]);

  useEffect(() => {
    setDateSelected(dateData[indexInitialDate].value);
    setHourSelected(hourData[indexInitialHour].value);
    setMinuteSelected(minuteData[indexInitialMinute].value);
  }, [dateData, indexInitialDate, indexInitialHour, indexInitialMinute]);

  const onValueDateChange = useCallback(
    (data, _) => {
      setDateSelected(data.value);
    },
    [setDateSelected]
  );

  const onValueHourChange = useCallback(
    (data, _) => {
      setHourSelected(data.value);
    },
    [setHourSelected]
  );

  const onValueMinuteChange = useCallback(
    (data, _) => {
      setMinuteSelected(data.value);
    },
    [setMinuteSelected]
  );

  const onPickerCancel = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const onDone = useCallback(() => {
    const newDateTime = moment(dateSelected);
    newDateTime.hour(hourSelected);
    newDateTime.minute(minuteSelected);
    onPicked && onPicked(newDateTime.valueOf());
    onCancel && onCancel();
  }, [dateSelected, hourSelected, minuteSelected, onCancel, onPicked]);

  const title = useMemo(() => {
    if (mode === 'time') {
      return t('set_time');
    }
    return t('set_date_time');
  }, [t, mode]);

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={onPickerCancel}
      onHide={onHide}
      title={title}
    >
      {mode === 'time' ? (
        <View style={styles.container}>
          <Picker
            dataSource={hourData}
            selectedIndex={indexInitialHour}
            onValueChange={onValueHourChange}
            keyPrefix="hour"
            style={styles.picker}
          />
          <Text type="H2" bold style={styles.twoDot}>
            :
          </Text>
          <Picker
            dataSource={minuteData}
            selectedIndex={indexInitialMinute}
            onValueChange={onValueMinuteChange}
            keyPrefix="minute"
            style={styles.picker}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Picker
            dataSource={dateData}
            selectedIndex={indexInitialDate}
            onValueChange={onValueDateChange}
            keyPrefix="date"
            style={styles.picker}
            align="right"
          />
          <Picker
            dataSource={hourData}
            selectedIndex={indexInitialHour}
            onValueChange={onValueHourChange}
            keyPrefix="hour"
            style={styles.picker}
          />
          <Text type="H2" bold style={styles.twoDot}>
            :
          </Text>
          <Picker
            dataSource={minuteData}
            selectedIndex={indexInitialMinute}
            onValueChange={onValueMinuteChange}
            keyPrefix="minute"
            style={styles.picker}
          />
        </View>
      )}
      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={onPickerCancel}
        rightTitle={t('done')}
        onRightClick={onDone}
        testIDPrefix={TESTID.WHEEL_DATE_TIME_PICKER}
      />
    </BottomSheet>
  );
};

export default memo(WheelDateTimePicker);
