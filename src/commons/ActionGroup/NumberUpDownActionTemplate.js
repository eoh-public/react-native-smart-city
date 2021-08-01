import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../../configs';

import Text from '../Text';
import { useConfigGlobalState } from '../../iot/states';
import styles from './NumberUpDownActionTemplateStyle';
import { watchMultiConfigs } from '../../iot/Monitor';

const NumberUpDownActionTemplate = ({ actionGroup, doAction, sensor }) => {
  const { configuration } = actionGroup;
  const {
    action_data,
    max_value,
    min_value,
    text_format,
    keep_track_config,
    config,
  } = configuration;

  // eslint-disable-next-line no-unused-vars
  const [configValues, setConfigValues] = useConfigGlobalState('configValues');
  const [value, setValue] = useState((config && configValues[config]) || 28);

  useEffect(() => {
    if (!keep_track_config) {
      return;
    }
    if (!config) {
      return;
    }

    const configValue = configValues[config];
    if (configValue !== null && configValue !== undefined) {
      setValue(configValue);
    }
  }, [configValues, config, keep_track_config]);

  const doActionAndWatchConfig = useCallback(
    (actionData, actionValue) => {
      doAction(actionData, actionValue);
      if (!sensor.is_managed_by_backend) {
        return;
      }
      if (!keep_track_config) {
        return;
      }
      if (!config) {
        return;
      }

      config && watchMultiConfigs([config]);
    },
    [config, doAction, keep_track_config, sensor.is_managed_by_backend]
  );

  const doActionUp = useCallback(async () => {
    const newValue = checkMinMax(value + 1);
    doActionAndWatchConfig(action_data, newValue);
    setValue(newValue);
  }, [checkMinMax, value, doActionAndWatchConfig, action_data]);

  const doActionDown = useCallback(async () => {
    const newValue = checkMinMax(value - 1);
    doActionAndWatchConfig(action_data, newValue);
    setValue(newValue);
  }, [checkMinMax, value, doActionAndWatchConfig, action_data]);

  const checkMinMax = useCallback(
    (tempValue) => {
      if (tempValue > max_value) {
        tempValue = max_value;
      }
      if (tempValue < min_value) {
        tempValue = min_value;
      }
      return tempValue;
    },
    [max_value, min_value]
  );

  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.downButton} onPress={doActionDown}>
        <IconOutline name="down" size={32} color={Colors.Primary} />
      </TouchableOpacity>

      <Text type="H2">{text_format.replace('{number}', value)}</Text>

      <TouchableOpacity style={styles.upButton} onPress={doActionUp}>
        <IconOutline name="up" size={32} color={Colors.Primary} />
      </TouchableOpacity>
    </View>
  );
};

export default NumberUpDownActionTemplate;
