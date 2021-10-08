import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import styles from './OneButtonActionStyles';

const OneButtonAction = ({ configuration, onPress, template }) => {
  const { text, action } = configuration;
  const onPressAction = () => {
    onPress &&
      onPress({
        name: text,
        action: action,
        template,
      });
  };

  return (
    <>
      <TouchableOpacity onPress={onPressAction}>
        <Text type="H4" style={styles.textwithline}>
          {text}
        </Text>
      </TouchableOpacity>
    </>
  );
};
export default OneButtonAction;
