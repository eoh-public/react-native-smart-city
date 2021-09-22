import React, { useCallback, useEffect, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Colors } from '../../configs';

import Text from '../Text';
import { useConfigGlobalState } from '../../iot/states';
import { watchMultiConfigs } from '../../iot/Monitor';
import IconComponent from '../IconComponent';
import styles from './StatesGridActionTemplateStyle';
import { TESTID } from '../../configs/Constants';

const buttonStyle = {
  OFF: {
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
  },
  ON: {
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
  },
};

const GridItem = ({ item, index, length, doAction, sensor }) => {
  const isFirst = index === 0;
  const isLast = index === length - 1;
  const isNextLine = index % 4 === 0;

  let extraStyle = {};
  if (isFirst || isNextLine) {
    extraStyle.marginLeft = 24;
  }
  if (isLast) {
    extraStyle.marginRight = 24;
  }
  if (index > 3) {
    extraStyle.marginTop = 24;
  }

  const {
    active,
    text,
    icon_kit_data,
    icon,
    icon_outlined,
    action_data,
    config,
  } = item;
  const buttonOnOffStyle = active ? buttonStyle.ON : buttonStyle.OFF;

  const doActionAndWatchConfig = useCallback(
    (actionData) => {
      doAction(actionData);
      if (sensor?.is_managed_by_backend) {
        config && watchMultiConfigs([config]);
      }
    },
    [config, doAction, sensor.is_managed_by_backend]
  );

  const iconKit = !!icon_kit_data && icon_kit_data.icon;

  return (
    <View
      style={[styles.gridItem, extraStyle]}
      testID={TESTID.STATES_GRID_ACTION_GRID_ITEM}
    >
      <TouchableOpacity
        style={[styles.button, buttonOnOffStyle]}
        onPress={() => doActionAndWatchConfig(action_data)}
      >
        <IconComponent
          icon={icon}
          iconKit={iconKit}
          icon_outlined={icon_outlined}
          isSendingCommand={false}
          size={24}
        />
      </TouchableOpacity>
      <Text center color={Colors.Gray8} style={styles.textMargin}>
        {text}
      </Text>
    </View>
  );
};

const StatesGridActionTemplate = ({ actionGroup, doAction, sensor }) => {
  const { configuration, title } = actionGroup;

  // eslint-disable-next-line no-unused-vars
  const [configValues, setConfigValues] = useConfigGlobalState('configValues');

  const options = useMemo(() => {
    return configuration.options.map((option) => {
      if (configValues[option.config] === option.is_on_value) {
        return {
          ...option,
          active: true,
        };
      }
      return option;
    });
  }, [configuration, configValues]);

  useEffect(() => {
    if (sensor?.is_managed_by_backend) {
      watchMultiConfigs(configuration.options.map((option) => option.config));
    }
  }, [sensor.is_managed_by_backend, configuration.options]);

  return (
    <View style={styles.wrap}>
      <Text type="H4" style={styles.textModeMargin}>
        {title}
      </Text>
      <View style={styles.center}>
        <View style={styles.wrapOption}>
          {options.map((item, index) => (
            <GridItem
              item={item}
              index={index}
              length={options.length}
              doAction={doAction}
              sensor={sensor}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default StatesGridActionTemplate;
