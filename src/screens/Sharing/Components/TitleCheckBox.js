import React, { memo, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CheckBoxCustom } from './CheckBoxCustom';
import styles from './Styles/TitleCheckBoxStyles';

const TitleCheckBox = ({
  isChecked = false,
  onPress,
  title = '',
  id,
  wrapCheckBoxStyle,
  wrapStyle,
  titleStyle,
  idGroup,
}) => {
  const [checked, setChecked] = useState(isChecked);
  const handleOnPress = () => {
    setChecked(!checked);
    onPress && onPress(idGroup, !checked, id);
  };

  useEffect(() => {
    isChecked !== checked && setChecked(isChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <View style={[styles.wrap, wrapStyle]}>
      <CheckBoxCustom
        isChecked={checked}
        onPress={handleOnPress}
        wrapStyle={wrapCheckBoxStyle}
      />
      <Text onPress={handleOnPress} style={[styles.title, titleStyle]}>
        {title}
      </Text>
    </View>
  );
};

export default memo(TitleCheckBox);
