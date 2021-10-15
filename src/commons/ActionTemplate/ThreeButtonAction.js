import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import styles from './ThreeButtonActionStyles';

const ThreeButtonAction = ({ configuration, onPress, template }) => {
  const { text1, text2, text3, action1, action2, action3 } = configuration;
  const onPressAction1 = useCallback(() => {
    onPress &&
      onPress({
        name: text1,
        action: action1,
        template,
      });
  }, [text1, action1, template, onPress]);

  const onPressAction2 = useCallback(() => {
    onPress &&
      onPress({
        name: text2,
        action: action2,
        template,
      });
  }, [text2, action2, template, onPress]);

  const onPressAction3 = useCallback(() => {
    onPress &&
      onPress({
        name: text3,
        action: action3,
        template,
      });
  }, [text3, action3, template, onPress]);

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

export default memo(ThreeButtonAction);
