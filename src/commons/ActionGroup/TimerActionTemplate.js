import React, { useCallback, useMemo, useState } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { IconOutline } from '@ant-design/icons-react-native';

import styles from './TimerActionTemplateStyles';
import Text from '../Text';
import { Colors } from '../../configs';
import { useConfigGlobalState } from '../../iot/states';

const TimerActionTemplate = ({ actionGroup, doAction }) => {
  const { configuration, title } = actionGroup;
  const [showTimer, setShowTimer] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [configValues, setConfigValues] = useConfigGlobalState('configValues');

  const currentTime = useMemo(() => {
    const configHour = configValues[configuration.config_hour];
    const configMinute = configValues[configuration.config_minute];
    if (!configHour || !configMinute) {
      return undefined;
    }
    return moment(`${configHour}:${configMinute}`, 'HH:mm');
  }, [configValues, configuration.config_hour, configuration.config_minute]);

  const onShowTimer = useCallback(() => {
    setShowTimer(true);
  }, []);

  const onHideTimer = useCallback(() => {
    setShowTimer(false);
  }, []);

  const onConfirm = useCallback(
    (timeData) => {
      setShowTimer(false);
      const timeObj = moment(timeData);
      doAction(configuration.action_data, [timeObj.hour(), timeObj.minute()]);
    },
    [configuration.action_data, doAction]
  );

  const isTimerOn = useMemo(() => {
    return !!currentTime;
  }, [currentTime]);

  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.timerButton} onPress={onShowTimer}>
        <View style={styles.timerTitle}>
          <Text>{title}</Text>
          {currentTime && (
            <Text
              type="Label"
              color={Colors.Gray7}
            >{`Setting at ${currentTime.format('HH:mm')}`}</Text>
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
        disabled
      />
      <DateTimePickerModal
        isVisible={showTimer}
        date={currentTime ? currentTime.valueOf() : moment().valueOf()}
        mode="time"
        onConfirm={onConfirm}
        onCancel={onHideTimer}
        display="spinner"
      />
    </View>
  );
};

export default TimerActionTemplate;
