import React, { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import moment from 'moment';

import BottomSheet from '../../../commons/BottomSheet';
import ViewButtonBottom from '../../../commons/ViewButtonBottom';
import AccessScheduleItem from './AccessScheduleItem';
import RecurringDetail from './RecurringDetail';
import TemporaryDetail from './TemporaryDetail';
import WheelDateTimePicker from '../../../commons/WheelDateTimePicker';
import { useBoolean } from '../../../hooks/Common';

import { ACCESS_SCHEDULE } from '../constant';
import { TESTID } from '../../../configs/Constants';

const AccessScheduleSheet = ({
  isVisible,
  onShow,
  onHide,
  data,
  onSetData,
}) => {
  const t = useTranslations();
  const [lockShowing, releaseLockShowing, acquireLockShowing] =
    useBoolean(true);
  const [stateDateTimePicker, setStateDateTimePicker] = useState({
    isVisible: false,
    mode: 'time',
    defaultValue: moment().valueOf(),
    setter: null,
  });

  const [accessSchedule, setAccessSchedule] = useState(data.access_schedule);
  const [recurringTimeStart, setRecurringTimeStart] = useState(
    data.recurring_time_start
  );
  const [recurringTimeEnd, setRecurringTimeEnd] = useState(
    data.recurring_time_end
  );
  const [recurringTimeRepeat, setRecurringTimeRepeat] = useState(
    data.recurring_time_repeat
  );
  const [temporaryTimeStart, setTemporaryTimeStart] = useState(
    data.temporary_time_start
  );
  const [temporaryTimeEnd, setTemporaryTimeEnd] = useState(
    data.temporary_time_end
  );

  const onShowSetDateTime = useCallback(
    (currentValue, setter, mode) => {
      onHide();
      acquireLockShowing();
      setStateDateTimePicker((state) => ({
        ...state,
        isVisible: true,
        mode: mode,
        defaultValue: currentValue,
        setter: setter,
      }));
    },
    [setStateDateTimePicker, acquireLockShowing, onHide]
  );

  const onHideSetDateTime = useCallback(() => {
    onShow();
    acquireLockShowing();
    setStateDateTimePicker((state) => ({
      ...state,
      isVisible: false,
    }));
  }, [setStateDateTimePicker, acquireLockShowing, onShow]);

  const onDateTimePicked = useCallback(
    (timeData) => {
      const setter = stateDateTimePicker.setter;
      setter && setter(moment(timeData));
    },
    [stateDateTimePicker]
  );

  const listAccessSchedule = useMemo(
    () => [
      {
        text: t(`${ACCESS_SCHEDULE.ALWAYS}`),
        value: ACCESS_SCHEDULE.ALWAYS,
        detail: () => <></>,
      },
      {
        text: t(`${ACCESS_SCHEDULE.RECURRING}`),
        value: ACCESS_SCHEDULE.RECURRING,
        detail: () => (
          <RecurringDetail
            onShowSetDateTime={onShowSetDateTime}
            recurringTimeStart={recurringTimeStart}
            recurringTimeEnd={recurringTimeEnd}
            recurringTimeRepeat={recurringTimeRepeat}
            setRecurringTimeStart={setRecurringTimeStart}
            setRecurringTimeEnd={setRecurringTimeEnd}
            setRecurringTimeRepeat={setRecurringTimeRepeat}
          />
        ),
      },
      {
        text: t(`${ACCESS_SCHEDULE.TEMPORARY}`),
        value: ACCESS_SCHEDULE.TEMPORARY,
        detail: () => (
          <TemporaryDetail
            onShowSetDateTime={onShowSetDateTime}
            temporaryTimeStart={temporaryTimeStart}
            temporaryTimeEnd={temporaryTimeEnd}
            setTemporaryTimeStart={setTemporaryTimeStart}
            setTemporaryTimeEnd={setTemporaryTimeEnd}
          />
        ),
      },
    ],
    [
      t,
      onShowSetDateTime,
      recurringTimeStart,
      recurringTimeEnd,
      recurringTimeRepeat,
      temporaryTimeStart,
      temporaryTimeEnd,
    ]
  );

  const resetData = useCallback(() => {
    setAccessSchedule(data.access_schedule);
    setRecurringTimeStart(data.recurring_time_start);
    setRecurringTimeEnd(data.recurring_time_end);
    setRecurringTimeRepeat(data.recurring_time_repeat);
    setTemporaryTimeStart(data.temporary_time_start);
    setTemporaryTimeEnd(data.temporary_time_end);
  }, [data]);

  const onCancel = useCallback(() => {
    onHide();
    resetData();
  }, [onHide, resetData]);

  const onDone = useCallback(() => {
    onSetData({
      access_schedule: accessSchedule,
      recurring_time_start: recurringTimeStart,
      recurring_time_end: recurringTimeEnd,
      recurring_time_repeat: recurringTimeRepeat,
      temporary_time_start: temporaryTimeStart,
      temporary_time_end: temporaryTimeEnd,
    });
    onHide();
  }, [
    accessSchedule,
    recurringTimeStart,
    recurringTimeEnd,
    recurringTimeRepeat,
    temporaryTimeStart,
    temporaryTimeEnd,
    onHide,
    onSetData,
  ]);

  return (
    <>
      <BottomSheet
        isVisible={isVisible && lockShowing}
        onBackdropPress={onCancel}
        onHide={releaseLockShowing}
        title={t('access_schedule')}
        testID={TESTID.ACCESS_SCHEDULE_SHEET}
      >
        <View>
          {listAccessSchedule.map((item, index) => (
            <AccessScheduleItem
              key={index}
              item={item}
              isSelected={item.value === accessSchedule}
              onSelect={setAccessSchedule}
            />
          ))}
        </View>
        <ViewButtonBottom
          leftTitle={t('cancel')}
          onLeftClick={onCancel}
          rightTitle={t('done')}
          onRightClick={onDone}
          testIDPrefix={TESTID.ACCESS_SCHEDULE_SHEET}
        />
      </BottomSheet>
      <WheelDateTimePicker
        mode={stateDateTimePicker.mode}
        isVisible={stateDateTimePicker.isVisible && lockShowing}
        defaultValue={stateDateTimePicker.defaultValue}
        onPicked={onDateTimePicked}
        onCancel={onHideSetDateTime}
        onHide={releaseLockShowing}
      />
    </>
  );
};

export default AccessScheduleSheet;
