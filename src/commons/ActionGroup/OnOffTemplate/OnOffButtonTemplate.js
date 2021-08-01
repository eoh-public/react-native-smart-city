import { Icon } from '@ant-design/react-native';
import Text from '../../Text';

import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../configs';
import styles from './OnOffButtonTemplateStyle';

const OnOffButtonTemplate = memo(({ isOn, triggerAction, actionGroup }) => {
  const { configuration } = actionGroup;

  return (
    <>
      <View style={styles.barrierControlContainer}>
        <TouchableOpacity style={styles.bigCircle} onPress={triggerAction}>
          <View style={styles.smallCircle}>
            <Icon
              name={isOn ? configuration.icon_on : configuration.icon_off}
              size={44}
              color={isOn ? Colors.Green7 : Colors.Gray6}
            />
            <Text
              style={[
                styles.textBig,
                { color: isOn ? Colors.Gray8 : Colors.Gray6 },
              ]}
            >
              {isOn ? configuration.text_on : configuration.text_off}
            </Text>
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

export default OnOffButtonTemplate;
