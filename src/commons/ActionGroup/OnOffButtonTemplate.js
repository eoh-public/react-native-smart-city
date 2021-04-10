import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import Text from '../Text';

import { Colors } from '../../configs';
import { watchMultiConfigs } from '../../iot/Monitor';
import { useConfigGlobalState } from '../../iot/states';
import { bigButtonStyles } from './styles';

const OnOffButtonTemplate = ({ actionGroup, doAction }) => {
  const { configuration } = actionGroup;
  const [isOn, setIsOn] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [configValues, _] = useConfigGlobalState('configValues');
  const triggerAction = useCallback(
    (value) => {
      if (isOn) {
        doAction(configuration.action_off_data);
      } else {
        doAction(configuration.action_on_data);
      }
      configuration.config && watchMultiConfigs([configuration.config]);
    },
    [configuration, doAction, isOn]
  );

  useEffect(() => {
    const configValue = configValues[configuration.config];
    setIsOn(configValue);
  }, [configuration.config, configValues]);

  useEffect(() => {
    watchMultiConfigs([configuration.config]);
  }, [configuration.config]);

  return (
    <>
      <View style={bigButtonStyles.barrierControlContainer}>
        <TouchableOpacity
          style={bigButtonStyles.bigCircle}
          onPress={triggerAction}
        >
          <View style={bigButtonStyles.smallCircle}>
            <Icon
              name={isOn ? configuration.icon_on : configuration.icon_off}
              size={44}
              color={isOn ? Colors.Green7 : Colors.Gray6}
            />
            <Text
              style={[
                bigButtonStyles.textBig,
                { color: isOn ? Colors.Gray8 : Colors.Gray6 },
              ]}
            >
              {isOn ? configuration.text_on : configuration.text_off}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OnOffButtonTemplate;
