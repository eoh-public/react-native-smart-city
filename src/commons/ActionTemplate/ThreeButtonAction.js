import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import styles from './ThreeButtonActionStyles';

const ThreeButtonAction = ({ configuration, onPress }) => {
  const { text1, text2, text3, action1, action2, action3 } = configuration;
  const onPressAction1 = () => {
    onPress &&
      onPress({
        name: text1,
        action: action1,
      });
  };

  const onPressAction2 = () => {
    onPress &&
      onPress({
        name: text2,
        action: action2,
      });
  };

  const onPressAction3 = () => {
    onPress &&
      onPress({
        name: text3,
        action: action3,
      });
  };

  return (
    <>
      <TouchableOpacity onPress={onPressAction1}>
        <Text type="H4" style={styles.textwithline}>
          {text1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressAction2}>
        <Text type="H4" style={styles.textwithline}>
          {text2}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressAction3}>
        <Text type="H4" style={styles.textwithline}>
          {text3}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ThreeButtonAction;
