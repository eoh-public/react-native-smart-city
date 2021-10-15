import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import styles from './OnOffButtonActionStyles';

const OnOffButtonAction = ({ configuration, onPress, template }) => {
  const { text_on, text_off, action_on, action_off } = configuration;
  const onPressActionOn = () => {
    onPress &&
      onPress({
        name: text_on,
        action: action_on,
        template,
      });
  };

  const onPressActionOff = () => {
    onPress &&
      onPress({
        name: text_off,
        action: action_off,
        template,
      });
  };

  return (
    <>
      <TouchableOpacity onPress={onPressActionOn}>
        <Text type="H4" style={styles.textwithline}>
          {text_on}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressActionOff}>
        <Text type="H4" style={styles.textwithline}>
          {text_off}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default memo(OnOffButtonAction);
