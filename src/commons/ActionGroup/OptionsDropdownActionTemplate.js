import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../../configs';

import Text from '../Text';
import { AlertAction, RadioCircle } from '../index';
import { useDropdownAction } from './hooks/useDropdownAction';
import { useConfigGlobalState } from '../../iot/states';
import styles from './OptionsDropdownActionTemplateStyle';
import { watchMultiConfigs } from '../../iot/Monitor';
import IconComponent from '../IconComponent';

function getOptionValue(option) {
  if (option.value_text) {
    return option.value_text;
  }
  return option.value_int;
}

const OptionsDropdownActionTemplate = ({ actionGroup, doAction, sensor }) => {
  const { configuration, title } = actionGroup;
  const { action_data, options, icon, icon_kit_data } = configuration;

  // eslint-disable-next-line no-unused-vars
  const [configValues, setConfigValues] = useConfigGlobalState('configValues');

  const selectedOption = useMemo(() => {
    const currentValue = configValues[configuration.config];
    if (currentValue === null || currentValue === undefined) {
      return configuration.options[0];
    }
    for (let i = 0; i < configuration.options.length; i++) {
      const option = configuration.options[i];
      const value = getOptionValue(option);
      if (value === currentValue) {
        return option;
      }
    }

    return configuration.options[0];
  }, [configValues, configuration]);

  const { stateAlert, hideAlertAction, onShowAlert } = useDropdownAction();
  const [selectedIndex, setSelectedIndex] = useState(
    configuration.options.indexOf(selectedOption)
  );

  useEffect(() => {
    setSelectedIndex(configuration.options.indexOf(selectedOption));
  }, [configuration.options, selectedOption]);

  const onDone = useCallback(() => {
    const newOption = options[selectedIndex];
    const value = getOptionValue(newOption);
    doAction(action_data, value);
    if (sensor.is_managed_by_backend) {
      configuration.config && watchMultiConfigs([configuration.config]);
    }
    hideAlertAction();
  }, [
    action_data,
    configuration.config,
    doAction,
    hideAlertAction,
    options,
    selectedIndex,
    sensor.is_managed_by_backend,
  ]);

  const iconKit = !!icon_kit_data && icon_kit_data.icon;

  return (
    <View style={styles.wrap}>
      <View style={styles.iconAndText}>
        <IconComponent
          icon={icon}
          iconKit={iconKit}
          isSendingCommand={false}
          size={17}
          style={styles.marginRight}
        />
        <Text type="H4">{title}</Text>
      </View>
      <TouchableOpacity style={styles.iconAndTextOption} onPress={onShowAlert}>
        <Text type="Body" color={Colors.Gray8} style={styles.marginRight}>
          {selectedOption.text}
        </Text>
        <IconOutline name="right" size={20} />
      </TouchableOpacity>
      <AlertAction
        visible={stateAlert.visible}
        hideModal={hideAlertAction}
        title={stateAlert.title}
        message={stateAlert.message}
        leftButtonTitle={stateAlert.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlert.rightButton}
        rightButtonClick={onDone}
      >
        <View style={styles.wrapRename}>
          {options.map((item, index) => (
            <View key={index} style={styles.rowContainer}>
              <RadioCircle active={selectedIndex === index} />
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  setSelectedIndex(index);
                }}
              >
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </AlertAction>
    </View>
  );
};

export default OptionsDropdownActionTemplate;
