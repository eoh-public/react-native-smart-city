import React, { memo, useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import Text from '../../commons/Text';
import { HeaderCustom } from '../../commons/Header';
import WheelDateTimePicker from '../../commons/WheelDateTimePicker';
import BottomButtonView from '../../commons/BottomButtonView';
import Calendar from '../../commons/Calendar';
import RepeatOptionsPopup from './components/RepeatOptionsPopup';
import RowItem from './components/RowItem';
import SelectWeekday from './components/SelectWeekday';
import { useBoolean } from '../../hooks/Common';
import t, { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './styles/indexStyles';
import { REPEAT_OPTIONS } from './components/RepeatOptionsPopup';
import Routes from '../../utils/Route';
import { popAction } from '../../navigations/utils';

const getDateString = (date) => {
  const today = moment();
  if (date.isSame(today, 'day')) {
    return date.format(`[${t('today')}], D MMMM YYYY `);
  }
  return date.format('ddd, D MMMM YYYY');
};

const SetSchedule = ({ route }) => {
  const t = useTranslations();
  const {
    type,
    unit,
    isAutomateTab,
    isScript,
    isMultiUnits,
    automateId,
    scriptName,
  } = route.params;
  const { navigate, dispatch, goBack } = useNavigation();
  const [repeat, setRepeat] = useState(REPEAT_OPTIONS.ONCE);
  const [time, setTime] = useState(moment().hour(0).minute(0));
  const [date, setDate] = useState(moment());
  const [weekday, setWeekday] = useState([]);

  const [showRepeatOptions, setShowRepeatOptions, setHideRepeatOptions] =
    useBoolean();
  const [showTimePicker, setShowTimePicker, setHideTimePicker] = useBoolean();
  const [showCalendar, setShowCalendar, setHideCalendar] = useBoolean();

  const handleOnSave = useCallback(() => {
    navigate(Routes.AddNewOneTap, {
      type: type,
      unit: unit,
      automateData: {
        repeat: repeat,
        time_repeat: time.format('HH:mm'),
        date_repeat: date.format('YYYY-MM-DD'),
        weekday_repeat: weekday,
      },
      isAutomateTab,
      isScript,
      isMultiUnits,
      automateId,
      scriptName,
    });
  }, [
    navigate,
    type,
    unit,
    repeat,
    time,
    date,
    weekday,
    isAutomateTab,
    isScript,
    isMultiUnits,
    automateId,
    scriptName,
  ]);

  const onSetRepeatOption = useCallback(
    (value) => {
      setRepeat(value);
      setHideRepeatOptions();
    },
    [setRepeat, setHideRepeatOptions]
  );

  const onTimePicked = useCallback(
    (timeData) => {
      setTime(moment(timeData));
    },
    [setTime]
  );

  const onDatePicked = useCallback(
    (datePicked) => {
      setDate(datePicked);
    },
    [setDate]
  );

  const onClose = useCallback(() => {
    if (automateId) {
      navigate(Routes.ScriptDetail, {
        id: automateId,
        name: scriptName,
        type: type,
        havePermission: true,
        unit,
        isMultiUnits,
        isAutomateTab,
      });
    } else {
      dispatch(popAction(4));
      isAutomateTab && goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutomateTab]);

  return (
    <>
      <View style={styles.container}>
        <HeaderCustom isShowClose onClose={onClose} />
        <ScrollView contentContainerStyle={styles.scollView}>
          <Text type="H2" bold style={styles.title}>
            {t('set_schedule')}
          </Text>
          <RowItem
            title={t('set_time')}
            value={time.format('HH:mm')}
            icon="clock-circle"
            onPress={setShowTimePicker}
          />
          <RowItem
            title={t('repeat')}
            value={t(`${repeat}`)}
            arrow
            onPress={setShowRepeatOptions}
          />
          {repeat === REPEAT_OPTIONS.ONCE && (
            <RowItem
              title={t('select_date')}
              value={getDateString(date)}
              icon="calendar"
              onPress={setShowCalendar}
            />
          )}
          {repeat === REPEAT_OPTIONS.EVERYWEEK && (
            <SelectWeekday weekday={weekday} setWeekday={setWeekday} />
          )}
        </ScrollView>
        <BottomButtonView
          style={styles.viewBottom}
          mainTitle={t('save')}
          onPressMain={handleOnSave}
        />
      </View>
      <RepeatOptionsPopup
        isVisible={showRepeatOptions}
        onHide={setHideRepeatOptions}
        onSetRepeat={onSetRepeatOption}
      />
      <WheelDateTimePicker
        mode="time"
        isVisible={showTimePicker}
        defaultValue={time.valueOf()}
        onHide={setHideTimePicker}
        onPicked={onTimePicked}
      />
      <Calendar
        isVisible={showCalendar}
        defaultDate={date}
        minDate={moment()}
        onHide={setHideCalendar}
        onConfirm={onDatePicked}
      />
    </>
  );
};

export default memo(SetSchedule);
