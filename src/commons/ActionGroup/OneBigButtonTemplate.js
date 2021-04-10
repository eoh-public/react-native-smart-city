import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import Text from '../Text';

import { Colors } from '../../configs';
import { bigButtonStyles } from './styles';

const OneBigButtonTemplate = ({ actionGroup, doAction }) => {
  const { configuration } = actionGroup;

  return (
    <>
      <View style={bigButtonStyles.barrierControlContainer}>
        <TouchableOpacity
          style={bigButtonStyles.bigCircle}
          onPress={() => doAction(configuration.action_data)}
        >
          <View style={bigButtonStyles.smallCircle}>
            <Icon name={configuration.icon} size={44} color={Colors.Green7} />
            <Text style={bigButtonStyles.textBig}>{configuration.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OneBigButtonTemplate;
