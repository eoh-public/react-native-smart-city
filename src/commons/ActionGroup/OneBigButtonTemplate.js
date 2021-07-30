import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import Text from '../Text';

import { Colors } from '../../configs';
import styles from './OneBigButtonTemplateStyle';

const OneBigButtonTemplate = memo(({ actionGroup, doAction }) => {
  const { configuration } = actionGroup;

  return (
    <>
      <View style={styles.barrierControlContainer}>
        <TouchableOpacity
          style={styles.bigCircle}
          onPress={() => doAction(configuration.action_data)}
        >
          <View style={styles.smallCircle}>
            <Icon name={configuration.icon} size={44} color={Colors.Green7} />
            <Text style={styles.textBig}>{configuration.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {!!actionGroup.title && (
        <Text size={20} semibold center>
          {actionGroup.title}
        </Text>
      )}
    </>
  );
});

export default OneBigButtonTemplate;

