import { IconFill } from '@ant-design/icons-react-native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';
import FImage from '../FImage';

const IconComponent = memo(
  ({ icon, iconKit, isSendingCommand = false, size = 40, style }) => {
    let extraStyle = {};
    if (size) {
      extraStyle = {
        width: size,
        height: size,
      };
    }
    return iconKit ? (
      <FImage
        source={{ uri: iconKit }}
        style={[styles.iconAction, extraStyle, style]}
      />
    ) : (
      <IconFill
        name={icon}
        color={isSendingCommand ? Colors.TextGray : Colors.Green7}
        size={24}
        style={style}
      />
    );
  }
);

export default IconComponent;

const styles = StyleSheet.create({
  iconAction: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
