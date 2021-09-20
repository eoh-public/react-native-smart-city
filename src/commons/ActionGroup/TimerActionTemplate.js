import React, { useCallback, useMemo, useState } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { IconOutline } from '@ant-design/icons-react-native';

import { useTranslations } from '../../hooks/Common/useTranslations';

import styles from './TimerActionTemplateStyles';
import Text from '../Text';
import { Colors } from '../../configs';
import { useConfigGlobalState } from '../../iot/states';
import BottomScrollPicker from '../BottomScrollPicker';

const TimerActionTemplate = ({ actionGroup, doAction }) => {
  const t = useTranslations();
  const { configuration, title } = actionGroup;
  const [showTime, setShowTime] = useState(false);
  const [showHour, setShowHour] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [configValues, setConfigValues] = useConfigGlobalState('configValues');
  const configHour = configValues[configuration.config_hour];
  const configMinute = configValues[configuration.config_minute];

  const dataTime = useMemo(() => {
    if (
      !configuration.config_hour ||
      !configuration.config_minute ||
      configHour === undefined ||
      configHour === -1 ||
      configMinute === undefined ||
      configMinute === -1
    ) {
      return undefined;
    }
    return moment(`${configHour}:${configMinute}`, 'HH:mm');
  }, [
    configHour,
    configMinute,
    configuration.config_hour,
    configuration.config_minute,
  ]);

  const dataHour = useMemo(() => {
    if (
      !configuration.config_hour ||
      configuration.config_minute ||
      configHour === undefined ||
      configHour === -1
    ) {
      return undefined;
    }
    return configHour;
  }, [configHour, configuration.config_hour, configuration.config_minute]);

  const onShowHour = useCallback(() => {
    setShowHour(true);
  }, []);

  const onHideHour = useCallback(() => {
    setShowHour(false);
  }, []);

  const onShowTime = useCallback(() => {
    setShowTime(true);
  }, []);

  const onHideTime = useCallback(() => {
    setShowTime(false);
  }, []);

  const onShowTimer = useCallback(() => {
    if (configuration.config_hour && configuration.config_minute) {
      onShowTime();
      return;
    }
    onShowHour();
  }, [
    configuration.config_hour,
    configuration.config_minute,
    onShowHour,
    onShowTime,
  ]);

  const onConfirmTime = useCallback(
    (timeData) => {
      onHideTime();
      const timeObj = moment(timeData);
      doAction(configuration.action_data, [timeObj.hour(), timeObj.minute()]);
    },
    [configuration.action_data, doAction, onHideTime]
  );

  const onConfirmHour = useCallback(
    (number) => {
      onHideHour();
      doAction(configuration.action_data, number);
    },
    [configuration.action_data, doAction, onHideHour]
  );

  const isTimerOn = useMemo(() => {
    return !!dataTime || !!dataHour;
  }, [dataHour, dataTime]);

  const textTimer = useMemo(() => {
    if (dataTime) {
      return `${t('setting_at')} ${dataTime.format('HH:mm')}`;
    }
    if (dataHour) {
      return `${t('setting_at')} ${dataHour} ${t('hours')}`;
    }
    return null;
  }, [dataHour, dataTime, t]);

  const onSwitchOff = useCallback(() => {
    if (!isTimerOn) {
      return;
    }
    doAction(configuration.action_data, [-1, -1]);
  }, [configuration.action_data, doAction, isTimerOn]);

  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.timerButton} onPress={onShowTimer}>
        <View style={styles.timerTitle}>
          <Text>{title}</Text>
          {textTimer && (
            <Text type="Label" color={Colors.Gray7}>
              {textTimer}
            </Text>
          )}
        </View>
        <View style={styles.timerButton}>
          <IconOutline name="right" size={20} />
          <Text color={Colors.Gray11} type="Label">
            |
          </Text>
        </View>
      </TouchableOpacity>
      <Switch
        trackColor={{ false: Colors.Gray4, true: Colors.Primary }}
        thumbColor={isTimerOn ? Colors.White : Colors.Gray6}
        ios_backgroundColor={Colors.Gray4}
        value={isTimerOn}
        onValueChange={onSwitchOff}
        disabled={!isTimerOn}
      />
      <DateTimePickerModal
        isVisible={showTime}
        date={dataTime ? dataTime.valueOf() : moment().valueOf()}
        mode="time"
        onConfirm={onConfirmTime}
        onCancel={onHideTime}
        display="spinner"
      />
      <BottomScrollPicker
        min={configuration.min}
        max={configuration.max}
        isVisible={showHour}
        onHide={onHideHour}
        onPicked={onConfirmHour}
      />
    </View>
  );
};

export default TimerActionTemplate;
