import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import styles from './OneButtonActionStyles';

const OneButtonAction = ({ configuration, onPress }) => {
  const { text, action } = configuration;
  const onPressAction = () => {
    onPress &&
      onPress({
        name: text,
        action: action,
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
