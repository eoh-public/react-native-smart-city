import React from 'react';
import { View, Switch } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';

import Text from '../../Text';
import styles from './OnOffSimpleTemplateStyle';
import { Colors } from '../../../configs';

const OnOffSimpleTemplate = ({
  isOn,
  triggerAction,
  actionGroup,
  disabled,
}) => {
  const isEnabled = !!isOn;

  return (
    <View style={styles.wrap}>
      <View style={styles.iconAndText}>
        <IconOutline name="poweroff" size={20} style={styles.marginRight} />
        <Text type="H4">{actionGroup.title}</Text>
      </View>
      <Switch
        trackColor={{ false: Colors.Gray4, true: Colors.Primary }}
        thumbColor={isEnabled ? Colors.White : Colors.Gray6}
        ios_backgroundColor={Colors.Gray4}
        onValueChange={triggerAction}
        value={isEnabled}
        disabled={disabled}
      />
    </View>
  );
};

export default OnOffSimpleTemplate;
